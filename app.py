from flask import Flask, render_template
import requests
import json




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
		return json.dumps(final_product)
	else:
		return "invalidDataType"



if __name__ == ("__main__"):
	app.run(debug=True, port=1234)



