let puppeteer     = require('puppeteer-extra');
let StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

let browser = puppeteer.launch({ headless: true });

//-----------------------------------------------------------------------------

function BrowserPage() {
	this.browser = null;
	this.page    = null;
    
	this.init();
}

//-----------------------------------------------------------------------------

BrowserPage.prototype.init = function() {
	this.browser = browser;
	this.page    = this.createNewBrowserPage();
}

//-----------------------------------------------------------------------------

BrowserPage.prototype.createNewBrowserPage = function() {
    return this.browser.then(browser => browser.newPage());
}

//-----------------------------------------------------------------------------

BrowserPage.prototype.getOpendedPages = function() {
    return this.browser.then((browser) => browser.pages());
}

//-----------------------------------------------------------------------------

BrowserPage.prototype.navigate = function(url, params = {}) {
    return this.page.then((page) => {
        return page.goto(BrowserPage.buildURL(url, params), { waitUntil: 'domcontentloaded' }).then(() => page);
    });
}

//-----------------------------------------------------------------------------

BrowserPage.prototype.getContent = function(url, params) {
    return this.navigate(url, params).then((page) => {
        return page.evaluate(() => document.querySelector('*').outerHTML);
    });
}

//-----------------------------------------------------------------------------

BrowserPage.prototype.exportPDF = function(url) {
    return this.navigate(url).then((page) => {
        return page.pdf({ format: 'A4' , landscape: true, timeout: 300000, printBackground: true , margin: {top: 40, left: 20, right: 20, bottom: 40}});
    })
}

//-----------------------------------------------------------------------------

BrowserPage.prototype.closePage = function() {
	return this.page.then((page) => page.close());
}

//-----------------------------------------------------------------------------

BrowserPage.closeBrowser = function() {
    return browser.then((browser) => browser.close());
}

//-----------------------------------------------------------------------------

BrowserPage.buildURL = function(url, params={}) {
    Object.getOwnPropertyNames(params).forEach((key) => url.searchParams.append(key, params[key]));
	return url.href;
}

//-----------------------------------------------------------------------------

module.exports = BrowserPage;