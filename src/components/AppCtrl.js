var app = require('./app');
var moment = require('moment');
var FinnishHolidays = require('finnish-holidays-js');

var KEY_LEFT = 37;
var KEY_RIGHT = 39;

app.controller('AppCtrl', function($timeout, $log, $scope, utils) {
  var currentHoliday;
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
        currentHoliday = h;
        currentDate = moment([h.year, h.month - 1, h.day]).add(1, 'days');
        currentIndex = i;
        setImageClass();
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
      currentHoliday = holidays[currentIndex + 1];
      currentIndex += 1;
      hideImage();

      $timeout(function() {
        setImageClass();
      }, 300);
    } else {
      nextMonth();
      gotoNext();
    }
  }

  function gotoPrevious() {
    var holidays = getHolidays();

    if (holidays.length > 0 && currentIndex > 0) {
      hideImage();
      currentHoliday = holidays[currentIndex - 1];
      currentIndex -= 1;

      $timeout(function() {
        setImageClass();
      }, 300);
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

  function setImageClass(holiday) {
    $scope.imageClass = getImageClass(currentHoliday.description);
    showImage();
  }

  function hideImage() {
    $scope.imageVisibleClass = '';
  }

  function showImage() {
    $scope.imageVisibleClass = 'background-image--visible';
  }

  function getImageClass(day) {
    switch (day) {
      case "All Saint's Day":
        return 'background-image--all-saints-day';

      case 'Ascension Day':
        return 'background-image--ascension-day';

      case 'Christmas Day':
        return 'background-image--christmas-day';

      case 'Christmas Eve':
        return 'background-image--christmas-eve';

      case 'Easter Monday':
        return 'background-image--easter-monday';

      case 'Easter Sunday':
        return 'background-image--easter-sunday';

      case 'Epiphany':
        return 'background-image--epiphany';

      case 'Good Friday':
        return 'background-image--good-friday';

      case 'Independence Day':
        return 'background-image--independence-day';

      case 'May Day':
        return 'background-image--may-day';

      case 'Midsummer Day':
        return 'background-image--midsummer-day';

      case 'Midsummer Eve':
        return 'background-image--midsummer-eve';

      case "New Year's Day":
        return 'background-image--new-year';

      case 'Pentecost':
        return 'background-image--pentecost';

      case "St. Stephen's Day":
        return 'background-image--st-stephens-day';

      case 'Midsummer Eve':
        return 'background-image--midsummer-eve';
    }
  }

  $scope.getHoliday = function() {
    return currentHoliday;
  };

  $scope.getDate = function() {
    return utils.getDateMedium(currentHoliday);
  };

  $scope.getUntil = function() {
    return utils.getDaysUntil(currentHoliday);
  };

  $scope.getImage = function() {
    return utils.getImage(currentHoliday);
  };

  $scope.previous = function() {
    gotoPrevious();
  };

  $scope.next = function() {
    gotoNext();
  };

  $scope.$on('keyboard.pressed', function(event, key) {
    if (key === KEY_LEFT) {
      $scope.previous();
    }

    if (key === KEY_RIGHT) {
      $scope.next();
    }

    $scope.$apply();
  });
});
