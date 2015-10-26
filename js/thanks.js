var thanks = new Vivus('thanks', {
	type: 'delayed',
    duration: 800,
    animTimingFunction: Vivus.EASE,
   	onReady: function (myVivus) {
          // `el` property is the SVG element
          // myVivus.el.setAttribute('height', 'auto');
    }
});


setTimeout('$("#thanks").attr("class", "gray");', 100);


var goToHome = function(){
	thanks.play(-3);
	setTimeout('window.location.href = "/";', 1000);
}