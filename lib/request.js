let config        = require("../config.js");
let URL           = require("url").URL;
let puppeteer     = require('puppeteer-extra');
let StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

//-----------------------------------------------------------------------------

function buildURL(url, params={}) {
    Object.getOwnPropertyNames(params).forEach((key) => url.searchParams.append(key, params[key]));
	return url.href;
}

//-----------------------------------------------------------------------------

function Browser() {
	this.browser = null;
	this.page    = null;
	this.baseURL = new URL("/jobs" , config["base-URL"]);

	this.init();
}

//-----------------------------------------------------------------------------

Browser.prototype.init = function() {
	this.browser = puppeteer.launch({ headless: true })
	this.page    = this.browser.then((browser) => browser.newPage());
}

//-----------------------------------------------------------------------------

Browser.prototype.getContent = function(url, params) {
	return this.page.then((page) => {
        return page.goto(buildURL(url, params), { waitUntil: 'domcontentloaded' }).then((http) => {
			return page.evaluate(() => document.querySelector('*').outerHTML);
		})
	})
}

//-----------------------------------------------------------------------------

Browser.prototype.release = function() {
	return Promise.all(this.browser.then(browser => browser.close), this.page.then(page => close()));
}

//-----------------------------------------------------------------------------

module.exports = (new Browser);















