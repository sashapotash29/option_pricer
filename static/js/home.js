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