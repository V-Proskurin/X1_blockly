import x1blockly from './inc/X1Blockly';

global.acorn = require('./inc/acorn/acorn');
import './inc/acorn/interpreter';

import './blocks/import';

jQuery(function($){
    x1blockly.init('.x1-blockly__editor').then((r) => {
        //close playground
        $('.x1-blockly__editor div:contains(Collapse)').click();
    });

    $('.x1-load-workspace').on('change', function(){
        x1blockly.loadWorkspace(this);
    });

    $('.x1-save-workspace').on('click', function(){
        x1blockly.saveWorkspace();
    });
});