/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const fs = require('fs');
const cors = require('cors');

function setupPrivateAggregationTestRoutes(app) {
  app.post('/.well-known/private-aggregation/report-shared-storage', (req, res) => {
    console.log('\x1b[1;31m%s\x1b[0m', `🚀 You have received an event-level report from the browser`);
    console.log('REGULAR REPORT RECEIVED (event-level):\n=== \n', req.body, '\n=== \n');
    res.sendStatus(200);
  });

  app.post('/.well-known/debug/private-aggregation/report-shared-storage', (req, res) => {
    console.log('\x1b[1;31m%s\x1b[0m', `🚀 You have received an event-level report from the browser`);
    console.log('DEBUG REPORT RECEIVED (event-level):\n=== \n', req.body, '\n=== \n');
    res.sendStatus(200);
  });

  app.get('/paa/get-reports', (req, res) => {});

  app.get('/paa/scripts/private-aggregation-test.js', cors(), async (req, res) => {
    let response;

    try {
      response = await fs.promises.readFile(`${__dirname}/paa/scripts/private-aggregation-test.js`, 'utf8');
    } catch (e) {
      console.error(e);
      res.status(500);
    }

    res.send(response);
  });

  app.get('/paa/scripts/private-aggregation-test.html', cors(), async (req, res) => {
    let response;

    try {
      response = await fs.promises.readFile(`${__dirname}/paa/scripts/private-aggregation-test.html`, 'utf8');
    } catch (e) {
      console.error(e);
      res.status(500);
    }

    res.send(response);
  });

  app.get('/paa/scripts/private-aggregation-test-worklet.js', async (req, res) => {
    let response;

    try {
      response = await fs.promises.readFile(`${__dirname}/paa/scripts/private-aggregation-test-worklet.js`, 'utf8');
    } catch (e) {
      console.error(e);
      res.status(500);
    }

    res.type('.js');
    res.send(response);
  });
}

module.exports = setupPrivateAggregationTestRoutes;
