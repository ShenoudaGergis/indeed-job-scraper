function checkNumber(arg , min , max , d) {
	if(typeof arg !== "number") throw new Error(`arg < ${arg} > should be of type number got ${typeof arg}`);
	arg 			  = Math.floor(Math.abs(arg));
	if(arg < min) arg = d;
	if(arg > max) arg = d;
	return (arg !== NaN) ? arg : d;
}

//---------------------------------------------------------------------------------------

function checkString(arg , args=null) {
	if(typeof arg !== "string") throw new Error(`arg < ${arg} > should be of type string got ${typeof arg}`);
	arg = arg.toLowerCase().trim();
	if(args) {
		args = args.map((v) => {return v.toLowerCase();});		
		return (args.indexOf(arg) === -1) ? "" : arg;
	}
	else 
		return arg;
}


//---------------------------------------------------------------------------------------

function checkParam(obj) {
	let dict = {
		query 		: "q",
		location 	: "l",
		sort 		: "sort",
		siteType 	: "st",
		jobType 	: "jt",
		fromDays 	: "fromage",
		duplicate   : "filter",
		maxPerPage  : "limit",
		pageLimit   : "pageLimit",
	};

	let s 			= {};
	let c 			= {
		"pageLimit" : 1
	};
	
	for(let item in dict) {
		// if(typeof obj[item] === "number" || typeof obj[item] === "string") {
			switch(item) {
				case "query" : 
					s[dict[item]] = checkString(obj[item]);
					break;
				case "location" : 
					s[dict[item]] = checkString(obj[item]);
					break;
				case "sort" : 
					s[dict[item]] = checkString(obj[item] , ["relevance" , "date"]);
					break;
				case "siteType" : 
					s[dict[item]] = checkString(obj[item] , ["jobsite" , "employer"]);
					break;
				case "jobType" : 
					s[dict[item]] = checkString(obj[item] , ["fulltime","parttime","contract","internship","temporary"]);
					break;
				case "fromDays" : 
					s[dict[item]] = checkNumber(obj[item] , 1 , 30 , 7);
					break;
				case "duplicate" : 
					s[dict[item]] = checkNumber(obj[item] , 0 , 1 , 1);
					break;
				case "maxPerPage" : 
					s[dict[item]] = checkNumber(obj[item] , 1 , 25 , 25);
					break;
				case "pageLimit" : 
					c[dict[item]] = checkNumber(obj[item] , 1 , 1000 , 10);
					break;

			};
		// }
	} 
	
	return {
		"param" : s,
		"config": c
	}
}

exports.checkParam = checkParam;
