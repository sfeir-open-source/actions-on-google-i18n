# An i18n module for the Actions On Google SDK


## Prepare

Create a folder with your locales, ie:

```text
├── src/
│   ├── locales/
│   │   ├── en-US.js
│   │   └── en-GB.js

```

Here is a sample locale file.

```js
// src/locales/en-US.js
module.exports = {
    "WELCOME": `
        <speak>
          Hi {name}, I'm your amazing assistant. What can I do for ya?
        </speak>`
};

// src/locales/en-GB.js
module.exports = {
    "WELCOME": `
        <speak>
          Hi {name}, I'm your bloody assistant. How can I help?
        </speak>`
};
```

## Install

`npm i @manekinekko/actions-on-google-i18n -S`

## Configure

Import in your main entry file:

```js
const i18n = require('@manekinekko/actions-on-google-i18n');
const app = new ApiAiApp({ request, response });
i18n.configure({directory: __dirname + '/src/locales'})
    .use(app);
```

## Use

```js

  const actionMap = new Map();
  actionMap.set('input.welcome', (app) => {
    
    app.ask(app.__('WELCOME'), { name: 'Wassim' });

  });
  app.handleRequest(actionMap);

```

## Full sample

```js
'use strict';
const i18n = require('@manekinekko/actions-on-google-i18n');
const aog = require('actions-on-google');
const ApiAiApp = aog.ApiAiApp;

exports.agent = (request, response) => {
  const app = new ApiAiApp({ request, response });
  i18n.configure({directory: __dirname + '/src/locales'})
      .use(app);

  const actionMap = new Map();
  actionMap.set('input.welcome', (app) => {
    
    app.ask(app.__('WELCOME'), { name: 'Wassim' });

  });
  app.handleRequest(actionMap);

};
```

# Licence

The MIT License (MIT) Copyright (c) 2017 - Wassim CHEGHAM

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
