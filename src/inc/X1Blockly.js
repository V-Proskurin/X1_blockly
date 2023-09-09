import * as Blockly from "blockly";
import {createPlayground} from "@blockly/dev-tools";
import {download, getFileContent} from "./helpers";
import X1BlocklyExecution from "./X1BlocklyExecution";

class X1Blockly {
    constructor() {
        this.settings = {
            toolbox: {
                "kind": "categoryToolbox",
                "contents": []
            }
        };
        this.plugins = [];

        this.updateData();
    }

    updateData() {
        this.data = window.x1data;

        if (typeof this.data.user === 'object') {
            this.user = this.data.user;
        }
    }

    setSettings(settings) {
        this.settings = settings;
    };

    use(pluginClass) {
        this.plugins.push(new pluginClass(this));
    }

    init(selector) {
        this.container = document.querySelector(selector);

        return createPlayground(this.container, (container, options) => {
            options.toolbox = this.settings.toolbox;
            return this.createWorkspace(container, options);
        }, {
            debugEnabled: false,
            toolbox: this.settings.toolbox,
            grid: {
                spacing: 25,
                length: 3,
                colour: '#ccc',
                snap: true,
            },
        }).then(() => {
            this.execution = new
             X1BlocklyExecution(this.workspace);
            console.log( 'this.execution', this.execution );
            this.loadedWorkspace()
        });
    }



    getWorkspaceBlocks() {
        const state = new Blockly.serialization.blocks.BlockSerializer()
        return state;
    }
    getWorkspace() {
        const workspace = this.workspace
        return workspace;
    }


    createWorkspace(container, options) {
        this.container = container;
        this.blocklyOptions = options;

        this.workspace = Blockly.inject(container, options);

        this.plugins.forEach((plugin) => {
            plugin.init(this);
        });
        console.log( 'this.workspace', this.workspace);
        return this.workspace;
    }

    importWorkspace( json ) {

        // [data-action="x1-blockly-load__workspace"]
        const state = this.getWorkspaceBlocks()
        try {
            if (json) {
                state.load( JSON.parse(json), this.workspace);
            }
        } catch (err) {
            // console.error('Workspace import error: ', err);
            return false;
        }
        return true;
    }

    exportWorkspace() {
        const serializer = this.getWorkspaceBlocks();
        return JSON.stringify( serializer.save(this.workspace))  ;
    }


    saveWorkspace() {
        const json = this.exportWorkspace();
        if ( json ) {
            download(json, 'workspace.json', 'application/json');
        } else {
            alert("Добавьте блоки в рабочую область")
        }

    }

    loadWorkspace(fileinput) {
        console.log( fileinput );
        getFileContent(fileinput).then((json) => {
            console.log( json );
            if (json) {
                this.importWorkspace(json);
            }
        });

        fileinput.value = null;
    }

    clearWorkspace() {
        // const serializer = new Blockly.serialization.blocks.BlockSerializer();
        // serializer.clear(this.workspace);
        this.workspace.clear()
    }
    clearWorkspaceTrashcan() {
        // const serializer = new Blockly.serialization.blocks.BlockSerializer();
        // serializer.clear(this.workspace);
        this.workspace.trashcan.emptyContents()

    }

    loadedWorkspace() {
        let firstSave = false;
        let th = this;
        let thisWorkspace = this.workspace;

        console.log(  'this.workspace', this.workspace );
        console.log( 'Blockly.Events', Blockly.Events );

        let currentUrl = window.location.href
        var url = new URL(currentUrl);
        var blocklyfileUrl = url.searchParams.get("blocklyfile");
        console.log( url.searchParams );

        thisWorkspace.addChangeListener( function (el) {
            if ( el.type == "finished_loading") {
                // if ( ! bloclyfile && this.workspace ) {
                    console.log( 'clear workspace' );
                    thisWorkspace.clear()
                // }


                if ( fm_sh_code && blocklyfileUrl ) {
                    console.log( 'load workspace ');
                    let blocklyfmHash = blocklyfileUrl.split('/')[0];
                    let typefile = blocklyfileUrl.split('/')[1];

                    console.log( fm_sh_code );
                    console.log( blocklyfmHash );
                    // let urlFile = fm_sh_code.url(blocklyfmHash);
                    // console.log( urlFile );

                    $.ajax({
                        url: '/wp-admin/admin-ajax.php',
                        method: 'POST',
                        data: {
                            'action': 'getBloklyFileContent',
                            // 'fileUrl': urlFile,
                            'fmHash': blocklyfmHash
                        },
                    }).done( data => {
                        let jsonData = JSON.parse( data );

                        var im = jsonData.file_title;
                        var name = im.replace(/\.[^.]+$/, "");
                        $('#inputBlocklyFile').val( name )
                        th.importWorkspace( jsonData.content )
                    })


                }

            }


            if (  el.type !== "viewport_change" && !firstSave ) {

                // $.ajax({
                //     url: '/wp-admin/admin-ajax.php',
                //     method: 'POST',
                //     data: {
                //         'action': 'saveBloklyFileContent',
                //         'jsonContent': jsonContent,
                //         'fileName': 'testsss'
                //     },
                // }).done( data => {
                //     // Запустить обновление каталога FM, или онс сам это делает
                // })

                // firstSave = true;
            }

        });


    }

    addToolboxCategories(toolboxCategories) {
        this.settings.toolbox.contents = this.settings.toolbox.contents.concat(toolboxCategories);
    }

    run () {
        this.execution.run();
    }

    forward () {
        this.execution.forward();
    }

    backward () {

        this.execution.backward();
    }
}

window.x1blockly = new X1Blockly();

export default window.x1blockly;