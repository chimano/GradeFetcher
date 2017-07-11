
module.exports = {
  getGrade: function(callback, res) {
    	var webdriver = require('selenium-webdriver'),
    		By = webdriver.By,
    		until = webdriver.until;
		var chrome = require("selenium-webdriver/chrome");
		var options = new chrome.Options()
		options.addArguments("--headless");

		var driver = new webdriver.Builder().withCapabilities(options.toCapabilities()).build();

		var username = "";//Write Concordia username here
		var password = "";//Write Concordia password here

		driver.get("https://my.concordia.ca/psp/upprpr9/?cmd=login&languageCd=ENG&");

		username_field = driver.findElement(By.name("userid"));
		password_field = driver.findElement(By.name("pwd"));
		username_field.sendKeys(username);
		password_field.sendKeys(password);
		password_field.sendKeys(webdriver.Key.ENTER);

		driver.wait(until.elementLocated(By.id('ptpglts'))).then(function() {
			driver.get("https://campus.concordia.ca/psp/pscsprd/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_GRADE.GBL");
		});


		driver.switchTo().frame(driver.findElement(By.id('ptifrmtgtframe')));
		driver.wait(until.elementLocated(By.id("SSR_DUMMY_RECV1$sels$3$$0"))).then(function() {
			driver.findElement(By.id("SSR_DUMMY_RECV1$sels$3$$0")).click();
			driver.findElement(By.id("DERIVED_SSS_SCT_SSR_PB_GO")).click();
			driver.switchTo().defaultContent();
			driver.switchTo().frame(driver.findElement(By.id('ptifrmtgtframe')));
			driver.wait(until.elementLocated(By.id("CLS_LINK$0"))).then(function() {
				
				driver.findElement(By.id("CLS_LINK$0")).getText().then(function(text){
					output ="\n" + text;
					driver.findElement(By.id("DERIVED_SSS_HST_DESCRSHORT$0")).getText().then(function(text){
						output += ": " + text;
						driver.findElement(By.id("CLS_LINK$1")).getText().then(function(text){
							output += "\n" + text;
							driver.findElement(By.id("DERIVED_SSS_HST_DESCRSHORT$1")).getText().then(function(text){
								output += ": " + text;
								driver.findElement(By.id("CLS_LINK$2")).getText().then(function(text){
									output += "\n" + text;
									driver.findElement(By.id("DERIVED_SSS_HST_DESCRSHORT$2")).getText().then(function(text){
										output += ": " + text;
										driver.findElement(By.id("CLS_LINK$3")).getText().then(function(text){
											output += "\n" + text;
											driver.findElement(By.id("DERIVED_SSS_HST_DESCRSHORT$3")).getText().then(function(text){
												output += ": " + text;
												driver.findElement(By.id("CLS_LINK$4")).getText().then(function(text){
													output += "\n" + text;
													driver.findElement(By.id("DERIVED_SSS_HST_DESCRSHORT$4")).getText().then(function(text){
														output += ": " + text;
														
														driver.quit();
														callback(output, res);
														
														
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
				

			});
		});
	  },
  sendMessage: function(data) {
  	var twilio = require('twilio');	
	var client = new twilio.RestClient('', '');//Enter Twilio Credentials

    client.sms.messages.create({
	   	to:'',//Enter Phone number that will receive text
	  	from:'',//Enter Twilio number
	   	body: data
	}, function(error, message) {

	if (!error) {
	    console.log('Success! The SID for this SMS message is:');
	    console.log(message.sid);
	 
	    console.log('Message sent on:');
	    console.log(message.dateCreated);
	    
	} else {
	    console.log('Oops! There was an error.');
	}
	});
  }
};