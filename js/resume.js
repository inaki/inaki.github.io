var github = new Vivus('github', {
    animTimingFunction: Vivus.EASE,
   	onReady: function (myVivus) {
          // `el` property is the SVG element
          // myVivus.el.setAttribute('height', 'auto');
    }
});

var linkedin = new Vivus('linkedin', {
    animTimingFunction: Vivus.EASE,
   	onReady: function (myVivus) {
          // `el` property is the SVG element
          // myVivus.el.setAttribute('height', 'auto');
    }
});


setTimeout('$("#github").attr("class", "gray");', 100);
setTimeout('$("#linkedin").attr("class", "gray");', 100);


var goToHome = function(){
	github.play(-3);
	setTimeout('window.location.href = "/";', 1000);
}

var goToGithub = function(){
	github.play(-3);
	linkedin.play(-3);
	setTimeout('window.location.href = "http://www.github.com/inaki";', 400);
	$( ".resume-content" ).switchClass( "fadeInUp", "fadeOutDown", 1000, "easeInOutQuad" );
	$( ".yo" ).switchClass("fadeInDown", "fadeOut", 500, "easeInOutQuad" );
}

var goToLinkedin = function(){
	github.play(-3);
	linkedin.play(-3);
	setTimeout('window.location.href = "https://www.linkedin.com/pub/imanol-aranzadi/32/533/450";', 400);
	$( ".resume-content" ).switchClass( "fadeInUp", "fadeOutDown", 1000, "easeInOutQuad" );
	$( ".yo" ).switchClass("fadeInDown", "fadeOut", 500, "easeInOutQuad" );
}


