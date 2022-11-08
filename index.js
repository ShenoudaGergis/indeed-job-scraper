let { parse } 	 					   = require("url");
let PageParser 						   = require("./lib/page-parser.js");
let BrowserPage    					   = require("./lib/browser.js");
let { filterParams , checkParamValue } = require("./lib/utils/validator.js");
let config     						   = require("./config.js");
let PdfGenerator 					   = require("./lib/pdfGenerator.js");
const JobInfoParser = require("./lib/job-info-parser.js");

//-----------------------------------------------------------------------------

function getJobsList(params) {
	let page  = new BrowserPage();
	params    = checkParamValue(filterParams(params));
	let limit = config["max-pages"];

	let jobs  = (function _getJobsList(params , jobs = []) {
		if(limit-- === 0) return Promise.resolve(jobs);
		let url = new URL("jobs" , config["base-URL"]);

		return page.getContent(url, params).then((content) => {
			if(config["verbose"]) console.log("\u2714" , url.href);
			let parser = new PageParser(content);
			let { pageJobs , nextLink } = parser.getContent();
			jobs = jobs.concat(pageJobs);
			if(nextLink === null) return jobs;
			else return _getJobsList(parse(nextLink , true)["query"] , jobs);
		})
	})(params , []);

	return jobs.then((jobs) => {
		return page.closePage().then(() => jobs);
	});
}

// ----------------------------------------------------------------------------

function getJobInfo(url) {
	let page    = new BrowserPage();
	let params  = [];

	let job     = page.getContent(url, params).then((content) => {
		let parser = new JobInfoParser(content);
		return parser.getContent();
	});

	return job.then((job) => {
		return page.closePage().then(() => job);
	});
}

//-----------------------------------------------------------------------------

function getJobsPDF(params) {
	return getJobsList(params).then((jobs) => {
		if(config["verbose"]) console.log("\u2714 generating PDF buffer starts...");
		return (new PdfGenerator(jobs)).generatePDF().then((buffer) => {
			if(config["verbose"]) console.log("\u2714 generating PDF buffer finished...");
			return buffer;
		})
	})
}

//-----------------------------------------------------------------------------

function release() {
	return BrowserPage.closeBrowser();
}

//-----------------------------------------------------------------------------

exports.getJobsList = getJobsList;
exports.getJobInfo = getJobInfo;
exports.getJobsPDF  = getJobsPDF;
exports.release     = release;
exports.config      = config;