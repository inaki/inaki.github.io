var skills = new Vivus('skills', {
   	onReady: function (myVivus) {
          // `el` property is the SVG element
          // myVivus.el.setAttribute('height', 'auto');
    }
});

setTimeout('$("#skills").attr("class", "gray");', 100);

var goToHome = function(){
	skills.play(-3);
	setTimeout('window.location.href = "/";', 1000);
}