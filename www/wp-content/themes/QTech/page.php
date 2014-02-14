<?php get_header();?>



<div class="content two-cols" style="padding-top: 25px;">
	<?php get_sidebar(); ?>
	<?php if(have_posts()) : while(have_posts()) : the_post()?>
	<div class="col col-2" >
		<div class="box">
                    <?php $fileBaner =  get_template_directory_uri() . '/img/pageBaner/' . str_replace(' ', '_', get_the_title());?>
			<?php if ( @get_header($fileBaner . '.png') != 'HTTP/1.1 404 Not Found'): ?>
			<div id="box-header">
				<img src="<?php echo $fileBaner . '.png'; ?>" />
			</div>
			<?php endif; ?>
			<?php if (file_exists(@get_header($fileBaner . '.jpg') != 'HTTP/1.1 404 Not Found')):?>
			<div id="box-header">
				<img src="<?php echo $fileBaner . '.jpg'; ?>" />
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
	<?php endwhile;?>
	<?php endif; ?>
</div>
<?php get_footer();?>