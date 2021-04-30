## Indeed Job Scraper :flashlight:
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
service.PARAMS.queryAny = "java developer"  //set the query of search
service.PARAMS.salary = "50K"
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
| pageLimit   |       1               | maximum number of visited pages                                                                |

------
## TODO
- To enhance paramters filtering :thumbsup:
- To support other countries domain
- To support advanced search criteria as possible :thumbsup:

