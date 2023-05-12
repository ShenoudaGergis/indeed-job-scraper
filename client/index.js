let { getJobsList , getJobsPDF, release, config } = require("../index.js");
let fs   = require("fs");
let path = require("path");

config["max-pages"] = "20"
config["base-URL"]  = "https://uk.indeed.com/";
config["verbose"]   = true;



//get job list data
getJobsList({
	query : "php",
	fromdays : 1,
	sitetype: "employer",
	sort     : "date",
	maxperpage : 20,
	level      : "senior_level"
})
.then(console.log)
.then(release);




//get job list as a PDF report
// getJobsPDF({
// 	query      : "Android Developer",
// 	fromdays   : 2,
// 	sort       : "date",
// 	maxperpage : 20,
// 	level      : "senior_level",
// }).then((pdfBuffer) => {
// 	fs.writeFileSync(path.join(__dirname , "./jobs.pdf") , pdfBuffer);
// }).then(release);