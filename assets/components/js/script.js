$('#toggle').click(function() {
   $(this).toggleClass('active');
   $('#overlay').toggleClass('open');
});

$('#overlay a').click(function() {
   $('#toggle').toggleClass('active');
   $('#overlay').toggleClass('open');
});
