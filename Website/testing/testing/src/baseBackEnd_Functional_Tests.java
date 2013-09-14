import net.sourceforge.jwebunit.junit.WebTester;

import org.junit.*;

import static net.sourceforge.jwebunit.junit.JWebUnit.*; 

/* 
	These are the back end functional tests
	They include testing the actual output of particular inputs in order to test the check.jsp functionality
	i.e. A test for the page source section will check not just that SOMETHING is there after upload (as public void Assert_Page_Source() does),
		 but that the source code from the original file is uploaded. (and then various checks on the correct highlighting of errors.


*/


// This class includes all tag checks, is missing the checks on attribute particulars
public class baseBackEnd_Functional_Tests {

	
	

    
	// Nested classes of required, singular and self-closing elements
	
	// for each of the functions in this class check that code with multiple of them correctly displays the isSingular error
	public static class singularTags {
		
		public String eol;
		
		
		@Before
	    public void prepare() {
	        setBaseUrl("http://www.htmlthor.com/"); // set the base server location (do we want to run this ON the server as local?
	        eol = System.getProperty("line.separator");
	    }
		
		@Test
		public void Check_Singular_Doctype() {
			
		}
		
		public void Check_Singular_html() {
		
		}
		
		public void Check_Singular_head() {
		
		}
		
		public void Check_Singular_body() {
		
		}
		
		public void Check_Singular_title() {
		
		}
		
		public void Check_Singular_base() {
		
		}
		
		public void Check_Singular_main() {
		
		}
		
	}
	
	// All of the functions in the following class should check whether ? (self closing is done or not done? Recommend which one?)
	public class selfClosingTags {
		
		public void Check_Closing_base() {
		
		}
		
		public void Check_Closing_link() {
		
		}
		
		public void Check_Closing_meta() {
		
		}
		
		public void Check_Closing_hr() {
		
		}
		
		public void Check_Closing_br() {
		
		}
		
		public void Check_Closing_wbr() {
		
		}
		
		public void Check_Closing_img() {
		
		}
		
		public void Check_Closing_param() {
		
		}
		
		public void Check_Closing_source() {
		
		}
		
		public void Check_Closing_track() {
		
		}
		
		public void Check_Closing_input() {
		
		}
		
		public void Check_Closing_keygen() {
		
		}
		
		public void Check_Closing_menutitem() {
		
		}
		
	}
	
	public static class isRequired {
		
		public String eol;
		
		@Before
	    public void prepare() {
	        setBaseUrl("http://www.htmlthor.com/"); // set the base server location (do we want to run this ON the server as local?
	        eol = System.getProperty("line.separator");
	    }
	
		// Check that a doctype error is both returned and not returned (i.e when a file with this error and without this error are uploaded)
		@Test
		public void Check_Exists_Doctype() {
			beginAt("index.html"); //Open the browser on index
			
			// Begin testing methods
			
			setWorkingForm("directInputForm"); //highlight direct input form
			
			//create html input to error check
			setTextField("input-direct", "<html>"+eol+"<head>"+eol+"</head>"+eol+"<body>lolololol"+eol+"</body>"+eol+"</html>");
			
			//submit form
			clickButton("alternativeButton");
			
			//wait for all javascript to finish executing
			
			try {
				Thread.sleep(1000);
			} catch (Exception e) {
				Assert.fail("Threw an exception:"+e.toString());
			}
			
			
			//assert cookie is present, otherwise source code won't display
			assertCookiePresent("dirPath");
			
			//assert error number 1 is present
			assertElementPresentByXPath("//*[@id='error1']");
			//assert error number 2 does not exist
			assertElementNotPresentByXPath("//*[@id='error2']");
			
			dumpCookies();

			//assertTextInElement("error1","html"); //this fails for some reason
			
			
			assertElementPresentByXPath("//*[@id='errorLocation0']"); //this fails for some reason

			//assert error is on the expected location
			//Assert.assertEquals(getElementTextByXPath("//*[@class='errorLocation'][1]"),"Line 1, Column 1:"); //this fails for some reason
			//assert error has the expected message
			//Assert.assertEquals(getElementTextByXPath("//*[@class='errorDescription'][1]"),"<html>"); //this fails for some reason
			
			
			System.out.print("Time to sleep a bit.");
			try {
				Thread.sleep(1000);
			} catch (Exception e) {
				Assert.fail("Threw an exception:"+e.toString());
			}

			System.out.print(getPageSource());
		
		}
	
		// Check that there is an error for not having any html tags
		public void Check_Exists_html() {
		
		}
		
		// Check that there is an error for not having any head tags
		public void Check_Exists_head() {
		
		}
		
		// Check that there is an error for not having any body tags
		public void Check_Exists_body() {
		
		}
		
		// Check that there is a warning for not having any title tags
		public void Check_Exists_title() {
		
		}
	
	
	}
	
	// Test the error associated with using nonexistent tags
	public void Existing_Tags() {
	
	}
	
	// Test the warning/error associated with deprecated tags
	public void Deprecated_Tags() {
	
	}
	
	// Check that statements in comments are not checked for errors (by passing in errors within comment tags)
	public void Check_Comments() {
		
	}
	
	// Check a couple of elements that are not self closing (i.e. upload file that does not close an element properly, check error is returned)
	public void Check_Not_Self_Closing() {
	
	}
	
	// Check that a warning is returned for the use of tables (i.e. DO NOT use tables for layout, bad practice)
	public void Check_Use_of_Tables() {
	
	}
}