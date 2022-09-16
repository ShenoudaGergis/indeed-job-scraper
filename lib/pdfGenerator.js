let path        = require("path");
let fs          = require("fs");
let cheerio     = require("cheerio");
let BrowserPage = require("./browser.js");
let temp        = require("tmp");
let URL         = require("url").URL;


//---------------------------------------------------------------------------------------

PdfGenerator.prototype.readHTMLTemplate = function() {
	return fs.readFileSync(path.join(__dirname , "../template/file.html") , "utf8");
}

//---------------------------------------------------------------------------------------

PdfGenerator.prototype.writeJobsIntoTable = function() {
	let counter = 1;
	this.jobs.forEach((job) => {

		let builder = `<table class="table-style-three"><tbody>`;
		builder += `<tr><td><b>#</b></td><td>${counter++}</td></tr>`
		Object.getOwnPropertyNames(job).forEach((jobCol) => {
			builder += `<tr>
 							<td><b>${jobCol}</b></td>
 							<td>${job[jobCol]}</td>
 						</tr>`
		})
		builder += `</tbody></table><br /><br />`;
		this.container.append(builder);
	})
}


//---------------------------------------------------------------------------------------

PdfGenerator.prototype.writeTempHTML = function() {
	this.writeJobsIntoTable();
	let content = this.$.html() , tempHTMLpath = temp.fileSync().name + ".html";
	fs.writeFileSync(tempHTMLpath , content , { encoding : "utf8" });
	return tempHTMLpath;
}

//---------------------------------------------------------------------------------------

PdfGenerator.prototype.generatePDF = function() {
	let tempHTMLpath = this.writeTempHTML();
	return this.page.exportPDF((new URL(tempHTMLpath , "file://")));
}

//---------------------------------------------------------------------------------------

function PdfGenerator(jobs) {
	this.jobs      = jobs;
	this.$		   = cheerio.load(this.readHTMLTemplate())
	this.container = this.$("div.container");
	this.page      = new BrowserPage();

}

//---------------------------------------------------------------------------------------

module.exports = PdfGenerator;