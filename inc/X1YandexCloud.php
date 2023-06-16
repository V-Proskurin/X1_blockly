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
    }

    public function addButtons(){
        echo '
        <button class="add-btn" data-action="x1-blockly-open" type="button">Открыть</button>
        <button class="add-btn" data-action="x1-blockly-add" type="button">Добавить</button>
        ';
    }

    public static function viewExplorer()
    {
        echo \do_shortcode('[x1yc_yandex_cloud_filemanager]');
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