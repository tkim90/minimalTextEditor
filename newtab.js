// To-Do
// don't fade out after mouse is moved
// multiple tabs
// reduce indent space from 4 to 2
// make screen responsive to larger monitors

// DONE
// fullscreen mode
// add save button


let editor = {


  init: function () {
    // initialize typing sound
    let sound = new Howl({
      src: ['assets/t2.wav']
    });

    // play typing sounds
    $('.canvas').on('keyup', function(e) {
      if ( (e.which <= 90 && e.which >= 48) || (e.which <=222 && e.which >= 219) || (e.which <= 192 && e.which >= 186) ) {
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
        $(this).text('-');
        sound.mute(true)
      } else {
        $(this).text('+')
        sound.mute(false)
      }
    });

    // night mode button
    $('.night-btn').on('click', function () {
      $("body").toggleClass('night');
      $("textarea").toggleClass('canvas-dark');
    });

    // save button
    $('#save').on('click', function() {
      saveFile();
    })

    // toggle fullscreen button 
    $('#fullscreen').on('click', function () {
      console.log('god fucking damnit i fucking called the fucking vent listener fuck')
      toggleFullscreen();
      console.log('fucking stopped calling it fucking cunt')
    });

    // tab to indent
    $(document).delegate('#canvas', 'keydown', function(e) {
      let keyCode = e.keyCode || e.which;

      if (keyCode == 9) {
        e.preventDefault();
        let start = this.selectionStart;
        let end = this.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        $(this).val($(this).val().substring(0, start)
                    + "\t"
                    + $(this).val().substring(end));

        // put caret at right position again
        this.selectionStart =
        this.selectionEnd = start + 1;
      }
    });


    ///////////////////////
    // === Functions === //
    ///////////////////////
    function saveFile () {
    $('#prompt').addClass("active");
    $('#prompt #fileName')
      .val("filename.txt")
      .focus().select();
    $('#prompt #fileSave').click(function(){
      makeTextFile();
      $('#prompt').removeClass("active");
    });
      $('#prompt #fileCancel').click(function(){
        $('#prompt').removeClass("active");
      });
    }


    function makeTextFile () {
      let link = document.createElement("a");
      link.download = $('#prompt #fileName').val();
      if(link.download =="")
        link.download = "document.txt";
      link.href = "data:text/plain,"+data.textEncode($('.canvas').val());
      link.click();
    }

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

    function toggleFullscreen(){
      if ( document.webkitIsFullScreen ) {
        document.webkitCancelFullScreen();
      } else {
        document.documentElement.webkitRequestFullScreen();
      }
}


  } // end init function
  

} // end editor object



$(document).ready(function () {
  editor.init();
});