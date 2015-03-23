(function(){
  $('pre').addClass('prettyprint linenums');

  $('head').append($('<link rel="stylesheet" type="text/css" media="screen" href="http://bramblex.github.io/BlxTools/cdn/prettify/prettify.css">'));
  $('head').append($('<script src="http://bramblex.github.io/BlxTools/cdn/prettify/prettify.js"></script>'));

  var timer = setInterval(function(){
    if ( typeof(prettyPrint) === 'function' ){
      prettyPrint();
      clearInterval(timer);
    }
  }, 100);

})();
