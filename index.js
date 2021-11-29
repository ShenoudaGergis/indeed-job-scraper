let { parse }  = require("url");
let PageParser = require("./lib/page-parser.js");
let request    = require("./lib/request.js");
let { filterParams , checkParamValue } = require("./lib/utils/validator.js");
let config     = require("./config.js");

//-----------------------------------------------------------------------------

function getJobsList(params) {
	params = checkParamValue(filterParams(params));
	let limit = config["max-pages"];
	return (function _getJobsList(params , jobs = []) {
		if(limit-- === 0) return Promise.resolve(jobs);
		return request(params).then((content) => {
			let parser = new PageParser(content);
			let { pageJobs , nextLink } = parser.getContent();
			if(config["verbose"]) console.log("==> nextLink :" , nextLink)
			jobs = jobs.concat(pageJobs);
			if(nextLink === null) return jobs;
			else return _getJobsList(parse(nextLink , true)["query"] , jobs);
		})
	})(params , []);	
}

//-----------------------------------------------------------------------------

function getJobsPDF(params) {
	let PdfGenerator = require("./lib/pdfGenerator.js");
	return getJobsList(params).then((jobs) => {
		if(config["verbose"]) console.log("==> generating pdf buffer...");		
		return (new PdfGenerator(jobs)).generatePDF();
	})
}

//-----------------------------------------------------------------------------

exports.getJobsList = getJobsList;
exports.getJobsPDF  = getJobsPDF;
exports.config      = config;