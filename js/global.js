/*  
	-------------------------------------------------------------
	Custom Javascripts - Project: Creative Single Page Portfolio
	Description: Html / Css / jQuery template
	Author: pezflash - http://www.themeforest.net/user/pezflash
	Version: 1.0
    -------------------------------------------------------------
*/



//////////////////////////////////////////////////////
//DOCUMENT READY
$(document).ready(function() {


	//STORING ELEMENTS - VARS
	var th = $('#slideshow');
	var ta = $('#thumbs ul li a');
	var ti = $('#thumbs ul li img');
	var thumbs = $('#thumbs');
	var alert = $('#alert');
	var base = $('#base');
	var slider = $('#media');
	var about = $('#o-mne');
	var portfolio = $('#galerie');
	var contact = $('#kontakt');
	var reel = $('#reel');
	var awards = $('#awards');
	var marker = $('#marker');
	var markerImg = $('#marker img');
	var section;
	var clickedItem;
	var activeItem = "none";
	
	
	

	//////////////////////////////////////////////////////
	//VEGAS PLUGIN (FULLSCREEN GALLERY) CONFIGURATION
	var slideshowRunning = false,
	backgroundList = [];
	
	//CUSTOM CONFIGURATION (SETUP: true/false)
	var autoSlideOnInit = true;
	var preloadBackgrounds = false;
	
    ta.each(function() { 
        backgroundList.push({ 
            src: $(this).attr('href'),
            valign: $(this).data('valign'),
			align: $(this).data('align'),
			fade: 2000
		});
	});

	$.vegas(backgroundList[0])
	('overlay', {
		opacity: 0.5
	})
	('pause');

    th.click(function() { 
		
            //START SLIDESHOW
            if (slideshowRunning == false) { 
                slideshowRunning = true;
				
				th.attr('src', 'images/pause.png');
				th.attr('title', 'Zastavit přehrávání');
				
				$.vegas('slideshow', { 
					delay: 5000,
					backgrounds: backgroundList
				})
				
            //STOP SLIDESHOW
			} else { 
                slideshowRunning = false;
				
				th.attr('src', 'images/play.png');
				th.attr('title', 'Přehrát automaticky');
				
                $.vegas('pause');  
			}
		 
         return false;
	});

    ta.click(function() { 
	
			slideshowRunning = false;

			th.attr('src', 'images/play.png');
			th.attr('title', 'Přehrát automaticky');

			var idx = $(this).parent('li').index();
			$.vegas('stop')(backgroundList[idx]);
		 
         return false;
	});
	 
	//PRELOAD
	if (preloadBackgrounds == true) $.vegas('preload', backgroundList);
		
	//AUTOSLIDESHOW ON INIT
	if (autoSlideOnInit == true) {
		slideshowRunning = true;
		th.attr('src', 'images/pause.png');
		th.attr('title', 'Zastavit přehrávání');

		$.vegas('slideshow', { 
			delay: 16000,
			backgrounds: backgroundList
		})
	};
	 
	 
	//BORDER ON ACTIVE THUMB - MOUSEOVER / MOUSEOUT
	$('body').bind('vegasload', function(e, bg) { 
	    var src = $(bg).attr('src').replace('background', 'thumbnail');

		ti.css('border', '1px solid #3b3b3b');
		$('img[src="' + src + '"]').css('border', '1px solid #f30b27');
	});
	
	var currentThumb = $('#thumbs a:first img')[0];
	
	ti.click(function() {
		currentThumb = this;
	});

	ti.mouseover(function() {
		$(this).css('border', '1px solid #f30b27');
	});

	ti.mouseout(function() {
		if (this != currentThumb) {
			$(this).css('border', '1px solid #3b3b3b');
		}
	});
	
	
	
	
	
	//////////////////////////////////////////////////////
	//GALLERIA PLUGIN CONFIGURATION
	$("#gallery").galleria({
		width: 700,
		height: 390,
		_toggleInfo: true,
		transition: 'fade',
		transitionSpeed: 700,
		popupLinks: true,
		imageCrop: true,
        youtube: {
            showinfo: 1
        }
    });
	
	

	
	
	//////////////////////////////////////////////////////
	//MISCELLANEOUS
	
	//HIDE DIVS (FOR IE8 NOT READING CSS OPACITY)
	thumbs.animate({ opacity: 0 }, 0);
	alert.animate({ opacity: 0 }, 0);
	slider.animate({ opacity: 0 }, 0);
	about.animate({ opacity: 0 }, 0);
	portfolio.animate({ opacity: 0 }, 0);
	contact.animate({ opacity: 0 }, 0);
	reel.animate({ opacity: 0 }, 0);
	awards.animate({ opacity: 0 }, 0);
	

	//THUMBS LOADING
	thumbs.delay(1500).animate({ opacity: 1 }, 1000, 'easeOutQuart');
	
	//THUMBS HOVER ICON	 	//DEACTIVATED BY DEFAULT. REMOVE COMMENTS MARK TO ACTIVATE
	/*
	$("#thumbs .rollover").append("<span></span>");
	$("#thumbs .rollover").hover(function(){
		$(this).children("span").stop(true, true).fadeIn(600);
	},function(){
		$(this).children("span").stop(true, true).fadeOut(200);
	});
	*/
	
	
	//ALERT BOX LOADING & CLOSE
	alert.show().delay(2800).animate({ opacity: 1, bottom: '158px' }, 1000, 'easeOutQuart');
    $('#close_bt').click(function() {
		alert.animate({ opacity: 0, bottom: '200px', height: 'toggle' }, 1000, 'easeOutQuart');
	});
	
	
	//MANAGE OPEN/CLOSE CONTENTS	
	$('#menu a').click(openContent);
	$('#close_base_bt').click(closeContent);

	
	//ABOUT - RECENT PROJECTS ZOOM ICON
	$("#o-mne .recents .rollover").append("<span></span>");
	$("#o-mne .recents .rollover").hover(function(){
		$(this).children("span").stop(true, true).fadeIn(600);
	},function(){
		$(this).children("span").stop(true, true).fadeOut(200);
	});

	//ABOUT - SCROLL TEXT
	$('#o-mne .scroll-text').mCustomScrollbar();
	
	
	//PORTFOLIO - CATEGORIES ZOOM ICON
	$("#galerie .rollover").append("<span></span>");
	$("#galerie .rollover").hover(function(){
		$(this).children("span").stop(true, true).fadeIn(600);
	},function(){
		$(this).children("span").stop(true, true).fadeOut(200);
	});
	
	
	// TIPSY - TOOLTIPS
	th.tipsy({ gravity: 'w', fade: true, offset: 17 });
	$("#close_bt").tipsy({ gravity: 'w', fade: true, offset: 15 });
	$("#close_base_bt").tipsy({ gravity: 'w', fade: true, offset: 44 });
	$('#internal-link-portfolio').tipsy({ gravity: 'w', fade: true, offset: 8 });
	$("#map_bt").tipsy({ gravity: 'w', fade: true, offset: 5 });
	$("#social a").each(function() { 
		 $(this).tipsy({ gravity: 'se', fade: true, offset: 7 });
	});
	
	
	//PRETTYPHOTO LIGHTBOX GALLERY
	$('a[data-rel]').each(function() {
		$(this).attr('rel', $(this).data('rel'));
	});
	$("a[rel^='prettyPhoto']").prettyPhoto({
        social_tools:false,
        theme: 'pp_default'
    });

	
	//MENU DEEPLINKING
	var hash = location.href.match(/(#.+)/);
	if (hash && hash.length) {
		hash = hash[0];
		$("#menu").find('a[href="'+hash+'"]').triggerHandler("click");
	};

	
	
	
	
	
	//////////////////////////////////////////////////////
	//CUSTOM FUNCTIONS

	//HIDE ALL SECTIONS
	function hideAll() {
		var t2 = 1500;	//EASING TIME VALUE - milliseconds
		slider.stop(true,true).animate({ opacity: 0, top: '210px' }, t2/2, 'easeOutQuint').delay(t2/2).hide(0);
		about.stop(true,true).animate({ opacity: 0, top: '210px' }, t2/2, 'easeOutQuint').delay(t2/2).hide(0);
		portfolio.stop(true,true).animate({ opacity: 0, top: '210px' }, t2/2, 'easeOutQuint').delay(t2/2).hide(0);
		contact.stop(true,true).animate({ opacity: 0, top: '210px' }, t2/2, 'easeOutQuint').delay(t2/2).hide(0);
		reel.stop(true,true).animate({ opacity: 0, top: '210px' }, t2/2, 'easeOutQuint').delay(t2/2).hide(0);
		awards.stop(true,true).animate({ opacity: 0, top: '210px' }, t2/2, 'easeOutQuint').delay(t2/2).hide(0);	
	};

	//OPEN CONTENT FUNCTION
	function openContent(e) {

		var id = e.currentTarget.id;
		var t = 1500;	//EASING TIME VALUE - milliseconds
		clickedItem = document.getElementById(id);

        $(alert).fadeOut(t);
        $(thumbs).fadeOut(t);

		
		//LINK ID EXCEPTION
		if (id !== 'link' && activeItem !== clickedItem) {
		
			//SET CURRENT SECTION
			section = $(clickedItem).attr("href");

		
			//BASE LAYER
			base.animate({ opacity: 1, left: '0px' }, t/2, 'easeInOutQuint');
			
			//PLACE AND ADJUST WIDTH OF MARKER
			marker.animate({ left: $(clickedItem).position().left + 25 }, t/2, 'easeOutQuint' );
			markerImg.animate({ width: $(clickedItem).outerWidth() + 10 }, t/2, 'easeOutQuint' );
			
			//HIDE ALL SECTIONS
			hideAll();

            //MEDIA PRELOAD HACK
            if (section == '#media'){
                console.log(section)
                $(section).css({left: 'auto'})
            }

			//LOAD SECTION
			$(section).stop(true,true).show().delay(t/2).animate({ opacity: 1, top: '190px' }, t, 'easeOutQuint');
			
			//DISABLE-ENABLED BUTTON
			$(clickedItem).addClass("disabled");
			$(activeItem).removeClass("disabled");
			activeItem = clickedItem;

			//IF ABOUT - UPDATE SCROLL
			if (section == '#o-mne') $('#o-mne .scroll-text').mCustomScrollbar("update");


		}
		
		//STOP VIMEO VIDEO
		Froogaloop('player1').api('pause');
		Froogaloop('player1').api('unload');

	};


	//SAMPLE OF INTERNAL LINK
	//OPEN PORTFOLIO (FROM ABOUT SECTION)
	$('#internal-link-portfolio').click(openPortfolio);
	function openPortfolio() {
		var id = 'menu_portfolio';
		var t = 1500;	//EASING TIME VALUE - milliseconds
		clickedItem = document.getElementById(id);
		
			//SET CURRENT SECTION
			section = $(clickedItem).attr("href");
		
			//BASE LAYER
			base.animate({ opacity: 1, left: '0px' }, t/2, 'easeInOutQuint');
			
			//PLACE AND ADJUST WIDTH OF MARKER
			marker.animate({ left: $(clickedItem).position().left + 25 }, t/2, 'easeOutQuint' );
			markerImg.animate({ width: $(clickedItem).outerWidth() + 10 }, t/2, 'easeOutQuint' );
			
			//HIDE ALL SECTIONS
			hideAll();
			
			//LOAD SECTION
			$(section).stop(true,true).show().delay(t/2).animate({ opacity: 1, top: '190px' }, t, 'easeOutQuint');
			
			//DISABLE-ENABLED BUTTON
			$(clickedItem).addClass("disabled");
			$(activeItem).removeClass("disabled");
			activeItem = clickedItem;
	};


	//CLOSE CONTENT
	function closeContent() {

		var t2 = 1000;	//EASING TIME VALUE - milliseconds

        $(alert).fadeIn(t2);
        $(thumbs).fadeIn(t2);

		//BASE LAYER
		base.animate({ opacity: 0, left: '-784px' }, t2, 'easeInQuint' );
		
		//MARKER
		marker.animate({ left: '-10px' }, t2, 'easeOutQuint' );
		markerImg.animate({ width: '10px' }, t2, 'easeOutQuint' );
		
		//DISABLE-ENABLED BUTTON
		$(activeItem).removeClass("disabled");
		activeItem = "none";
		
		//CLOSE SECTION
		$(section).stop(true,true).animate({ opacity: 0, top: '210px' }, t2, 'easeOutQuint');
		$(section).delay(t2).hide(0);
		
		//STOP VIMEO VIDEO
		Froogaloop('player1').api('pause');
		Froogaloop('player1').api('unload');
	};

	
	
	
	
	//////////////////////////////////////////////////////
	//CONTACT FORM STUFF

	//AJAX SCRIPT FOR CONTACT FORM VALIDATION
	var formOpt = { beforeSubmit:showLoader, success:checkStatus };
	$('#myForm').ajaxForm(formOpt);

	function showLoader(){
		$("#loader_icon").fadeIn("slow");
	};
			 
	function checkStatus(status){
		$("#loader_icon").fadeOut("slow");
		document.getElementById('ajax_loader').innerHTML = status;
	};

	
});




