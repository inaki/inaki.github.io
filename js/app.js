var exec = function(){
	me = new Vivus('me', {
		duration: 50,
	   	onReady: function (myVivus) {
	          // `el` property is the SVG element
	          // myVivus.el.setAttribute('height', 'auto');
	    }
	});

	iaminaki = new Vivus('iaminaki', {
		duration: 850,
	   	onReady: function (myVivus) {
	          // `el` property is the SVG element
	          // myVivus.el.setAttribute('height', 'auto');
	    }
	});
};


setTimeout('exec()', 100);

var goToWork = function(){
	me.play(-3);
	iaminaki.play(-3);
	setTimeout('window.location.href = "/work";', 1000);
	$( "h2" ).switchClass( "quote", "disappearing", 1000, "easeInOutQuad" );
    $( "span" ).switchClass( "android", "disappearing", 1000, "easeInOutQuad" );
    $( "ul.nav" ).switchClass( "fadeInUp", "fadeOutDown", 1000, "easeInOutQuad" );
}

var goToAbout = function(){
	me.play(-3);
	iaminaki.play(-3);
	setTimeout('window.location.href = "/about";', 1200);
	$( "h2" ).switchClass( "quote", "disappearing", 1000, "easeInOutQuad" );
    $( "span" ).switchClass( "android", "disappearing", 1000, "easeInOutQuad" );
    $( ".nav" ).switchClass( "fadeInUp", "fadeOutDown", 1000);
}

var goToResume = function(){
	me.play(-3);
	iaminaki.play(-3);
	setTimeout('window.location.href = "/resume";', 1200);
	$( "h2" ).switchClass( "quote", "disappearing", 1000, "easeInOutQuad" );
    $( "span" ).switchClass( "android", "disappearing", 1000, "easeInOutQuad" );
    $( ".nav" ).switchClass( "fadeInUp", "fadeOutDown", 1000);
}

var goToContact = function(){
	me.play(-3);
	iaminaki.play(-3);
	setTimeout('window.location.href = "/contact";', 1200);
	$( "h2" ).switchClass( "quote", "disappearing", 1000, "easeInOutQuad" );
    $( "span" ).switchClass( "android", "disappearing", 1000, "easeInOutQuad" );
    $( ".nav" ).switchClass( "fadeInUp", "fadeOutDown", 1000);
}

// If persisted then it is in the page cache, force a reload of the page.
window.onpageshow =function(event){
	if(event.persisted){        
		document.body.style.display ="none";        
		location.reload();
    }
};

setTimeout('$("#me").attr("class", "gray");', 100);
setTimeout('$("#iaminaki").attr("class", "gray");', 100);


