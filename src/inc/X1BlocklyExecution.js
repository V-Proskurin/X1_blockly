import {javascriptGenerator} from "blockly/javascript";

global.acorn = require('./acorn/acorn');

require("./acorn/interpreter");
import {serialize, deserialize} from "./acorn/serialize";
const diff_match_patch = require("./acorn/diff_match_patch").diff_match_patch;

export default class X1BlocklyExecution {
    constructor(workspace) {
        this.workspace = workspace;
        this.serializationStack = [];
        this.dmp = new diff_match_patch();
        this.interpreter = null;
        this.currentBlockId = 0;
        //this.output = '';
    }

    getCode() {
        window.LoopTrap = 1000;
        javascriptGenerator.INFINITE_LOOP_TRAP = 'if (--window.LoopTrap < 0) throw "Infinite loop.";\n';
        javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n';

        const code = javascriptGenerator.workspaceToCode(this.workspace);

        javascriptGenerator.INFINITE_LOOP_TRAP = null;
        javascriptGenerator.STATEMENT_PREFIX = null;

        return code;
    }

    createInterpreter() {
        const code = this.getCode();

        return new Interpreter(code, this.interpreterSetup);
    }

    interpreterSetup(interpreter, globalObject) {
        const interpreterProperties = {
            alert: (text) => {
                return window.alert(arguments.length ? text : '');
            },

            pause: (milliseconds) => {
                const date = Date.now();
                let currentDate = null;
                do {
                    currentDate = Date.now();
                } while (currentDate - date < milliseconds);
            },

            prompt: prompt,

            highlightBlock: (id) => {
                id = String(id || '');
                return x1blockly.execution.highlightBlock(id);
            },

            xhr: (url, callback) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onreadystatechange = function () {
                    if (readyState === 4 && status === 200) {
                        //callback(responseText);
                        console.log('OK - ' + url);
                    }
                    if (status !== 200) {
                        console.log('CONNECT ERROR - ' + url);
                    }

                };
                xhr.send(null);
            },

            getJSON: (url, callback) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url, false);
                xhr.getResponseHeader('Content-Type', 'aplication/json', 'charset=utf-8');
                xhr.send();
                return xhr.responseText;
            }
        };


        for (let propName in interpreterProperties) {
            let propValue = interpreterProperties[propName];

            if (typeof propValue === 'function') {
                propValue = interpreter.createNativeFunction(propValue);
            }

            interpreter.setProperty(globalObject, propName, propValue);
        }
    }

    highlightBlock(id) {
        this.currentBlockId = id;
        this.workspace.highlightBlock(id);
    }

    compressLastSerialization(currentJson) {
        const previousStack = this.serializationStack[this.serializationStack.length - 1];
        const previousDiff = this.dmp.diff_main(currentJson, previousStack.json);
        this.dmp.diff_cleanupEfficiency(previousDiff);
        previousStack.json = null;
        previousStack.delta = this.dmp.diff_toDelta(previousDiff);
    }

    uncompressLastSerialization(currentJson) {
        const previousStack = this.serializationStack[this.serializationStack.length - 1];
        const previousDiff = this.dmp.diff_fromDelta(currentJson, previousStack.delta);
        previousStack.delta = null;
        previousStack.json = this.dmp.diff_text2(previousDiff);
    }

    run() {
        this.interpreter = this.createInterpreter();

        const runToCompletion = () => {
            if (this.interpreter.run()) {
                // Ran until an async call.  Give this call a chance to run.
                // Then start running again later.
                setTimeout(runToCompletion, 10);
            } else {
                //finish
                this.interpreter = null;
                this.workspace.highlightBlock(null);
            }
        }

        runToCompletion();
    }

    forward() {
        if (!this.interpreter) {
            this.currentBlockId = 0;
            this.interpreter = this.createInterpreter();
            this.serializationStack.length = 0;
        }

        const prevBlockId = this.currentBlockId;

        const json = JSON.stringify(serialize(this.interpreter));

        const prevStepSerialized = {
            json: json,
            delta: null,
            highlight: this.currentBlockId
        };

        let hasMoreCode;

        do {
            try {
                hasMoreCode = this.interpreter.step();
            } finally {
            }
            // Keep executing until a highlight statement is reached,
            // or the code completes or errors.
        } while (hasMoreCode && prevBlockId === this.currentBlockId);

        if (hasMoreCode) {
            if (this.dmp && this.serializationStack.length) {
                this.compressLastSerialization(prevStepSerialized.json);
            }
            this.serializationStack.push(prevStepSerialized);
        }
        return hasMoreCode;
    }

    backward() {
        const serialization = this.serializationStack.pop();

        if (!serialization) {
            return false;
        }

        this.currentBlockId = serialization.highlight;
        this.highlightBlock(this.currentBlockId);

        let json = serialization.json;
        if (this.dmp && this.serializationStack.length) {
            this.uncompressLastSerialization(json);
        }

        json = JSON.parse(json);

        // Create a clean interpreter with the same initialization functions.
        this.interpreter = new Interpreter('', this.interpreterSetup);
        deserialize(json, this.interpreter);
    }
}