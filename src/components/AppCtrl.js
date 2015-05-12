var app = require('./app');
var moment = require('moment');
var FinnishHolidays = require('finnish-holidays-js');

var KEY_LEFT = 37;
var KEY_RIGHT = 39;

app.controller('AppCtrl', function($log, $scope, utils) {
  var currentDate = moment();
  var currentIndex = -1;

  findInitial();

  function findInitial() {
    var found = false;
    var holidays = getHolidays();

    angular.forEach(holidays, function(h, i) {
      var hDate = moment([h.year, h.month - 1, h.day]);

      if (!found && hDate >= currentDate) {
        found = true;
        $scope.currentHoliday = h;
        currentDate = moment([h.year, h.month - 1, h.day]).add(1, 'days');
        currentIndex = i;
      }
    });

    if (!found) {
      nextMonth();
      findInitial();
    }
  }

  function gotoNext() {
    var holidays = getHolidays();

    if (holidays.length > 0 && currentIndex < holidays.length - 1) {
      $scope.currentHoliday = holidays[currentIndex + 1];
      currentIndex += 1;
    } else {
      nextMonth();
      gotoNext();
    }
  }

  function gotoPrevious() {
    var holidays = getHolidays();

    if (holidays.length > 0 && currentIndex > 0) {
      $scope.currentHoliday = holidays[currentIndex - 1];
      currentIndex -= 1;
    } else {
      previousMonth();
      gotoPrevious();
    }
  }

  function nextMonth() {
    currentIndex = -1;
    currentDate = currentDate.add(1, 'month').startOf('month');
  }

  function previousMonth() {
    currentDate = currentDate.subtract(1, 'month').endOf('month');
    currentIndex = getHolidays().length;
  }

  function getHolidays() {
    var m = currentDate.get('month') + 1;
    var y = currentDate.get('year');
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
