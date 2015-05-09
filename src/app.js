var angular = require('angular');
var holidays = require('finnish-holidays-js');
var moment = require('moment');

angular.module('holidays', [])
  .controller('AppCtrl', function($scope, utils) {
    $scope.holidays = holidays.next();

    $scope.nextHoliday = $scope.holidays[0];
    $scope.nextHolidayDate = utils.getDateMedium($scope.nextHoliday);
    $scope.nextHolidayUntil = utils.getDaysUntil($scope.nextHoliday);
  })
  .factory('utils', function() {
    return {
      getDate: function(holiday) {
        var date = new Date();
        date.setYear(holiday.year);
        date.setMonth(holiday.month - 1);
        date.setDate(holiday.day);
        return date;
      },
      getDateMedium: function(holiday) {
        return moment(this.getDate(holiday)).format('MMM D');
      },
      getDaysUntil: function(holiday) {
        return moment(this.getDate(holiday)).startOf('hour').fromNow();
      }
    };
  });
