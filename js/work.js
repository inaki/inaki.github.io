var work = new Vivus('work', {
   	onReady: function (myVivus) {
          // `el` property is the SVG element
          // myVivus.el.setAttribute('height', 'auto');
    }
});


setTimeout('$("#work").attr("class", "gray");', 100);


var goToHome = function(){
	work.play(-3);
	setTimeout('window.location.href = "/";', 1000);
}