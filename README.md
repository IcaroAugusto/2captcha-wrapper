# NODE.js 2captcha wrapper

This is a node.js module for solving google's recaptcha v2 using the 2captcha service.

## Installation

`npm install 2captcha-wrapper`

## Usage

You will need a 2captcha api key, which you can get [here](https://2captcha.com?from=7451288).

The module exports the TwoCaptcha prototype. It accepts two parameters on construction: apiKey and timeout, 
the timeout parameter can be ommited, defaulting to 180000 milliseconds;

The object contains the getToken method that should be used to get the captcha token for google recaptcha;
After getting the token, you can send it with your http request or set it in the page if you're running puppeteer/selenium.

To get the siteKey: Open the webpage, view source, ctrl+f "data-sitekey".

```JavaScript
  TwoCaptcha = require('2captcha-wrapper');

  const apiKey = '123tyg231yg123v32g123u'; //Your 2captcha api key
  const captchaTimeout = 180000; //The maximum amount of time (ms) to wait for the captcha to be solved.

  const siteCaptcha = {
    siteKey: 'uadsuadsuyasduvsduv', //The url's siteKey
    url: 'www.example.com', //The url in which the captcha appears
    invisible: false, //Whether or not the captcha is invisible
  }

  async function main() {
    var tcaptcha = new TwoCaptcha(apiKey, captchaTimeout);
    var captchaToken = await tcaptcha.getToken(siteCaptcha);
    console.log('Got token!');
    console.log(captchaToken);
  }

  main();
```

## Author

Ícaro Augusto

* [https://icaroaugusto.com](https://icaroaugusto.com)
* Discord: **IcaroAugusto#3303**

## Changelogs

### 1.0.0

Created.