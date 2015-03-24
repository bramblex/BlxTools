
// require jquery, lodash
// Tue Mar 24 17:09:51
(function(){

  var Filter = function Filter(handler, wait, event){
    this._binding_list = [];

    this._wait = wait || 300;
    this._event = event || 'input';

    var _ = window._ || {debounce: function(func){return func;}};
    this._handler = _.debounce(handler, this._wait); 
  };

  Filter.prototype.bind = function(selector){
    this._binding_list.push(selector);
    $('body')
      .on(this._event, selector, this._handler);
  };

  Filter.prototype.unbind = function(selector){
    if (typeof(selector) !== 'undefined'){
      $('body').off(this._event, selector, this._handler);
      var i = this._binding_list.indexOf(selector);
      this._binding_list.splice(i, 1);
    }
    else{
      _this = this;
      this._binding_list.forEach(function(i){
        _this.unbind(i);
      });
    }
  };

  Filter.prototype.trigger = function(selector){
    if (typeof(selector) !== 'undefined'){
      $(selector).trigger(this._event);
    }
    else{
      var _this = this;
      this._binding_list.forEach(function(i){
        $(i).trigger(_this._event);
      });
    }
  };

  window.Filter = Filter;

  // only get
  var AjaxProxy = function AjaxProxy(url, callback){
    this._url = url;
    this._callback = callback || function(d){console.log(d)};
    this._last_request = null;

    this._loadStart = function(){};
    this._loadEnd = function(){};
  };

  AjaxProxy.prototype.get = function(args){

    this.abort();
    this.loadStart();

    var _this = this;
    var request = $.get(this._url, args, function(data){
      if ( _this._last_request === request ){
        _this._callback(data);
        _this._last_request = null;
        _this.loadEnd();
      };
    });

    this._last_request = request;
    return request;
  };

  AjaxProxy.prototype.abort = function(){
    if (!!this._last_request){
      this._last_request.abort();
      this._last_request = null;
    }
  };

  AjaxProxy.prototype.loadStart = function(loadStart){
    if (!!loadStart){
      this._loadStart = loadStart;
    }
    else{
      this._loadStart();
    }
  };

  AjaxProxy.prototype.loadEnd = function(loadEnd){
    if (!!loadEnd){
      this._loadEnd = loadEnd;
    }
    else{
      this._loadEnd();
    }
  };

  window.AjaxProxy = AjaxProxy;

})();
