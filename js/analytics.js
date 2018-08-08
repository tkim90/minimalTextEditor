var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-44654209-4']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


// Track how how many times each button is pressed.
function trackMuteButton(e) {
    _gaq.push(['_trackEvent', e.target.id, 'clicked']);
  };

var buttons = document.querySelectorAll('span');
for (var i = 0; i < buttons.length; i++) {
buttons[i].addEventListener('click', trackButtonClick);
}