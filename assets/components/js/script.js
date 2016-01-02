$('#toggle').click(function() {
   $(this).toggleClass('active');
   $('#overlay').toggleClass('open');
});

var exec = function(){
	new Vivus('me', {
		duration: 50,
	   	onReady: function (myVivus) {
	          // `el` property is the SVG element
	          // myVivus.el.setAttribute('height', 'auto');
	    }
	});
};


setTimeout('exec()', 100);
