/*------------------------------------*\
	Page loader
\*------------------------------------*/

var $loader = $(".loader");

function hideLoader() {
	$loader.hide();
}

function loadPage() {
	var loaderTl = new TimelineMax({
		onComplete: hideLoader
	});

	loaderTl
		.to($loader, .9, { yPercent: 100, ease: Power4.easeInOut })
		.from($(".header__contact"), .3, {
			y: -20,
			autoAlpha: 0,
			ease: Power2.easeInOut
		}, .3)
		.from($(".profile__heading"), .3, {
			y: -20,
			autoAlpha: 0,
			ease: Power2.easeInOut
		}, .6);
}

$("<img/>").attr("src", "assets/img/home-bg.jpg").on("load", function() {
	// prevent memory leaks
	$(this).remove();
	$("body").css("background-image", "url(assets/img/home-bg.jpg)");
	$(".loader__spinner").hide();
	loadPage();
});


/*---------------------------------------*\
	ScrollMagic scroll interactions library
\*---------------------------------------*/

var controller = new ScrollMagic.Controller();
var headerHeight = $(".header").height();

// anchor link scrolling
controller.scrollTo(function (pos) {
	TweenMax.to(window, 1, {scrollTo: { y: pos }, ease: Power2.easeOut});
});

$(document).on("click", "a[href^='#']", function (e) {
	var target = $(this).attr("href");
	var scrollToPosition = $(target).offset().top - headerHeight;

	if ($(target).length > 0) {
		e.preventDefault();
		controller.scrollTo(scrollToPosition);
	}
});



/*-------------------------------------*\
	ScrollReveal scroll animations plugin
\*-------------------------------------*/

window.sr = ScrollReveal();
sr.reveal("[data-scroll-reveal]", {
	distance: "20vh",
	opacity: 1,
	scale: 1,
	easing: "ease-out",
	reset: true,
	viewOffset: { top: -1000, right: 0, bottom: 0, left: 0 },
});



/*------------------------------------*\
	Subscribe Form
\*------------------------------------*/

$(document).ready(function() {
	$(".js-clear-input").each(function(){
		var input = $(this);
		var defaultValue = input.val();

		// reset input box on focus
		input.focus(function() {
			if(input.val() == defaultValue) {
				input.val("");
			}
		// restore default input value
		}).blur(function(){
			if(input.val().length == 0) {
					input.val(defaultValue);
				}
		});
	});
});

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function validateEmailForm() {
	var email = $("#email").val();
	
	if (!validateEmail(email)) {
		alert("Invalid email address");
	}

	return false;
}

$(".js-validate-email").bind("click", validateEmailForm);



/*------------------------------------*\
	Menu navigation
\*------------------------------------*/

function toggleNav() {
	$("body").toggleClass("nav-active");
	$(".hamburger").toggleClass("is-active");
	if ($("body").hasClass("nav-active")) {
		TweenMax.staggerFromTo($(".nav--menu__link"), .3,
			{ x: -50, autoAlpha: 0 },
			{ x: 0, autoAlpha: 1 },
			.1
		);
	}
}

function attachToggleNav() {
	$(".js-toggle-nav").click(function() {
		toggleNav();
	});
}

function hideNav() {
	$("body").removeClass("nav-active");
	$(".hamburger").removeClass("is-active");
}

function attachHideNav() {
	$(".js-nav").click(function() {
		hideNav();
	});
}

attachToggleNav();
attachHideNav();



/*------------------------------------*\
	Sticky header
\*------------------------------------*/

function hideStickyHeader() {
	$(".header").removeClass("header--sticky");
}

$(window).scroll(function() {
	var aboutOffsetTop = $(".about").offset().top - (headerHeight * 3);

	if ($(this).scrollTop() >= aboutOffsetTop && ($(window).outerWidth() >= 768)){
		$(".header").addClass("header--sticky");
	} else {
		hideStickyHeader();
	}
});

$(window).resize(function() {
	if ($(window).outerWidth() < 768) {
		hideStickyHeader();
	}
});



/*------------------------------------*\
	Animated Counter
\*------------------------------------*/

var a = 0;

$(window).scroll(function() {
	var counterOffsetTop = $("#counter").offset().top - window.innerHeight;

	if (a == 0 && $(window).scrollTop() > counterOffsetTop) {
		$(".js-animate-counter").each(function() {
			var $this = $(this);
			var countTo = $this.attr("data-count");

			$({
				countNum: 0
			}).animate({
				countNum: countTo
			},
			{
				duration: 2000,
				easing: "swing",
				step: function() {
					$this.text(Math.floor(this.countNum));
				},
				complete: function() {
					$this.text(this.countNum);
				}
			});
		});
		a = 1;
	}
});