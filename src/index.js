import {toolboxCategories} from '@blockly/dev-tools';

global.acorn = require('./inc/acorn/acorn');
import './inc/acorn/interpreter';

import x1blockly from './inc/X1Blockly';
import {ModalPlugin} from './addons/ModalPlugin';
import {BackpackPlugin} from './addons/BackpackPlugin';
import {TypedVariablePlugin} from './addons/TypedVariablePlugin';
import {MainPlugin} from './addons/MainPlugin';

x1blockly.setSettings({
    toolbox: toolboxCategories
});

import './blocks/js-block.js';
import './blocks/json-block.js';

x1blockly.use(ModalPlugin);
x1blockly.use(BackpackPlugin);
x1blockly.use(TypedVariablePlugin);
x1blockly.use(MainPlugin);


jQuery(function($){
    x1blockly.init('.x1-blockly__editor');

    $('.x1-load-workspace').on('change', function(){
        x1blockly.loadWorkspace(this);
    });

    $('.x1-save-workspace').on('click', function(){
        x1blockly.saveWorkspace();
    });
});