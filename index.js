var moment = require('moment');

function DateRanger(createOpts) {
  var currentStart;
  var rangeSize;
  var futureLimit;

  if (createOpts && createOpts.initialDate) {
    currentStart = moment(createOpts.initialDate).startOf('day');
  }
  else {
    currentStart = moment().startOf('day');
  }

  if (createOpts) {
    rangeSize = createOpts.rangeSize;
    if (createOpts.futureLimit) {
      futureLimit = moment(createOpts.futureLimit).startOf('day');
    }
  }

  if (!rangeSize) {
    rangeSize = 1;
  }

  function getEnd(start) {
    return start.clone().add(rangeSize, 'days').subtract(1, 'milliseconds');
  }

  function getCurrentRangeStrings() {
    return [
      currentStart.toISOString(),
      getEnd(currentStart).toISOString()
    ];
  }

  function shift(opts) {
    var days;

    if (opts) {
      if (typeof opts !== 'object') {
        throw new TypeError('shift opts param is not an object.');
      }
      days = opts.days;
      if (opts.rangeSize) {
        rangeSize = opts.rangeSize;
      }
    }

    if (!days) {
      days = 1;
    }

    currentStart.add(days, 'days');
    var end = getEnd(currentStart);
    if (futureLimit && end.isAfter(futureLimit)) {
      currentStart = futureLimit.clone().subtract(rangeSize, 'days');
    }

    return getCurrentRangeStrings();
  }

  function getCurrentStartMoment() {
    return currentStart.clone();
  }

  return {
    getCurrentRangeStrings: getCurrentRangeStrings,
    shift: shift,
    getCurrentStartMoment: getCurrentStartMoment
  };
}

function getDateIsoStrings(date) {
  return date.toISOString();
}

module.exports = DateRanger;
