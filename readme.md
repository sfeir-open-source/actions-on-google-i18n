![](https://img.shields.io/npm/l/@sfeir/actions-on-google-i18n.svg)
![](https://img.shields.io/npm/dw/@sfeir/actions-on-google-i18n.svg)
![](https://img.shields.io/npm/v/@sfeir/actions-on-google-i18n.svg)

# An i18n module for the Actions On Google SDK


## Prepare

Create a folder with your locales (you can use either `js` or `json` files), e.g.:

```text
├── src/
│   ├── locales/
│   │   ├── en-GB.json
│   │   └── en-US.json

```

Each file must export (or have) a valid JSON content:

```json
// src/locales/en-US.json
{
  "WELCOME": "<speak>Hi {name}, I'm your awesome assistant. What can I do for ya?</speak>"
}
```
```json
// src/locales/en-GB.json
{
  "WELCOME": "<speak>Hi {name}, I'm your amazing assistant. How can I help?</speak>"
}
```

## Install

`npm i @sfeir/actions-on-google-i18n -S`

## Options

### directory
**default:** `./src/locales/`

The directory where the locale files are located.

### defaultFile
**default:** `index.js` || `index.json`

The default locale file that will **ALWAYS** be used for **ANY** locale.

### defaultLocale
**default:** `en-US`

The default locale that will be used if no locale can be extracted from the Actions On Google SDK.

## Quick setup

Import in your main entry file and call the `.use()` method to register your `DialogflowApp` instance:

```js
const i18n = require('@sfeir/actions-on-google-i18n');
const app = dialogflow({ debug: true });;
i18n.use(app);
```

## Use

To get the localized content, call the `conv.__(string, context)` method and provide the content key to get the content. You can also provide an optional context object if you set variables in your content:

```js
app.intent('welcome', (conv) => {
    conv.ask(conv.__('WELCOME', { name: 'Wassim' }));
});
```

## Full setup

```js
'use strict';
const i18n = require('@sfeir/actions-on-google-i18n');
const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');

const app = dialogflow({ debug: true });

i18n
  .configure({
    directory: `${__dirname}/src/locales`,
    defaultFile: `${__dirname}/src/locales/index.json`,
    defaultLocale: 'en-US',
  })
  .use(app);
  
app.intent('welcome', (conv) => {
  conv.ask(conv.__('WELCOME', { name: 'Wassim' }));
});

exports.agent = functions.https.onRequest(app);
```

# Licence

The MIT License (MIT) Copyright (c) 2017 - Wassim CHEGHAM

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
