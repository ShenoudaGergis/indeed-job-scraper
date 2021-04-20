let axios   = require("axios");
let baseURL = "https://www.indeed.com";
let cheerio = require("cheerio");
let { checkParam } = require("./utils");


//---------------------------------------------------------------------------------------

Parser.prototype.fetch = function(url , params) {
	return axios.get(url , {
		params  : params,
		headers: { 
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
    	}
	}).then((page) => {
		console.log(page.request.res.responseUrl)
		return page.data
	});
}

//---------------------------------------------------------------------------------------

Parser.prototype.getNextPageLink = function(data) {
	let $    = cheerio.load(data);
	let next = $("ul.pagination-list > li > a[aria-label=Next]").attr("href");
	return (next) ? baseURL + next : undefined;

}

//---------------------------------------------------------------------------------------

Parser.prototype.getPageJobs = function(data) {
	let $    = cheerio.load(data);
	let jobs = [];

	$('div.row.result').each((i , result) => {
		let titleAndLink = $(result).find('h2.title a');
		let company = $(result).find("div.sjcl .company");
		let summary = $(result).find("div.summary");
		let date    = $(result).find("div.jobsearch-SerpJobCard-footerActions .date");
		let salary  = $(result).find("div.salarySnippet .salaryText");

		jobs.push({
			"link"    : baseURL + titleAndLink.attr("href").trim() , 
			"title"   : titleAndLink.attr("title").trim() , 
			"company" : company.text().trim() ,
			"summary" : summary.text().trim() ,
			"salary"  : salary.text().trim() ,
			"date"    : date.text().trim()
		}); 
	})
	return jobs;

}

//---------------------------------------------------------------------------------------

Parser.prototype.getPagesData = function(url , params , comulative=[]) {
	if(this.pageLimit-- === 0) return Promise.resolve(comulative);
	return this.fetch(url , params).then((data) => {
		let nextUrl   = this.getNextPageLink(data);
		let pageJobs  = this.getPageJobs(data);
		if(nextUrl) {
			console.log("Next Page => " , nextUrl);
			return this.getPagesData(nextUrl , {} , comulative.concat(pageJobs));
		} else {
			return comulative.concat(pageJobs);
		}
	})
}

//---------------------------------------------------------------------------------------

Parser.prototype.getJobs = function() {
	return this.getPagesData(baseURL + "/jobs?" , this.entryParams);
}

//---------------------------------------------------------------------------------------

function Parser(params) {
 	// this.entryParams = this.renameParams(params);
 	let p = checkParam(params);
 	this.entryParams = p.param;
 	this.pageLimit   = p.config.pageLimit;
 	console.log("query => " , this.entryParams);
}


//---------------------------------------------------------------------------------------

exports.Parser = Parser;