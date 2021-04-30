let { Parser } 		 = require("./lib/parser");
let { PdfGenerator } = require("./lib/pdfGenerator");

//---------------------------------------------------------------------------------------

const PARAMS = {
	queryAll 	 : "",
	queryAny 	 : "",
	queryNot 	 : "",
	queryPhrase  : "",
	queryTitle   : "",
	queryCompany : "",
	hireType  	 : "",
	level		 : "",
	salary		 : "",
	location 	 : "",
	radius		 : "",
	sort 		 : "",
	siteType 	 : "",
	jobType 	 : "",
	fromDays 	 : "",
	duplicate    : "",
	maxPerPage   : "",
	pageLimit    : "",
};
Object.seal(PARAMS);

//---------------------------------------------------------------------------------------

function getJobs() {
	let parser = new Parser(PARAMS);
	return parser.getJobs();
}

//---------------------------------------------------------------------------------------

function getPdf(path) {
	return getJobs().then((jobs) => {
		return new PdfGenerator(jobs , path).generatePDF();
	});
}

//---------------------------------------------------------------------------------------

exports.PARAMS  = PARAMS;
exports.getJobs = getJobs;
exports.getPdf  = getPdf;