from flask import Flask, render_template, request
import requests
import json
from tools import price_option




app = Flask(__name__)





# ROUTES


@app.route("/", methods=["GET"])
def return_homepage():
	return render_template("home.html")

@app.route("/stock/<stockChoice>", methods=["GET"])
def grab_stock_choices(stockChoice):
	if type(stockChoice)== str:
		url = "http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=" + stockChoice
		result = requests.get(url).json()
		final_product={}
		final_product['result'] = result
		print(final_product)
		return json.dumps(final_product)
	else:
		final_product={}
		final_product['result'] = "invalidDataType"
		print(final_product)
		return json.dumps(final_product)


@app.route("/price", methods=['POST'])
def price():
	# GRAB FROM REQUEST OBJECT AND FIND QUERY DICT
	client_info = json.loads(request.get_data().decode())
	for key, value in client_info.items():
		if key == "strikeInput":
			value = float(value)
			print(value)
			print(type(value))
		elif key == "maturityInput":
			value = float(value)
			print(value)
			print(type(value))
		elif key == "rfRateInput":
			value = float(value)
			print(value)
			print(type(value))
	option_price = round(price_option(client_info),2)
	print(option_price)
	
	return str(option_price)
	







if __name__ == ("__main__"):
	app.run(debug=True, port=1234)



