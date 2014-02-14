<?php get_header(); ?>

<div class="content two-cols" style="padding-top: 25px;">
	<?php get_sidebar(); ?>
	<div class="col col-2" >
		<div class="box">
                        <div id="box-header">
				<img src="<?php echo get_template_directory_uri(); ?>/img/pageBaner/Декоравтивные_полы.png" />
                                <div class="text-box-header">
                                    <h1><?php single_cat_title(); ?></h1>
                                </div>
                                
			</div>
                    
			<div class="body">
                            <div id="content">
                                        <?php if(have_posts()) : while(have_posts()) : the_post()?>
                                <div class="cat-1col">
                                    
                                    <a href="<?php the_permalink();?>"><h2><?php the_title(); ?></h2></a>
                                    <?php if ( has_post_thumbnail() ) {
                                                the_post_thumbnail();
                                            }
                                    ?>
                                    <p><?php the_excerpt(); ?></p>
                                    <a href="<?php the_permalink(); ?>" class="more-link">Подробнее</a>
                                    
                                </div>
                                        <?php endwhile;?>
                                        <?php endif; ?>
                            </div>
			</div>
			<div class="bottom">&nbsp;</div>
		</div>
	</div>
</div>

<?php get_footer(); ?>

