<img src="https://user-images.githubusercontent.com/54498156/143885256-bac41d82-c095-499e-898e-320753c5f667.png">

## Indeed Job Scraper :flashlight:
A node.js application to scrape jobs from Indeed website

------

### Install
`npm install indeed-job-scraper`

------

### How to use ?
```javascript
//import the main module
let { getJobsList , getJobsPDF } = require("indeed-job-scraper");

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
	fs.writeFileSync(path.join(__dirname , "./jobs.pdf") , pdfBuffer); //save jobs as a pdf file on disk
})

```
------
## Pagination
The application is designed to follow the next pages, but the user can limit the number of visited pages

------
## URL paramters
The `params` object contains 17 properties denoting the search criteria, this number is expected to be change in the future

| Paramter    | Indeed Default value  | Description                                                                                    |
|:-----------:|:---------------------:|:----------------------------------------------------------------------------------------------:| 
| queryAll    |       ""              | all words should be found in result                                                            |         
| queryNot    |       ""              | each word must **NOT** be found in result                                                      |
| queryAny    |       ""              | any word from this query should be found in result                                             |
| queryPhrase |       ""              | this sentence should be found in result                                                        |
| queryTitle  |       ""              | any word should be found in a job title                                                        |
| queryCompany|       any             | company should be in result                                                                    |
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
You can change app configurations at `./config.json` based on your needs

| Paramter    | Default value             | Description                                                                |
|:-----------:|:-------------------------:|:--------------------------------------------------------------------------:| 
| base-URL    | "https://www.indeed.com/" | change the locality domain to restrict the search results to your country  |                           
| max-pages   |       5                   | the maximum number of visited pages                                        |
| verbose     |       true                | to deliver information about current processing                            |

------
## TODO
- To enhance paramters filtering :thumbsup:
- To support other countries domain :thumbsup:
- To support advanced search criteria as possible :thumbsup:

