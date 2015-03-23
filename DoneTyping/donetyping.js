
(function($){
  var keyup_and_press;
  var blur;

  $.fn.extend({
    donetyping: function(callback, timeout){
      timeout = timeout || 1e3; // 1 second default timeout
      var timeoutReference,
      doneTyping = function(el){
        if (!timeoutReference) return;
        timeoutReference = null;
        callback.call(el);
      };
      return this.each(function(i,el){
        var $el = $(el);
        // Chrome Fix (Use keyup over keypress to detect backspace)
        // thank you @palerdot

        keyup_and_press = keyup_and_press || function(e){
          // This catches the backspace button in chrome, but also prevents
          // the event from triggering too premptively. Without this line,
          // using tab/shift+tab will make the focused element fire the callback.
          if (e.type=='keyup' && e.keyCode!=8) return;

          // Check if timeout has been set. If it has, "reset" the clock and
          // start over again.
          if (timeoutReference) clearTimeout(timeoutReference);
          timeoutReference = setTimeout(function(){
            // if we made it here, our timeout has elapsed. Fire the
            // callback
            doneTyping(el);
          }, timeout);
        };

        blur = blur || function(){
          // If we can, fire the event since we're leaving the field
          doneTyping(el);
        };

        $el.is(':input') && $el.on('keyup keypress', keyup_and_press).on('blur',blur);
      });
    },

    undonetyping : function(){
      
      return this.each(function(i, el){
        var $el = $(el);
        $el
          .off('keyup keypress')
          .off('blur');
        });
    }

  });
})(jQuery);
