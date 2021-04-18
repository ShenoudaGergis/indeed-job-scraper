let j = require("../main");

j.PARAMS.fromDays = 60;
j.PARAMS.maxPerPage = 25;
j.PARAMS.pageLimit = 1000;
j.PARAMS.query = "python";
j.PARAMS.location = "";
j.PARAMS.jobType = "";
j.PARAMS.sort = "date";

//---------------------------------------------------------------------------------------

// j.getJobs().then((jobs) => {
// 	console.log(jobs);
// })

//---------------------------------------------------------------------------------------

j.getPdf("./jobs.pdf").then((path) => {
	console.log(path);
})
