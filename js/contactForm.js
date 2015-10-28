var contactForm = new Vivus('contactForm', {
	duration: 90,
   	onReady: function (myVivus) {
          // `el` property is the SVG element
          // myVivus.el.setAttribute('height', 'auto');
    }
});

var shootMessage = new Vivus('shootMessage', {
	duration: 890,
   	onReady: function (myVivus) {
          // `el` property is the SVG element
          // myVivus.el.setAttribute('height', 'auto');
    }
});

var send = new Vivus('send', {
	duration: 100,
   	onReady: function (myVivus) {
          // `el` property is the SVG element
          // myVivus.el.setAttribute('height', 'auto');
    }
});

setTimeout('$("#contactForm").attr("class", "gray");', 100);
setTimeout('$("#send").attr("class", "gray");', 100);
setTimeout('$("#shootMessage").attr("class", "gray");', 100);

var goToHome = function(){
	contactForm.play(-3);
	send.play(-3);
	setTimeout('window.location.href = "/";', 1000);
}

var submitContact = function(){
	document.getElementById("form").submit();
	contactForm.play(-3);
	$('.send').addClass('animated bounceOutRight');
	$( ".label" ).switchClass( "fadeInUp", "fadeOut", 1000, "easeInOutQuad" );
	$('.contact-input').addClass('white');
	setTimeout('window.location.href = "/thanks.html";', 1000);
	console.log("form submitted");
}