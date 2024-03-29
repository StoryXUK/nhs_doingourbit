jQuery.noConflict()(function($) {
	'use strict';
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iPhone: function() {
			return navigator.userAgent.match(/iPhone/i);
		},
		iPad: function() {
			return navigator.userAgent.match(/iPad/i);
		},
		iPod: function() {
			return navigator.userAgent.match(/iPod/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
	var $animsition = $('.animsition');
	var vlthemes_scripts = {
		init: function() {
			vlthemes_contact_form();
			vlthemes_footer_fixed();
			vlthemes_fullscreen_menu();
			vlthemes_aside_menu();
			vlthemes_header_fixed();
			vlthemes_sidebar_menu();
			vlthemes_preloader();
			vlthemes_back_to_top();
			vlthemes_blog_standard();
			vlthemes_load_more_btn();
			vlthemes_infinite_scroll();
			vlthemes_lightbox();
			vlthemes_swiper_sliders();
			vlthemes_scroll_to();
			vlthemes_shop();
		},
		thirdParty: function() {
			$('body').fitVids();
			$('.tooltip').tooltipster({
				theme: 'tooltipster-noir',
				trigger: 'hover',
				delay: 0
			});
			$('.jarallax').jarallax({
				speed: 0.3
			});
		},
		visualComposer: function() {
			vlthemes_counter_up();
			vlthemes_progress_bar_shortcode();
			vlthemes_offers_list();
		},
		resized: function() {}
	};
	$(document).ready(function() {
		vlthemes_scripts.init();
		vlthemes_scripts.thirdParty();
		vlthemes_scripts.visualComposer();
	});

	function vlthemes_contact_form() {

		function after_form_submitted(data) {
			if(data.result == 'success') {
				$('#success_message').show();
				$('#error_message').hide();
				setTimeout(function() {
					$('#success_message').hide();
				}, 5000);
				$('#reused_form')[0].reset();
			} else {
				$('#error_message').append('<ul></ul>');
				$.each(data.errors, function(key,val) {
					$('#error_message ul').append('<li>'+key+':'+val+'</li>');
				});
				$('#success_message').hide();
				$('#error_message').show();
			}//else
		}

		$('#reused_form').on('submit', function(e) {
			e.preventDefault();
			var form = $(this);
			$.ajax({
				type: 'post',
				url: 'handler.php',
				data: form.serialize(),
				success: after_form_submitted,
				dataType: 'json'
			});
		});
	}

	function vlthemes_footer_fixed() {
		$(window).on('resize', function(){
			$('.vlt-footer-fixed .vlt-content-holder').css({
				'margin-bottom': $('.vlt-footer-holder[data-footer-fixed="1"]').outerHeight() + 'px'
			});
		}).trigger('resize');
	}

	function vlthemes_header_fixed(){

			var header = $('.vlt-header-holder[data-header-fixed="1"]');

				var wndw = $(window),
					headerH = header.outerHeight(),
					show = 0,
					lastSt = 0,
					opacity = 1,
					hover = 0,
					duration = 300,
					offset = 200,
					direction = "down";

				header.on('mouseenter', function(){
					var st = (wndw.scrollTop() < 0) ? 0 : wndw.scrollTop();
						hover = 1,
						opacity = 1,
						show = st;
					header.stop().transition({
						opacity: 1,
						duration: duration,
						easing: 'ease'
					});
				}).on('mouseleave', function(){
					hover = 0;
				});

				$(window).on('scroll', function(){
					var st = (wndw.scrollTop() < 0) ? 0 : wndw.scrollTop(),
						t = st >= lastSt ? 'down' : 'up',
						i = t !== direction;

					clearTimeout(t);

					if(header.data('header-transparent') == true){

						if(st < headerH){
							header.removeClass('is-white');
						}
					}

					if(t == "down"){
						header.removeClass('up');
						header.addClass('down');
					}else{
						header.removeClass('down');
						header.addClass('up');
					}

					if(i == true){

						if(0 == opacity && 'up' == t){
							show = st;
							if(st < 0){
								show = 0
							}else{
								show -= headerH;
							}
						}else{
							if(1 == opacity && 'down' == t && (show = st)){
								show = Math.max(0, show)
							}
						}
					}

					var n = st - show,
						n = Math.max(0, n),
						n = Math.min(n, headerH);

					var a = (headerH - n) / headerH;

					header.css({
						opacity: a
					});

					if(st > offset){
						header.addClass('is-white');
					}else{
						header.removeClass('is-white');
					}

					lastSt = st;
					direction = t;
					opacity = a;

				});


	}


	function vlthemes_aside_menu(){
		var menuHolder = $('.vlt-navigation-aside-holder'),
			menuToggle = $('.vlt-aside-menu-toggle'),
			menuOverlay = $('.vlt-navigation-aside-overlay'),
			menuIsOpen = false;

		menuToggle.on('click', function(e) {
			e.preventDefault();
			if (!menuIsOpen) {
				menu_open();
				menuIsOpen = true;
			} else {
				menu_close();
				menuIsOpen = false;
			}
		});

		function menu_open() {
			$('body').addClass('menu-is-open');
			menuHolder.transition({
				x: '0%',
				visibility: 'visible',
				duration: 300,
				easing: 'linear'
			});
			menuOverlay.transition({
				opacity: '1',
				visibility: 'visible',
				duration: 300,
				easing: 'linear'
			});
		}

		function menu_close() {
			$('body').removeClass('menu-is-open');
			menuHolder.find('li').removeClass('sub-menu-opened');
			menuHolder.transition({
				x: '100%',
				visibility: 'hidden',
				duration: 300,
				easing: 'linear'
			});
			menuOverlay.transition({
				opacity: '0',
				visibility: 'hidden',
				duration: 300,
				easing: 'linear'
			});
		}

		$('.vlt-navigation-aside li.menu-item-has-children > a').addClass('no-anims');

		$(document).on('click', '.vlt-navigation-aside li.menu-item-has-children > a', function(e) {
			e.preventDefault();
			$(this).parent('li').toggleClass('sub-menu-opened');
		});
		$(document).on('keyup', function(e) {
			if (e.keyCode === 27) {
				menu_close();
				menuIsOpen = false;
			}
		});
		$(document).on('click', function() {
			menu_close();
			menuIsOpen = false;
		});
		$(document).on('click', '.vlt-navigation-aside, .vlt-aside-menu-toggle', function(e) {
			e.stopPropagation();
		});


	}

	function vlthemes_sidebar_menu(){
		$('.widget_nav_menu li.menu-item-has-children > a').addClass('no-anims');

		$(document).on('click', '.widget_nav_menu li.menu-item-has-children > a', function(e) {
			e.preventDefault();
			$(this).parent('li').toggleClass('sub-menu-opened');
		});
	}

	function vlthemes_fullscreen_menu(){
		var menuHolder = $('.vlt-navigation-fullscreen-holder'),
			menuToggle = $('.vlt-fullscreen-menu-toggle'),
			menuIsOpen = false;

		menuToggle.on('click', function(e) {
			e.preventDefault();
			if (!menuIsOpen) {
				menu_open();
				menuIsOpen = true;
			} else {
				menu_close();
				menuIsOpen = false;
			}
		});

		function menu_open() {
			$('body').addClass('menu-is-open');
			menuHolder.transition({
				opacity: '1',
				visibility: 'visible',
				duration: 300,
				easing: 'linear'
			});
		}

		function menu_close() {
			$('body').removeClass('menu-is-open');
			menuHolder.find('li').removeClass('sub-menu-opened');
			menuHolder.transition({
				opacity: '0',
				visibility: 'hidden',
				duration: 300,
				easing: 'linear'
			});
		}
		$('.vlt-navigation-fullscreen li.menu-item-has-children > a').addClass('no-anims');

		$(document).on('click', '.vlt-navigation-fullscreen li.menu-item-has-children > a', function(e) {
			e.preventDefault();
			$(this).parent('li').toggleClass('sub-menu-opened');
		});
		$(document).on('keyup', function(e) {
			if (e.keyCode === 27) {
				menu_close();
				menuIsOpen = false;
			}
		});
		$(document).on('click', function() {
			menu_close();
			menuIsOpen = false;
		});
		$(document).on('click', '.vlt-navigation-fullscreen, .vlt-fullscreen-menu-toggle', function(e) {
			e.stopPropagation();
		});
	}

	function vlthemes_preloader() {
		$animsition.animsition({
			inDuration: 1500,
			outDuration: 800,
			inClass: 'fade-in',
			outClass: 'fade-out',
			onLoadEvent: true,
			timeout: true,
			timeoutCountdown: 1200,
			linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([href^="mailto"]):not(.ajax-btn, #cancel-comment-reply-link, .comment-reply-link, .no-anims, .author-anims-link, .lightbox-link, .vlt-cats-toggle a)',
			loadingClass: 'vlt-preloader-holder',
			loadingInner: '<div class="vlt-preloader"></div>'
		});
	}

	function vlthemes_blog_standard() {
		var element = $('.vlt-postlist-standard');
		element.imagesLoaded(function() {
			element.cubeportfolio({
				layoutMode: 'grid',
				gapHorizontal: 60,
				gapVertical: 0,
				mediaQueries: [{
					width: 1170,
					cols: 1,
				}, {
					width: 991,
					cols: 1,
				}, {
					width: 767,
					cols: 1,
				}, {
					width: 575,
					cols: 1,
				}],
			});
		});
	}

	function vlthemes_shop() {
		$('body').on('click', '.vlt-quantity .plus, .vlt-quantity .minus', function(e) {
			e.preventDefault();
			var $this = $(this),
				$qty = $this.siblings('.qty'),
				current = parseInt($qty.val(), 10),
				min = parseInt($qty.attr('min'), 10),
				max = parseInt($qty.attr('max'), 10);
			min = min ? min : 1;
			max = max ? max : current + 1;
			if ($this.hasClass('minus') && current > min) {
				$qty.val(current - 1);
				$qty.trigger('change');
			}
			if ($this.hasClass('plus') && current < max) {
				$qty.val(current + 1);
				$qty.trigger('change');
			}
		});
		var upSalesProducts = $('.vlt-up-sells-products'),
			upSalesProductsGutter = upSalesProducts.data('gutter');
		upSalesProducts.imagesLoaded(function() {
			upSalesProducts.cubeportfolio({
				layoutMode: 'grid',
				gapHorizontal: upSalesProductsGutter,
				gapVertical: upSalesProductsGutter,
				mediaQueries: [{
					width: 1170,
					cols: 4,
				}, {
					width: 991,
					cols: 4,
				}, {
					width: 767,
					cols: 2,
				}, {
					width: 575,
					cols: 1,
				}],
			});
		});
		var relatedProducts = $('.vlt-related-products'),
			relatedProductsGutter = relatedProducts.data('gutter');
		relatedProducts.imagesLoaded(function() {
			relatedProducts.cubeportfolio({
				layoutMode: 'grid',
				gapHorizontal: relatedProductsGutter,
				gapVertical: relatedProductsGutter,
				mediaQueries: [{
					width: 1170,
					cols: 4,
				}, {
					width: 991,
					cols: 4,
				}, {
					width: 767,
					cols: 2,
				}, {
					width: 575,
					cols: 1,
				}],
			});
		});
		var crossProducts = $('.vlt-crosssells-products'),
			crossProductsGutter = crossProducts.data('gutter');
		crossProducts.imagesLoaded(function() {
			crossProducts.cubeportfolio({
				layoutMode: 'grid',
				gapHorizontal: crossProductsGutter,
				gapVertical: crossProductsGutter,
				mediaQueries: [{
					width: 1170,
					cols: 4,
				}, {
					width: 991,
					cols: 4,
				}, {
					width: 767,
					cols: 2,
				}, {
					width: 575,
					cols: 1,
				}],
			});
		});
		var element = $('.vlt-postlist-products'),
			gutter = element.data('gutter');
		element.imagesLoaded(function() {
			element.cubeportfolio({
				layoutMode: 'grid',
				gapHorizontal: gutter,
				gapVertical: gutter,
				mediaQueries: [{
					width: 1170,
					cols: 3,
				}, {
					width: 991,
					cols: 3,
				}, {
					width: 767,
					cols: 2,
				}, {
					width: 575,
					cols: 1,
				}],
			});
		});
	}

	function vlthemes_lightbox() {
		$('.lightbox-link').lightcase({
			speedIn: 500,
			speedOut: 500,
			showSequenceInfo: true,
			transition: 'scrollBottom',
			showTitle: false,
			onFinish: {
				custom: function() {
					var caption = $(this).find('img').attr('alt');
					if (caption) {
						lightcase.get('caption').text(caption);
						$('#lightcase-caption').show();
					}
					lightcase.resize();
				},
			}
		});
	}

	function vlthemes_swiper_sliders() {
		$('.vlt-recent-posts-author').imagesLoaded(function(){
			var swiper = new Swiper('.vlt-recent-posts-author', {
				spaceBetween: 5,
				speed: 300,
				slidesPerView: 4
			});
		});
	}

	function vlthemes_infinite_scroll() {
		if (typeof infinity_scroll == 'undefined') {
			return;
		}
		var maxPages = parseInt(infinity_scroll.maxPages),
			postsContainer = '.vlt-postlist-standard, .vlt-portfolio-grid, .vlt-postlist-products',
			itemSelector = 'article.cbp-item',
			loadMore = infinity_scroll.loadMore,
			loadMoreNone = infinity_scroll.loadMoreNone;
		$(postsContainer).infinitescroll({
			loading: {
				finishedMsg: '<a href="#" class="infinite-scroll-msg">' + loadMoreNone + '</a>',
				msgText: '<a href="#" class="infinite-scroll-msg">' + loadMore + '</a>',
				speed: 0
			},
			nextSelector: '.vlt-infinity-load > a',
			navSelector: '.vlt-infinity-load',
			contentSelector: postsContainer,
			itemSelector: itemSelector,
			maxPage: maxPages
		}, function(newElements) {
			var newElems = $(newElements);
			newElems.hide();
			$(postsContainer).imagesLoaded(function() {
				if ($(postsContainer).hasClass('cubeportfolio')) {
					$(postsContainer).cubeportfolio('append', newElems);
					vlthemes_lightbox();
					newElems.show();
				} else {
					$(postsContainer).append(newElems);
					vlthemes_lightbox();
					newElems.show();
				}
			});
		});
	}

	function vlthemes_load_more_btn() {
		var startPage = 1,
			maxPages = $('.vlt-pagination-load-more-btn').data('max-pages'),
			loadMoreButton = $('.vlt-btn-ajax-load'),
			nextLink = loadMoreButton.attr('href'),
			loadMoreButtonNone = 'No More Posts',
			postsContainer = '.vlt-postlist-standard, .vlt-portfolio-grid, .vlt-postlist-products',
			itemSelector = 'article.cbp-item';

		loadMoreButton.on('click', function(e) {
			if (nextLink == null) {
				return;
			}
			var button = $(this);
			button.addClass('loaded');
			if (startPage <= maxPages) {
				$.ajax({
					type: 'POST',
					url: nextLink,
					dataType: 'html',
					success: function(data) {
						var newElems = $(data).filter(itemSelector);
						if (newElems.length > 0) {
							newElems.hide();
							$(postsContainer).imagesLoaded(function() {
								if ($(postsContainer).hasClass('cubeportfolio')) {
									$(postsContainer).cubeportfolio('append', newElems);
									vlthemes_lightbox();
									newElems.show();
								} else {
									$(postsContainer).append(newElems);
									vlthemes_lightbox();
									newElems.show();
								}
							});
							button.removeClass('loaded');
						} else {
							button.removeClass('loaded');
							button.text(loadMoreButtonNone).end().addClass('disabled');
						}
						startPage++;
						nextLink = nextLink.replace(/[0-9]/, startPage);
						loadMoreButton.attr('href', nextLink);
						if (startPage >= maxPages) {
							button.removeClass('loaded');
							button.text(loadMoreButtonNone).end().addClass('disabled');
						}
					}
				});
			} else {
				button.removeClass('loaded');
			}

			return false;

		});
	}

	function vlthemes_scroll_to() {
		$('.vlt-scroll-to').on('click', function() {
			var offset = 0,
				duration = 300,
				block = $($(this).attr('href'));
			$('html, body').animate({
				scrollTop: block.offset().top + offset
			}, duration);
		});
	}

	function vlthemes_back_to_top() {
		var $window = $(window),
			offset = 150,
			duration = 500;
		$window.on('load scroll', function() {
			if ($window.scrollTop() > offset) {
				show_btn();
			} else {
				hide_btn();
			}
		});

		function show_btn() {
			$('.vlt-back-to-top').removeClass('hidden').addClass('visible');
		}

		function hide_btn() {
			$('.vlt-back-to-top').removeClass('visible').addClass('hidden');
		}
		$(document).on('click', '.vlt-back-to-top', function() {
			$('html, body').animate({
				scrollTop: 0
			}, duration);
			return false;
		});
	}

	function vlthemes_counter_up() {
		var element = $('.vlt-counter-up');
		element.each(function() {
			var $this = $(this),
				number = $this.find('.vlt-counter-number span'),
				finalnumber = number.data('number'),
				duration = 1000;
			$this.one('inview', function() {
				number.countTo({
					from: 0,
					to: finalnumber,
					speed: duration
				});
			});
		});
	}

	function vlthemes_offers_list() {
		var element = $('.vlt-offers-row');
		if (!isMobile.any()) {
			element.on({
				mouseenter: function() {
					var thumbW = $(this).find('.vlt-scalable-image').width(),
						thumbH = $(this).find('.vlt-scalable-image').height();
					$(this).find('.vlt-scalable-image').css({
						'visibility': 'visible',
						'height': thumbH + 'px',
						'width': thumbW + 'px'
					});
				},
				mouseleave: function() {
					$(this).find('.vlt-scalable-image').css('visibility', 'hidden');
				}
			});
			element.mousemove(function(e) {
				var thumbH = $(this).find('.vlt-scalable-image').height();
				$(this).find('.vlt-scalable-image').css({
					'top': e.clientY - (thumbH + 10),
					'left': e.clientX + 30
				});
			});
		}
	}

	function vlthemes_progress_bar_shortcode() {
		var element = $('.vlt-progress-bar-holder'),
			duration = 1000;
		element.each(function() {
			$(this).one('inview', function() {
				var $this = $(this),
					percent = parseInt($this.find('.vlt-progress-bar-percent').text(), 10);
				$this.find('.vlt-progress-bar > span').transition({
					width: percent + '%',
					duration: duration,
					easing: 'ease',
				});
			});
		});
	}
});




var carouselItems = document.querySelectorAll('.carousel-item');
var carouselIndicators = document.querySelectorAll('.carousel-indicators button');

var currentIndex = 0;
var interval;

function showItem(index) {
	carouselItems.forEach(function(item) {
		item.classList.remove('active');
	});

	carouselIndicators.forEach(function(indicator) {
		indicator.classList.remove('active');
	});

	carouselItems[index].classList.add('active');
	carouselIndicators[index].classList.add('active');
}

function startCarousel() {
	interval = setInterval(function() {
		currentIndex = (currentIndex + 1) % carouselItems.length;
		showItem(currentIndex);
	}, 2000);
}

startCarousel();