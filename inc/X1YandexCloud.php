<?php

namespace X1Blockly;

class X1YandexCloud{
    public function __construct()
    {

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