(function() {
  var packages = {};
  this.provide = function(name, obj) {
    packages[name] = obj;
  };
  
  this.require = function(name) {
    return packages[name];
  };
}());