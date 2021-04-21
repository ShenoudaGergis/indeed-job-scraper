## indeed-job-scraper
A node.js application to scrape jobs from Indeed website

------

### Install
`npm install indeed-job-scraper`

------

### How to use ?
```javascript
//import the main module
let service = require("indeed-job-scraper");

//you have to set the URL paramters within PARAMS constant
service.PARAMS.query = "java developer"  //set the query of search
service.PARAMS.fromAge = 2   //get jobs with at max 2 days from now
service.PARAMS.maxPerPage = 10   //set how many jobs per page to visit
service.PARAMS.pageLimit = 5  //set to visit only 5 pages if exists

//you have two ways to work with

//first : to get the fetched jobs as an array of objects
service.getJobs().then((jobs) => {
  console.log(jobs)
}).catch((error) => {
  console.log(error)
})

//seconde : to generate a PDF file with a specified path contains the fetched jobs
service.getPdf("./jobs.pdf").then((path) => {
  console.log(path)
}).catch((error) => {
  console.log(error)
})

```
------
## Pagination
The application is designed to follow the next pages, but the user can limit the number of visited pages

------
## URL paramters
The `service.PARAMS` object contains for now 9 properties denoting the search criteria, this number is expected to be increased

| Paramter   | Type        | Default value  | Description                                                                       |
| -----------|:-----------:|:--------------:|:---------------------------------------------------------------------------------:| 
| query      | string      |       ""       | search query i.e `Java Developer`                                                 |
| location   | string      |       ""       | city , state , zip code or 'remote'                                               |
| sort       | string      |       ""       | should be `relevance` or `date`                                                   |
| siteType   | string      |       ""       | should be `jobsite` or `employer`                                                 |
| jobType    | string      |       ""       | should be one of `fulltime`, `parttime`, `contract`, `internship`, or `temporary` |
| fromDays   | number      |       7        | number of days since a job was published                                          |
| duplicate  | number      |       1        | `1` to filter duplication or `0` to enable them                                   |
| maxPerPage | number      |       25       | maximum number of jobs per page                                                   |
| pageLimit  | number      |       10       | maximum number of visited pages                                                   |

------
## TODO
- To enhance paramters filtering
- To support other countries domain
- To support advanced search criteria as possible

