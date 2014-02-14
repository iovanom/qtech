//$.noConflict();
$(document).ready(
	function(){
	
		$('.navigation-main').each(function(){
				$(this).find('ul').addClass('equalized');
				var container_w = $(this).width();
				container_w = 942;
				var content_w = 0;
				var c = 0;
				$(this).find('#menu-ul > li > a').each(function(){
					content_w += $(this).parent().width()+2;
					//window.console.log($(this).parents('li').width());
					c++;
				});
				var p = Math.floor((container_w-content_w)/c);
				$(this).find('#menu-ul > li > a').each(function(){
					var w = $(this).width();
					$(this).width(w+p);
				});
				var content_w2 = 0;
				$(this).find('#menu-ul > li > a').each(function(){
					content_w2 += $(this).parent().width()+2;
				});
				var w = $(this).find('#menu-ul > li:last > a').width();
				$(this).find('#menu-ul > li:last > a').width(w+(container_w-content_w2));
			});
		
		
		window.changeSlide = function(stage,slide){
			
			window.clearTimeout(window['stageTimeout'+stage]);
		
			var s = $('#stage-'+stage);
			
			if ($('#stage-'+stage).data('state')!='init') {
				$('#stage-'+stage).find('.bg').removeClass('bg');
				$('#slide-'+stage+'-'+s.data('current_slide')).removeClass('fg').addClass('bg');
			} else {
				$('#stage-'+stage).data('state','normal');
			}
			tmp = $('#stage-'+stage).data('current_slide');
			tmp++;
			if (tmp>$('#stage-'+stage).data('count_slides')-1) tmp = 0;
			if (slide!='auto') tmp = slide;
			$('#stage-'+stage).data('current_slide',tmp);
			$('#stage-'+stage).find('.slide').not('.bg').hide();
			$('#slide-'+stage+'-'+tmp).addClass('fg').hide().fadeIn(1000);
			
			$('#stage-'+stage).find('.nav-stage ul li').removeClass('active');
			$('#stage-'+stage).find('.nav-stage ul li#item-'+stage+'-'+tmp).addClass('active');
			
			if (slide=='auto') {
				window['stageTimeout'+stage] = window.setTimeout(function(){window.changeSlide(stage,'auto');},4000);
			} else {
				window.clearTimeout(window['stageTimeout'+stage]);
			}
		};
		
		window.addPreloader = function(stage) {
			window.animatePreloader = function(stage) {
				var s = $('#stage-'+stage);
				var h = 40;
				var o = s.find('.stage-preloader').data('bgoffset')-h;
				if (o <= -480) o = 0;
				s.find('.stage-preloader').css('background-position','0 '+o+'px');
				s.find('.stage-preloader').data('bgoffset',o);
			};
			var s = $('#stage-'+stage);
			s.find('.stage-preloader').data('bgoffset',0);
			window['preloaderInterval'+stage] = window.setInterval(window.animatePreloader,50,stage);			
		};

		
		var b = 0;
		
		$('.stage').each(function(){
		
			$(this).attr('id','stage-'+b);
			
			$(this).data('count_slides',$(this).find('.slide').length);
			$(this).data('current_slide', -1);
			$(this).data('slides_loaded',0);
			$(this).data('state', 'init');
			
			
			
			if ($.browser.msie===true) {
				$(this).find('.slide img').each(function(){
					var ts = new Date().getTime();
					var s = $(this).attr('src')+'?'+ts;
					$(this).attr('src',s);
				});
			}
			if ($(this).find('.slide').length > 1) {
				$(this).find('.slide img').each(function() {
					if (this.complete) {
						var s = $(this).parents('.stage');
							var tmp = s.data('slides_loaded') + 1;
							$(this).parents('.slide').hide();
							s.data('slides_loaded', tmp);
							if (tmp == s.data('count_slides')) {
								s.find('.slides').css('visibility', 'visible');
								s.find('.nav-stage').css('visibility', 'visible').hide().fadeIn('normal');
								s.find('.stage-preloader').remove();
								var id = s.attr('id').replace(/stage-/, '');
								clearInterval(window['preloaderInterval' + id]);
								if (s.data('count_slides') == 1) {
									s.find('.slide:first-child').show();
								} else {
									window.changeSlide(id, 'auto');
								}
							}
					} else {
						$(this).load(function(){
							var s = $(this).parents('.stage');
							var tmp = s.data('slides_loaded') + 1;
							$(this).parents('.slide').hide();
							s.data('slides_loaded', tmp);
							if (tmp == s.data('count_slides')) {
								s.find('.slides').css('visibility', 'visible');
								s.find('.nav-stage').css('visibility', 'visible').hide().fadeIn('normal');
								s.find('.stage-preloader').remove();
								var id = s.attr('id').replace(/stage-/, '');
								clearInterval(window['preloaderInterval' + id]);
								if (s.data('count_slides') == 1) {
									s.find('.slide:first-child').show();
								} else {
									window.changeSlide(id, 'auto');
								}
							}
						});
					}
				});
			
			/*
			
			$(this).find('.slide img').load(function(){
					var s = $(this).parents('.stage');
					var tmp = s.data('slides_loaded')+1;
					$(this).parents('.slide').hide();
					s.data('slides_loaded',tmp);
					if (tmp==s.data('count_slides')) {
						
						s.find('.slides').css('visibility','visible');
						s.find('.nav-stage').css('visibility','visible').hide().fadeIn('normal');
						s.find('.stage-preloader').remove();
						var id = s.attr('id').replace(/stage-/,'');
						clearInterval(window['preloaderInterval'+id]);
						if (s.data('count_slides')==1) { s.find('.slide:first-child').show(); } else { window.changeSlide(id,'auto'); } 
					}
				}); */

			
		
			//if ($(this).find('.slide').length>1) {
			
				var has_stage_nav = false;
				if ($(this).find('.nav-stage').length) {
					has_stage_nav = true;
				} else {
					$(this).append('<div class="nav-stage"><ul></ul></div>');
				}
											
				c = 0;
				
				window.addPreloader(b);
				
								
				$(this).find('.slide').each(function(){
					
					$(this).attr('id','slide-'+b+'-'+c);
					if (has_stage_nav===true) {
						$(this).parents('.stage').find('.nav-stage ul li:eq('+c+')').attr('id','item-'+b+'-'+c);
					} else {
						$(this).parents('.stage').find('.nav-stage ul').append('<li id="item-'+b+'-'+c+'">&nbsp;</li>');
					}
					if (c==0) {
						$(this).addClass('fg');
						$('.slide:first-child').css('z-index',1);
						$(this).parents('.stage').find('.nav-stage ul li#item-'+b+'-'+c).addClass('active');
					} else if (c==1) {
						$(this).addClass('bg');
					}
					$(this).parents('.stage').find('.nav-stage ul li#item-'+b+'-'+c).click(function(){
						var id = $(this).attr('id').replace(/item-/,'').split('-');
						window.changeSlide(id[0],id[1]);
					});
					c++;
					if ($(this).find('.copy').children().length==1&&$(this).find('.copy a').length==1) {
						var u = $(this).find('.copy a').attr('href');
						$(this).find('.copy a').hide();
						$(this).css('cursor','pointer');
						$(this).click(function(){
							window.location = u;
						});
					}
				});
				
				
				   			
				
			
			} else {
				$(this).find('.slide').show();
				$(this).find('.slides').css('visibility', 'visible');
				$(this).find('.stage-preloader').remove();
				if ($(this).find('.slide .copy').children().length==1&&$(this).find('.slide .copy a').length==1) {
					var u = $(this).find('.slide .copy a').attr('href');
					$(this).find('.slide .copy a').hide();
					$(this).css('cursor','pointer');
					$(this).click(function(){
						window.location = u;
					});
				}
			}
			
			b++;
		
		});

		
		
		$('.pagetools').each(function() {
			$(this).find('.clipboard').each(function() {
				if ($(this).find('li').length == 1) {
					$(this).hide();
				} else {
					$(this).find('ul').hide();
				}
			$(this).find('li .ui-icon-print').remove();
			$(this).find('li .ui-icon-email').live('click',function(){
				var u = $(this).parents('li').find('a').attr('href');
				window.location = '/empfehlen/?tipUrl='+encodeURI(u);
			});
			
			
			$(this).find('li .ui-icon-delete').live('click', function() {
				if ($(this).parents('li.all').length == 0) {
					var t = $.trim($(this).parents('li').find('a').text());
					var u = $(this).parents('li').find('a').attr('href');
					var json = {
						"cmd": "remove",
						"websites": [{
							"title": t,
							"url": u
						}]
					};
				} else {
					var json = {
						"cmd": "removeAll"
					};
				}
				$.ajax({
					type: 'POST',
					url: '/index.php?eID=ppsession',
					data: json,
					dataType: 'json',
					complete: fillClipboard
				});
				return false;
			});
		});
		
		$(this).find('.clipboard-header').click(function() {
			$(this).parent().find('ul').slideToggle();
		});
		
		$(this).find('.tabs a').each(function() {
			$(this).tipsy({
				fade: true,
				gravity: 'se'
			});
		});
		
		$(this).find('.icon-clipboard').click(function() {
			var json = {
				"cmd": "add",
				"websites": [{
					"title": $.trim(document.title.replace(/ - Parkettprofi/, '')),
					"url": encodeURI(window.location.href)
				}]
			};
			//if (console) console.log(json);        
			$.ajax({
				type: 'POST',
				url: '/index.php?eID=ppsession',
				data: json,
				dataType: 'json',
				complete: fillClipboard
			});
			var t = document.title;
			if (t.length > 20) t = t.substring(0, 20) + '&hellip;';
			var c = $(this).parents('.pagetools').find('.clipboard'); //var h = c.find('li.all').html();
			return false;
		});
		updateClipboard = function() {
			var c = $('.pagetools .clipboard li').length - 1;
			$('.pagetools .clipboard-header .count-pages').html('(' + c + ')');
			if (c == 0) {
				$('.clipboard').hide();
				$('.pagetools .tabs li').removeClass('active');
			} else {
				$('.clipboard').show();
				$('.pagetools .tabs li:first-child').addClass('active');
			}
		};
		initClipboard = function() {
			var json = {
				"cmd": "getAll"
			};
			$.ajax({
				type: 'POST',
				url: '/index.php?eID=ppsession',
				data: json,
				dataType: 'json',
				complete: fillClipboard
			});
		};
		fillClipboard = function(data, status) {
			var items = $.parseJSON($.parseJSON(data.responseText));
			items = items['websites'];
			c = $('.clipboard');
			c.find('li').not('.all').remove();
			if (items.length > 0 && items[0]['title'] != '') {
				var h = c.find('li.all').html();
				for (i = 0; i < items.length; i++) {
					c.find('ul').prepend('<li>' + h + '</li>');
					var l = c.find('li:first-child');
					l.find('.title').html('<a href="' + items[i].url + '">' + items[i].title + '</a>');
				};
			} else {
				if ($('.clipboard ul li').length == 1) $('.pagetools .tabs li:first-child').removeClass('active');
			};
			updateClipboard();
		};
		initClipboard();
	});
		
		
		
		$('.section-abc, .section-accordion').each(function(){
			$(this).find('.expand .collapse').hide();
			$(this).find('.expand .expand').click(function(){
				$(this).hide();
				$(this).parent().find('.collapse').show();
				$(this).parents('.section-abc,.section-accordion').find('dt').addClass('expanded');
				$(this).parents('.section-abc,.section-accordion').find('dd').slideDown();
			});
			$(this).find('.expand .collapse').click(function(){
				$(this).hide();
				$(this).parent().find('.expand').show();
				$(this).parents('.section-abc,.section-accordion').find('dt').removeClass('expanded');
				$(this).parents('.section-abc,.section-accordion').find('dd').slideUp();
			});
			$(this).find('dd .collapse').click(function(){
				$(this).parents('dd').slideUp();
				$(this).parents('dd').prev().removeClass('expanded');
			});
			
			var hash_d = '';
			var s = unescape(window.location.search.toString());
			if (s.indexOf('#')>=0) {
				hash_d = s.split('#');
				hash_d = hash_d[1];
				if (hash_d.indexOf('uucontenttab'==0)) {
					hash_d = hash_d.split('-');
					hash_d = hash_d[0]+'-'+(parseInt(hash_d[1])-1);
				}
			}

			$(this).find('dt').each(function(){
				$(this).find('.link a').click(function(e){
					e.stopPropagation();
				});
				
				if (hash_d.indexOf('uucontenttab')==0 && $(this).hasClass(hash_d)) {
					$(this).addClass('expanded');
				}
				if (!$(this).hasClass('expanded')) $(this).next('dd').hide();
				$(this).click(function(){
					$(this).next('dd').slideToggle();
					$(this).toggleClass('expanded');
				});
			});
			
			if (hash_d.indexOf('uucontenttab')==0) {
				$('html,body').scrollTop($('.'+hash_d).offset().top);
			}
			
		});
		
		$('.tab-nav li').click(function(){
			var i = $(this).index();
			$(this).parent().find('li').removeClass('active');
			$(this).addClass('active');
			$(this).parents('.tab-container').find('.tab-content>div').hide();
			$(this).parents('.tab-container').find('.tab-content>div:eq('+i+')').show();
		});
		
		
		
		$('.navigation-sub li.last').each(function() {
			if ($(this).find('li').length > 0) {
				$(this).removeClass('last');
				$(this).find('li:last-child').addClass('last');
			}
		});
		
		$('.header-right .search-box input').focus(function(){
			$(this).val('');
			$(this).addClass('focused');
		});
		
		$('.box-container-3').each(function(){
			var max_h = 0;
			$(this).find('.box .body').each(function(){
				var h = $(this).height();
				var p = $(this).css('padding-bottom').replace(/px/,'');
				p = parseInt(p);
				h += p;
				if (h>max_h) max_h = h;
				
			});
			$(this).find('.box .body').each(function(){
				var p = $(this).css('padding-bottom').replace(/px/,'');
				p = parseInt(p);
				$(this).height(max_h-p);
			});
		});
		
		$('.box-container').not('.box-container-3').each(function() {
			$(this).find('.box').each(function() {
				var h = $(this).find('h3').html();
				$(this).find('h3').remove();
				$(this).find('.copy').prepend('<h3>' + h + '</h3>');
			});
		});
		
		$('.box-container').not('.box-container-3').each(function(){
			var max_h = 0;
			$(this).find('.box .copy').each(function(){
				var h = $(this).height();
				if (h>max_h) max_h = h;
				
			});
			$(this).find('.box .copy').each(function(){
				$(this).height(max_h);
			});
		});
		
		$('.section-teasers-2-col').each(function(){
			$(this).find('.item:odd').addClass('even');
			$(this).find('.item:even').removeClass('even').addClass('odd');
		});
		
		$('.box-filter').each(function(){
			var c = 1;
			var class_before = '';
			$(this).find('.row .row:eq(0)').unwrap();
			$(this).find('.row').each(function(){
				if ($(this).hasClass('row-date') && class_before == '' && c==3) {
					$(this).before('<div class="row row-3 />');
					c++;
				}			
				var class_tmp = '';
				if ($(this).hasClass('row-date')) class_tmp = 'row-date';
				$(this).removeClass().addClass('row').addClass('row-'+c).addClass(class_tmp);
				$(this).find('select:eq(0)').addClass('first');
				class_before = class_tmp;
				c++;
			});
			if (c!=4 && c!=7 && c!=10) {
				$(this).find('.submit-container').addClass('submit-container-inner');
			}
		});
		
		$('.stage-720x235 + .box, .stage-720x240 + .box').each(function(){
			var p = $(this).prev();
			if (!$(this).hasClass('box-filter')&&!$(this).hasClass('box-progressbar')&&!$(this).hasClass('box-headline')&&!$(this).hasClass('box-teaser')) {
				p.addClass('stage-connected');
				$(this).addClass('box-connected');
			}
		});
		
		$('.box-headlineconnected + .box').each(function(){
			var p = $(this).prev();
			if (!$(this).hasClass('box-filter')&&!$(this).hasClass('box-progressbar')&&!$(this).hasClass('box-headline')&&!$(this).hasClass('box-teaser')) {
				$(this).addClass('box-connected');
			}
		});
		
		
		$('.pulldown').each(function(){
			if ($(this).hasClass('pulldown-login')) {
				var type = 'login';
			} else {
				var type = 'country';
			}
			
			if (type=='country') {
				var l = $(this).find('li').length;
				$(this).find('a').removeAttr('title');
				if (l>5) {
					var c = Math.ceil(l/4);
					$(this).find('ul').addClass('original');
					for (i=0;i<c;i++) {
						$(this).find('.body').append('<ul />');
					}
					var d = 0;
					$(this).find('ul.original li').each(function(){
						$(this).find('a').removeAttr('title');
						var targ = Math.floor(d/4);
						var l = $(this).html().replace(/<\/a>/,'</span></a>').replace(/<\/A>/,'</SPAN></A>');
						l = l.split('(');
						l = '<li>'+l[0]+' <span>('+l[1]+'</li>';
						$(this).parents('.body').find('ul:eq('+(targ+1)+')').append(l);
						d++;
					});
					$(this).find('ul.original').remove();
					$(this).find('ul:eq(0)').addClass('first');
				}
			}
			
			
			
			$(this).data('original-offset',-$(this).height());
			$(this).css('top',$(this).data('original-offset')+'px');
			var p = $(this).parents('body').find('.button-'+type).position();
			$(this).parents('body').find('.button-'+type).wrap('<div id="tmp-wrapper"></div>');
			var h = $('#tmp-wrapper').html();
			$(this).parents('body').find('.button-'+type).unwrap();
			$(this).append(h);
			$(this).find('.button-'+type).addClass('pulldown-button').addClass('active');
			//$(this).show();
			$(this).find('.pulldown-button').css('margin-left',p.left+8+'px');
			$(this).parents('body').find('.button-'+type).data('button-type',type);
			$(this).append('<span class="icon-close">&nbsp;</span>');
			
			$(this).parents('body').find('.button-'+type).not('.pulldown-button').click(function(){
				//$(this).css('visibility','hidden');
				var type = $(this).data('button-type');
				$('.pulldown-'+type).show().animate({'top':0},300);
			});
			
			
			$(this).find('.pulldown-button, .icon-close').click(function(){
				var h = $(this).parents('.pulldown').data('original-offset');
				
				$(this).parents('.pulldown').animate({'top':h},200,function(){
					$(this).hide();
					
				});
			});
		});
		
		$('.section-productfinder').each(function(){
			var max_h = 0;
			$(this).find('.fieldset').not('.fieldset-wide').each(function(){
				$(this).find('.options').each(function(){
					var h = $(this).height();
					if (h>max_h) max_h = h;
				});
				
			});
			$(this).find('.fieldset').not('.fieldset-wide').each(function(){
				$(this).find('.options').each(function(){
					$(this).height(max_h);
				});
			});
		});
		
		$('.section-product-details .img-border-top img').each(function(){
			if ($(this).attr('title')||$(this).attr('alt')!='') $(this).tipsy({fade: true, gravity: 'se'});
		});
		
		$('.col-2 .section-container-matrix, .col-2 .section-container-tabs').each(function(){
			if ($(this).hasClass('section-container-matrix')) {
				$(this).prepend('<ul class="tabs" />');
			}
			$(this).find('.section').each(function(){
				$(this).addClass('section-tab');
				if ($(this).index()!=1) $(this).hide();
				if ($(this).parent().hasClass('section-container-matrix')) {
					var t = $(this).find('h3:first').text();
					$(this).find('h3:first').remove();
					$(this).parent().find('ul.tabs').append('<li>'+t+'</li>');
				}
				
			});
			$(this).find('ul.tabs li:eq(0)').addClass('active');
			$(this).find('ul.tabs li').each(function(){
				$(this).click(function(){
					$(this).parents('ul.tabs').find('li').removeClass('active');
					$(this).addClass('active');
					var i = $(this).index();
					$(this).parents('.section-container').find('.section').hide();
					$(this).parents('.section-container').find('.section:eq('+i+')').show();
				});
			});
		});
		

		
		$('.two-cols-home .col-2').each(function() {
			$(this).find('.box').each(function() {
				var h = $(this).find('h3').html();
				$(this).find('h3').remove();
				$(this).find('.copy').prepend('<h3>' + h + '</h3>');
			});
		});
		
		$('.col-1 .section-container-matrix').each(function(){
			$(this).find('.section-list a.button').each(function(){
				var h = $(this).wrap('<div id="tmpcontainer" />');
				var h = $('#tmpcontainer').html();
				var t = $(this).parents('.item').find('.title,h3').text();
				if (t.length>50) {
					t = t.substr(0,50);
					var i = t.lastIndexOf(' ');
					t = t.substr(0,i)+' …';
				}
				$(this).parents('.item').data('title',t).append(h);
				$('#tmpcontainer').remove();
			});
			$(this).find('.section-list a.button').each(function(){
				$(this).removeClass('button').addClass('bullet');
				$(this).text($(this).parents('.item').data('title'));
				$(this).parents('.item').find('span,h3,.copy').remove();
			});
			$(this).find('.section-list .link-compact-download a, .tx-ddrenderteasertypeematrix-pi1-link a').addClass('bullet');
			$(this).find('.img').each(function(){
				$(this).parents('.item').addClass('item-img');
			});
			$(this).find('.section-list .item:first').addClass('first');
			$(this).find('.section-list > .item:last').addClass('last');
			$(this).find('.caption').remove();
			$(this).find('.section-contact').each(function(){
				var t = $(this).find('.copy p');
				if (t.length) {
					t = t.html().replace(/,/g,'<br />');
					$(this).find('.copy p').html(t);
				}
			});
			$(this).find('.open-table').each(function(){
				var h = $(this).parent().find('table:eq(0)').html();
				h = '<div class="section-table section-popup"><table>'+h+'</table></div>';
				$(this).fancybox({
						'content' : h,
						'titlePosition'  : 'over',
						'padding' : 20,
						'titleFromAlt' : 'true'
					});
			});
			if ($.browser.msie===true && $.browser.version==8) {
				$(this).find('.section-products .img img').removeAttr('width').removeAttr('height');
			}
		});
		
		$('input:submit').addClass('submit');
		$('.item').removeClass('first');
		$('.item:first, .section-teasers .item:first').addClass('first');
		$('.section h1:only-child, .section h2:only-child, .section h3:only-child').parent().addClass('single-child');
		$('.caption, h1').each(function(){
			if ($.trim($(this).text())=='') $(this).remove();
		});
		$('.section ul:last-child').addClass('last');
		
		$('#tx_multishop_pi1_core form#checkout #bottom-navigation>div.link a').addClass('button-back');
		
		$('.section-partner-details').each(function(){
			$(this).find('.col-1').each(function(){
				if ($(this).find('img').length==0) $(this).remove();
			});
		});
		
		//$('.tx-indexedsearch-whatis').wrapInner('h1');
		    
		
}
);