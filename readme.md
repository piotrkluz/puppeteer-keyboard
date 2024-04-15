# Puppeteer

<img src="https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png" height="200" align="right">

## Overview
> ```puppeteer-keyboard``` is library that simplifies usage of keyboard and keyboard schroucuts in puppeteer.

> It converts string representation like "text[Enter]" into keyboard keys sequence.
Very helpful in page automation.

## Getting started
### Installation

```bash
npm i puppeteer-keyboard
# OR yarn add puppeteer-keyboard
```

## Usage
Example code with explanation in comments.
```javascript
const { Keyboard } = require("puppeteer-keyboard");

const input = await page.$("my.input");
const kb = new Keyboard(page);

// Write text and delete it
await kb.type("Some text", input);
await kb.type("[Ctrl+A]", input);
await kb.type("[Delete]", input);

// Of course it can be in one line:
await kb.type("Some text[Ctrl+a][Delete]", input);

// If field is already focused, the second parameter can be ommited:
await input.focus();
await kb.type("Some text[Ctrl+A][Delete]");

// or
await input.focus();
await kb.type("Some text");
await kb.type("[Ctrl+a]");
await kb.type("[Delete]");

// Keyboard schroucuts can be larger (there is no limit of keys):
await kb.type("Some text[Ctrl+Shift+ArrowRight]");
```

### Working example:
Example enter's to google.com page, search for puppeteer and uses second result from search sugestions.
```javascript
const { Keyboard } = require("puppeteer-keyboard");
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://duckduckgo.com');

  const input = await page.$("input[name=q]");
  const kb = new Keyboard(page, { delay: 250 });

  await kb.type("puppeteer[ArrowDown][ArrowDown][Enter]", input);

  await new Promise(r => setTimeout(r, 5000));

  await browser.close();
})();

```

## Available keys
Library accepts all keys available on the keyboard.
Full list of keycodes are on official puppeteer page:
https://github.com/puppeteer/puppeteer/blob/d3f0e6ca095e546a71d2792c5fe42974b1d24d11/packages/puppeteer-core/src/common/USKeyboardLayout.ts#L27

## Contribution
GitHub Repo: https://github.com/piotrkluz/puppeteer-keyboard

NPM: https://www.npmjs.com/package/puppeteer-keyboard
