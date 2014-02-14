<?php get_header(); ?>

<div class="content two-cols" style="padding-top: 25px;">
	<?php get_sidebar(); ?>
    <?php if(have_posts()) : while(have_posts()) : the_post()?>
	<div class="col col-2" >
		<div class="box">
			
			<?php if ( get_the_ID() == 107): ?>
			<div id="box-header">
				<img src="<?php echo get_template_directory_uri() . '/img/pageBaner/Baner_shlifovanie_polov_md_foto.png'; ?>" />
			</div>
			<?php endif; ?>
			<?php if ( get_the_ID() == 104 ):?>
			<div id="box-header">
				<img src="<?php echo get_template_directory_uri() . '/img/pageBaner/Baner_frezerovanie_betonnih_polov_udalenie_slaeov_kisinev.png'; ?>" />
			</div>
			<?php endif; ?>
                        <?php if ( get_the_ID() == 93 ):?>
			<div id="box-header">
				<img src="<?php echo get_template_directory_uri() . '/img/pageBaner/Baner_decorativniy_cameni_piatra_decorativa_chisinau.png'; ?>" />
			</div>
			<?php endif; ?>
			<div class="body">
				<div id="content">
					
					<h1><?php the_title(); ?></h1>
					<div class="page-content">
					<?php the_content(); ?>
					</div>
				</div>
			</div>
			<div class="bottom">&nbsp;</div>
		</div>
	</div>
    <?php endwhile; ?>
    <?php endif; ?>
</div>

<?php get_footer(); ?>