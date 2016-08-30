<?php
	
	//EMAIL VALIDATION
	function validateEmail($value){
		return preg_match('/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/', $value);
	}
	
	//CHECK VARIABLES (EMPTY/NULL OR DEFAULT)
	if ( isset($_POST['name']) && $_POST['name']!="Name" && isset($_POST['email']) && $_POST['email']!="Email" && isset($_POST['message']) && $_POST['message']!="Your comments..." ) {
		
		//CHECK EMAIL	
		if ( validateEmail($_POST['email']) ) {
			
			
			
			////////////////////// EDIT HERE  /////////////////////////
			
			//SET HERE YOUR DESTINATION EMAIL
			//IT SHOULD BE FROM THE SAME DOMAIN WHERE SITE IS HOSTED
			$destination="janazenahlikova@gmail.com";
			
			//SET HERE YOUR EMAIL SUBJECT
			$subject="ZPRÁVA Z WEBU";

			//MESSAGE DATA (HTML FORMATTED)
			$mailMessage.="<dt><strong>Jméno:</strong></dt><dd>".$_POST['name']."</dd>";
			$mailMessage.="<dt><strong>Email:</strong></dt><dd>".$_POST['email']."</dd>";
			$mailMessage.="<dt><strong>Zpráva:</strong></dt><dd>";
			$mailMessage.=nl2br($_POST['message'])."</dd></dl>";
			$mailMessage = utf8_decode($mailMessage);
			
			////////////////////// END EDIT  /////////////////////////
			
			
			
			//SENDER EMAIL
			$mailFrom=$_POST['email'];
			
			//HEADER DATA
			$mailHeader="From:".$mailFrom."\nReply-To:".$_POST['name']."<".$mailFrom.">\n"; 
			$mailHeader=$mailHeader."X-Mailer:PHP/".phpversion()."\n"; 
			$mailHeader=$mailHeader."Mime-Version: 1.0\n"; 
			$mailHeader=$mailHeader."Content-Type: text/html";
			
			if ( mail($destination,$subject,$mailMessage,$mailHeader) ) {
				echo 'Zpráva úšpěšně odeslána!';
			}			
			else echo 'Chyba serveru. Prosíme, zkuste to později.';
			
		}		
		else echo 'Neplatný email!';	//EMAIL VALIDATION ERROR
		
	}
	else echo 'Chybějící údaje!';		//VARS ERROR

?>