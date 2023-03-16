import x1blockly from './inc/X1Blockly';

import './blocks/import';

jQuery(function($){
    x1blockly.init('.x1-blockly__editor').then((r) => {
        //close playground
        $('.x1-blockly__editor div:contains(Collapse)').click();
    });

    $('.x1-run').on('click', function(){
        x1blockly.run();
    });

    $('.x1-forward').on('click', function(){
        const $btn = $(this);
        const hasMoreCode = x1blockly.forward();

        if (!hasMoreCode) {
            $btn.addClass('disabled');
        }
    });

    $('.x1-backward').on('click', function(){
        x1blockly.backward();
    });

    $('.x1-load-workspace').on('change', function(){
        x1blockly.loadWorkspace(this);
    });

    $('.x1-save-workspace').on('click', function(){
        x1blockly.saveWorkspace();
    });
});