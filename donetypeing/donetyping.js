
(function($){
  var keyupAndkeypress = null;
  var blur = null;
  // using to unbinding;

  $.fn.extend({
    donetyping: function(callback,timeout){

      timeout = timeout || 1000;
      var timeoutReference,
      doneTyping = function(el){
        if (!timeoutReference) return;
        timeoutReference = null;
        callback.call(el);
      };

      return this.each(function(i,el){
        var $el = $(el);
        
        keyupAndkeypress = function(e){
          if (e.type=='keyup' && e.keyCode!=8) return;

          if (timeoutReference) clearTimeout(timeoutReference);
          timeoutReference = setTimeout(function(){
            doneTyping(el);
          }, timeout);
        };

        blur = function(){
          doneTyping(el);
        };

        $el.is(':input') && $el.on('keyup keypress', keyupAndkeypress).on('blur', blur);
      });
    },

    // unbinding
    undonetyping : function(){
      return this.each(function(i, el){
        $el = $(el);
        $el.off('keyup keypress', keyupAndkeypress).off('blur', blur);
      });
    }

  });
})(jQuery);
