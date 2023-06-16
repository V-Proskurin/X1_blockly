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

    $(document).on('x1yf-folder-selected', function(){
        $('.x1yc-folder__file').each(function(){
            const $operations = $(this).find('.x1yc-folder__operations');
            const $operation = $('.file_operations.delete', $operations);
            const dataFullpath = $operation.data('fullpath');
            const dataFilename = $operation.data('filename');
            let blocklyOperations = '';

            ['Add', 'Open'].forEach(function(type){
                blocklyOperations += `<div class="file_operations ${type.toLowerCase()} x1-blockly-fm-${type.toLowerCase()}" data-type="file-${type}" data-filename="${dataFilename}" data-fullpath="${dataFullpath}">${type}</div>`;
            })

            $operations.prepend(blocklyOperations);
        })
    });

    $(document).on('click', '.x1-blockly-upload__button', function(){
        const $button = $(this);
        const $parent = $button.closest('.x1-blockly-upload');
        const $input = $parent.find('.x1-blockly-upload__input');

        const filename = $input.val();

        if (!filename) {
            return;
        }

        const path = $('input[name="x1folder"]').val();

        const json = x1blockly.exportWorkspace();
        const jsonBytes = new TextEncoder().encode(json);
        const jsonBlob = new Blob([jsonBytes], {
            type: "application/json;charset=utf-8"
        });

        const formData = new FormData();

        formData.append('folder_path', path);
        formData.append('x1file', jsonBlob, filename);
        formData.append('filename', filename);
        formData.append('action', 'x1_blockly_upload_cloud_file');

        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: formData,
            contentType: false,
            processData: false,
            method: 'post',
            success: function(response){
                window.location.reload();
            }
        });
    });

    $(document).on('click', '.x1-blockly-fm-add', function(e) {
        const $this = $(this);
        const path = $this.data('fullpath');

        loadCloudFileToWorkspace(path);

        e.stopImmediatePropagation();
        e.preventDefault();

        return false;
    });

    $(document).on('click', '.x1-blockly-fm-open', function(e) {
        const $this = $(this);
        const path = $this.data('fullpath');

        loadCloudFileToWorkspace(path, true).then((result) => {
            if (result) {
                updateFilename(this);
            }
        });

        e.stopImmediatePropagation();
        e.preventDefault();

        return false;
    });

    $(document).on('click', '.x1yc-folder__file__file, .x1yc-folder__file__img', function(e) {
        updateFilename(this);
    });

    function getFilename($elem){
        const $label = $($elem).closest('label');
        const $filename = $label.find('.x1yc-folder__file__file');
        return $filename.text();
    }

    function updateFilename($elem){
        const filename = getFilename($elem);

        setFilename(filename);
    }

    function setFilename(filename){
        $('.x1-blockly-upload__input').val(filename);
    }

    function loadCloudFileToWorkspace(path, clear = false){
        return $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: {
                action: 'x1_blockly_get_cloud_file',
                path: path
            },
            method: 'post',
        }).then(function(response){
            if (clear) {
                x1blockly.clearWorkspace();
            }

            return x1blockly.importWorkspace(response);
        });
    }
});