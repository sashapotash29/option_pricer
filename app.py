from flask import Flask, render_template





app = Flask(__name__)





# ROUTES


@app.route("/", methods=["GET"])
def return_homepage():
	return render_template("home.html")



if __name__ == ("__main__"):
	app.run(debug=True, port=1234)



