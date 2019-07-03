/*
TO DO
  sound mute fails to save in new tab
  sound mute + dark mode ... fails to save mute and dark mode
  change tabs to spaces
  reduce indent space from 4 to 2 (tab in new line )
  don't fade out after mouse is moved
  make screen responsive to larger monitors
  make textBox editable thru drag
  undo function
  multiple tabs

DONE
  auto-set download filename.txt to today's date + time
*/

let editor = {

  init: function () {
    let sound = new Howl({ src: ['assets/t2.wav'] });
    
    // play sound while typing
    $('.textBox').on('keydown', function(e) {
      if ( (e.which <= 90 && e.which >= 48) 
      || (e.which <=222 && e.which >= 219)
      || (e.which <= 192 && e.which >= 186) ) {
        console.log('Playing sound!')
        sound.play();
      }
    });

    // hide panel when I start typing
    $('.textBox').on('keydown', hidePanel);

    // hide panel on mouse move
    $('.textBox').on('mousemove', function() {
      $(this).css('border','1px dashed #999');
      $('.btns').show();
    });

    // toggle typing button
    $('#vol-btn').on('click', function() {
      if ($(this).text() == '+') {
        $(this).text('-');
        sound.mute(true);
      } else {
        $(this).text('+');
        sound.mute(false);
      }
    });

    // toggle dark mode
    $('.night-btn').on('click', function () {
      $("body").toggleClass('night');
      $("textarea").toggleClass('textBox-dark');
    });

    // save button
    $('#save').on('click', function() {
      saveFile();
    })

    // toggle fullscreen button 
    $('#fullscreen').on('click', function () {
      toggleFullscreen();
    });

    // tab to indent
    $('#textBox').on('keydown', function(e) {
      if (e.keyCode == 9 || e.which == 9) {
        e.preventDefault();
        var s = this.selectionStart;
        $(this).val(function(i, v) {
          return v.substring(0, s) + "\t" + v.substring(this.selectionEnd)
        });
        this.selectionEnd = s + 1;
      }
    });

    // ---Functions--- //
    function getDate() {
      var d = new Date();
      var month = d.getMonth()+1;
      var day = d.getDate();
      var hour = d.getHours();
      var min = d.getMinutes();

      return output = d.getFullYear() + '-' +
        (month<10 ? '0' : '') + month + '-' +
        (day<10 ? '0' : '') + day + '-' +
        hour + '-' + min;
    }

    function saveFile () {
      $('#prompt').addClass("active");
      $('#prompt #fileName')
        .val(getDate() + ".txt")
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
      if(link.download =="") { link.download = "document.txt"; }
      link.href = "data:text/plain,"+data.textEncode($('.textBox').val());
      link.click();
    }

    function hidePanel(e) {
        $('.textBox, .btns')
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
