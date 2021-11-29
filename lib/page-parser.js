let cheerio = require("cheerio");
let config  = require("../config.js");
let request = require("./request.js");
let URL     = require("url").URL;

//-----------------------------------------------------------------------------

function PageParser(content) {
	this.$     = cheerio.load(content);
	this.cards = this.getJobCards();
}

//-----------------------------------------------------------------------------

PageParser.prototype.getJobCards = function() {
	return this.$(config["job-cards"]);
}

//-----------------------------------------------------------------------------

PageParser.prototype.getJobs = function() {
	let jobs = [];
	this.cards.each((index , item) => {
		let job = {} , card = this.$(item);

		job["job-link"]         = (new URL(item.attribs["href"] , config["base-URL"])).href;
		job["job-title"]        = card.find(config["job-title"]).text();
		job["company-name"]     = card.find(config["company-name"]).text();
		job["company-location"] = card.find(config["company-location"]).text();
		job["company-rating"]   = card.find(config["company-rating"]).text();
		job["job-snippet"]      = card.find(config["job-snippet"]).text().trim();
		job["job-salary"]       = card.find(config["job-salary"][0]).text().trim() + card.find(config["job-salary"][1]).text().trim();
		job["post-date"]        = card.find(config["post-date"]).contents().filter(function() { return this.type === "text" }).text();
		
		jobs.push(job);
	})
	return jobs;
}

//-----------------------------------------------------------------------------

PageParser.prototype.getNextPageLink = function() {
	let next = this.$("ul.pagination-list > li > a[aria-label=Next]").attr("href");
	return (next) ? (new URL(next , config["base-URL"])).href  : null;
}

//-----------------------------------------------------------------------------

PageParser.prototype.getContent = function() {
	return {
		"pageJobs" : this.getJobs(),
		"nextLink" : this.getNextPageLink()
	}
}

//-----------------------------------------------------------------------------

module.exports = PageParser;