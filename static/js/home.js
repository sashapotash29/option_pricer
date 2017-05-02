console.log("JS connected")

var check_sub_valid = function(){
	const stockChoice = document.getElementById('tickerInput').value
	const strikeInput = document.getElementById('strikeInput').value
	const maturityInput = document.getElementById('maturityInput').value
	const rfRateInput = document.getElementById('rfRateInput').value
	var checking_array = [stockChoice,strikeInput,maturityInput,rfRateInput]
	for(var i =0; i < checking_array.length; i++){
		if (checking_array[i] == ""){
			console.log("false")
			return false

		}
		else{
			continue
		}

	};
	return true


};


var stockButtonAddEvent = function(button){

	button.addEventListener('click', function(e){
		e.preventDefault()
		var ticker = button.dataset['id'];
		var stockChoice = document.getElementById('tickerInput')
		stockChoice.value = ticker;
		const stockButtonList = document.getElementById('searchResultList');
		while(stockButtonList.firstChild){
			stockButtonList.removeChild(stockButtonList.firstChild);
		}
		stockButtonList.style.display = "none";


	});

};


var buildStockUl = function(array){
	console.log("ul time")
	const stockButtonList = document.getElementById('searchResultList');
	while(stockButtonList.firstChild){
			stockButtonList.removeChild(stockButtonList.firstChild);
		}
	console.log(stockButtonList)
	for(var i =0; i<array.length; i++){
		
		var newLi = document.createElement('li')
		console.log("adding dataset id")
		newLi.setAttribute('class', 'stockOptionLi')
		var newButton = document.createElement("button")
		newButton.setAttribute('class', 'stockButton')

		newButton.setAttribute('data-id', array[i]['Symbol'])
		if(array[i]['Name'] != ""){
			newButton.innerHTML = array[i]['Symbol'] + ",  " + array[i]['Name']
			stockButtonAddEvent(newButton)
			newLi.appendChild(newButton)
			stockButtonList.appendChild(newLi)
		}
		else{
			continue
		}
		


	}
	stockButtonList.style.display = "block";

};



var searchStockInputButton = document.getElementById('searchStockInputButton')

searchStockInputButton.addEventListener("click", function(e){
	e.preventDefault()
	console.log(e)

	const stockChoice = document.getElementById('tickerInput')
	if (stockChoice.value == ""){
		stockChoice.value = ""
	}
	else{
		var url = "/stock/"+ stockChoice.value;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200){
				var data_array = JSON.parse(this.responseText);
				if(data_array['result'].length >0){
					buildStockUl(data_array['result'])
				}
				else{
					const stockButtonList = document.getElementById('searchResultList');
					while(stockButtonList.firstChild){
						stockButtonList.removeChild(stockButtonList.firstChild);
					}
					var nothingFoundLi = document.createElement('li')
					nothingFoundLi.setAttribute('class', 'stockOptionLi')
					nothingFoundLi.innerHTML = "Sorry, nothing was found."
					stockButtonList.appendChild(nothingFoundLi)
					stockButtonList.style.display = "block";
				}
				
				

			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();

	}




});



var send_to_price = function(information_obj){
	var url = "/price";
	var params = JSON.stringify(information_obj);
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	    if (xhr.readyState == XMLHttpRequest.DONE) {
	        alert(xhr.responseText);
	    }
	}
	xhr.open("POST", url, true);
	xhr.send(params);



};



var priceButton = document.getElementById('priceButton')


priceButton.addEventListener("click", function(e){
	e.preventDefault()
	var answer = check_sub_valid()

	if(answer==true){
		var errorMessage = document.getElementById('errorMessage')
		if(errorMessage){
			errorMessage.style.display = "none"
			console.log("ready to go w/ errorMessage")
			const stockChoice = document.getElementById('tickerInput').value
			const strikeInput = document.getElementById('strikeInput').value
			const maturityInput = document.getElementById('maturityInput').value
			const rfRateInput = document.getElementById('rfRateInput').value
			var information_obj = {"stockChoice": stockChoice, "strikeInput":strikeInput,
				'maturityInput': maturityInput, 'rfRateInput':rfRateInput}
			console.log(information_obj)
			send_to_price(information_obj)

		}
		else{
			console.log("ready to go")
			const stockChoice = document.getElementById('tickerInput').value
			const strikeInput = document.getElementById('strikeInput').value
			const maturityInput = document.getElementById('maturityInput').value
			const rfRateInput = document.getElementById('rfRateInput').value
			var information_obj = {"stockChoice": stockChoice, "strikeInput":strikeInput,
				'maturityInput': maturityInput, 'rfRateInput':rfRateInput}
			console.log(information_obj)
			send_to_price(information_obj)
		}
	}
	else{
		console.log("NOT ready to go")
		var submitArea = document.getElementById('submitButtonRow')
		var errorMessage = document.createElement('p')
		errorMessage.setAttribute('class', 'errorMessage')
		errorMessage.setAttribute('id', 'errorMessage')
		errorMessage.innerHTML = "You seem to be missing infromation. Fill out all fields."
		submitArea.appendChild(errorMessage)

	}


})