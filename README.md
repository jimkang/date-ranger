date-ranger
==================

Maintains a range of dates across shifts and range size changes. 

Installation
------------

    npm install date-ranger

Usage
-----

    var dateRanger = DateRanger({
      initialDate: new Date('2015-11-20 21:30:00'),
      futureLimit: new Date('2015-11-23T04:59:59.999Z')
    });

    console.log(dateRanger.getCurrentRangeStrings());
    // ['2015-11-20T05:00:00.000Z', '2015-11-21T04:59:59.999Z']

    // Shift the range forward one day.
    console.log(dateRanger.shift());
    // ['2015-11-21T05:00:00.000Z', '2015-11-22T04:59:59.999Z']

    // Shift the range backward one day.
    console.log(dateRanger.shift({
      amount: -1
    }));
    // ['2015-11-20T05:00:00.000Z', '2015-11-21T04:59:59.999Z']

API
---

- Constructor:
  - **initialDate**: The date ranger will use the start of this date as the start of the range, initially.
  - **futureLimit**: If specified, the end of the date range will never move past the start of this day.
- **getCurrentRangeStrings**: Returns a two-element array containing the start and end of the range as ISO strings.
- **shift**:
  - days: The number of days to shift the range by. Can be negative.
  - rangeSize: The new range size (in days).
  Returns the current range strings.

Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2015 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
