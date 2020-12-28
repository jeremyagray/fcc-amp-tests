# fcc-amp-tests

A mocha/chai testing bundle for the Free Code Camp API and
Microservices projects.

## What is fcc-amp-tests?

fcc-amp-tests is a bundle of mocha, chai, chai-http, chai-datetime, bootstrap, and some additional code to test the API and Microservices projects from Free Code Camp, much like their testing bundle for their front-end projects.  The bundle runs a chai version of the tests run by fCC and output the expected and actual responses for each test, if possible, so that users can ascertain if their project is complying with specifications.

## Installation

Download the script bundle, and include it in a simple HTML page.

## Usage

Select the correct project from the drop-down, enter a correct URL, and click "Run Tests."  Click "Test Results" to see your results, if necessary.  The URL must match the protocol, FQDN, and port of your API exactly to work.  For example, if you are testing an HTTP server on localhost running on port 3000, your URL should be `http://localhost:3000`.  Additionally, you should configure CORS in your app to all this script or fCC to test your app:

```js
const cors = require('cors');

// Use CORS.
app.use(cors({
  origin: '*',
  optionSuccessStatus: 200
}));

```

## Copyright and License

SPDX-License-Identifier: MIT

fcc-amp-tests, a testing bundle for the Free Code Camp API and
Microservices projects.

Copyright (C) 2020 Jeremy A Gray <jeremy.a.gray@gmail.com>.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice (including the
next paragraph) shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Author

Jeremy A Gray <jeremy.a.gray@gmail.com>

## Todo List

- [x] Read and implement mocha.css.
- [x] Learn to import and webpack mocha, chai, chai-http, and
   chai-datetime in ES6 modules.
- [x] Implement FCC-like hamburger hider.
- [x] Implement FCC-like control interface.
- [x] Grab URL from page to use as API base.
- [x] Implement hidden mocha div.
- [ ] Get reusable mocha object for repeated test runs.
- [ ] Customize output as desired.
- [ ] Add FCC URL shortener tests.
- [ ] Add FCC exercise tracker tests.
- [ ] Add FCC file metadata tests.
- [ ] Add FCC header parser tests.
- [x] Add FCC timestamp tests.
- [ ] Display actual/expected responses for FCC URL shortener tests.
- [ ] Display actual/expected responses for FCC exercise tracker tests.
- [ ] Display actual/expected responses for FCC file metadata tests.
- [ ] Display actual/expected responses for FCC header parser tests.
- [x] Display actual/expected responses for FCC timestamp tests.
