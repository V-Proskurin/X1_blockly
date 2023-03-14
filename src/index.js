import {toolboxCategories} from '@blockly/dev-tools';

global.acorn = require('./inc/acorn/acorn');
import './inc/acorn/interpreter';

import './blocks/import';

jQuery(function($){
    x1blockly.init('.x1-blockly__editor');

    $('.x1-load-workspace').on('change', function(){
        x1blockly.loadWorkspace(this);
    });

    $('.x1-save-workspace').on('click', function(){
        x1blockly.saveWorkspace();
    });
});