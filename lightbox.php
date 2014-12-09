<?php

defined('ABSPATH') or die("No script kiddies please!");

/**
 * Plugin Name: Accessible Lightbox
 * Description: An accessible lightbox for native WordPress Galleries
 * Version: 0.1
 * Author URI: http://www.cmswebsolutions.com
 * Author: CMS Web Solutions
 */

	wp_register_script( 'lightbox', 'lightbox.js', array( 'jquery' ), true );
	wp_enqueue_script( 'lightbox' );
//	add_action( 'wp_enqueue_scripts', 'add_my_script' );


?>