let { getJobsList , getJobsPDF , config } = require("../index.js");
let fs   = require("fs");
let path = require("path");

config["max-pages"] = "20"
config["base-URL"]  = "https://uk.indeed.com/";
config["verbose"]   = true;

console.log(config["verbose"]);

//get job list data
getJobsList({
	queryany : "Node.js developer",
	fromdays : 20,
	sort     : "date",
	maxperpage : 20
	// level      : "entry_level",
	// location   : "remote" 
}).then((jobs) => {
	console.log(jobs);
})


//get job list as a PDF report
// getJobsPDF({
// 	queryany   : "Java Developer",
// 	fromdays   : 7,
// 	sort       : "date",
// 	maxperpage : 10 
// }).then((pdfBuffer) => {
// 	fs.writeFileSync(path.join(__dirname , "./jobs.pdf") , pdfBuffer);
// })