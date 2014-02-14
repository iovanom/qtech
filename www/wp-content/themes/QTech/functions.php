<?php
add_theme_support( 'post-thumbnails' );
$template_directory = get_template_directory();
function register_my_menus() {
  register_nav_menus(
    array(
      'header-menu' => __( 'Header Menu' ),
      'extra-menu' => __( 'Extra Menu' )
    )
  );
}
add_action( 'init', 'register_my_menus' );

function GetMaterialTable()
{
	global $template_directory;
	include($template_directory . '/fuxradMaterial/table.php');
}

add_shortcode('getFuxrad', 'GetMaterialTable');

function getCategoryMenu( $catId )
{
    $sistem_posts = new WP_Query();
    $sistem_posts->query('cat=' . $catId);
    if($sistem_posts->have_posts())
    {
        while($sistem_posts->have_posts())
        {
            $sistem_posts->the_post();
            $link = get_permalink();
            $title = get_the_title();
            echo "<li><a href='$link'>$title</a></li>";
        }
    }
}


