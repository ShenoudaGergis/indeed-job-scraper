let path        = require("path");
let fs          = require("fs");
let cheerio     = require("cheerio");
let puppeteer   = require('puppeteer');
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
	let content = this.$.html() , tempHTMLpath = path.join(__dirname , "../temp/.temp.html");
	fs.writeFileSync(tempHTMLpath , content , { encoding : "utf8" });
	return tempHTMLpath;
}

//---------------------------------------------------------------------------------------

PdfGenerator.prototype.generatePDF = async function() {
	let tempHTMLpath = this.writeTempHTML();
	let browser      = await puppeteer.launch({ headless: true });
	let page         = await browser.newPage();
	await page.goto( (new URL(tempHTMLpath , "file://")).href );
	let pdf = await page.pdf({ format: 'A4' , landscape: true, timeout: 300000, printBackground: true , margin: {top: 40, left: 20, right: 20, bottom: 40}});
	await browser.close();
	return pdf
}

//---------------------------------------------------------------------------------------

function PdfGenerator(jobs) {
	this.jobs      = jobs;
	this.$		   = cheerio.load(this.readHTMLTemplate())
	this.container = this.$("div.container");

}

//---------------------------------------------------------------------------------------

module.exports = PdfGenerator;