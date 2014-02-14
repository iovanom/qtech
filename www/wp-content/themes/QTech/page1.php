<?php get_header();?>



<div class="content two-cols" style="padding-top: 25px;">
	<div class="col col-1">
		<div class="navigation-sub">
            <ul class="level-1">
               <li><a href="http://www.arturoflooring.de/einsatzbereiche/industrie/" title="Industrie"><span>Industrie</span></a></li>
               <li><a href="http://www.arturoflooring.de/einsatzbereiche/lebensmittelindustrie/" title="Lebensmittelindustrie"><span>Lebensmittelindustrie</span></a></li>
               <li><a href="http://www.arturoflooring.de/einsatzbereiche/health-care/" title="Health &amp; Care"><span>Health &amp; Care</span></a></li>
               <li><a href="http://www.arturoflooring.de/einsatzbereiche/gewerbe/" title="Arturo Bodenbeschichtungen im gewerblichen Bereich"><span>Gewerbe</span></a></li>
               <li><a href="http://www.arturoflooring.de/einsatzbereiche/tiefgaragen/" title="Tiefgaragen"><span>Tiefgaragen</span></a></li>
               <li class="last"><a href="http://www.arturoflooring.de/einsatzbereiche/wohnungen/" title="Wohnungen"><span>Wohnungen</span></a></li>
            </ul>
         </div>
         <div class="box box-matrix">
            <div class="top">&nbsp;</div>
            <div class="body">
               <div class="section-container section-container-matrix">
                  <div class="section section-list section-downloads section-matrix">
                     <h3>Downloads</h3>
                     <div class="list">
                        <div class="item first">
                           <a href="http://www.arturoflooring.de/uploads/tx_dddownloadmatrix/Arturo_brochure_DE_2013_web.pdf" target="_blank" class="bullet">Broschüre Arturo Systeme und Produkte</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="bottom">&nbsp;</div>
         </div>
	</div>
	<div class="col col-2" >
		<div class="box">
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