<img src="https://user-images.githubusercontent.com/54498156/143885256-bac41d82-c095-499e-898e-320753c5f667.png">

## Indeed Job Scraper :flashlight:
A node.js application to scrape jobs from Indeed website

------

### Install
`npm install indeed-job-scraper`

------

### How to use ?
```javascript
//import the required modules
let { getJobsList, getJobInfo, getJobsPDF, release, config } = require("indeed-job-scraper");
let fs   = require("fs");
let path = require("path");

async function scrapeIndeed() {

	//get job list data
	let jobs = await getJobsList({
		query 		: "php",
		fromdays 	: 1,
		sitetype	: "employer",
		sort     	: "date",
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

```
------
## Pagination
The application is designed to follow the next pages, but the user can limit the number of visited pages

------
## URL paramters
The `params` object contains 17 properties denoting the search criteria, this number is expected to be change in the future

| Paramter    | Indeed Default value  | Description                                                                                    |
|:-----------:|:---------------------:|:----------------------------------------------------------------------------------------------:| 
| query       |       ""              | search query      |
| hireType    |       any             | `directhire` to fetch jobs directly from companies only                                        |
| level       |       any             | `entry_level` , `mid_level` or `senior_level`                                                  |
| salary      |       any             | salary per year i.e `45K` , `30000` or salary range `45K - 90K`                                |
| radius      |       0               | radius to search with i.e `30` miles or in exact location                                      |
| location    |       any             | city , state , zip code or 'remote'                                                            |
| sort        |       relevance       | should be `relevance` or `date`                                                                |
| siteType    |       any             | should be `jobsite` or `employer`                                                              |
| jobType     |       any             | should be one of `fulltime`, `parttime`, `contract`, `internship`, `temporary` or `commission` |
| fromDays    |       all             | number of days since a job was published                                                       |
| duplicate   |       unique          | `unique` to filter duplication or `all` to enable them                                         |
| maxPerPage  |       10              | maximum number of jobs per page                                                                |                                                              

------
## configurations
You can change app configurations based on your needs i.e `locality domain` 

```javascript
let { config } = require("indeed-job-scraper");

config["max-pages"] = 4 //the maximum number of visited pages
config["base-URL"]  = "https://uk.indeed.com/"; //change the locality domain to restrict the search results to your country
config["verbose"]   = true;  //to deliver information about current processing
```

------
## TODO
- To enhance paramters filtering :thumbsup:
- To support other countries domain :thumbsup:
- To support advanced search criteria as possible :thumbsup:

