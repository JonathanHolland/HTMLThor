
/*
 * Iterates through the file's list of errors and populates the error tab with them.
 * Currently only works for the first file returned. Will be updated to iterate through all
 * files and display them under separate "sections" accessible through the file select dropdown.
 */
function setErrors() {
	syntaxErrors = "";
	semanticErrors = "";
	warningErrors = "";
	deprecatedErrors = "";
	for(var i = 0; i < jsonObject[0].errors.count; i++) {
		var actualLineNumber = jsonObject[0].errors[i].line;
		errorType = jsonObject[0].errors[i].type;
		errorDiv = "<div fileowner='"+jsonObject[0].filename+"' errorId='"+actualLineNumber+"' class='"+errorType+" errorListing'>";
		errorDiv += "<p class='errorLocation'>Line "+jsonObject[0].errors[i].line+", Column "+jsonObject[0].errors[i].col+":</p>";
		errorDiv += "<p class='errorDescription'>"+jsonObject[0].errors[i].message+"</p>";
		errorDiv += "<pre>"+oldSource[jsonObject[0].errors[i].line - 1]+"</pre></div>";
		switch (errorType)
			{
			case "html": // html should not be a case...
				console.log(errorType);
				syntaxErrors += errorDiv;
			  break;
			case "syntax":
				console.log(errorType);
				syntaxErrors += errorDiv;
			  break;
			case "semantic":
				console.log(errorType);
				semanticErrors += errorDiv;
			  break;
			case "warning":
				console.log(errorType);
				warningErrors += errorDiv;
			  break;
			case "deprecated":
				console.log(errorType);
				deprecatedErrors += errorDiv;
			  break;
			}
	}
	if(jsonObject[0].errors.count == 0) {
		$('#errorsList').html("<p>There are no errors!</p>");
	}
	if(syntaxErrors != "") {
		syntaxErrors = "<div class='errorCategory syntax'><div class='testError'></div><h3>Syntax Errors</h3><div style='clear:both'></div>" + syntaxErrors + "</div>";
		$('#errorsList').append(syntaxErrors);		
	}
	if(semanticErrors != "") {
		syntaxErrors = "<div class='errorCategory semantic'><h3>Syntax Errors</h3><div style='clear:both'></div>" + syntaxErrors + "</div>";
		$('#errorsList').append(semanticErrors);		
	}
	if(warningErrors != "") {
		syntaxErrors = "<div class='errorCategory warning'><h3>Syntax Errors</h3><div style='clear:both'></div>" + syntaxErrors + "</div>";
		$('#errorsList').append(warningErrors);		
	}
	if(deprecatedErrors != "") {
		syntaxErrors = "<div class='errorCategory deprecated'><h3>Syntax Errors</h3><div style='clear:both'></div>" + syntaxErrors + "</div>";
		$('#errorsList').append(deprecatedErrors);		
	}
}


/* This function will navigate the user to the error they've clicked on from the page source section */
function openErrorId(fileowner, errorId) {
	console.log("fileowner is: "+fileowner + "errorId is: "+errorId);
	$('html, body').animate({
		// scroll to the element with the correct fileowner and errorId
		scrollTop: $(".errorListing[fileowner='"+fileowner+"'][errorId='"+errorId+"']").offset().top
	}, 600);
	removeLocation();
	$('#errorsLink').addClass('currentLocation');
}