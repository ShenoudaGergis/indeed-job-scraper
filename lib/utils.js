const strRule = "^\.+$";
const numAll  = "^[0-9]+(\.?[0-9]*)$";
const numInt  = "^[0-9]+$";
const salary  = "^[0-9]+[kK]?( *- *[0-9]+[kK]?)?$";

//---------------------------------------------------------------------------------------

function validate(rule , arg , choices , d) {
	let reg = new RegExp(rule);
	if(reg.test(arg)) {
		if(choices) {
			return (choices.indexOf(arg) === -1) ? "" : arg;
		} else return arg;
	} else {
		return "";
	}
}

//---------------------------------------------------------------------------------------

function checkParam(obj) {
	let dict = {
		queryAll 	 : "as_and",
		queryAny 	 : "as_any",
		queryNot 	 : "as_not",
		queryPhrase  : "as_phr",
		queryTitle   : "as_ttl",
		queryCompany : "as_cmp",
		hireType  	 : "sr",
		level		 : "explvl",
		salary		 : "salary",
		location 	 : "l",
		radius		 : "radius",
		sort 		 : "sort",
		siteType 	 : "st",
		jobType 	 : "jt",
		fromDays 	 : "fromage",
		duplicate    : "filter",
		maxPerPage   : "limit",
		pageLimit    : "pageLimit",
	};

	let s 			= {};
	let c 			= {
		"pageLimit" : 1
	};
	
	for(let item in dict) {
		let p = obj[item];
		if(p === 0 || (p && p.toString())) {
			p = p.toString().trim().toLowerCase();

			switch(item) {
				case "queryAll" :
					if(p = validate(strRule , p , null , "")) {
						s[dict[item]] = p;	
					}
					break;
				case "queryAny" :
					if(p = validate(strRule , p , null , "")) {
						s[dict[item]] = p;	
					}
					break;
				case "queryNot" :
					if(p = validate(strRule , p , null , "")) {
						s[dict[item]] = p;	
					}
					break;
				case "queryPhrase" :
					if(p = validate(strRule , p , null , "")) {
						s[dict[item]] = p;	
					}
					break;
				case "level" :
					if(p = validate(strRule , p , ["entry_level","senior_level","mid_level"] , "")) {
						s[dict[item]] = p;	
					}
					break;
				case "queryTitle" :
					if(p = validate(strRule , p , null , "")) {
						s[dict[item]] = p;	
					}
					break;
				case "queryCompany" :
					if(p = validate(strRule , p , null , "")) {
						s[dict[item]] = p;	
					}
					break; 
				case "salary" :
					if(p = validate(salary , p , null , "")) {
						s[dict[item]] = p;	
					}
					break;
				case "hireType" :
					if(p = validate(strRule , p , ["directhire"] , "")) {
						s[dict[item]] = p;	
					}
					break;
				case "location" : 
					if(p = validate(strRule , p , null , "")) {
						s[dict[item]] = p;	
					}
					break;
				case "radius" :
					if(p = validate(numInt , p , null , "")) {
						s[dict[item]] = p;	
					}
					break;
				case "sort" : 
					if(p = validate(strRule , p , ["relevance" , "date"] , "")) {
						s[dict[item]] = p;	
					}
					break;
				case "siteType" : 
					if(p = validate(strRule , p , ["jobsite","employer"] , "")) {
						s[dict[item]] = p;	
					}
					break;				
				case "jobType" :
					if(p = validate(strRule , p , ["fulltime","parttime","contract","internship","temporary","commission"] , "")) {
						s[dict[item]] = p;	
					}
					break;
				case "fromDays" : 
					if(p = validate(numInt , p , null , "")) {
						s[dict[item]] = p;	
					}
					break;
				case "duplicate" : 
					if(p = validate(strRule , p , ["all","unique"] , "")) {
						s[dict[item]] = (p === "unique") ? 1 : 0; 
					}
					break;
				case "maxPerPage" : 
					if(p = validate(numInt , p , null , "")) {
						s[dict[item]] = p;	
					}
					break;
				case "pageLimit" : 
					if(p = validate(numInt , p , null , "")) {
						c[dict[item]] = Math.floor(Math.abs(+p));
					}
					break;
			};
		}
	} 
	
	return {
		"param" : s,
		"config": c
	}
}

exports.checkParam = checkParam;
