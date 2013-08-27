if ($.cookie("jsonObjectHtml")) {

	console.log("cookie detected");
	
	var jsonString = $.cookie("jsonObjectHtml");
	
	// fix quotations before attempting to parse
	jsonString = jsonString.replace(/\\\"/g, '"');
	jsonString = jsonString.substring(1, jsonString.length-1);
	
	var jsonObject = $.parseJSON(jsonString);
	
	// once cookie is read and parsed, it can be deleted
	// $.removeCookie("jsonObjectHtml");
	//alert(jsonObject[0].source);
	
	/*
	======= EXAMPLES OF USE ======
	
	
	-- Access source code of first file (and at this point only file) --
	jsonObject[0].source; -> returns JSONObject
	
	-- Access first line of source code of first file --
	jsonObject[0].source[0] -> returns string
	
	-- Access number of lines in source code of first file --
	jsonObject[0].source.length -> returns integer
	
	-- Access error message of first error of first file --
	jsonObject[0].errors[0].message; -> returns string
	
	-- Access error type of third error of first file --
	jsonObject[0].errors[2].type; -> returns string
	
	-- Access line number of first error of first file --
	jsonObject[0].errors[0].line; -> returns integer
	
	-- Access column number of first error of first file --
	jsonObject[0].errors[0].col; -> returns integer
	
	-- Access error count for first file --
	jsonObject[0].errors.count; -> returns integer
	
	
	======= END OF EXAMPLES ======
	*/

	
	$(document).ready(function() {
		setPageSource(jsonObject[0].source);
		revealSite();
	});
	
	// ========== Simon add your code here! ======
}