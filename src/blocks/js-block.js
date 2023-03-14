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

Blockly.Blocks['minecraft_createDrone'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Создать дрона")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#cc0000");
        this.setTooltip("Создааёт дрона возле вас");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['minecraft_build'] = {
      init: function () {
      this.appendDummyInput()
			.appendField(new Blockly.FieldVariable('build_block'), "blocktype")
			.appendField("напр.")
			.appendField(new Blockly.FieldDropdown([["восток", "EAST"], ["север", "NORTH"], ["юг", "SOUTH"], ["запад", "WEST"], ["верх", "UP"], ["низ", "DOWN"]]), "dir");	

      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#cc0000");
      this.setTooltip("Строить");
      this.setHelpUrl("");
    }
};


Blockly.Blocks['minecraft_moveDrone'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Двигать дрона")
            .appendField(new Blockly.FieldDropdown([["вперёд", "front"], ["назад", "back"], ["лево", "left"], ["право", "right"], ["вверх", "up"], ["вниз", "down"]]), "Type")
            .appendField("шаг");
		this.appendValueInput("step") .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#cc0000");
        this.setTooltip("Двигать дрона в заданном направлении с заданным шагом");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_botToPlayer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Телепортировать ")
            .appendField(new Blockly.FieldDropdown([["дрон к хозяину", "botToPlayer"], ["хозяина к дрону", "playerToBot"]]), "Type");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#cc0000");
        this.setTooltip("Телепортирует дрон к вам");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['minecraft_tpdrone'] = {
    init: function () {
        this.appendDummyInput().appendField("Телепортировать дрон на");
        this.appendDummyInput().appendField("x:");
        this.appendValueInput("tpdrone_x") .setCheck("Number");
        this.appendDummyInput().appendField("y:");
        this.appendValueInput("tpdrone_y") .setCheck("Number");
        this.appendDummyInput().appendField("z:");
        this.appendValueInput("tpdrone_z") .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#cc0000");
        this.setTooltip("Телепортировать дрон *");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_summon'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Создать")
            .appendField(new Blockly.FieldDropdown([["Курица", "Chicken"], ["Корова", "Cow"], ["Волк", "Wolf"], ["Свинья", "Pig"], ["Овца", "Sheep"], ["Кролик", "Rabbit"], ["Лошадь", "Horse"], ["Оцелот", "Ocelot"], ["Житель", "Villager"], ["Зомби", "Zombie"], ["Скелет", "Skeleton"], ["Крипер", "Creeper"], ["Паук", "Spider"]]), "Type");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(359);
        this.setTooltip("Призывает сущность");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['minecraft_time'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Время в мире (час)")
            .appendField(new Blockly.FieldNumber(0), "time");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(359);
        this.setTooltip("Время на сервере");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_weather'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Погода на сервере")
            .appendField(new Blockly.FieldDropdown([["солнечная", "clear"], ["дождь", "rain"], ["буря", "thunder"]]), "Type")
	    .appendField("мин. продолж.")
	    .appendField(new Blockly.FieldNumber(0), "duration");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(359);
        this.setTooltip("Погода на сервере");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['minecraft_text'] = {
    init: function () {
	this.appendDummyInput().appendField("Текст в чат");
	this.appendDummyInput()
            .appendField("цвет")
            .appendField(new Blockly.FieldDropdown([["зелёный", "green"], ["жёлтый", "yellow"], ["красный", "red"]]), "color");
	this.appendValueInput("mctext") .setCheck("String");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#cc0000");
        this.setTooltip("Текст в чат от лица дрона");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['minecraft_mineblock'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Добыть блок");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#cc0000");
        this.setTooltip("Добывает блок на месте дрона в инвентарь игрока");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_craft'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Скрафтить предмет: ")
            .appendField(new Blockly.FieldDropdown([["Палка", "stick"], ["Доски", "oak_planks"], ["Деревянный меч", "wooden_sword"]]), "item")
	    .appendField("Кол-во: ")
	    .appendField(new Blockly.FieldNumber(1), "count");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(255);
        this.setTooltip("Крафтит предмет из имеющихся вещей и помещает его в инвентарь");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['minecraft_playnote'] = {
    init: function () {
	this.appendDummyInput().appendField("Проигрывать. Октава");
	this.appendDummyInput()
	    .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"]]), "octave")
	    .appendField("тон")
            .appendField(new Blockly.FieldDropdown([["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"], ["G", "G"]]), "tone")
	    .appendField("инструмент")
	    .appendField(new Blockly.FieldDropdown([["Банджо", "BANJO"], ["Большой барабан", "BASS_DRUM"], ["Бас-гитара", "BASS_GUITAR"], ["Колокол", "BELL"], ["Бит", "BIT"], ["Звон", "CHIME"], ["Колокольчик", "COW_BELL"], ["Диджериду", "DIDGERIDOO"], ["Флейта", "FLUTE"], ["Гитара", "GUITAR"], ["Железный ксилофон", "IRON_XYLOPHONE"], ["Пианино", "PIANO"], ["Плинг", "PLING"], ["Малый барабан", "SNARE_DRUM"], ["Палочки", "STICKS"], ["Ксилофон", "XYLOPHONE"]]), "instrument");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#cc0000");
        this.setTooltip("Проигрывает возле дрона ноту с установленными параметрами");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_if'] = {
    init: function () {
	this.appendDummyInput().appendField("Если");
	this.appendDummyInput().appendField(new Blockly.FieldDropdown([["Блок в дроне", "blockin"], ["Блок слева", "blockleft"], ["Блок справа", "blockright"], ["Блок сзади", "blockback"]]), "whatif");
	this.appendDummyInput().appendField("==")
	    .appendField(new Blockly.FieldVariable('mc_val_if'), "valif");
	this.appendDummyInput().appendField("то");
	this.appendDummyInput().appendField(new Blockly.FieldDropdown([["вперёд", "front"], ["назад", "back"], ["лево", "left"], ["право", "right"], ["Вверх", "up"], ["Вниз", "down"]]), "whatthen");
	this.appendDummyInput().appendField(new Blockly.FieldNumber(1), "valthen");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#cc0000");
        this.setTooltip("Условный блок Minecraft контролирующий движение");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_movehand'] = {
    init: function () {
	this.appendDummyInput().appendField("Двигать ");
	this.appendDummyInput().appendField(new Blockly.FieldDropdown([["руками", "hand"], ["ногами", "leg"]]), "type");
	this.appendDummyInput().appendField(new Blockly.FieldDropdown([["правой", "right"], ["левой", "left"]]), "what");
	this.appendDummyInput().appendField("x");
	this.appendValueInput("x") .setCheck("Number");
	this.appendDummyInput().appendField("y");
	this.appendValueInput("y") .setCheck("Number");
	this.appendDummyInput().appendField("z");
	this.appendValueInput("z") .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#cc0000");
        this.setTooltip("Двигает руками дрона в зависимости от заданных координат");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_getdroneblock'] = {
	init: function() {
		this.appendDummyInput()
		    .appendField("(async) Запрос данных с сервера в")
		    .appendField(new Blockly.FieldVariable('response'), "response")
		    .appendField(new Blockly.FieldDropdown([["У дрона", "drone"], ["У бота", "sputnik"], ["У игрока", "player"]]), "Type");
		this.appendStatementInput("otherCode")
	            .setCheck(null);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(255);
		this.setTooltip("Асинхронная функция. Берёт данные сервера на текущем шаге и обрабатывает их");
		this.setHelpUrl("");
	}
};

Blockly.Blocks['minecraft_getServer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Запрос данных")
	    .appendField(new Blockly.FieldDropdown([["У дрона", "drone"], ["У бота", "sputnik"], ["У игрока", "player"], ["Карта", "map"]], this.handleTypeSelection.bind(this)), "Type");
	this.appendValueInput("x").setCheck("Number");
	this.appendValueInput("y").setCheck("Number");
	this.appendValueInput("x").setCheck("Number");
	this.appendDummyInput()
	    .appendField("и поместить в ")
	    .appendField(new Blockly.FieldVariable('response'), "response");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(255);
        this.setTooltip("");
        this.setHelpUrl("");
    },
	handleTypeSelection: function (newType) {
        // Avoid unnecessary updates if someone clicks the same field twice
        if(this.columnType !== newType) {
            // Update this.columnType to the new value
            this.columnType = newType;
            // Add or remove fields as appropriate
            this.updateShape();
        }
    },
	updateShape: function () {
		if(this.getInput('x'))
			this.removeInput('x');
		if(this.getInput('y'))
			this.removeInput('y');
		if(this.getInput('z'))
			this.removeInput('z');
		
		if (this.columnType==="map") {
			this.appendValueInput("x").setCheck("Number");
			this.appendValueInput("y").setCheck("Number");
			this.appendValueInput("z").setCheck("Number");
		}
		else {
			if(this.getInput('x'))
				this.removeInput('x');
			if(this.getInput('y'))
				this.removeInput('y');
			if(this.getInput('z'))
				this.removeInput('z');
		}
	},
	mutationToDom: function () { //Нужно при сохранении в XML
        var container = document.createElement('mutation');
        container.setAttribute('column_type', this.columnType);
        return container;
    },
	domToMutation: function (xmlElement) {
        var columnType = xmlElement.getAttribute('column_type');
		
        if(columnType && columnType !== 'undefined') {
            this.columnType = columnType;
        }
        this.updateShape();
    }
};

Blockly.Blocks['minecraft_setBlockData'] = {
	init: function() {
		this.appendDummyInput().appendField("Перенести данные блока");
		this.appendDummyInput().appendField(new Blockly.FieldVariable('block_data'), "blockData");
    		this.setInputsInline(true);
    		this.setPreviousStatement(true, null);
    		this.setNextStatement(true, null);
		this.setColour("#cc0000");
		this.setTooltip("Из данных блока полностью воссаздаёт блок на месте дрона");
		this.setHelpUrl("");	
	
	}
};

Blockly.Blocks['minecraft_jsonParse'] = {
    init: function () {
	this.appendDummyInput()            
	    .appendField(new Blockly.FieldVariable('server_data'), "server_data")
	    .appendField(" = ");
        this.appendDummyInput()
            .appendField("Ответ JSON:");
	this.appendValueInput("server_string");
	this.appendDummyInput()
	    .appendField(new Blockly.FieldDropdown([["Дрон/бот","drone"], ["Игрок","player"], ["Блоки рядом","botNearBlock"], ["Блок на коорд.","block"], ["Сущность на коорд.","entity"], ["Инвентарь (для бота)","inventory"]], this.handleTypeSelection.bind(this)), "type");
        this.columnType = this.getFieldValue('type');
	this.updateShape();
	this.appendDummyInput() .appendField("Параметр:");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(255);
        this.setTooltip("Разбор ответна от сервера на переменные,параметры: x,y,z,front,behind,in,left,right(такиеже с приставкой _data), block(x,y,z), чило (для радиуса мобов)");
        this.setHelpUrl("");
    },
	handleTypeSelection: function (newType) {
        // Avoid unnecessary updates if someone clicks the same field twice
        if(this.columnType !== newType) {
            // Update this.columnType to the new value
            this.columnType = newType;
            // Add or remove fields as appropriate
            this.updateShape();
        }
    },
	updateShape: function () {
		if(this.getInput('data'))
			this.removeInput('data');
		
		if (this.columnType==="drone") {
			this.appendDummyInput('data').appendField(new Blockly.FieldDropdown([["X","x"], ["Z","y"], ["Z","z"], ["Сердец (у бота)","hp"]]), "data");
		}
		else if(this.columnType==="player") {
			this.appendDummyInput('data').appendField(new Blockly.FieldDropdown([["X","x"], ["Z","y"], ["Z","z"], ["Имя","name"], ["Чат","chat"]]), "data");
		}
		else if(this.columnType==="botNearBlock") {
			this.appendDummyInput('data').appendField(new Blockly.FieldDropdown([["Впереди","front"], ["Слева", "left"], ["Справа","right"], ["Позади","behind"], ["В","in"]]), "data");
		}
		else if(this.columnType==="block") {
			if(this.getInput('data'))
				this.removeInput('data');
		}
		else if(this.columnType==="entity") {
			if(this.getInput('data'))
				this.removeInput('data');
		}
		else if(this.columnType==="botMap") {
			this.appendValueInput("data");
		}
		else if(this.columnType==="botNearEntity") {
			this.appendValueInput("data");
		}
		else if(this.columnType==="inventory") {
			this.appendValueInput("data").setCheck("Number");
		}
	},
	mutationToDom: function () { //Нужно при сохранении в XML
        var container = document.createElement('mutation');
        container.setAttribute('column_type', this.columnType);
        // ALWAYS return container; this will be the input for domToMutation.
        return container;
    },
	domToMutation: function (xmlElement) {
        var columnType = xmlElement.getAttribute('column_type');
        // If, for whatever reason, you try to save an undefined value in column_type, it will actually be saved as the string 'undefined'
        // If this is not an acceptable value, filter it out
        if(columnType && columnType !== 'undefined') {
            this.columnType = columnType;
        }
        // Run updateShape to append block values as needed
        this.updateShape();
    }
};

Blockly.Blocks['minecraft_coordBlock'] = {
    init: function() {
        this.appendDummyInput().appendField("Координаты X");
        this.appendValueInput("x").setCheck("Number");
	this.appendDummyInput().appendField("Y");
	this.appendValueInput("y").setCheck("Number");
	this.appendDummyInput().appendField("Z");
	this.appendValueInput("z").setCheck("Number");
        this.setInputsInline(true);
        this.setOutput(true, "String");
        this.setColour(255);
        this.setTooltip("Блок координат");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_droneSputnik'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Создать БОТ")
	    .appendField(new Blockly.FieldDropdown([["Человек","PLAYER"], ["Зомби","ZOMBIE"], ["Житель","VILLAGER"], ["Корова","COW"], ["Ближайший моб","zaxvat"]]), "mob_type");
        this.appendDummyInput()
            .appendField("имя:");
	this.appendValueInput("mob_name");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff6161");
        this.setTooltip("Создаёт бота");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_momentmove'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Движение на шаг, напр.")
	    .appendField(new Blockly.FieldDropdown([["x+1", "x+1"], ["x-1", "x-1"], ["z+1", "z+1"], ["z-1", "z-1"]]), "dir");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff6161");
        this.setTooltip("Освобождает спутника от контроля");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_sputnikCraft'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Скрафтить предмет: ")
	    .appendField(new Blockly.FieldVariable('craft_block'), "item");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff6161");
        this.setTooltip("Крафтит предмет из инвентаря бота");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_sputnikmineblock'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Добыть блок впереди");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff6161");
        this.setTooltip("Добывает блок на месте дрона в инвентарь игрока");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_sputnikInvSlot'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Положить в руку слот в инвентаре: ");
	this.appendValueInput("slot").setCheck("Number");;
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff6161");
        this.setTooltip("Крафтит предмет из инвентаря бота");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_sputnikBuild'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Строить блок из руки бота")
	    .appendField("напр.")
	    .appendField(new Blockly.FieldDropdown([["восток", "EAST"], ["север", "NORTH"], ["юг", "SOUTH"], ["запад", "WEST"]]), "dir");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff6161");
        this.setTooltip("Строить");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_unSputnik'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Освободить бота");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff6161");
        this.setTooltip("Освобождает спутника от контроля");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_sputnikProg'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Запрограммировать автономно.");
        this.appendDummyInput()
            .appendField("Скин по имени:");
	this.appendValueInput("mob_name");
	this.setInputsInline(true);
	this.appendStatementInput("otherCode")
            .setCheck(null);        
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff9494");
        this.setTooltip("Программируемый бот (для блоков [prog]). Команды выполняются только после завершения блока. Повторение зациклено.");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_progSputnikMove'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("[prog] Двигать БОТ за дроном")
	    .appendField(new Blockly.FieldCheckbox("TRUE"), "drone")
	    .appendField("или на");
	this.appendDummyInput().appendField("x:");
        this.appendValueInput("x") .setCheck("Number");
        this.appendDummyInput().appendField("y:");
        this.appendValueInput("y") .setCheck("Number");
        this.appendDummyInput().appendField("z:");
        this.appendValueInput("z") .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff9494");
        this.setTooltip("Спутник начинает следить за дроном или пойдёт на координаты");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_progSputnikAtack'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("[prog] Атаковать моба");
	this.appendValueInput("mob_type");
	this.appendDummyInput()
            .appendField("в радиусе");
	this.appendValueInput("radius").setCheck("Number");;
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff9494");
        this.setTooltip("Если бот в указанном радиусе найдёт указанного моба, он атакует его");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_tpBot'] = {
    init: function () {
        this.appendDummyInput().appendField("Телепортировать бот на");
        this.appendDummyInput().appendField("x:");
        this.appendValueInput("tpbot_x") .setCheck("Number");
        this.appendDummyInput().appendField("y:");
        this.appendValueInput("tpbot_y") .setCheck("Number");
        this.appendDummyInput().appendField("z:");
        this.appendValueInput("tpbot_z") .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff6161");
        this.setTooltip("Телепортировать бот на координаты");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['minecraft_playerToBot'] = {
    init: function () {
	this.appendDummyInput().appendField("Телепортировать игрока к боту");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff6161");
        this.setTooltip("Телепортирует вас к боту");
        this.setHelpUrl("");
    }
};

//code generation
javascriptGenerator['js_block'] = function(block) {
    const value = block.getFieldValue('TEST_FIELD');

    let code = `let test = ${value} * ${value};`;

    return code;
};

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

