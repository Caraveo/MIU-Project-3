/*
Mobile Interfaces and Usability 1208
Full Sail University
Mobile Development
Professor: Robin Alarcon
PlayIGL Team Management App
Project 2
Jonathan Caraveo 
*/

//Wait until DOM is ready.
window.addEventListener("DOMContentLoaded", function(){

	function getE(parameter){
		var theElement = document.getElementById(parameter);
		return theElement;
	}
	
	function makeLeagues(){
		var formTag = document.getElementsByTagName("AddTeamMember");
		var selectList = getE("select");
		var makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "league");
		for(var i=0, j=leagueGroups.length; i<j; i++){
			var makeOption = document.createElement("option");
			var optText = leagueGroups[i];
			makeOption.setAttribute("value", optText)
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectList.appendChild(makeSelect);
	}


	function getSelectedRadio(){
		var radios = document.forms[0].sex;
		for(var i = 0; i<radios.length; i++){
			if(radios[i].checked){
				sexValue = radios[i].value;
			}
		}
	}
	
	function getCheckBoxValue(){
		if(getE("pro").checked){
			proValue = getE("pro").value;
		}else{
			proValue = "No";
		}
	}
	
	function toggle(x){
		switch(x){
			case "on":
				getE("addTeamMember").style.display = "none";
				getE("clearLink").style.display = "inline";
				getE("displayLink").style.display = "none";
				getE("addMember").style.display = "inline";
				break;
			case "off":
				getE("addTeamMember").style.display = "block";
				getE("clearLink").style.display = "inline";
				getE("displayLink").style.display = "inline";
				getE("addMember").style.display = "none";
				getE("items").style.display = "none";
				console.log("Hello");
				break;
			default:
				return false;
		}
	}
	
	function saveData(key){
		if(!key){
			var id = Math.floor(Math.random()*1010101010);
		}else{
			id=key;
		}
		getSelectedRadio();
		getCheckBoxValue();
		var item 			= {};
			item.alias		= ["Gaming Alias:", getE("alias").value];
			item.fName 		= ["First Name:", getE("fName").value];
			item.lName 		= ["Last Name:", getE("lName").value];
			item.eMail 		= ["Email:", getE("eMail").value];
			item.bDay 		= ["Birth-Day:", getE("bDay").value];
			item.language	= ["Language:", getE("language").value];
			item.skill		= ["Skill:", getE("skill").value];
			item.sex  		= ["Sex:", sexValue];
			item.pro 		= ["Professional:", proValue];
			item.division 	= ["Division:", getE("division").value];
			item.league  	= ["League:", getE("league").value];
			item.notes		= ["Notes:", getE("notes").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Member has been Added!");
		getData();
	}
	
	function getData (){
		toggle("on");
		if(localStorage.length === 0){
			
			var askAutoFill = confirm("There is no Local Storage Data to display! Auto Populate Data from JSON file?");
			if(askAutoFill === true){
				autoFillData();	
			}	
		}
		
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		getE("items").style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeLi = document.createElement("li");
			var linksLi = document.createElement("li");
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeLi.appendChild(makeSubList);
			getImage(obj.league[1], makeSubList);
			for (var n in obj){
				var makeSubLi = document.createElement("li");
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubLi.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}
	function autoFillData(){
		for(var n in json){
			var id = Math.floor(Math.random()*1010101010);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	function getImage(imageName, makeSubList){
		var imageLi = document.createElement("li");
		makeSubList.appendChild(imageLi);
		var newImage = document.createElement("img");
		var setSrc = newImage.setAttribute("src", "images/" + imageName + ".jpg");
		imageLi.appendChild(newImage);
	}
	
	
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Member";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Member";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
		
	}
	
	function deleteItem(key){
		var ask = confirm("Are you sure you want to delete this member?")
		if (ask){
			localStorage.removeItem(this.key);
			window.location.reload();
			alert("Contact was deleted.")
		}else{
			alert("Contact was NOT deleted.")
		}
	}
	
	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		toggle("off");
		getE("alias").value = item.alias[1];
		getE("fName").value = item.fName[1];
		getE("lName").value = item.lName[1];
		getE("eMail").value = item.eMail[1];
		getE("bDay").value = item.bDay[1];
		getE("language").value = item.language[1];
		getE("skill").value = item.skill[1];
		var radios = document.forms[0].sex;
		for (var i=0; i<radios.length; i++){
			if (radios[i].value == "Male" && item.sex[1] == "Male"){
				radios[i].setAttribute("checked", "checked");
			} else if (radios[i].value == "Female" && item.sex[1] == "Female"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		if (item.pro[1] == "Yes"){
			getE("pro").setAttribute("checked", "checked");
		}
		
		getE("division").value = item.division[1];
		getE("league").value = item.league[1];
		getE("notes").value = item.notes[1];
		
		saveButton.removeEventListener("click", saveData);
		getE("submit").value = "Save Changes";
		var editSubmit = getE("submit");
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}

	var leagueGroups = ["--Choose a League--", "Major", "International", "National"];
	var sexValue;
	var proValue = "no";
	var errorMsg = getE("errors");
		makeLeagues();
		
	function validate(eventData){
		var getAlias = getE("alias");
		var getFname = getE("fName");
		var getLname = getE("lName");
		var getEmail = getE("eMail");
		var getLeague = getE("league");
		
		errorMsg.innerHTML = "";
			getAlias.style.border = "1px solid black";
			getFname.style.border = "1px solid black";
			getLname.style.border = "1px solid black";
			getLeague.style.border = "1px solid black";
			getEmail.style.border = "1px solid black";

		
		
		var errorArray = [];
		

		if(getAlias.value === ""){
			var aliasError = "Please enter a Gamer Alias.";
			getAlias.style.border = "3px solid red";
			errorArray.push(aliasError);
		}
		if(getFname.value === ""){
			var fNameError = "Please enter a First Name.";
			getFname.style.border = "3px solid red";
			errorArray.push(fNameError);
		}
		if(getLname.value === ""){
			var lNameError = "Please enter a Last Name.";
			getLname.style.border = "3px solid red";
			errorArray.push(lNameError);
		}
		var regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(regExEmail.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "3px solid red";
			errorArray.push (emailError)
		}
		if(getLeague.value == "--Choose a League--"){
			var leagueError = "Please choose a league.";
			getLeague.style.border = "3px solid red";
			errorArray.push(leagueError);
		}
		if(errorArray.length >= 1){
			for(var i=0, j=errorArray.length; i < j; i++){
				var li = document.createElement("li");
				li.innerHTML = errorArray[i];
				errorMsg.appendChild(li);
			}
			eventData.preventDefault();
			return false;
		}else{
			saveData(this.key);
		}

	}

	function clearData(){
		if (localStorage.length === 0){
			alert("There is no data to clear!")
		}else{
			localStorage.clear();
			alert("Local Storage Data has been deleted.")
			window.location.reload();
			return false;
		}
	}	
	
	var displayLink = getE("displayLink");
	displayLink.addEventListener("click", getData);
	
	var clearLink = getE("clearLink");
	clearLink.addEventListener("click", clearData);
	
	var saveButton = getE("submit");
	saveButton.addEventListener("click", validate);
	
	

});
