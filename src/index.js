import x1blockly from './inc/X1Blockly';

import './blocks/import';

// x1YaCloudStorage.fileActions += '<a href="https://t.me/share/url?url=https://x1team.ru/blockly/&text=Блокли тестовая ссылка" class="file-action actions-share-tg" target="_blank">tg</a>';


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

    $('.x1-open-fm').on('click', function(){
        $('.x1-blockly-fm__modal')
            .addClass('x1-blockly-open-modal')
            // .modal();
            fm_sh_code.trigger('resize');
    });

    $('.x1-blockly-fm__modal').on('click', function(e) {
        // console.log( '------------' );
        // console.log( this, e.target );
        // console.log( $(this), e.target.closest('.x1-blockly__filemanager') );
        // console.log( '------------' );

        if ( ! e.target.closest('.x1-blockly__filemanager') ) {
            console.log('qqqqq');
            $('.x1-blockly-fm__modal')
            .removeClass('x1-blockly-open-modal')
        }
    })
    $('.x1-blockly-fm__modal--close').on('click', function(e) {
        $('.x1-blockly-fm__modal')
            .removeClass('x1-blockly-open-modal')
    })


    $('.x1-load-file').on('click', function () {
        // var input = document.createElement("input");
        //     input.setAttribute('type', 'file');
        //     input.classList.add('x1-load-file__input')

            jQuery('<input>', {
                class: 'x1-load-file__input',
                type: 'file'
            }).trigger('click').on('change', function() {
                console.log( $(this) );
                 x1blockly.clearWorkspace()
                x1blockly.clearWorkspaceTrashcan()
                x1blockly.loadWorkspace( $(this)[0] )
            })

            // $(input).trigger('click')


            // console.log( input );




    })

    $('.x1-save-workspace').on('click', function(){
        x1blockly.saveWorkspace();

        // $('.x1-blockly__filemanager')
        //     .removeClass('x1-blockly-open-modal')
        //     .addClass('x1-blockly-save-modal')
        //     .modal();

    });

    $('[data-action="x1-blockly-cancel"]').on('click', function(){
        $.modal.close();
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

    // ----------------------me

    function getFile (filePath) {
        console.log( filePath );
        var request = new XMLHttpRequest();
        request.open('GET', filePath);
        request.onloadend = function(obj) {
            console.log( request.response );
            x1blockly.importWorkspace( request.response )
        }
        request.send();
    }





    $(document).on('click', '#saveToFM', function(){

        let input = $('#inputBlocklyFile');
        let fileName = input.val();

        let jsonContent = x1blockly.exportWorkspace();
        console.log( "jsonContent", jsonContent );
        var volumeId = 'l1_';
        if ( !jsonContent || jsonContent == "null" ) {
            console.log( "Рабочая область пуста " );
            alert( "Рабочая область пуста ")
            return;
        } else {
            console.log( "Рабочая область пуста ALEEEE" );

            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                method: 'POST',
                data: {
                    'action': 'saveBloklyFileContent',
                    'jsonContent': jsonContent,
                    'fileName': fileName.trim()

                },
            }).done( data => {
                console.log( data );

                fm_sh_code.sync().done( fm_sh_code.trigger('reload') )
                $("#inputBlocklyFile").val("")

                if ( data != 'notupdate' ) {
                    fm_sh_code.upload( {files : [ data ], type : 'text'} )
                }



            })
        }



    })
    "<div>{<span>files</span><span> :</span> [ <span>src</span> ], <span>type</span><span> :</span> <span>type</span>}</div>"

    $(document).on('click', '[data-action="x1-blockly-load__workspace"]', function(event) {
        let selectedFile = selectedFilesArr_x1
        if ( ! selectedFile ) return;
        let selectedFile_URL = selectedFile[0].url
        x1blockly.clearWorkspace()
        x1blockly.clearWorkspaceTrashcan()
        getFile( selectedFile_URL );
        $.modal.close();
    } )
    $(document).on('click', '[data-action="x1-blockly-add"]', function(e) {
        let selectedFile = selectedFilesArr_x1

        if ( ! selectedFile ) return;
        let selectedFile_URL = selectedFile[0].url
        getFile( selectedFile_URL );
        $.modal.close();
    } )
    $(document).on('click', '[data-action="x1-blockly-cancel"]', function(e) {

    } )
    // $(document).on('input', '#inputBlocklyFile', function(e) {
    //     if ( $(this).val().length >= 5 && x1blockly.getWorkspace().blockDB.size  ) {
    //         console.log( 'true' );
    //         $('#saveToFM').prop("disabled", false);
    //     } else {
    //         console.log( 'false' );
    //         $('#saveToFM').prop('disabled', true)

    //     }
    // } )

    $(document).ready( function () {
        var uploadFiles = [];
        fm_sh_code.bind('dblclick', function(e) {
            console.log( "bind ----------dblclick");
        })
        fm_sh_code.bind('get', function(e) {
            console.log( "bind ----------get");
        })
        fm_sh_code.bind('add', function(e) {
            console.log( "bind ----------add");
            console.log( e.data );
        })
        fm_sh_code.bind('sync', function() {
        })
        fm_sh_code.bind('upload', function(e) {
            console.log( "bind ----------upload");

            let _typePage = $(".x1-blockly__filemanager")
            let typePage = _typePage.data("type_fm");
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                method: 'POST',
                data: {
                    'action': 'insertFileToDB',
                    'files': e.data.added,
                    'fileType': typePage
                },
            }).done( data => {
                console.log( 'upload', data );
                // fm_sh_code.sync().done( fm_sh_code.trigger('reload') )
            }).fail(function(xhr, status, error) {
                console.log( xhr );
                console.log( status );
                console.log( error );
            });





        });
        fm_sh_code.bind('remove', function(e) {
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                method: 'POST',
                data: {
                    'action': 'deleteFileToDB',
                    'files': e.data.removed
                },
            }).done( data => {
                console.log( 'remove', data );
                // fm_sh_code.sync().done( fm_sh_code.trigger('reload') )
            }).fail(function(xhr, status, error) {
                console.log( xhr );
                console.log( status );
                console.log( error );
            });
        })
        fm_sh_code.bind('load', function(e) {
            console.log( "bind ----------load");
        })
        fm_sh_code.bind('dialogopened', function(e) {
            var dialog = e.data.dialog;

            dialog.find( "#dialog-openToBlokly").on('click', function () {
                console.log( this );
                let selectedFile = selectedFilesArr_x1
                if ( ! selectedFile ) return;
                let selectedFile_URL = selectedFile[0].url
                x1blockly.clearWorkspace()
                x1blockly.clearWorkspaceTrashcan()
                getFile( selectedFile_URL );
                console.log( "selectedFile[0]", selectedFile[0] );
                console.log( selectedFile[0].name.replace(/\.[^.]+$/, "") );

                $("#inputBlocklyFile").val(selectedFile[0].name.replace(/\.[^.]+$/, ""))
                $(".ui-dialog").remove();

                $.modal.close();
            })
            dialog.find( "#dialog-addToBlokly").on('click', function () {
                console.log( this );
                let selectedFile = selectedFilesArr_x1

                if ( ! selectedFile ) return;
                let selectedFile_URL = selectedFile[0].url
                getFile( selectedFile_URL );

                console.log( selectedFile[0].name.replace(/\.[^.]+$/, "") );

                console.log( "selectedFile[0]", selectedFile[0] );
                $("#inputBlocklyFile").val(selectedFile[0].name.replace(/\.[^.]+$/, ""))
                $(".ui-dialog").remove();

                $.modal.close();
            })






            // if (dialog.hasClass('elfinder-dialog-edit')) {
            //   dialog.find('.elfinder-titlebar-button.elfinder-titlebar-full').trigger('mousedown');
            // }
          });
        $("#ui-openToBlokly").on('click', e=> console.log(e.target))



    })





    // ----------------------me




    $(document).on('click', '.x1-blockly-upload__button', function(){
        const $button = $(this);
        const $parent = $button.closest('.x1-blockly-upload');
        const $input = $parent.find('.x1-blockly-upload__input');

        let filename = $input.val();

        if (!filename) {
            return;
        }

        if (!/\.json$/.test(filename)) {
            filename += '.json';
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
                // x1YaCloudStorage.refreshFilesBrowser();
                $.modal.close();
            }
        });
    });

    // $(document).on('click', '[data-action="x1-blockly-add"]', function(e) {
    //     const selectedFiles = getSelectedFiles();

    //     if (!selectedFiles.length) {
    //         return;
    //     }

    //     selectedFiles.forEach(function(file){
    //         loadCloudFileToWorkspace(file.fullpath);
    //     });

    //     $.modal.close();

    //     return false;
    // });

    // $(document).on('click', '[data-action="x1-blockly-open"]', function(e) {
    //     const selectedFiles = getSelectedFiles();
    //     const selectedFile = selectedFiles.shift();

    //     if (typeof selectedFile === 'undefined') {
    //         return;
    //     }

    //     loadCloudFileToWorkspace(selectedFile.fullpath, true).then((result) => {
    //         if (result) {
    //             setFilename(selectedFile.name);
    //         }
    //         $.modal.close();
    //     });

    //     return false;
    // });

    $(document).on('click', '.x1yc-folder__file__file, .x1yc-folder__file__img', function(e) {
        updateFilename(this);
    });

    function getFilename($elem){
        const $label = $($elem).closest('label');
        const $filename = $label.find('.x1yc-folder__file__file');
        return $filename.text();
    }

    function setFilename(filename){
        $('.x1-blockly-upload__input').val(filename);
    }

    function getSelectedFiles(){
        const files = [];

        $('.x1-blockly__filemanager .file-item.selected').each(function(){
            const $file = $(this);
            const path = $file.data('filepath');
            const name = $file.data('filename');
            const fullpath = path + name;

            files.push({
                path: path,
                name: name,
                fullpath: fullpath
            });
        });

        return files;
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

            if (typeof response !== 'string') {
                response = JSON.stringify(response);
            }

            return x1blockly.importWorkspace(response);
        });
    }
});