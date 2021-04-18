let path = require("path");
let fs  = require("fs");
let cheerio = require("cheerio");
let pdf = require("html-pdf");


//---------------------------------------------------------------------------------------

PdfGenerator.prototype.readHTMLTemplate = function() {
	return fs.readFileSync(path.resolve(__dirname , "../template/file.html") , "utf8");
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

PdfGenerator.prototype.generatePDF = function() {
	this.writeJobsIntoTable();
	let options = { 
		format		: "A4", 
		orientation : "landscape",
		header: {
    		"height": "20mm",
    		"contents": '<div style="text-align: center;font-size: 7px;">Author: ShenoudaGergis</div>'
  		},
  		footer : {
  			"height" : "12mm"
  		},
  		timeout : 90000

	};
	let content = this.$.html();
	
	return new Promise((resolve , reject) => {
		pdf.create(content, options).toFile(this.outPath , (error , result) => {
			if(error) throw error;
			resolve(result);

		})
	})
}

//---------------------------------------------------------------------------------------

function PdfGenerator(jobs , outPath) {
	this.jobs         = jobs;
	this.outPath   	  = outPath;
	this.$		   = cheerio.load(this.readHTMLTemplate())
	this.container = this.$("div.container");

}

exports.PdfGenerator = PdfGenerator;