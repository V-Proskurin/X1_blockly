<?php

class X1Blockly
{
    const PLUGIN_SLUG = 'x1-blockly';
    const AUTOLOADER_PREFIX = 'x1-blockly';

    protected static $instance;

    public static function getInstance()
    {
        if (empty(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    protected function __construct()
    {
        $protocol = (!empty($_SERVER['HTTPS']) && 'off' !== strtolower($_SERVER['HTTPS']) ? 'https://' : 'http://');

        $BASE_URL =  $protocol. $_SERVER["SERVER_NAME"];

        if ( ! function_exists('is_user_logged_in') ) {
            require_once( ABSPATH . WPINC . '/pluggable.php');
        }
        $current_user = (is_user_logged_in()) ? wp_get_current_user() : false;

        if ( false !== strpos( $_SERVER['REQUEST_URI'], '/blockly-minecraft' ) ) {
            if ( $current_user ) {

                wp_safe_redirect( home_url('auth') . '?redirect_to=open-blockly' );
                exit;
            }
        }
        if ( false !== strpos( $_SERVER['REQUEST_URI'], '/open-blockly' ) ) {
            if ( $current_user ) {

                $nick = get_user_meta($current_user->ID, 'nickname', true );
                $response = wp_remote_get( $BASE_URL . '/serv_auth/auth.php?user='.$nick);

                if ( is_array($response) && $response['response']['code'] == '200' ) {

                    $url = home_url('blockly-minecraft/');

                    wp_safe_redirect( $url );
                    exit;

                } else {
                    wp_safe_redirect( home_url() );
                    exit;

                }
            } else {
                wp_safe_redirect( home_url('auth') . '?redirect_to=open-blockly' );
                exit;
            }
        }

        if (!function_exists('get_plugin_data')) {
            require_once(ABSPATH . 'wp-admin/includes/plugin.php');
        }

        $protocol = (!empty($_SERVER['HTTPS']) && 'off' !== strtolower($_SERVER['HTTPS']) ? 'https://' : 'http://');

        $BASE_URL =  $protocol. $_SERVER["SERVER_NAME"];

        if ( ! function_exists('is_user_logged_in') ) {
            require_once( ABSPATH . WPINC . '/pluggable.php');
        }
        $current_user = (is_user_logged_in()) ? wp_get_current_user() : false;

        if ( false !== strpos( $_SERVER['REQUEST_URI'], '/blockly-minecraft' ) ) {
            if ( $current_user ) {

                wp_safe_redirect( home_url('account') . '?redirect_to=open-blockly' );
                exit;
            }
        }
        if ( false !== strpos( $_SERVER['REQUEST_URI'], '/open-blockly' ) ) {
            if ( $current_user ) {

                $nick = get_user_meta($current_user->ID, 'nickname', true );
                $response = wp_remote_get( $BASE_URL . '/serv_auth/auth.php?user='.$nick);

                if ( is_array($response) && $response['response']['code'] == '200' ) {

                    $url = home_url('blockly-minecraft/');

                    wp_safe_redirect( $url );
                    exit;

                } else {
                    wp_safe_redirect( home_url() );
                    exit;

                }
            } else {
                wp_safe_redirect( home_url('account') . '?redirect_to=open-blockly' );
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

        spl_autoload_register([$this, 'autoloader']);

        add_shortcode('x1-blockly', [$this, 'shortcode']);
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
        wp_enqueue_style('x1-blockly', $this->baseUrl . '/app/blockly.css', [], $this->version);
        wp_enqueue_script('x1-blockly', $this->baseUrl . '/app/blockly.min.js', [], $this->version, true);

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