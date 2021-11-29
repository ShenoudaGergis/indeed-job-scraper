let { getJobsList , getJobsPDF } = require("../index.js");
let fs = require("fs");
let path = require("path");

//get job list data
getJobsList({
	queryany : "Node.js developer",
	fromdays : 20,
	sort     : "date",
	maxperpage : 50,
	level      : "entry_level",
	location   : "remote" 
}).then((jobs) => {
	console.log(jobs);
})


//get job list as a PDF report
getJobsPDF({
	queryany   : "Java Developer",
	fromdays   : 7,
	sort       : "date",
	maxperpage : 50 
}).then((pdfBuffer) => {
	fs.writeFileSync(path.join(__dirname , "./jobs.pdf") , pdfBuffer);
})