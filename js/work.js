var farmstand = new Vivus('farmstand', {
	duration: 50,
   	onReady: function (myVivus) {
          // `el` property is the SVG element
          // myVivus.el.setAttribute('height', 'auto');
    }
});

var markets = new Vivus('markets', {
	duration: 50,
   	onReady: function (myVivus) {
          // `el` property is the SVG element
          // myVivus.el.setAttribute('height', 'auto');
    }
});

var acres = new Vivus('acres', {
	duration: 50,
   	onReady: function (myVivus) {
          // `el` property is the SVG element
          // myVivus.el.setAttribute('height', 'auto');
    }
});

// setTimeout('$("#farmstand").attr("class", "gray");', 100);


var goToHome = function(){
	farmstand.play(-3);
	markets.play(-3);
	acres.play(-3);
	setTimeout('window.location.href = "/";', 1000);
}