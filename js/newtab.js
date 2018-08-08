// To-Do
// don't fade out after mouse is moved
// fullscreen button
// auto-size based on resolution
// undo function
// 2 sp tab, not 4
// save to .txt
// multiple tabs open simultaneously, up to 5



$(document).ready(function () {  
  // play typing sounds
  $('.canvas').on('keyup', function(e) {
    if (e.which <= 90 && e.which >= 48) {
      sound.play();
    }
  });

  // hide stuff when you start typing
  $('.canvas').on('keydown', hidePanel);

  // unhide stuff when you move mouse
  $('.canvas').on('mousemove', function() {
    $(this)
      .css('border','1px dashed #999')
    $('.btns').show();
  });

  // toggle mute button
  $('#vol-btn').on('click', function() {
    if ($(this).text() == '+') {
      console.log('Sound muted.')
      $(this).text('-');
      sound.mute(true)
    } else {
      console.log('Sound unmuted.')
      $(this).text('+')
      sound.mute(false)
    }
  });

  // night mode button
  $('.night-btn').on('click', function () {
    $("body").toggleClass('night');
    $("textarea").toggleClass('canvas-dark');
  });

  // toggle fullscreen
  $('#fullscreen').on('click', function() {

      console.log('Toggled fullscreen')
    
  });

}); // end document


// tab to indent
$(document).delegate('#canvas', 'keydown', function(e) {
  let keyCode = e.keyCode || e.which;

  if (keyCode == 9) {
    e.preventDefault();
    let start = this.selectionStart;
    let end = this.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    $(this).val($(this).val().substring(0, start)
                + "  "
                + $(this).val().substring(end));

    // put caret at right position again
    this.selectionStart =
    this.selectionEnd = start + 1;
  }
});





//////////////
//// MISC ////
//////////////

// initialize typing sound
let sound = new Howl({
  src: ['assets/t2.wav']
});


// function to hide stuff
function hidePanel(e) {
    $('.canvas, .btns')
    .delay(3000)
    .queue(function(next) {
      $(this).css('border','none');
      $('.btns').hide();
      next();
    });
  }