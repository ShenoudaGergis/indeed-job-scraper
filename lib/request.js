let axios   = require("axios");
let baseURL = require("../config.json")["base-URL"]; 
let URL     = require("url").URL;

//-----------------------------------------------------------------------------

function request(params) {
	return axios.get((new URL("/jobs" , baseURL)).href , {
		params  : params,
		headers : { 
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
    	}
	}).then((response) => {
		return response.data;
	})
}

//-----------------------------------------------------------------------------

module.exports = request;