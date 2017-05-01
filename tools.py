import requests
from datetime import datetime, date
import pandas as pd
import io



def grab_stock_csv(ticker):
	today = date.today()
	day = str(today.day)
	year = str(today.year)
	month = str(today.month)
	print(month, day, year)
	url = 'http://chart.finance.yahoo.com/table.csv?s='+ticker+'&a='+month+'&b='+day+'&c=2016&d='+month+'&e='+day+'&f='+year+'&g=d&ignore=.csv'
	result = requests.get(url).content
	df = pd.read_csv(io.StringIO(result.decode('utf-8')))
	print(df)


def price_option(variable_object):
	strike_price = variable_object['strikeInput']
	maturity = variable_object['maturityInput']
	rf_rate = variable_object['rfRateInput']



def d1_calc(argument):
	pass


def d2_calc(argument):
	pass



# testing

grab_stock_csv("aapl")