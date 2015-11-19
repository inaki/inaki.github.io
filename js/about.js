var data4change = new Vivus('data4change', {
    animTimingFunction: Vivus.EASE,
   	onReady: function (myVivus) {
          // `el` property is the SVG element
          // myVivus.el.setAttribute('height', 'auto');
    }
});

var plane = new Vivus('plane', {
    animTimingFunction: Vivus.EASE,
    onReady: function (myVivus) {
          // `el` property is the SVG element
          // myVivus.el.setAttribute('height', 'auto');
    }
});

var nenas = new Vivus('nenas', {
    animTimingFunction: Vivus.EASE,
    onReady: function (myVivus) {
          // `el` property is the SVG element
          // myVivus.el.setAttribute('height', 'auto');
    }
});




setTimeout('$("#data4change").attr("class", "gray");', 100);
setTimeout('$("#plane").attr("class", "gray");', 100);
setTimeout('$("#nenas").attr("class", "gray");', 100);


function goTodata4change(){
  window.location.href = "https://data4chan.ge";
}

