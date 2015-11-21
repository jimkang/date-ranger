var test = require('tape');
var DateRanger = require('../index');

test('Basic test', function basicTest(t) {
  var initialDate = new Date('2015-11-20 21:30:00');
  var dateRanger = DateRanger({
    initialDate: initialDate,
    futureLimit: new Date('2015-11-23T04:59:59.999Z')
  });

  t.deepEqual(
    dateRanger.getCurrentRangeStrings(),
    ['2015-11-20T05:00:00.000Z', '2015-11-21T04:59:59.999Z'],
    'Current range strings are correct.'
  );

  t.deepEqual(
    dateRanger.shift(),
    ['2015-11-21T05:00:00.000Z', '2015-11-22T04:59:59.999Z'],
    'Range strings are correct after shifting one day forward.'
  );

  t.deepEqual(
    dateRanger.shift({
      days: -1
    }),
    ['2015-11-20T05:00:00.000Z', '2015-11-21T04:59:59.999Z'],
    'Range strings are correct after shifting one day backward.'
  );

  t.deepEqual(
    dateRanger.shift({
      days: -4
    }),
    ['2015-11-16T05:00:00.000Z', '2015-11-17T04:59:59.999Z'],
    'Range strings are correct after shifting three days backward.'
  );

  t.deepEqual(
    dateRanger.shift({
      days: -1,
      rangeSize: 3
    }),
    ['2015-11-15T05:00:00.000Z', '2015-11-18T04:59:59.999Z'],
    'Range strings are correct after shifting and resizing range.'
  );

  t.deepEqual(
    dateRanger.shift({
      days: 100
    }),
    ['2015-11-19T05:00:00.000Z', '2015-11-22T04:59:59.999Z'],
    'Range does not shift past futureLimit.'
  );

  t.end();
});
