console.log("JS connected")

var check_sub_valid = function(){
	const stockChoice = document.getElementById('tickerInput').value
	const strikeInput = document.getElementById('strikeInput').value
	const maturityInput = document.getElementById('maturityInput').value
	const rfRateInput = document.getElementById('rfRateInput').value
	console.log(stockChoice, strikeInput, maturityInput, rfRateInput)
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
	
	const stockChoice = document.getElementById('tickerInput')
	if (stockChoice.value == ""){
		stockChoice.value = ""
	}
	else{
		var url = "/stock/"+ stockChoice.value;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200){
				var data_array = JSON.parse(this.responseText)['result'];
				console.log(data_array)
				buildStockUl(data_array)
				

			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();

	}




});





var priceButton = document.getElementById('priceButton')


priceButton.addEventListener("click", function(e){
	e.preventDefault()
	var answer = check_sub_valid()

	if(answer==true){
		console.log("ready to go")
		const stockChoice = document.getElementById('tickerInput').value
		const strikeInput = document.getElementById('strikeInput').value
		const maturityInput = document.getElementById('maturityInput').value
		const rfRateInput = document.getElementById('rfRateInput').value
		var information_obj = {"stockChoice": stockChoice, "strikeInput":strikeInput,
			'maturityInput': maturityInput, 'rfRateInput':rfRateInput}
	}
	else{
		console.log("NOT ready to go")
	}


})