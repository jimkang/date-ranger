var moment = require('moment');

function DateRanger(createOpts) {
  var currentStart;
  var rangeSize;
  var futureLimit;

  if (createOpts) {
    if (createOpts.initialDate) {
      currentStart = moment(createOpts.initialDate).startOf('day');
    }
    else {
      currentStart = moment().startOf('day');
    }
    rangeSize = createOpts.rangeSize;
    if (!rangeSize) {
      rangeSize = 1;
    }
    if (createOpts.futureLimit) {
      futureLimit = moment(createOpts.futureLimit).startOf('day');
    }
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
    if (end.isAfter(futureLimit)) {
      currentStart = futureLimit.clone().subtract(rangeSize, 'days');
    }

    return getCurrentRangeStrings();
  }

  return {
    getCurrentRangeStrings: getCurrentRangeStrings,
    shift: shift
  };
}

function getDateIsoStrings(date) {
  return date.toISOString();
}

module.exports = DateRanger;
