var app = require('./app');
var FinnishHolidays = require('finnish-holidays-js');

app.run(function($window) {
  $window.FinnishHolidays = FinnishHolidays;
});
