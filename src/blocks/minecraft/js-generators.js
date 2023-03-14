import {javascriptGenerator} from "blockly/javascript";
import * as Blockly from "blockly";

var timer = 'pause(100); \n'

javascriptGenerator['minecraft_pause'] = function (block) {
    var number_ms = block.getFieldValue('ms');
    var code = 'pause('+number_ms+'); \n';
    return code;
};

javascriptGenerator['minecraft_connect'] = function (block) {
    var text_nickname = NickName;
    var checkbox_world = block.getFieldValue('world') === 'TRUE';
    var checkbox_mob = block.getFieldValue('mob') === 'TRUE';

    var url = text_nickname+'/connect/' + checkbox_world + '/' + checkbox_mob;
    var code = timer+"xhr('"+url+"');\n";
    return code;
};

javascriptGenerator['minecraft_build'] = function (block) {
    var text_nickname = NickName;
    var dir = block.getFieldValue('dir');
    var blocktype = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('blocktype'), Blockly.VARIABLE_CATEGORY_NAME);

    var url = text_nickname+'/drone/build/creative/\'+' + blocktype + '+\'/'+dir;
    var code = timer+"xhr('"+url+"');\n";

    return code;
};

javascriptGenerator['minecraft_createDrone'] = function (block) {
    var text_nickname = NickName;
    var url = text_nickname+'/drone/create';
    var code = timer+"xhr('"+url+"');\n";
    return code;
};


javascriptGenerator['minecraft_moveDrone'] = function (block) {
    var text_nickname = NickName;
    var type = block.getFieldValue('Type');
    var step =  block.getField("step") ? String(Number(block.getFieldValue("step"))) : Blockly.JavaScript.valueToCode(block, "step", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;

    if(/^(0|-?[1-9]\d{0,5})$/.test(step) == false)
        step = '\'+'+ step + '+\'';
    var url = text_nickname+'/drone/move/' + type + '/' + step;
    var code = timer+"xhr('"+url+"');\n";
    return code;
};

javascriptGenerator['minecraft_botToPlayer'] = function (block) {
    var text_nickname = NickName;
    var type = block.getFieldValue('Type');
    var url = text_nickname+'/drone/botToPlayer/' + type;
    var code = timer+"xhr('"+url+"');\n";
    return code;
};

javascriptGenerator['minecraft_tpdrone'] = function (block) {
    var text_nickname = NickName;
    var number_x =  block.getField("tpdrone_x") ? String(Number(block.getFieldValue("tpdrone_x"))) : Blockly.JavaScript.valueToCode(block, "tpdrone_x", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var number_y =  block.getField("tpdrone_y") ? String(Number(block.getFieldValue("tpdrone_y"))) : Blockly.JavaScript.valueToCode(block, "tpdrone_y", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var number_z =  block.getField("tpdrone_z") ? String(Number(block.getFieldValue("tpdrone_z"))) : Blockly.JavaScript.valueToCode(block, "tpdrone_z", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;

    if(/^(0|-?[1-9]\d{0,5})$/.test(number_x) == false)
        number_x = '\'+'+ number_x + '+\'';
    if(/^(0|-?[1-9]\d{0,5})$/.test(number_y) == false)
        number_y = '\'+'+ number_y + '+\'';
    if(/^(0|-?[1-9]\d{0,5})$/.test(number_z) == false)
        number_z = '\'+'+ number_z + '+\'';

    var url = text_nickname+'/drone/tpbot/' + number_x + '/' + number_y + '/' + number_z;
    var code = timer+"xhr('"+url+"');\n";

    return code;
};

javascriptGenerator['minecraft_summon'] = function (block) {
    var text_nickname = NickName;
    var type = block.getFieldValue('Type');

    var url = text_nickname+'/drone/summon/' + type;
    var code = timer+"xhr('"+url+"');\n";

    return code;
};


javascriptGenerator['minecraft_time'] = function (block) {
    var text_nickname = NickName;
    var time = block.getFieldValue('time');

    var url = text_nickname+'/drone/setTime/' + time;
    var code = timer+"xhr('"+url+"');\n";

    return code;
};

javascriptGenerator['minecraft_weather'] = function (block) {
    var text_nickname = NickName;
    var type = block.getFieldValue('Type');
    var duration = block.getFieldValue('duration');

    var url = text_nickname+'/drone/setWeather/' + type + '/' + duration;
    var code = timer+"xhr('"+url+"');\n";

    return code;
};

javascriptGenerator['minecraft_text'] = function (block) {
    var text_nickname = NickName;
    var color = block.getFieldValue('color');
    var mtexts =  block.getField("mctext") ? String(Number(block.getFieldValue("mctext"))) : Blockly.JavaScript.valueToCode(block, "mctext", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;

    var url = text_nickname+'/drone/text/' + color + '/' + mtexts.replace("'","").replace("'","");
    var code = timer+"xhr('"+url+"');\n";

    return code;
};


javascriptGenerator['minecraft_mineblock'] = function (block) {
    var text_nickname = NickName;

    var url = text_nickname+'/drone/mine';
    var code = timer+"xhr('"+url+"');\n";
    return code;
};

javascriptGenerator['minecraft_craft'] = function (block) {
    var text_nickname = NickName;
    var item = block.getFieldValue('item');
    var count = block.getFieldValue('count');

    var url = text_nickname+'/drone/craft/' + item + '/'+ count;
    var code = timer+"xhr('"+url+"');\n";
    return code;
};

javascriptGenerator['minecraft_playnote'] = function (block) {
    var text_nickname = NickName;
    var octave = block.getFieldValue('octave');
    var tone = block.getFieldValue('tone');
    var instr = block.getFieldValue('instrument');

    var url = text_nickname+'/drone/playNote/' + octave + '/'+ tone+ '/'+ instr;
    var code = timer+"xhr('"+url+"');\n";
    return code;
};

javascriptGenerator['minecraft_if'] = function (block) {
    var text_nickname = NickName;
    var whatif = block.getFieldValue('whatif');
    var valif = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('valif'), Blockly.VARIABLE_CATEGORY_NAME);
    var whatthen = block.getFieldValue('whatthen');
    var valthen = block.getFieldValue('valthen');

    var url =text_nickname+'/drone/if/' + whatif + '/\'+'+ valif+ '+\'/'+ whatthen + '/'+ valthen;
    var code = timer+"xhr('"+url+"');\n";
    return code;
};

javascriptGenerator['minecraft_movehand'] = function (block) {
    var text_nickname = NickName;
    var number_x =  block.getField("x") ? String(Number(block.getFieldValue("x"))) : Blockly.JavaScript.valueToCode(block, "x", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var number_y =  block.getField("y") ? String(Number(block.getFieldValue("y"))) : Blockly.JavaScript.valueToCode(block, "y", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var number_z =  block.getField("z") ? String(Number(block.getFieldValue("z"))) : Blockly.JavaScript.valueToCode(block, "z", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var what = block.getFieldValue('what');
    var type = block.getFieldValue('type');

    if(/^(0|-?[1-9]\d{0,5})$/.test(number_x) == false)
        number_x = '\'+'+ number_x + '+\'';
    if(/^(0|-?[1-9]\d{0,5})$/.test(number_y) == false)
        number_y = '\'+'+ number_y + '+\'';
    if(/^(0|-?[1-9]\d{0,5})$/.test(number_z) == false)
        number_z = '\'+'+ number_z + '+\'';

    var url = text_nickname+'/drone/moveBotBody/' + type + '/' + what + '/' + number_x + '/' + number_y + '/' + number_z;
    var code = timer+"xhr('"+url+"');\n";

    return code;
};

javascriptGenerator['minecraft_getdroneblock'] = function (block) {
    var text_nickname = NickName;
    var poll_url = pollUrl;

    var otherCode = Blockly.JavaScript.statementToCode(block, 'otherCode');
    var response = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('response'), Blockly.VARIABLE_CATEGORY_NAME);
    var type = block.getFieldValue('Type');
    var url = pollUrl+text_nickname+'/'+type
    var funcUpdate = "var updateFromServer = function (err, data) {if (err != null) "+response+" = 'error';\n else {\n  "+response+" = data;\n"+otherCode+"\n }\n};";
    var code = funcUpdate+"\n getJSON('"+text_nickname+"/"+type+"', updateFromServer);";
    return code;
};

javascriptGenerator['minecraft_setBlockData'] = function (block) {
    var text_nickname = NickName;
    var blockData =  Blockly.JavaScript.variableDB_.getName(block.getFieldValue('blockData'), Blockly.VARIABLE_CATEGORY_NAME);

    var url = text_nickname+'/drone/setblockdata/\'+' + blockData + '.split("=").join("-")+\'';
    var code = timer+"xhr('"+url+"');\n";

    return code;
};

javascriptGenerator['minecraft_jsonParse'] = function (block) {
    var string = block.getField("string") ? String(Number(block.getFieldValue("server_string"))) : Blockly.JavaScript.valueToCode(block, "server_string", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0";
    var type = block.getFieldValue('type');
    if(type==="drone" || type==="player" || type==="botNearBlock") {
        var data = block.getFieldValue('data');
    }
    else {
        var data =  block.getField("data") ? String(Number(block.getFieldValue("data"))) : Blockly.JavaScript.valueToCode(block, "data", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    }
    var server_data = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('server_data'), Blockly.VARIABLE_CATEGORY_NAME);
    //data = data.replace("'","").replace("'","");
    //var code = server_data+'='+string+'.'+type+'.'+data+';';
    if(type==="block" || type==="entity")
        var code = server_data+'='+string+'[\''+type+'\'];\n';
    else
        var code = server_data+'='+string+'[\''+type+'\'][\''+data+'\'];\n';
    return code;
};

javascriptGenerator['minecraft_coordBlock'] = function (block) {
    var x =  block.getField("x") ? String(Number(block.getFieldValue("x"))) : Blockly.JavaScript.valueToCode(block, "x", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var y =  block.getField("y") ? String(Number(block.getFieldValue("y"))) : Blockly.JavaScript.valueToCode(block, "y", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var z =  block.getField("z") ? String(Number(block.getFieldValue("z"))) : Blockly.JavaScript.valueToCode(block, "z", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    if(/^(0|-?[1-9]\d{0,5})$/.test(x) == false)
        x = '\'+'+ x + '+\'';
    if(/^(0|-?[1-9]\d{0,5})$/.test(y) == false)
        y = '\'+'+ y + '+\'';
    if(/^(0|-?[1-9]\d{0,5})$/.test(z) == false)
        z = '\'+'+ z + '+\'';
    var code = '\'block('+x+' '+y+' '+z+')\'';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

javascriptGenerator['minecraft_droneSputnik'] = function (block) {
    var text_nickname = NickName;
    var mob_type = block.getFieldValue('mob_type');

    var checkbox_zaxvat = "false";
    if(mob_type=="zaxvat")
        checkbox_zaxvat="true";

    var mob_name =  block.getField("mob_name") ? String(Number(block.getFieldValue("mob_name"))) : Blockly.JavaScript.valueToCode(block, "mob_name", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;

    var url = text_nickname+'/sputnik/create/' + mob_type + '/' + mob_name.split("'").join("") + '/' + checkbox_zaxvat;
    var code = timer+"xhr('"+url+"');\n";
    return code;
};

javascriptGenerator['minecraft_momentmove'] = function (block) {
    var text_nickname = NickName;
    var dir = block.getFieldValue('dir');

    var url = text_nickname+'/sputnik/momentmove/'+dir;
    var code = timer+"xhr('"+url+"');\n";
    return code;
};

javascriptGenerator['minecraft_sputnikCraft'] = function (block) {
    var text_nickname = NickName;
    var item = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('item'), Blockly.VARIABLE_CATEGORY_NAME);

    var url = text_nickname+'/sputnik/craft/\'+' + item + '+\'/'
    var code = timer+"xhr('"+url+"');\n";
    return code;
};

javascriptGenerator['minecraft_sputnikmineblock'] = function (block) {
    var text_nickname = NickName;

    var url = text_nickname+'/sputnik/mine';
    var code = timer+"xhr('"+url+"');\n";
    return code;
};

javascriptGenerator['minecraft_sputnikInvSlot'] = function (block) {
    var text_nickname = NickName;
    var slot =  block.getField("slot") ? String(Number(block.getFieldValue("slot"))) : Blockly.JavaScript.valueToCode(block, "slot", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;

    if(/^(0|-?[1-9]\d{0,5})$/.test(slot) == false)
        slot = '\'+'+ slot + '+\'';

    var url = text_nickname+'/sputnik/slotinhand/'+slot;
    var code = timer+"xhr('"+url+"');\n";
    return code;
};

javascriptGenerator['minecraft_sputnikBuild'] = function (block) {
    var text_nickname = NickName;
    var dir = block.getFieldValue('dir');

    var url = text_nickname+'/sputnik/build/'+dir;
    var code = timer+"xhr('"+url+"');\n";
    return code;
};

javascriptGenerator['minecraft_unSputnik'] = function (block) {
    var text_nickname = NickName;

    var url = text_nickname+'/sputnik/unsputnik';
    var code = timer+"xhr('"+url+"');\n";
    return code;
};

javascriptGenerator['minecraft_getServer'] = function (block) {
    var text_nickname = NickName;
    var poll_url = pollUrl;
    var type = block.getFieldValue('Type');

    var response = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('response'), Blockly.VARIABLE_CATEGORY_NAME);
    if(type=="map") {
        var x =  block.getField("x") ? String(Number(block.getFieldValue("x"))) : Blockly.JavaScript.valueToCode(block, "x", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
        var y =  block.getField("y") ? String(Number(block.getFieldValue("y"))) : Blockly.JavaScript.valueToCode(block, "y", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
        var z =  block.getField("z") ? String(Number(block.getFieldValue("z"))) : Blockly.JavaScript.valueToCode(block, "z", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
        var code = response+'=JSON.parse(getJSON("'+text_nickname+'/'+type+'/'+x+'/'+y+'/'+z+'"));';
    }
    else
        var code = response+'=JSON.parse(getJSON("'+text_nickname+'/'+type+'"));';
    return code;

};

javascriptGenerator['minecraft_sputnikProg'] = function (block) {
    var text_nickname = NickName;
    var mob_type = block.getFieldValue('mob_type');
    var checkbox_zaxvat = block.getFieldValue('zaxvat') === 'TRUE';
    var otherCode = Blockly.JavaScript.statementToCode(block, 'otherCode');
    var mob_name =  block.getField("mob_name") ? String(Number(block.getFieldValue("mob_name"))) : Blockly.JavaScript.valueToCode(block, "mob_name", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;

    var url = text_nickname+'/sputnik/create/PLAYER/' + mob_name.split("'").join("") + '/false';
    var url2 = text_nickname+'/sputnik/unsputnik';

    var code1 = timer+"xhr('"+url+"');\n";
    var code2 = timer+"xhr('"+url2+"');\n";
    var code = code1+otherCode+'\n'+code2;
    return code;
};

javascriptGenerator['minecraft_progSputnikMove'] = function (block) {
    var text_nickname = NickName;
    var checkbox_drone = block.getFieldValue('drone') === 'TRUE';
    var x =  block.getField("x") ? String(Number(block.getFieldValue("x"))) : Blockly.JavaScript.valueToCode(block, "x", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var y =  block.getField("y") ? String(Number(block.getFieldValue("y"))) : Blockly.JavaScript.valueToCode(block, "y", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var z =  block.getField("z") ? String(Number(block.getFieldValue("z"))) : Blockly.JavaScript.valueToCode(block, "z", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;

    if(/^(0|-?[1-9]\d{0,5})$/.test(x) == false)
        x = '\'+'+ x + '+\'';
    if(/^(0|-?[1-9]\d{0,5})$/.test(y) == false)
        y = '\'+'+ y + '+\'';
    if(/^(0|-?[1-9]\d{0,5})$/.test(z) == false)
        z = '\'+'+ z + '+\'';

    if(checkbox_drone==true) {
        x=0;
        y=0;
        z=0;
    }

    var url = text_nickname+'/sputnik/movesputnik/'+x+'/'+y+'/'+z+'/' + checkbox_drone;
    var code = timer+"xhr('"+url+"');\n";
    return code;
};

javascriptGenerator['minecraft_progSputnikAtack'] = function (block) {
    var text_nickname = NickName;
    var mob_type =  block.getField("mob_type") ? String(Number(block.getFieldValue("mob_type"))) : Blockly.JavaScript.valueToCode(block, "mob_type", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var radius =  block.getField("radius") ? String(Number(block.getFieldValue("radius"))) : Blockly.JavaScript.valueToCode(block, "radius", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;

    if(/^(0|-?[1-9]\d{0,5})$/.test(radius) == false)
        radius = '\'+'+ radius + '+\'';

    var url = text_nickname+'/sputnik/sputnikatack/' + mob_type.split("'").join("") + '/' + radius;
    var code = timer+"xhr('"+url+"');\n";
    return code;
};

javascriptGenerator['minecraft_tpBot'] = function (block) {
    var text_nickname = NickName;
    var number_x =  block.getField("tpbot_x") ? String(Number(block.getFieldValue("tpdrone_x"))) : Blockly.JavaScript.valueToCode(block, "tpbot_x", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var number_y =  block.getField("tpbot_y") ? String(Number(block.getFieldValue("tpdrone_y"))) : Blockly.JavaScript.valueToCode(block, "tpbot_y", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var number_z =  block.getField("tpbot_z") ? String(Number(block.getFieldValue("tpdrone_z"))) : Blockly.JavaScript.valueToCode(block, "tpbot_z", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;

    if(/^(0|-?[1-9]\d{0,5})$/.test(number_x) == false)
        number_x = '\'+'+ number_x + '+\'';
    if(/^(0|-?[1-9]\d{0,5})$/.test(number_y) == false)
        number_y = '\'+'+ number_y + '+\'';
    if(/^(0|-?[1-9]\d{0,5})$/.test(number_z) == false)
        number_z = '\'+'+ number_z + '+\'';

    var url = text_nickname+'/sputnik/tpbot/' + number_x + '/' + number_y + '/' + number_z;
    var code = timer+"xhr('"+url+"');\n";;

    return code;
};

javascriptGenerator['minecraft_playerToBot'] = function (block) {
    var text_nickname = NickName;

    var url = text_nickname+'/sputnik/playerToBot';
    var code = timer+"xhr('"+url+"');\n";
    return code;
};