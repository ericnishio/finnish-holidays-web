var app = require('./app');
var moment = require('moment');

app.factory('utils', function() {
  return {
    createDate: function(year, month, day) {
      var date = new Date();
      date.setYear(year);
      date.setMonth(month - 1);
      date.setDate(day);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      return date;
    },
    getDate: function(holiday) {
      return this.createDate(holiday.year, holiday.month, holiday.day);
    },
    getDateMedium: function(holiday) {
      return moment(this.getDate(holiday)).format('ddd, MMM D');
    },
    getDaysUntil: function(holiday) {
      return moment(this.getDate(holiday)).startOf('hour').fromNow();
    },
    getImage: function(holiday) {
      switch (holiday.description) {
        case "New Year's Eve":
          return this.createImage('/images/new-year.jpg', 'Niklas Sjöblom');

        case 'Epiphany':
          return this.createImage('/images/epiphany.jpg', 'Pasi Tuominen');

        case 'Good Friday':
          return this.createImage('/images/good-friday.jpg', 'Pörrö');

        case 'Easter Sunday':
          return this.createImage('/images/easter-sunday.jpg', 'Sorin Mutu');

        case 'Easter Monday':
          return this.createImage('/images/easter-monday.jpg', 'Theen Moy');

        case 'May Day':
          return this.createImage('/images/may-day.jpg', 'Darren Webb');

        case 'Ascension Day':
          return this.createImage('/images/ascension-day.jpg', 'Glen Forde');

        case 'Pentecost':
          return this.createImage('/images/pentecost.jpg', 'Jussi-Pekka Erkkola');

        case 'Midsummer Eve':
          return this.createImage('/images/midsummer-eve.jpg', 'Michael Holler');

        case 'Midsummer Day':
          return this.createImage('/images/midsummer-day.jpg', 'Heather Sunderland');

        case "All Saints' Day":
          return this.createImage('/images/all-saints-day.jpg', 'Cuong Nguyen');

        case 'Independence Day':
          return this.createImage('/images/independence-day.jpg', 'Vestman');

        case 'Christmas Eve':
          return this.createImage('/images/christmas-eve.jpg', 'frozenreindeer');

        case 'Christmas Day':
          return this.createImage('/images/christmas-day.jpg', 'Naomi Sano');

        case "St. Stephen's Day":
          return this.createImage('/images/st-stephens-day.jpg', 'Janne');

        default:
          return this.createImage('/images/may-day.jpg', 'Darren Webb');
      }
    },
    createImage: function(url, photographer) {
      return {
        attribution: photographer,
        url: url
      };
    }
  };
});
