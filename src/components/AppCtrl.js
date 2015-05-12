var app = require('./app');
var moment = require('moment');
var FinnishHolidays = require('finnish-holidays-js');

var KEY_LEFT = 37;
var KEY_RIGHT = 39;

app.controller('AppCtrl', function($scope, utils) {
  var currentDate = moment();

  gotoNext();

  function gotoNext() {
    var found = false;
    var holidays = loadHolidays(currentDate);

    angular.forEach(holidays, function(h) {
      var hDate = moment([h.year, h.month - 1, h.day]);

      if (!found && hDate >= currentDate) {
        found = true;
        $scope.currentHoliday = h;
        currentDate = moment([h.year, h.month - 1, h.day]).add(1, 'days');
      }
    });

    if (!found) {
      currentDate = currentDate.add(1, 'month').startOf('month');
      gotoNext();
    }
  }

  function gotoPrevious() {
    // TODO: Fix.
    var found = false;
    var holidays = loadHolidays(currentDate);

    angular.forEach(holidays, function(h) {
      var hDate = moment([h.year, h.month - 1, h.day]);

      if (!found && hDate <= currentDate) {
        found = true;
        $scope.currentHoliday = h;
        currentDate = moment([h.year, h.month - 1, h.day]).subtract(1, 'days');
      }
    });

    if (!found) {
      currentDate = currentDate.subtract(1, 'month').endOf('month');
      gotoPrevious();
    }
  }

  function loadHolidays(date) {
    var m = date.get('month') + 1;
    var y = date.get('year');
    return FinnishHolidays.month(m, y);
  }

  $scope.getHoliday = function() {
    return $scope.currentHoliday;
  };

  $scope.getDate = function() {
    return utils.getDateMedium($scope.currentHoliday);
  };

  $scope.getUntil = function() {
    return utils.getDaysUntil($scope.currentHoliday);
  };

  $scope.getImage = function() {
    return utils.getImage($scope.currentHoliday);
  };

  $scope.previous = function() {
    gotoPrevious();
    $scope.$apply();
  };

  $scope.next = function() {
    gotoNext();
    $scope.$apply();
  };

  $scope.$on('keyboard.pressed', function(event, key) {
    if (key === KEY_LEFT) {
      return $scope.previous();
    }

    if (key === KEY_RIGHT) {
      return $scope.next();
    }
  });
});
