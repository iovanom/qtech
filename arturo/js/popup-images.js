$(document).ready(
	function()
	{
	
		var c = 0;
		$('.section-img').each(function(){
			$(this).attr('id','section-img-'+c);
			c++;
			
			var divider = 1;
			if ($(this).hasClass('section-img-2')) {
				divider = 2;
			} else if ($(this).hasClass('section-img-3')) {
				divider = 3;
			} else if ($(this).hasClass('section-img-4')) {
				divider = 4;
			} else if ($(this).hasClass('section-img-5')) {
				divider = 5;
			}
			
			var d = 0;
			
			$(this).find('.img').each(function(){
				if (d%divider==0&&d!=0) {
					$(this).addClass('first');
					$(this).before('<br />');
				}
				d++;
			});
			
		});
	
		$('a[href$=".gif"],a[href$=".GIF"], a[href$=".jpg"], a[href$=".JPG"], a[href$=".jpeg"], a[href$=".JPEG"], a[href$=".png"], a[href$=".PNG"]').each(function(){
		
		
			if ($(this).find('img').length>0) {
			
				var src = $(this).find('img').attr('src');
				imgtmp = $(this).find('img').attr('src',src+ "?" + new Date().getTime());
				
				$(this).find('img').load(function(){
					var w = $(this).width();
					var h = $(this).height();
					$(this).parents('a').css({'position':'relative','width':w+'px','float':'left'}).append('<span class="enlarge">&nbsp;</span>');
					$(this).parents('a').find('.enlarge').css({'top':(h-28)+'px','left':(w-28)+'px'});
					// $(this).parents('a').hover(function(){$(this).find('.enlarge').fadeIn(400);},function(){$(this).find('.enlarge').hide()});
				});
			}
			
			if ($(this).parents('.section-img').length>0) {
				var id = $(this).parents('.section-img').attr('id');
				$(this).attr('rel',id);
			}
			
			if ($(this).parents('.stage-gallery').length==0) {
			
				var cyclic = false;
				var paddingLeftRight = 15;
				if ($(this).parents('.section-img').length) {
					cyclic = true;
					paddingLeftRight = 75;
				}
		
				$(this).fancybox(
				{
					'titlePosition'  : 'inside',
					'padding' : 15,
					'paddingLeftRight' : paddingLeftRight,
					'titleFromAlt' : 'true',
					'cyclic' : cyclic
				});
			}
		});
		
		
		//$('.page-content .text *').hover(function(){$(this).css({backgroundColor: '#999'})}, function(){$(this).css({background: 'none'})});
	}
);