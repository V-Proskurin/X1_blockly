import * as Blockly from "blockly";
import {javascriptGenerator} from 'blockly/javascript';

//definition
Blockly.Blocks['js_block'] = {
    init: function() {
        this.appendValueInput("test_field")
            .setCheck(null)
            .appendField(new Blockly.FieldNumber(0), "TEST_FIELD");
        this.setColour(230);
        this.setTooltip("Test");
        this.setHelpUrl("");
    }
};


//code generation
javascriptGenerator['js_block'] = function(block) {
    const value = block.getFieldValue('TEST_FIELD');

    let code = `let test = ${value} * ${value};`;

    return code;
};

