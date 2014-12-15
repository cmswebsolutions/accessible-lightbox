<?php

defined('ABSPATH') or die("No script kiddies please!");

/**
 * Plugin Name: Accessible Lightbox
 * Description: An accessible lightbox for native WordPress Galleries
 * Version: 0.1
 * Author URI: http://www.cmswebsolutions.com
 * Author: CMS Web Solutions
 * Plugin URI: https://github.com/cmswebsolutions/accessible-lightbox
 */



	// Get Assets
	function plugin_assets() {
		wp_register_script( 'lightbox', plugins_url( 'js/lightbox.js' , __FILE__ ), array( 'jquery' ) );
		wp_enqueue_script( 'lightbox' );

		wp_register_style( 'lightbox', plugins_url( 'css/style.css' , __FILE__ ), '', '', 'screen' );
		wp_enqueue_style( 'lightbox' );
	}
	add_action( 'wp_enqueue_scripts', 'plugin_assets' );


	// Generate Markup
	function getMarkup(){
		echo '<div id="lightbox" tabindex="0">'
		.	 	'<div class="image">'
		.	 		'<div id="img-box">'
		.	 			'<img id="photo" src="" alt=""/>'
		.	 			'<div class="caption" aria-live="polite" aria-relevant="additions" ></div>'
		.	 		'</div>'
		.	 		'<button id="prev"><span class="hidden">Previous</span><img src="' . plugins_url( 'img/prev.svg' , __FILE__ ) . '" alt="" /></button>'
		.	 		'<button id="next"><span class="hidden">Next</span><img src="' . plugins_url( 'img/next.svg' , __FILE__ ) . '" alt="" /></button>'
		.	 		'<button id="close">Close<span class="hidden"> image slideshow</span></button>'
		.	 		'<span class="loading">Loading...</span>'
		.	 		'<span class="height"></span>'
		.	 	'</div>'
		.	 '</div>';

	}
	add_action('wp_footer','getMarkup', 0);



?>