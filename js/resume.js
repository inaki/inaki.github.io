var cfa = new Vivus('cfa', {
    animTimingFunction: Vivus.EASE,
   	onReady: function (myVivus) {
          // `el` property is the SVG element
          // myVivus.el.setAttribute('height', 'auto');
    }
});


setTimeout('$("#cfa").attr("class", "gray");', 100);


var goToHome = function(){
	cfa.play(-3);
	setTimeout('window.location.href = "/";', 1000);
}