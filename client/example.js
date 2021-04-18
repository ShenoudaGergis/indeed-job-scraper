let j = require("../main");

j.PARAMS.fromDays = 3;
j.PARAMS.maxPerPage = 50;
j.PARAMS.pageLimit = 1000;
j.PARAMS.query = "node developer";
j.PARAMS.location = "";

//---------------------------------------------------------------------------------------

// j.getJobs().then((jobs) => {
// 	console.log(jobs);
// })

//---------------------------------------------------------------------------------------

j.getPdf("./jobs.pdf").then((path) => {
	console.log(path);
})
