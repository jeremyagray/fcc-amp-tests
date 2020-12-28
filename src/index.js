/* SPDX-License-Identifier: MIT
 *
 * Copyright 2020 Jeremy A Gray <jeremy.a.gray@gmail.com>.
 */

'use strict';

// Bootstrap.
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// CSS.
import './style.css';
import 'mocha/mocha.css';

// Use mocha for running tests.
// import {mocha} from 'mocha';
// import '../node_modules/mocha/browser-entry.js';
import 'mocha/browser-entry';
// import {Mocha} from 'mocha';
// import 'mocha';

// Use chai expect.
import * as chai from 'chai';
const expect = chai.expect;

// Use chai-http for requests.
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

// Use chai-datetime for time/date tests.
const chaiDate = require('chai-datetime');
chai.use(chaiDate);

// function buildOverlay() {
//   const mochaDiv = document
//         .createElement('div')
//         .setAttribute('id', 'mocha');
//   const testControlsHamburgerDiv = document
//         .createElement('div')
//         .setAttribute('id', 'testControlsHamburger');
//   const testControlsDiv = document
//         .createElement('div')
//         .setAttribute('id', 'testControls');

//   document.body.appendChild(mochaDiv);
// }

function runTests() {
  // Test definition functions.
  const tests = {
    'timestamp': timestampTests,
    'headerParser': headerParserTests,
    'urlShortener': urlShortenerTests,
    'exerciseTracker': exerciseTrackerTests,
    'fileMetadata': fileMetadataTests
  };

  // Delete old mocha div, if present.
  if (document.getElementById('mocha') !== null) {
    document.getElementById('mocha').remove();
  }

  // Create a new, initially invisible, mocha div.
  const mochaDiv = document.createElement('div');
  mochaDiv.setAttribute('id', 'mocha');
  mochaDiv.style.visibility = 'hidden';
  document.body.appendChild(mochaDiv);

  // Set up mocha.
  // let mocha = new Mocha();
  mocha.setup('bdd');
  mocha.checkLeaks();

  // Get the project to test.
  const projectSelect = document
    .getElementById('testControlsSelectProjectFormSelect');
  const project = projectSelect.options[projectSelect.selectedIndex].value;

  // Page location for API calls.
  // const url = 'http://localhost:3000';
  const url = document
        .getElementById('testControlsSelectProjectFormUrlEntry')
        .value;

  // Define tests for selected project.
  tests[project](url);

  // Run tests.
  mocha.run();
}

function toggleResultsVisibility() {
  // Make the results div visible, if it exists.
  if (document.getElementById('mocha') !== null) {
    if (document.getElementById('mocha').style.visibility === 'visible') {
      document.getElementById('mocha').style.visibility = 'hidden';
    } else {
      document.getElementById('mocha').style.visibility = 'visible';
    }
  }
}

function timestampTests(url) {
  describe('FCC tests', async function() {
    describe('API and Microservices Projects', async function() {
      describe('Time Stamp Microservice', async function() {
        describe('URL tests', async function() {
          it('project should be yours', async function() {
            try {
              const fccURL = /.*\/timestamp-microservice\.freecodecamp\.rocks/;
              console.log(`actual:  ${url}`);
              console.log(`expected:  ${fccURL}`);
              console.log('URLs should not match.');
              expect(url).to.not.match(fccURL, 'Users should create their own project.');
            } catch (error) {
              console.log(error);
              throw error;
            }
          });
        });

        describe('GET /api/timestamp', async function() {
          it('should tell unix time', async function() {
            try {
              const now = new Date();

              let response = await chai.request(url)
                .get('/api/timestamp');

              const actual = response.body;
              const expected = {
                'unix': now.valueOf(),
                'utc': now.toUTCString()
              };
              console.log(`actual:  ${JSON.stringify(actual, null, 2)}`);
              console.log(`expected:  ${JSON.stringify(expected, null, 2)}`);
              console.log('Time JSONs should be within 1 s of each other.');

              expect(response).to.have.status(200);
              expect(response).to.be.json;
              expect(response.body).to.be.a('object');

              expect(response.body).to.have.property('unix');
              expect(response.body).to.have.property('utc');

              const unix = new Date(response.body.unix);
              const utc = new Date(response.body.utc);

              expect(unix).to.be.closeToTime(now, 1, 'Received time should match now.');
              expect(unix).to.be.closeToTime(utc, 1, 'Times should be equal.');
            } catch (error) {
              console.log(error);
              throw error;
            }
          });

          it('should tell UTC time', async function() {
            try {
              const now = new Date();

              let response = await chai.request(url)
                .get('/api/timestamp');

              const actual = response.body;
              const expected = {
                'unix': now.valueOf(),
                'utc': now.toUTCString()
              };
              console.log(`actual:  ${JSON.stringify(actual, null, 2)}`);
              console.log(`expected:  ${JSON.stringify(expected, null, 2)}`);
              console.log('Time JSONs should be within 1 s of each other.');

              expect(response).to.have.status(200);
              expect(response).to.be.json;
              expect(response.body).to.be.a('object');

              expect(response.body).to.have.property('unix');
              expect(response.body).to.have.property('utc');

              const unix = new Date(response.body.unix);
              const utc = new Date(response.body.utc);

              expect(utc).to.be.closeToTime(now, 1, 'Received time should match now.');
              expect(unix).to.be.closeToTime(utc, 1, 'Times should be equal.');
            } catch (error) {
              console.log(error);
              throw error;
            }
          });
        });

        describe('GET /api/timestamp/:date_string', async function() {
          describe('invalid date strings', async function() {
            it('should return {\'error\': \'Invalid Date\'}', async function() {
              try {
                let response = await chai.request(url)
                  .get('/api/timestamp/this-is-not-a-data');

                const actual = response.body;
                const expected = {
                  'error': 'Invalid Date'
                };
                console.log(`actual:  ${JSON.stringify(actual, null, 2)}`);
                console.log(`expected:  ${JSON.stringify(expected, null, 2)}`);
                console.log('Error responses should match.');

                // FCC tests fail on status 400, but really should
                // require a status, and it probably should be 400.
                // expect(response).to.have.status(400);
                expect(response).to.be.json;
                expect(response.body).to.be.a('object');

                expect(response.body).to.have.property('error');
                expect(response.body).to.have.property('error').eql('Invalid Date');
              } catch (error) {
                console.log(error);
                throw error;
              }
            });
          });

          describe('valid date strings', async function() {
            it('ISO-8601 string should produce unix time', async function() {
              try {
                let date = '2019-12-25';
                let dateObj = new Date(date);

                let response = await chai.request(url)
                  .get(`/api/timestamp/${date}`);

                const actual = response.body;
                const expected = {
                  'unix': dateObj.valueOf(),
                  'utc': dateObj.toUTCString()
                };
                console.log(`actual:  ${JSON.stringify(actual, null, 2)}`);
                console.log(`expected:  ${JSON.stringify(expected, null, 2)}`);
                console.log('Time JSONs should be within 1 s of each other.');

                expect(response).to.have.status(200);
                expect(response).to.be.json;
                expect(response.body).to.be.a('object');

                expect(response.body).to.have.property('unix');

                const unix = new Date(response.body.unix);

                expect(dateObj).to.equalTime(unix, 'ISO-8601 date string should produce a unix time integer.');
              } catch (error) {
                console.log(error);
                throw error;
              }
            });

            it('ISO-8601 string should produce UTC time', async function() {
              try {
                let date = '2019-12-25';
                let dateObj = new Date(date);

                let response = await chai.request(url)
                  .get(`/api/timestamp/${date}`);

                const actual = response.body;
                const expected = {
                  'unix': dateObj.valueOf(),
                  'utc': dateObj.toUTCString()
                };
                console.log(`actual:  ${JSON.stringify(actual, null, 2)}`);
                console.log(`expected:  ${JSON.stringify(expected, null, 2)}`);
                console.log('Time JSONs should be within 1 s of each other.');

                expect(response).to.have.status(200);
                expect(response).to.be.json;
                expect(response.body).to.be.a('object');

                expect(response.body).to.have.property('utc');

                const utc = new Date(response.body.utc);

                expect(dateObj).to.equalTime(utc, 'ISO-8601 date string should produce a UTC time.');
              } catch (error) {
                console.log(error);
                throw error;
              }
            });

            // This test needs work because the input format does not
            // guarantee UTC and will cause offset errors.
            it('dd-mmmm-yyyy should return time', async function() {
              try {
                const dateString = '05 October 2011';
                const dateObject = new Date(dateString);
                // Get offset in seconds.
                const offset = dateObject.getTimezoneOffset() * 60;

                const utcString = '05 October 2011 GMT';
                const utcObject = new Date(dateString);

                let response = await chai.request(url)
                  .get(`/api/timestamp/${dateString}`);

                const actual = response.body;
                const expected = {
                  'unix': dateObject.valueOf(),
                  'utc': dateObject.toUTCString()
                };
                console.log(`actual:  ${JSON.stringify(actual, null, 2)}`);
                console.log(`expected:  ${JSON.stringify(expected, null, 2)}`);
                console.log('Time JSONs should be within the timezone offset of each other.');

                expect(response).to.have.status(200);
                expect(response).to.be.json;
                expect(response.body).to.be.a('object');

                expect(response.body).to.have.property('unix');
                expect(response.body).to.have.property('utc');

                // Due to timezone issues, check if the returned times
                // are close to the original time, within the timezone
                // offset in seconds.
                // expect(response.body.unix).to.equal(serverUnix, `response.body.unix should equal ${serverUnix}.`);
                // expect(response.body.utc).to.equal(serverUtc, `response.body.utc should equal ${serverUtc}.`);
                const unixDate = new Date(response.body.unix);
                const utcDate = new Date(response.body.utc);

                // console.log(`dateString: ${dateString}`);
                // console.log(`dateObject: ${dateObject}`);
                // console.log(`utcString: ${utcString}`);
                // console.log(`utcObject: ${utcObject}`);
                // console.log(`unix: ${response.body.unix}`);
                // console.log(`unixObject: ${unixDate}`);
                // console.log(`unix diff: ${Math.abs(dateObject.valueOf() - unixDate.valueOf()) / 1000}`);
                // console.log(`utc: ${response.body.utc}`);
                // console.log(`utcObject: ${utcDate}`);
                // console.log(`utc diff: ${Math.abs(dateObject.valueOf() - utcDate.valueOf()) / 1000}`);

                expect(unixDate).to.be.closeToTime(dateObject, offset + 5, `${unixDate} should be equal to ${dateObject}, within the timezone offset ${offset}.`);
                expect(utcDate).to.be.closeToTime(dateObject, offset + 5, `${utcDate} should be equal to ${dateObject}, within the timezone offset ${offset}.`);
              } catch (error) {
                console.log(error);
                throw error;
              }
            });

            it('Unix time integer should return time', async function() {
              try {
                const unix = 1451001600000;
                const goodDate = new Date(1451001600000);
                const utc = 'Fri, 25 Dec 2015 00:00:00 GMT';

                let response = await chai.request(url)
                  .get(`/api/timestamp/${unix}`);

                const actual = response.body;
                const expected = {
                  'unix': goodDate.valueOf(),
                  'utc': goodDate.toUTCString()
                };
                console.log(`actual:  ${JSON.stringify(actual, null, 2)}`);
                console.log(`expected:  ${JSON.stringify(expected, null, 2)}`);
                console.log('Time JSONs should be within 1 s of each other.');

                expect(response).to.have.status(200);
                expect(response).to.be.json;
                expect(response.body).to.be.a('object');

                expect(response.body).to.have.property('unix');
                expect(response.body).to.have.property('utc');

                expect(response.body.unix).to.equal(unix);
                expect(response.body.utc).to.equal(utc);
                expect(new Date(response.body.unix)).to.equalTime(goodDate);
                expect(new Date(response.body.utc)).to.equalTime(goodDate);
              } catch (error) {
                console.log(error);
                throw error;
              }
            });
          });
        });
      });
    });
  });
}

function headerParserTests(url) {
  describe('FCC tests', async function() {
    describe('API and Microservices Projects', async function() {
      describe('Exercise Tracker Microservice', async function() {
        describe('URL tests', async function() {
          it('project should be yours', async function() {
            try {
              const fccURL = /.*\/exercise-tracker\.freecodecamp\.rocks/;
              expect(url).to.not.match(fccURL, 'Users should create their own project.');
            } catch (error) {
              console.log(error);
              throw error;
            }
          });
        });
      });
    });
  });
}

function urlShortenerTests(url) {
  describe('FCC tests', async function() {
    describe('API and Microservices Projects', async function() {
      describe('Exercise Tracker Microservice', async function() {
        describe('URL tests', async function() {
          it('project should be yours', async function() {
            try {
              const fccURL = /.*\/exercise-tracker\.freecodecamp\.rocks/;
              expect(url).to.not.match(fccURL, 'Users should create their own project.');
            } catch (error) {
              console.log(error);
              throw error;
            }
          });
        });
      });
    });
  });
}

function exerciseTrackerTests(url) {
  describe('FCC tests', async function() {
    describe('API and Microservices Projects', async function() {
      describe('Exercise Tracker Microservice', async function() {
        describe('URL tests', async function() {
          it('project should be yours', async function() {
            try {
              const fccURL = /.*\/exercise-tracker\.freecodecamp\.rocks/;
              expect(url).to.not.match(fccURL, 'Users should create their own project.');
            } catch (error) {
              console.log(error);
              throw error;
            }
          });
        });
      });
    });
  });
}

function fileMetadataTests(url) {
  describe('FCC tests', async function() {
    describe('API and Microservices Projects', async function() {
      describe('Exercise Tracker Microservice', async function() {
        describe('URL tests', async function() {
          it('project should be yours', async function() {
            try {
              const fccURL = /.*\/exercise-tracker\.freecodecamp\.rocks/;
              expect(url).to.not.match(fccURL, 'Users should create their own project.');
            } catch (error) {
              console.log(error);
              throw error;
            }
          });
        });
      });
    });
  });
}

// Now that everything has been parsed, add the click events for the
// buttons.
(function addClickEvents() {
  document
    .getElementById('testControlsRunTests')
    .addEventListener('click', runTests);

  document
    .getElementById('testControlsTestResults')
    .addEventListener('click', toggleResultsVisibility);
})();
