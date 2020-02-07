const Request = require('request-instance');

const GET_ID_URL = 'http://2captcha.com/in.php'
const GET_TOKEN_URL = 'http://2captcha.com/res.php'

function sleep(ms = 50) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function TwoCaptcha() {
  this.initialize.apply(this, arguments);
}

TwoCaptcha.prototype = Object.create(null);
TwoCaptcha.prototype.constructor = TwoCaptcha;

TwoCaptcha.prototype.initialize = function(apiKey, timeout = 180000) {
  this.apiKey = apiKey;
  this.request = new Request();
  this.timeout = 180000;
}

// captcha = {
//   siteKey: 'site-key from the url below',
//   url: 'the url where the captcha appears',
//   invisible: true or false
// }

TwoCaptcha.prototype.getId = async function(captcha) {
  var form = {
    key: this.apiKey,
    method: 'userrecaptcha',
    googlekey: captcha.siteKey,
    pageurl: captcha.url,
  };
  if (captcha.invisible) {
    form.invisible = '1';
    form.here = 'now';
  }
  var output = await this.request.post(GET_ID_URL, form);
  if (output.error) {
    return null;
  }
  var splitData = output.body.split('|');
  return splitData[0] == 'OK' ? splitData[1] : null;
}

TwoCaptcha.prototype.getToken = async function(captcha) {
  var id = await this.getId(captcha);
  if (id == null) {
    return null;
  }
  console.log('Got captcha id: ' + id);
  console.log('Request url: ' + GET_TOKEN_URL + '?key=' + this.apiKey + '&action=get&id=' + id);
  var count = 0;
  while (true) {
    await sleep(5000);
    count += 5000;
    if (count >= this.timeout) {
      return null;
    }
    var output = await this.request.get(GET_TOKEN_URL + '?key=' + this.apiKey + '&action=get&id=' + id);
    if (!output.error) console.log(output.body);
    if (!output.error && output.body.length > 20) {
      var splitData = output.body.split('|');
      return splitData[0] == 'OK' ? splitData[1] : null;
    }
  }
}

module.exports = TwoCaptcha;