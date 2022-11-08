let cheerio         = require("cheerio");
let { jobConfig }  	= require("../config.js");
let URL             = require("url").URL;

//-----------------------------------------------------------------------------

function JobInfoParser(content) {
	this.$ = cheerio.load(content);
}

//-----------------------------------------------------------------------------

JobInfoParser.prototype.getContent = function() {
	let job = {};

	job["job-title"]            = this.$(jobConfig["job-title"]).text();
	job["company-name"]         = this.$(jobConfig["company-name"]).text();
	job["company-location"]     = this.$(jobConfig["company-location"]).text();
	job["company-rating"]       = this.$(jobConfig["company-rating"]).attr('content') ?? '';
	job["company-apply-link"]   = (new URL(this.$(jobConfig["company-apply-link"]).attr("href") , jobConfig["base-URL"])).href;
	job["job-salary"]      	    = this.$(jobConfig["job-salary"][0]).text().trim() + this.$(jobConfig["job-salary"][1]).text().trim();
	job["job-type"]             = this.$(jobConfig["job-type"]).text().trim();
	job["job-qualifications"]   = this.$(jobConfig["job-qualifications"]).get().map(e => this.$(e).text());
	job["job-description"]      = this.$(jobConfig["job-description"]).text().trim();
	job["job-activity"]         = this.$(jobConfig["job-activity"]).text();

	return job;
}

//-----------------------------------------------------------------------------

module.exports = JobInfoParser;