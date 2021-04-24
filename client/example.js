let j = require("../main");

// j.PARAMS.queryAny  = "python";
// j.PARAMS.pageLimit = 10;
// j.PARAMS.radius = "20";
// j.PARAMS.salary = "40000";
// j.PARAMS.fromDays = 1;
// j.PARAMS.sort = "data";
// j.PARAMS.queryCompany = "Scopic";


//---------------------------------------------------------------------------------------

j.getJobs().then((jobs) => {
	console.log(jobs);
})

//---------------------------------------------------------------------------------------

// j.getPdf("./jobs.pdf").then((path) => {
// 	console.log(path);
// })
