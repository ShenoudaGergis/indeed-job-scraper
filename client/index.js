let { getJobsList, getJobInfo, getJobsPDF, release, config } = require("../index.js");
let fs   = require("fs");
let path = require("path");

config["max-pages"] = "20"
config["base-URL"]  = "https://www.indeed.com/";
config["verbose"]   = true;

async function scrapeIndeed() {
	
	//get job list data
	let jobs = await getJobsList({
		query        : "php",
		fromdays    : 1,
		sitetype    : "employer",
		sort        : "date",
		maxperpage 	: 20,
		level      	: "senior_level"
	});
	console.log(jobs);


	let url = new URL(jobs[0]['job-link']);


	//get single job full info 
	let job = await getJobInfo(url);
	console.log(job);


	//get job list as a PDF report
	let pdfBuffer = await getJobsPDF({
		query      : "Android Developer",
		fromdays   : 2,
		sort       : "date",
		maxperpage : 20,
		level      : "senior_level",
	});
	fs.writeFileSync(path.join(__dirname , "./jobs.pdf") , pdfBuffer);


	//release browser
	release();
}

scrapeIndeed();