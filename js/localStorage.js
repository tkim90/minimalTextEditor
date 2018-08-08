// Load local storage values from prev session
var textAreaValue = localStorage.getItem("textAreaVal");
var soundMode = localStorage.getItem("soundModeState");
var nightMode = localStorage.getItem("nightModeState");


$(document).ready(function () {
  // focus on load
  $("textarea").focus();
  // If there's stored text, then load it.
  if (textAreaValue) {
    $("textarea").val(textAreaValue);
    $("textarea").attr("placeholder", "");
  }

  // If it was muted in last session, load it.
  if (soundMode) {
    if (soundMode === '-') { // if -1, then it was muted in last session.
      $("#vol-btn").text('-');
      sound.mute(true)
      // if not muted, load it unmuted
    }    
  }

  // Load night mode if it was enabled in last session.
  if (nightMode) {
    $("body").addClass('night');
    $("textarea").toggleClass('canvas-dark');
  };

});


// Save values from current session.

$(document).ready(function () {
  // Save text to storage
  $("textarea").on('keyup propertychange paste', function () {
    localStorage.setItem("textAreaVal", $(this).val());
  });

  // Save sound mode choice to storage
  $("#vol-btn").on('click', function () {
    localStorage.setItem("soundModeState", $(this).text());
  });

  // Save night mode choice to storage
  $(".night-btn").on('click', function () {
    localStorage.setItem("nightModeState", $('body').attr('class'));
  });

});