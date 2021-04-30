let j = require("../main");

j.PARAMS.queryAny = "java developer"  //set the query of search
j.PARAMS.level = "mid_level"
j.PARAMS.fromAge = 2   //get jobs with at max 2 days from now
j.PARAMS.maxPerPage = 10   //set how many jobs per page to visit
j.PARAMS.pageLimit = 5  //set to visit only 5 pages if exists
j.PARAMS.duplicate = "unique";

//---------------------------------------------------------------------------------------

j.getJobs().then((jobs) => {
	console.log(jobs);
})

//---------------------------------------------------------------------------------------

// j.getPdf("./jobs.pdf").then((path) => {
// 	console.log(path);
// })
