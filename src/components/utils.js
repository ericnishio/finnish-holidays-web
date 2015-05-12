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
    getImageConfig: function(holiday) {
      switch (holiday.description) {
        case "New Year's Day":
          return this.imageConfig('background-image--new-year', 'Niklas Sjöblom');

        case 'Epiphany':
          return this.imageConfig('background-image--epiphany', 'Pasi Tuominen');

        case 'Good Friday':
          return this.imageConfig('background-image--good-friday', 'Pörrö');

        case 'Easter Sunday':
          return this.imageConfig('background-image--easter-sunday', 'Sorin Mutu');

        case 'Easter Monday':
          return this.imageConfig('background-image--easter-monday', 'Theen Moy');

        case 'May Day':
          return this.imageConfig('background-image--may-day', 'Darren Webb');

        case 'Ascension Day':
          return this.imageConfig('background-image--ascension-day', 'Glen Forde');

        case 'Pentecost':
          return this.imageConfig('background-image--pentecost', 'Jussi-Pekka Erkkola');

        case 'Midsummer Eve':
          return this.imageConfig('background-image--midsummer-eve', 'Michael Holler');

        case 'Midsummer Day':
          return this.imageConfig('background-image--midsummer-day', 'Heather Sunderland');

        case "All Saints' Day":
          return this.imageConfig('background-image--all-saints-day', 'Cuong Nguyen');

        case 'Independence Day':
          return this.imageConfig('background-image--independence-day', 'Vestman');

        case 'Christmas Eve':
          return this.imageConfig('background-image--christmas-eve', 'frozenreindeer');

        case 'Christmas Day':
          return this.imageConfig('background-image--christmas-day', 'Naomi Sano');

        case "St. Stephen's Day":
          return this.imageConfig('background-image--st-stephens-day', 'Janne');
      }
    },
    imageConfig: function(cssClass, photographer) {
      return {
        attribution: photographer,
        cssClass: cssClass
      };
    }
  };
});
