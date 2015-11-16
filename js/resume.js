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


function goToGithub(){
  window.location.href = "https://github.com/inaki";
}

function goToLinkedin(){
  window.location.href = "https://www.linkedin.com/in/imanol-aranzadi-45053332";
}
