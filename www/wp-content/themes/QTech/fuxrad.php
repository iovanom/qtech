<?php
/*
Template Name: Fuxrad
*/
?>
<?php get_header(); ?>



<div class="content two-cols" style="padding-top: 25px;">
	<?php get_sidebar(); ?>
	<div class="col col-2" >
		<div class="box">
			<div id="box-header">
				<img src="<?php echo get_template_directory_uri(); ?>/img/pageBaner/Baner_fuxrad_v_moldove_foto.png" />
				<div class="text-box-header">
					<p><b>fuxrad</b> является одной из ведущих компаний мира по производству полимерных наливных покрытий.</p>
					<p><b>fuxrad</b> – полимерные наливные покрытия – это универсальное решение для тех, кто получает КАЧЕСТВО, заботясь об экономии времени и денежных средств!</p>
				</div>
				
			</div>
			<div class="body">
				<div id="content">
					<?php if(have_posts()) : while(have_posts()) : the_post()?>
					<h1><?php the_title(); ?></h1>
					<div class="page-content">
					<?php the_content(); ?>
					</div>
					<?php endwhile;?>
					<?php endif; ?>
				</div>
			</div>
			<div class="bottom">&nbsp;</div>
		</div>
	</div>
</div>
<?php get_footer();?>
