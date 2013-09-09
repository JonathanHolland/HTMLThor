
/* OLD Statistics that were used for generating bars. 
 * Ignore.
 */
var statistics = [
	{"name":"index.html", "id":"index.html_0", "syntaxErrors":2, "semanticErrors":23, "warningErrors":4, "deprecatedErrors":2},
	{"name":"about.html", "id":"about.html_0", "syntaxErrors":0, "semanticErrors":0, "warningErrors":0, "deprecatedErrors":0},
	{"name":"contact.html", "id":"contact.html_0", "syntaxErrors":2, "semanticErrors":16, "warningErrors":4, "deprecatedErrors":2},
	{"name":"images.html", "id":"images.html_0", "syntaxErrors":0, "semanticErrors":50, "warningErrors":1, "deprecatedErrors":25}
];

/*
 * Function called to generate the statistics. Will in the future iterate through all of 
 * the files sent back. Currently set generate statistics for the first file only.
 * If the file has no errors attached, a pre-written message is displayed.
 */
function populateStatistics() {
	/*for(var i = 0; i < statistics.length; i++) {
		generateFileStatistics(statistics[i]);
	} PRE-CODED STATS*/
	
	generateFileStatistics(jsonObject[0]);
	if(noFileErrors()) {
		$('#feedback').html("<p><strong>Congratulations!</strong> Your site rocks!</p>");
		console.log("no errors found, set feedback id");
	}
}

/*
 * Function to determine if the file has errors or not. 
 * Will be updated to check for all files in the future.
 * @returns	true	if the file has no errors
 * @returns	false	if the file has errors
 */
function noFileErrors() {
	if(jsonObject[0].errors.count == 0) {

		return true;
	}
	else {
		return false;
	}
}

/*
 * Function to generate the html for the bar statistic.
 * The html is then added into the #statGraph div.
 * The function calculatePercentages() is called from here.
 */
function generateFileStatistics(file) {
	statistic = "<div id='"+file.filename+"' class='fileGraph'>";
	statistic += "<p class='fileName'>"+file.filename+"</p>";
	statistic += "<div class='bar'>";
	statistic += calculatePercentages(file);
	statistic += "<div style='clear:both'></div>";
	statistic += "</div>";
	$('#statGraph').append(statistic);
}

/*
 * Calculates and returns the percentages for each type of error.
 *
 * @param	file	the file from the jsonObject which contains error details.
 * @return	bars	the html containing the error bar
 */
function calculatePercentages(file) {
	// calculate the percentages
	// add up the numbers
	totalErrors = jsonObject[0].errors.count;
	syntaxErrors = 0;
	semanticErrors = 0;
	warningErrors = 0;
	deprecatedErrors = 0;
	
	totalErrors += 3;// TESTING REMOVE THIS!
	semanticErrors ++;// TESTING REMOVE THIS!
	deprecatedErrors += 2;// TESTING REMOVE THIS!
	
	/* Counts the number of errors for each type. */
	for(var i = 0; i < jsonObject[0].errors.count; i++) {
		switch (jsonObject[0].errors[i].type)
			{
			case "html": // html should not be a case...
				syntaxErrors ++;
			  break;
			case "syntax":
				syntaxErrors ++;
			  break;
			case "semantic":
				semanticErrors ++;
			  break;
			case "warning":
				warningErrors ++;
			  break;
			case "deprecated":
				deprecatedErrors ++;
			  break;
			}
	}
	
	bars = "";
	
	if(totalErrors == 0) {
		bars += "<div class='zero graph' style='width:100%;'></div>";
	}
	
	else {
		bars = "";
		syntaxPercentage = syntaxErrors / totalErrors * 100;
		semanticPercentage = semanticErrors / totalErrors * 100;
		warningPercentage = warningErrors / totalErrors * 100;
		deprecatedPercentage = deprecatedErrors / totalErrors * 100;
		
		/* Adding attribute errorNumber to allow the hover highlight to easily retrieve the number of errors. */
		bars += "<div class='syntax graph' style='width:"+syntaxPercentage+"%;' errorNumber='"+syntaxErrors+"'></div>";
		bars += "<div class='semantic graph' style='width:"+semanticPercentage+"%;' errorNumber='"+semanticErrors+"'></div>";
		bars += "<div class='warning graph' style='width:"+warningPercentage+"%;' errorNumber='"+warningErrors+"'></div>";
		bars += "<div class='deprecated graph' style='width:"+deprecatedPercentage+"%;' errorNumber='"+deprecatedErrors+"'></div>";
		
	}
	bars += "</div>";
	bars += "<p class='errorNumber'>"+totalErrors+" errors</p>";
	return bars;
	
}

/* In the future this function will generate the highlight message to be displayed. */
function visualHighlight(barId) {
	errorNumber = barId.attr('errorNumber');
	errorType = barId.attr('class').split(' ')[0];
	if(errorNumber == 1){
		return "<p>There is "+barId.attr('errorNumber')+" "+errorType+" error.</p>";	
	}
	else {
		return "<p>There are "+barId.attr('errorNumber')+" "+errorType+" errors.</p>";		
	}

	/* WILL NEED THIS LOOP FOR DYNAMIC
	for(var i = 0; i < statistics.length; i++) {
		if(statistics[i].id == barId){
			return "<p>"+barId+"</p>";
		}
	}
	*/
}

/* When a .graph is hovered over, a qtip is created. */
$(document).delegate('.graph', 'mouseover', function(event) {
	console.log("hover");
	$(this).qtip({
		overwrite: false,
		show: {
			event: event.type,
			ready: true
		},
		position: {
			my: 'bottom left',
			at: 'top left',
			target: $(this)
		},
		style: { classes: 'barHighlight' },
		hide: {
			delay: 0
			//event: false
		}, 
		content: {
			text: visualHighlight($(this))
		}
	});
	
	event.preventDefault();
});