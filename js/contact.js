var contact = new Vivus('contact', {
   	onReady: function (myVivus) {
          // `el` property is the SVG element
          // myVivus.el.setAttribute('height', 'auto');
    }
});

setTimeout('$("#contact").attr("class", "gray");', 100);

var goToHome = function(){
	contact.play(-3);
	setTimeout('window.location.href = "/";', 1000);
}