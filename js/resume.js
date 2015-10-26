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