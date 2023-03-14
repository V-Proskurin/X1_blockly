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

Blockly.Blocks['minecraft_connect'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Инициализировать")
            .appendField("Личный мир")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "world")
			.appendField("мобы")
			.appendField(new Blockly.FieldCheckbox("FALSE"), "mob");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(255);
        this.setTooltip("Главный блок программы. Устанавливает соединение с сервером и настраивает начальные данные");
        this.setHelpUrl("");
    }
};

//code generation
javascriptGenerator['js_block'] = function(block) {
    const value = block.getFieldValue('TEST_FIELD');

    let code = `let test = ${value} * ${value};`;

    return code;
};

javascriptGenerator['minecraft_connect'] = function (block) {
    var text_nickname = x1blockly.user.nickname;
    var checkbox_world = block.getFieldValue('world') === 'TRUE';
    var checkbox_mob = block.getFieldValue('mob') === 'TRUE';

    var url = text_nickname+'/connect/' + checkbox_world + '/' + checkbox_mob;
    var code = "xhr('"+url+"');\n";
    return code;
};

