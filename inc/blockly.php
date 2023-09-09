<?php

add_action( 'wp_ajax_getBloklyFileContent', 'getBloklyFile' );
add_action( 'wp_ajax_nopriv_getBloklyFileContent', 'getBloklyFile' );
function getBloklyFileContent() {
    $fileUrl = isset($_POST['fileUrl']) && $_POST['fileUrl'] ? $_POST['fileUrl'] : '';
    $fileContent = file_get_contents($fileUrl);
    echo $fileContent;
    wp_die();
}
function getBloklyFile() {
    $fmHash = isset($_POST['fmHash']) && $_POST['fmHash'] ? $_POST['fmHash'] : '';
    $file = get_file_by_fm_hash($fmHash);

    $fileContent = file_get_contents($file->file_url);
    $file->content = $fileContent;

    echo json_encode( $file );
    wp_die();
}


add_action( 'wp_ajax_insertFileToDB', 'db_x1team_insert_file' );
add_action( 'wp_ajax_nopriv_insertFileToDB', 'db_x1team_insert_file' );
function db_x1team_insert_file( $data = false) {
    global $wpdb;
    $current_user_id = get_current_user_id();

    if ( ! $data ) {
        $files = isset( $_POST['files'] ) ? $_POST['files'] : "";
    } else {
        $files = $data;
    }



    if ( !$files || ! count( $files ) || ! $current_user_id ) {
        wp_die();
    }
    global $wp_query;
    $post = $wp_query->get_queried_object();
    $pagename = $post->post_name;


    foreach ( $files as $key => $file) {

        $text_encode = base64_encode( $file["url"] );
        $data = [
            "user_id" => $current_user_id, // user
            "file_edit" => true, // разрешение на открытое  редактирование
            "file_path" => "", // path
            "file_url" => isset( $file["url"] ) ? $file["url"] : '', // url
            "file_title" => isset( $file["name"] ) ? $file["name"] : '', // file name
            "file_hash" =>  $text_encode ? $text_encode : '', // wp hash base64_encode from `file_url`
            "file_fm_hash" => isset( $file["hash"] ) ? $file["hash"] : '', // elfinder hash
            "file_fm_phash" => isset( $file["phash"] ) ? $file["phash"] : '', // elfinder hash folder
            "file_date" => date("Y-m-d H:i:s"), // date
            "file_last_edit" => date("Y-m-d H:i:s"), // date
            "file_x1_type" => isset( $_POST['fileType'] ) ? $_POST['fileType'] : '', // date
            "file_mime_type" => isset( $file["mime"] ) ? $file["mime"] : '', // mime, type
        ];
        $wpdb->insert( 'wp_x1team_files', $data );
        echo $data;
    }
    wp_die();
}

add_action( 'wp_ajax_deleteFileToDB', 'db_x1team_delete_file' );
add_action( 'wp_ajax_nopriv_deleteFileToDB', 'db_x1team_delete_file' );
function db_x1team_delete_file( $data = false) {
    global $wpdb;
    $current_user_id = get_current_user_id();

    if ( ! $data ) {
        $files = isset( $_POST['files'] ) ? $_POST['files'] : "";
    } else {
        $files = $data;
    }


    if ( !$files || ! count( $files ) || ! $current_user_id ) {
        wp_die();
    }
    foreach ( $files as $key => $file) {
        $wpdb->delete( 'wp_x1team_files', [ 'file_fm_hash' => $file ] );
    }

}

add_action( 'wp_ajax_saveBloklyFileContent', 'saveBloklyFileContent' );
add_action( 'wp_ajax_nopriv_saveBloklyFileContent', 'saveBloklyFileContent' );

function saveBloklyFileContent() {
    $current_user = (is_user_logged_in()) ? wp_get_current_user() : exit;


    $fileContent = isset($_POST['jsonContent']) && $_POST['jsonContent'] ? $_POST['jsonContent'] : exit;
    $fileNameUser = isset($_POST['fileName']) && $_POST['fileName'] ? trim($_POST['fileName']) : exit;

    $nick = get_user_meta($current_user->ID, 'nickname', true);

    $BASE_URL = $_SERVER["DOCUMENT_ROOT"];
    $fm_path = "$BASE_URL/wp-content/uploads/x1files/users/$nick";
    $fm_url = $_SERVER['REQUEST_SCHEME'] . '://' .$_SERVER['SERVER_NAME'] . "/wp-content/uploads/x1files/users/$nick";


    if( ! file_exists($fm_path) ) {
        wp_mkdir_p($fm_path);
    }
    $fileName = $fileNameUser . '.json';
    $fullPathName = $fm_path . '/'. $fileName;
    $fullUrlName = $fm_url . '/'. $fileName;

    $volumeId = 'l1_';
    $hash = $volumeId . rtrim(strtr(base64_encode($fullUrlName), '+/=', '-_.'), '.');

    // S:\Rec\OpenServer\OpenServer\domains\x1\wp-content\uploads\wp-file-manager-pro\users\me\blockly.json

    if ( !file_exists($fullPathName) ) {
        $bloklyFile =  file_put_contents( $fullPathName, stripcslashes($fileContent) );
        echo $fullUrlName;
        wp_die();
    } else {

        $bloklyFile =  file_put_contents( $fullPathName, stripcslashes($fileContent) );
        echo 'notupdate';

        wp_die();
        // $unicName = wp_unique_filename($fm_path, $fileName);
        // if ( $unicName ) {
        //     $fullPathName = $fm_path . '/'. $unicName;
        //     $bloklyFile =  file_put_contents( $fullPathName, stripcslashes($fileContent) );
        //     echo $fm_url . '/'. $unicName;
        // }

    }


    wp_die();
}


class X1Blockly
{
    const PLUGIN_SLUG = 'x1-blockly';
    const AUTOLOADER_PREFIX = 'X1Blockly';

    protected static $instance;

    public static $version = '';

    public static function getInstance()
    {
        if (empty(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    protected function __construct()
    {
        if (!function_exists('get_plugin_data')) {
            require_once(ABSPATH . 'wp-admin/includes/plugin.php');
        }

        $protocol = (!empty($_SERVER['HTTPS']) && 'off' !== strtolower($_SERVER['HTTPS']) ? 'https://' : 'http://');

        $BASE_URL = $protocol . $_SERVER["SERVER_NAME"];

        if (!function_exists('is_user_logged_in')) {
            require_once(ABSPATH . WPINC . '/pluggable.php');
        }
        $current_user = (is_user_logged_in()) ? wp_get_current_user() : false;

        if (false !== strpos($_SERVER['REQUEST_URI'], '/blockly')) {
            if (!$current_user) {
                wp_safe_redirect(home_url('account') . '?redirect_to=open-blockly');
                exit;
            }
        }
        if (false !== strpos($_SERVER['REQUEST_URI'], '/open-blockly')) {
            if ($current_user) {
                $nick = get_user_meta($current_user->ID, 'nickname', true);
                $response = wp_remote_get($BASE_URL . '/serv_auth/auth.php?user=' . $nick);

                if (is_array($response) && $response['response']['code'] == '200') {

                    $url = home_url('blockly/');

                    wp_safe_redirect($url);
                    exit;

                } else {
                    wp_safe_redirect(home_url());
                    exit;
                }
            } else {
                wp_safe_redirect(home_url('account') . '?redirect_to=open-blockly');
                exit;
            }
        }

        if (!function_exists('get_plugin_data')) {
            require_once(ABSPATH . 'wp-admin/includes/plugin.php');
        }

        $this->baseUrl = plugins_url('', __DIR__);
        $this->basePath = dirname(__DIR__);
        $this->pluginData = get_plugin_data($this->basePath . '/index.php');
        $this->version = $this->pluginData['Version'];
        self::$version = $this->pluginData['Version'];

        spl_autoload_register([$this, 'autoloader']);

        add_shortcode('x1-blockly', [$this, 'shortcode']);

        new \X1Blockly\X1YandexCloud();
    }

    public function autoloader($className)
    {
        $parts = explode('\\', $className);

        $prefix = array_shift($parts);

        if ($prefix !== self::AUTOLOADER_PREFIX) {
            return;
        }

        if (empty($parts)) {
            return;
        }

        $className = array_pop($parts);

        $path = mb_strtolower(implode('/', $parts));

        $classPath = $this->basePath . '/' . 'inc';

        if ($path) {
            $classPath .= '/' . $path;
        }

        $classPath .= '/' . $className . '.php';

        if (is_file($classPath)) {
            include_once $classPath;
        }
    }

    /***
     * @param $name
     * @return string
     */
    public function getViewPath($name)
    {
        $templatePath = locate_template(self::PLUGIN_SLUG . '/' . $name);

        if (!$templatePath) {
            $templatePath = $this->basePath . '/views/' . $name;
        }

        return $templatePath;
    }

    /***
     * @param $name
     * @param array $vars
     */
    public function view($name, $vars = [])
    {
        $path = $this->getViewPath($name);

        extract($vars);

        include_once $path;
    }

    /***
     * @param $atts
     * @param $content
     * @param $tag
     * @return string
     */
    public function shortcode($atts, $content, $tag)
    {
        do_action('x1-blockly-before-shortcode');

        wp_enqueue_style('x1-blockly', $this->baseUrl . '/app/blockly.css', [], $this->version);
        wp_enqueue_script('x1-blockly', $this->baseUrl . '/app/blockly.min.js', ['jquery', 'x1-jquery-modal'], $this->version, true);

        $user = wp_get_current_user();

        $x1data = array(
            'user' => [
                'nickname' => $user->nickname
            ],
        );


        wp_localize_script('x1-blockly', 'x1data', $x1data);

        ob_start();

        $this->view('x1-blockly-shortcode.php');

        return ob_get_clean();
    }


}


X1Blockly::getInstance();

