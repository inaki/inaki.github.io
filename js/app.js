var exec = function(){
	me = new Vivus('me', {
		duration: 50,
	   	onReady: function (myVivus) {
	          // `el` property is the SVG element
	          // myVivus.el.setAttribute('height', 'auto');
	    }
	});

	iaminaki = new Vivus('iaminaki', {
		duration: 850,
	   	onReady: function (myVivus) {
	          // `el` property is the SVG element
	          // myVivus.el.setAttribute('height', 'auto');
	    }
	});
};


setTimeout('exec()', 100);
setTimeout('$("#github").attr("class", "gray");', 100);
setTimeout('$("#linkedin").attr("class", "gray");', 100);




// If persisted then it is in the page cache, force a reload of the page.
window.onpageshow =function(event){
	if(event.persisted){        
		document.body.style.display ="none";        
		location.reload();
    }
};

setTimeout('$("#me").attr("class", "gray");', 100);
setTimeout('$("#iaminaki").attr("class", "gray");', 100);


