var app = require('./app');

app.directive('keyboard', function($document, $rootScope) {
  return {
    restrict: 'A',
    link: function() {
      $document.bind('keydown', function(event) {
        $rootScope.$broadcast('keyboard.pressed', event.which);
      });
    }
  };
});
