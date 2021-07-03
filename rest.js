/*
EVENT HANDELER VS EVENT LISTENER
the difference is that if you add two event handlers for 
the same button click, the second event handler will overwrite the 
first and only that event will trigger.
*/
//document.getElementsById("submit").onclick = () => {}
//document.getElementById("submit").onclick = submit();
//document.getElementsById("submit").addEventListener("click", function);
//document.getElementsById("submit").addEventListener("click", function(event){})
//document.getElementsById("submit").addEventListener("click", (event) => {})

//console.log("hello World")


// clicked the submit button
function submit(){
	document.getElementById("span").innerHTML = "";
	var table = document.getElementById("table");
	table.innerHTML = ""
	var country = document.getElementsByName("country")[0].value.trim();

	const request = new XMLHttpRequest();
	var url = 'https://restcountries.eu/rest/v2/name/' + country;
	request.open("GET", url);
	request.send();

	
	request.onload = (e) => {
		if(request.status != 200){
			document.getElementById("span").innerHTML = `Error ${request.status}: Bad Input`;
			
		}
		else{

			var list = JSON.parse(request.response)[0].borders;
			if(list.length != 0){
	    		neighbour(list);
			}
		}

    }
};

// find neighbouring countries
function neighbour(l){
	var url = "https://restcountries.eu/rest/v2/alpha?codes="
	var table = document.getElementById("table");
	for (var i of l){
		url = url + i  + ';' 
	}
	const request = new XMLHttpRequest();
	request.open("GET", url);
	request.send();

	request.onload = (e) => {
		neighbours = JSON.parse(request.response)
		
		for(let j in neighbours){
			var row = table.insertRow(-1)
			var cell1 = row.insertCell(0)
			var cell2 = row.insertCell(1);

			cell1.innerHTML = neighbours[j].alpha3Code;
			cell2.innerHTML = neighbours[j].name;
				
		} 
		var row = table.insertRow(0)
		row.innerHTML = `${document.getElementsByName("country")[0].value.toUpperCase().trim()}`
		
	}
}


