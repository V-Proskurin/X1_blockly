<?php

namespace X1Blockly;

class X1YandexCloud{
    public function __construct()
    {
        add_action('wp_ajax_x1_blockly_get_cloud_file', [$this, 'getCloudFile']);
        add_action('wp_ajax_nopriv_x1_blockly_get_cloud_file', [$this, 'getCloudFile']);

        add_action('wp_ajax_x1_blockly_upload_cloud_file', [$this, 'uploadCloudFile']);
        add_action('wp_ajax_nopriv_x1_blockly_upload_cloud_file', [$this, 'uploadCloudFile']);

        add_action('x1-blockly-before-shortcode', [$this, 'onShortcodeView']);
    }

    public function getCloudFile()
    {
        $path = $_POST['path'];
        self::outputFile($path);
    }

    public function uploadCloudFile()
    {
        self::uploadFile();
    }

    public function onShortcodeView(){
        add_action('x1yc_file_open_actions', [$this, 'addButtons']);

        wp_enqueue_style('x1-jquery-modal', 'https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css', [], \X1Blockly::$version);
        wp_enqueue_script('x1-jquery-modal', 'https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js', [], \X1Blockly::$version, true);
    }

    public function addButtons(){
        echo '
        <div class="x1-blockly-upload">
            <input type="text" class="x1-blockly-upload__input" placeholder="Название файла">
            <input type="button" class="x1-blockly-upload__button add-btn" value="Сохранить">
        </div>
        <button class="add-btn" data-action="x1-blockly-open" type="button">Открыть</button>
        <button class="add-btn" data-action="x1-blockly-add" type="button">Добавить</button>
        <button class="add-btn" data-action="x1-blockly-cancel" type="button" >Отмена</button>
        ';
    }

    public static function viewExplorer()
    {
        echo do_shortcode('[x1yc_yandex_cloud_filemanager]');
    }

    public static function uploadFile()
    {
        if (self::pluginIsActive()) {
            $filesManage = new \X1YC_YANDEX_PUBLIC\CORE\FILES_MANAGE();
            $filesManage->upload_file();
        }
    }

    public static function pluginIsActive(){
        return class_exists('\X1YC_YANDEX_PUBLIC\CORE\FILES_MANAGE');
    }

    public static function outputFile($filename) {
        if (self::pluginIsActive()) {
            $filesManage = new \X1YC_YANDEX_PUBLIC\CORE\FILES_MANAGE();
            $filesManage->download_file($filename);
        }
    }
}