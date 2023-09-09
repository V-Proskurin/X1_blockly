<?php

if(!function_exists('db_x1team_files')){

    function is_table_does_not_exist( $wpdb, $tbl_name ) {
        $query_string = 'SHOW TABLES LIKE %s';
        $preparation  = $wpdb->prepare( $query_string, $tbl_name );
        return $wpdb->get_var( $preparation ) != $tbl_name;
    }

    function db_x1team_files(){

        global $wpdb;

        $db_x1team_tbl = $wpdb->prefix.'x1team_files';
        $charset_collate = $wpdb->get_charset_collate();
        if ( is_table_does_not_exist($wpdb, $db_x1team_tbl) ) {
            $sql = "CREATE TABLE $db_x1team_tbl (
                id int(11) NOT NULL AUTO_INCREMENT,
                user_id int(11) DEFAULT NULL,
                file_edit BOOL DEFAULT true,
                file_path VARCHAR(255) NULL,
                file_url VARCHAR(255) NULL,
                file_title VARCHAR(255) NULL,
                file_hash VARCHAR(255) NULL,
                file_fm_hash VARCHAR(255) NULL,
                file_fm_phash VARCHAR(255) NULL,
                file_date datetime default '0000-00-00 00:00:00',
                file_last_edit datetime default '0000-00-00 00:00:00',
                file_x1_type varchar(100) default '',
                file_mime_type varchar(100) default '',
                PRIMARY KEY (id)
            ) $charset_collate;";

            require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
            dbDelta( $sql );
        }


    }
    db_x1team_files();


    function get_file_by_fm_hash( $hash ) {
        global $wpdb;
        $db_x1team_tbl = $wpdb->prefix.'x1team_files';

        $sql = "SELECT * FROM $db_x1team_tbl WHERE file_fm_hash='$hash'";
        $result = $wpdb->get_row( $sql );
        return $result;
    }

}