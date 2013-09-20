
		
	var resultsOpen = false;
		
		/* Opens the Page Source tab */
		function openSource() {
			$('#sourceTitle').removeClass("bottomBorder");
			$('#sourceTitle').removeClass("extraMargin");
			$('#sourceTitle').show();
			$('#sourceContainer').show();
		}
		
		/* Opens the Errors List tab */		
		function openErrors() {
			$('#errorsTitle').removeClass("bottomBorder");
			$('#errorsTitle').removeClass("extraMargin");
			$('#errorsTitle').show();
			$('#errorsContainer').show();
		}

		/* Opens the the tab of the provided ID
		 * @param  id  the id of the page section
		 */		
		function openOthers(id) {
			$('#'+id).fadeIn();
			$('#'+id+' > .sectionContent').fadeIn();
			$('#'+id).removeClass("noMargin");	
		}
	
		$(document).ready(function() {
		
			/* This is code for the qtip2 plugin. Delegate allows it to work with dynamically generated content
				from http://craigsworks.com/projects/forums/showthread.php?tid=3253 
				http://qtip2.com/options
				When the user hovers over an error in the source code, the qtip plugin is called.
				*/
			 $(document).delegate('.errorContainer', 'mouseover', function(event) {
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
					style: { classes: 'qTipHighlight' },
					hide: {
						delay: 0//enter in milliseconds
					}, 
					content: {
						text: getContent($(this).attr('id'))
					}
				});
				
				event.preventDefault();
			});
		
			/* Hide sections of the site that should not be shown initially*/
			$('.extraOne').hide();
			$('.extraTwo').hide();
			$('.hidden').hide();
			
			$("#homeLink").click(function(e) {
				hideSections();
				removeLocation();
				$(this).addClass('currentLocation');
				$('#home').fadeIn();
				resultsOpen = false;
			 });
			
			$("#uploadLink").click(function(e) {
				hideSections();
				removeLocation();
				$(this).addClass('currentLocation');
				openOthers("upload");
				resultsOpen = false;
			 });
			
			$("#breakdownLink").click(function(e) {
				console.log("breakdown clicked");
				e.preventDefault();
				if(!resultsOpen) {
					revealSite();
				}
				 $('html, body').animate({
					 scrollTop: $("html").offset().top
				 }, 600);
				removeLocation();
				$(this).addClass('currentLocation');
			 });
			
			$("#structureLink").click(function(e) {
				e.preventDefault();
				if(!resultsOpen) {
					revealSite();
				}
				 $('html, body').animate({
					 scrollTop: $("#structureTitle").offset().top
				 }, 600);
				removeLocation();
				$(this).addClass('currentLocation');
			 });
			
			$("#sourceLink").click(function(e) {
				e.preventDefault();
				if(!resultsOpen) {
					revealSite();
				}
				 $('html, body').animate({
					 scrollTop: $("#sourceTitle").offset().top
				 }, 600);
				removeLocation();
				$(this).addClass('currentLocation');
			 });
			
			$("#errorsLink").click(function(e) {
				e.preventDefault();
				if(!resultsOpen) {
					revealSite();
				}
				 $('html, body').animate({
					 scrollTop: $("#errorsTitle").offset().top
				 }, 600);
				removeLocation();
				$(this).addClass('currentLocation');
			 });
			
			$("#topLink").click(function(e) {
				e.preventDefault();
				 $('html, body').animate({
					 scrollTop: $("html").offset().top
				 }, 600);
			 });
			 
			 
			$("#alternativeButton").click(function(e) {
				$('#directInputForm').submit();
			});
			
			
			/* END PAGE NAVIGATION */
			
			$(".key").click(function() {
				console.log("key top clicked");
				$(this).children('.keyInfo').slideToggle();
			});
			
			/* HELP KEY */
			
			
			
			
			/* END HELP KEY */
			
			
		});
		
		
		/* Updating site section 
		 * When the user visits a new section of the site the sidebar links need to be updated.
		 * This plugin removes the .currentLocation class from all of the sidebar links.
		 */
		
		 function removeLocation() {
				$("#homeLink").removeClass('currentLocation');
				$("#uploadLink").removeClass('currentLocation');
				$("#breakdownLink").removeClass('currentLocation');
				$("#structureLink").removeClass('currentLocation');
				$("#sourceLink").removeClass('currentLocation');
				$("#errorsLink").removeClass('currentLocation');
		 }
		 
		 /* 
		  * Hides all of the site's sections.
		  */
		 function hideSections() {
		 
			$('#home').hide();
			$('#sourceContainer').hide();
			$('#errorsContainer').hide();
			$('#errorsTitle').hide();
			$('#sourceTitle').hide();
			$('#upload').hide();
			$('#breakdown').hide();
			$('#structure').hide();
			
		 }
		
		/* END Updating Site Section */
		
		/* UPLOAD CODE */
		
		/*
		 * Hides the section of the site specified by the id.
		 * @param	id	The id of the section of the site to be hidden.
		 */
		function hide(id) {
			$('#'+id+' > .sectionContent').fadeOut();
			$('#'+id+' > .sectionContent').slideUp();
			$('#'+id).addClass("noMargin");
		}
		
		/*
		 *	Resets the upload forms.
		 */
		function resetForms() {
			$('form[name="singleForm"]').find("input[type=file]").val("");
			$('form[name="multiForm"]').find("input[type=file]").val("");
			$('form[name="zipForm"]').find("input[type=file]").val("");
		}
		
		/* END UPLOAD CODE */
		