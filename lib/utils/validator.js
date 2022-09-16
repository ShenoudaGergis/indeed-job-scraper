
function isValueInt(value) {
	return (new RegExp("^[0-9]+$")).test(value);	
}

//-----------------------------------------------------------------------------

function isValueSalary(value) {
	return (new RegExp("^[0-9]+[kK]?( *- *[0-9]+[kK]?)?$")).test(value);
}

//-----------------------------------------------------------------------------

function isValueIn(value , arr) {
	return arr.indexOf(value) !== -1;
}

//-----------------------------------------------------------------------------

function isValueEmpty(value) {
	return value.length === 0; 
}

//-----------------------------------------------------------------------------

function filterParams(params) {
	let dict = {
		query 		 : "q",
		hiretype  	 : "sr",
		level		 : "explvl",
		salary		 : "salary",
		location 	 : "l",
		radius		 : "radius",
		sort 		 : "sort",
		sitetype 	 : "st",
		jobtype 	 : "jt",
		fromdays 	 : "fromage",
		duplicate    : "filter",
		maxperpage   : "limit",
	};
	Object.setPrototypeOf(dict , null);
	if(params === null || typeof params !== "object") throw new Error("params object should be an object");

	let filtered = {};
	for(let key in params) {
		if(typeof key !== "string") continue;
		let newKey = key.toLowerCase().trim();
		if(newKey in dict) {
			filtered[dict[newKey]] = (params[key] + "").toLowerCase().trim();
		}
	}
	return filtered;
}

//-----------------------------------------------------------------------------

function checkParamValue(filtered) {
	for(key in filtered) {
		let value = filtered[key];
		switch(key) {
			case "q" :
			case "l" :
				if(isValueEmpty(value)) 
					throw new Error(key + " value can't be empty");
				break;
			case "sr" :
				if(!isValueIn(value , ["directhire"])) 
					throw new Error(key + " should be 'directhire' or not");
				break;
			case "explvl" :
				if(!isValueIn(value , ["entry_level","senior_level","mid_level"])) 
					throw new Error(key + " should be 'entry_level', 'senior_level' or 'mid_level'");
				break;
			case "salary" :
				if(!isValueSalary(value)) 
					throw new Error(key + " should be a salary value");
				break;
			case "fromage"   :		
			case "radius"    :
			case "limit"     :
				if(!isValueInt(value)) 
					throw new Error(key + " should be a positive integer value");
				break;
			case "sort" :
				if(!isValueIn(value , ["relevance" , "date"])) 
					throw new Error(key + " should be 'relevance' or 'date'");
				break;
			case "st" :
				if(!isValueIn(value , ["jobsite","employer"])) 
					throw new Error(key + " should be 'jobsite' or 'employer'");
				break;
			case "jt" :
				if(!isValueIn(value , ["fulltime","parttime","contract","internship","temporary","commission"])) 
					throw new Error(key + " should be 'fulltime', 'parttime', 'contract', 'internship', 'temporary' or 'commission'");
				break;
			case "filter" :
				if(!isValueIn(value , ["all" , "unique"])) 
					throw new Error(key + " should be 'all' or 'unique'");
				filtered[key] = (value === "unique") ? 1 : 0;
				break;
		}
	}
	return filtered;
}

//-----------------------------------------------------------------------------

module.exports.filterParams    = filterParams;
module.exports.checkParamValue = checkParamValue;