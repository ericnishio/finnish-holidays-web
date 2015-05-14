var app = require('./app');
var moment = require('moment');
var FinnishHolidays = require('finnish-holidays-js');

var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var INTERVAL = 1500;

app.controller('AppCtrl', function($q, $timeout, $log, $scope, utils) {
  var currentHoliday;
  var currentDate = moment();
  var currentIndex = -1;
  var translation;
  var isTranslating = false;
  var isHovered = false;

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
    $scope.imageClass = utils.getImageConfig(currentHoliday).cssClass;
    showImage();
  }

  function hideImage() {
    $scope.imageVisibleClass = '';
  }

  function showImage() {
    $scope.imageVisibleClass = 'background-image--visible';
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

  $scope.getImageAttribution = function() {
    return utils.getImageConfig(currentHoliday).attribution;
  };

  $scope.previous = function() {
    gotoPrevious();
  };

  $scope.next = function() {
    gotoNext();
  };

  $scope.getDescription = function() {
    if (translation) {
      return translation;
    } else {
      return currentHoliday.description;
    }
  };

  $scope.hoverDescription = function() {
    isHovered = true;
    rotateTranslations();
  };

  $scope.unhoverDescription = function() {
    isHovered = false;
  };

  function rotateTranslations() {
    beginTranslation()
      .then(getFinnish)
      .then(getSwedish)
      .finally(endTranslation);
  }

  function getFinnish() {
    var dfd = $q.defer();

    if (isTranslating) {
      translation = FinnishHolidays.translate(currentHoliday.description, 'fi');
    }

    $timeout(function() {
      if (isHovered) {
        dfd.resolve();
      } else {
        dfd.reject();
      }
    }, INTERVAL);

    return dfd.promise;
  }

  function getSwedish() {
    var dfd = $q.defer();

    if (isTranslating) {
      translation = FinnishHolidays.translate(currentHoliday.description, 'sv');
    }

    $timeout(function() {
      if (isHovered) {
        dfd.resolve();
      } else {
        dfd.reject();
      }
    }, INTERVAL);

    return dfd.promise;
  }

  function beginTranslation() {
    var dfd = $q.defer();

    if (!isTranslating && isHovered) {
      isTranslating = true;
      dfd.resolve();
    } else {
      dfd.reject();
    }

    return dfd.promise;
  }

  function endTranslation() {
    translation = null;

    $timeout(function() {
      if (isHovered) {
        isTranslating = false;
        rotateTranslations();
      }
    }, INTERVAL);
  }

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
