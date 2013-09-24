<%@ page contentType="text/html; charset=UTF-8" language="java"
	import="java.*" errorPage=""%>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.util.zip.*" %>
<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page import="org.apache.commons.fileupload.disk.*" %>
<%@ page import="org.apache.commons.fileupload.servlet.*" %>
<%@ page import="org.apache.commons.io.output.*" %>
<%@ page import="org.json.simple.JSONObject;" %>

<html>
<head>
</head>
<body> 
		<!-- Begin Checking code by parsing in the type of file submitted --
		---- There should be one check for each type of file submission --->
		
		<%
				String uploadType = request.getParameter("type");
            	String directoryID = request.getParameter("dirid");
            	
            	/* ================ SINGLE FILE CHECKING START ==============
				** ========================================================== */
            	
            	if (uploadType.equals("single")) {
   					List<String> fileContents = readUploadedFile(request.getParameter("path"));
   					String fileparam = request.getParameter("path");
            		String[] filestring = fileparam.split("/");
            		String filename = filestring[filestring.length-1];
                
               		JSONObject jsonFile = findErrors(fileContents);
                	jsonFile.put("filename", filename);
                	JSONObject json = new JSONObject();
                	json.put("0", jsonFile);
                
                
 					String directoryPath = getServletContext().getRealPath("/").concat("temp/")
						.concat(directoryID).concat("/");
 					String outFilePath = directoryPath.concat("errors.json");
                
                	try {
 					
						FileWriter file = new FileWriter(outFilePath);
						file.write(json.toJSONString());
						file.flush();
						file.close();
 
					} catch (IOException e) {
						e.printStackTrace();
					}
                	
                
                	Cookie cookie = new Cookie("dirPath", directoryPath);
                	response.addCookie(cookie);
                
                
                	String redirectURL = "http://www.htmlthor.com";
   		 			response.sendRedirect(redirectURL);
   		 		}
   		 		
   		 		
   		 		/* ================ SINGLE FILE CHECKING END ================
				** ========================================================== */
				
				/* ================ MULTIPLE FILES CHECKING START ===========
				** ========================================================== */
				
				else if(uploadType.equals("multiple")) {
					// Multiple file upload is currently not enabled on front end either.
				}
				
   		 		/* ================ MULTIPLE FILE CHECKING END ==============
				** ========================================================== */
   		 		
   		 		/* ================ ZIP FILE CHECKING START =================
				** ========================================================== */
   		 		
   		 		else if (uploadType.equals("zip")) {
   		 		
   		 			JSONObject dirJSON = new JSONObject();
   		 				
   		 			ZipInputStream zipInput = new ZipInputStream(new FileInputStream(request.getParameter("path")));
      				try	{
            			ZipEntry temp = null;
            			StringBuilder s = new StringBuilder();
						byte[] buffer = new byte[1024];
						int read = 0;
						int fileCount = 0;
						JSONObject json = new JSONObject();
						// process each entry in the zip file
            			while ((temp = zipInput.getNextEntry()) != null ) 
            			{
             				
             				while ((read = zipInput.read(buffer, 0, 1024)) >= 0) {
           						s.append(new String(buffer, 0, read));
      						}
      						if (!temp.isDirectory()) {
      						// process the file if it's not a directory
      						// NEED TO CHECK FOR FILE TYPE HERE TO MAKE SURE ONLY HTML IS PROCESSED
      							String[] tempSourceArr = s.toString().split("\n");
      							List<String> fileContents = new ArrayList<String>();
      							for (int i = 0; i < tempSourceArr.length; i++) {
     								fileContents.add(tempSourceArr[i]);
      							}
      						
      							JSONObject jsonTemp = findErrors(fileContents);
                				jsonTemp.put("filename", temp.getName());
      						
                				json.put(Integer.toString(fileCount), jsonTemp);
                				fileCount++;
                			}      						
            			}
            			
            			
            			String directoryPath = getServletContext().getRealPath("/").concat("temp/")
						.concat(directoryID).concat("/");
 						String errFilePath = directoryPath.concat("errors.json");
 						String dirFilePath = directoryPath.concat("directory.json");
                
                	
						FileWriter errFile = new FileWriter(errFilePath);
						errFile.write(json.toJSONString());
						errFile.flush();
						errFile.close();
							
						FileWriter dirFile = new FileWriter(dirFilePath);
						dirFile.write(dirJSON.toJSONString());
						dirFile.flush();
						dirFile.close();
                	
                
                		Cookie cookie = new Cookie("dirPath", directoryPath);
                		response.addCookie(cookie);
                
                
                		String redirectURL = "http://www.htmlthor.com";
   		 				response.sendRedirect(redirectURL);
       				} catch(Exception ex) {
       					out.println(ex.getMessage()); 
       				}
       				
   		 		}
   		 		
   		 		/* ================ ZIP FILE CHECKING END ===================
				** ========================================================== */
				
				/* ================ URL FILE CHECKING START =================
				** ========================================================== */
				
				
				
				
				
				
				/* ================ URL FILE CHECKING END ===================
				** ========================================================== */
				
				
				/* ================ DIRECT INPUT CHECKING START =============
				** ========================================================== */
				
				
				
				
				
				/* ================ DIRECT INPUT CHECKING END ===============
				** ========================================================== */
				
		%>
		
</body>
</html>