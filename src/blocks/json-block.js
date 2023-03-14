import * as Blockly from "blockly";
import {javascriptGenerator} from 'blockly/javascript';

//definition
Blockly.defineBlocksWithJsonArray([{
    "type": "json_block",
    "message0": "%1 %2",
    "args0": [
        {
            "type": "field_number",
            "name": "TEST_FIELD",
            "value": 0
        },
        {
            "type": "input_value",
            "name": "test_field"
        }
    ],
    "colour": 230,
    "tooltip": "Test",
    "helpUrl": ""
}]);


//code generation
javascriptGenerator['js_block'] = function(block) {
    const value = block.getFieldValue('TEST_FIELD');

    let code = `let test = ${value} * ${value};`;

    return code;
};
