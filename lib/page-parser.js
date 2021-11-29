let cheerio = require("cheerio");
let map     = require("../config.json")["scrape"];
let baseURL = require("../config.json")["base-URL"];
let request = require("./request.js");
let URL     = require("url").URL;

//-----------------------------------------------------------------------------

function PageParser(content) {
	this.$     = cheerio.load(content);
	this.cards = this.getJobCards();
}

//-----------------------------------------------------------------------------

PageParser.prototype.getJobCards = function() {
	return this.$(map["job-cards"]);
}

//-----------------------------------------------------------------------------

PageParser.prototype.getJobs = function() {
	let jobs = [];
	this.cards.each((index , item) => {
		let job = {} , card = this.$(item);

		job["job-link"]         = (new URL(item.attribs["href"] , baseURL)).href;
		job["job-title"]        = card.find(map["job-title"]).text();
		job["company-name"]     = card.find(map["company-name"]).text();
		job["company-location"] = card.find(map["company-location"]).text(); //.contents().filter(function() { return this.type === "text" || this.type === "span" && !this.hasClass("more_loc_container") }).text();
		job["company-rating"]   = card.find(map["company-rating"]).text();
		job["job-snippet"]      = card.find(map["job-snippet"]).text().trim();
		job["job-salary"]       = card.find(map["job-salary"][0]).text().trim() + card.find(map["job-salary"][1]).text().trim();
		job["post-date"]        = card.find(map["post-date"]).contents().filter(function() { return this.type === "text" }).text();
		
		jobs.push(job);
	})
	return jobs;
}

//-----------------------------------------------------------------------------

PageParser.prototype.getNextPageLink = function() {
	let next = this.$("ul.pagination-list > li > a[aria-label=Next]").attr("href");
	return (next) ? (new URL(next , baseURL)).href  : null;
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