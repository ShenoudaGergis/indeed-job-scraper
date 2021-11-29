let { getJobsList , getJobsPDF } = require("../index.js");
let fs = require("fs");
let path = require("path");

//get job list data
getJobsList({
	queryany : "Java Developer",
	fromdays : 7
}).then((jobs) => {
	console.log(jobs);
})


//get job list as a PDF report
getJobsPDF({
	queryany : "Java Developer",
	fromdays : 7
}).then((pdfBuffer) => {
	fs.writeFileSync(path.join(__dirname , "./jobs.pdf") , pdfBuffer);
})