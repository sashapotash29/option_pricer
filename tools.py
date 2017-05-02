import requests
from datetime import datetime, date
import pandas as pd
import io


def compute_average(array):
	return sum(array)/len(array)

def compute_stDev(array):
	average = compute_average(array)
	for daily_return in array:
		sum_diff = 0
		diff = daily_return - average
		sum_diff += diff*diff
	return sum_diff/(len(array)-1)


def grab_stock_csv(ticker):
	today = date.today()
	day = str(today.day)
	year = str(today.year)
	month = str(today.month)
	url = 'http://chart.finance.yahoo.com/table.csv?s='+ticker+'&a='+month+'&b='+day+'&c=2016&d='+month+'&e='+day+'&f='+year+'&g=d&ignore=.csv'
	result = requests.get(url).content
	df = pd.read_csv(io.StringIO(result.decode('utf-8')))
	price_list = [] 
	df.columns =['Date','Open', 'High', 'Low', 'Close', 'Volume', 'adj_close']
	for index, row in df.iterrows():
		price_list.append(row.adj_close)
	price_list = price_list[::-1]
	returns_list = []
	for index,price in enumerate(price_list):
		if index == 0:
			temp = price
		else:
			daily_return = (price - temp)/price
			returns_list.append(daily_return)
			temp = price
	st_dev = compute_stDev(returns_list)
	print(st_dev)


def price_option(variable_object):
	strike_price = variable_object['strikeInput']
	maturity = variable_object['maturityInput']
	rf_rate = variable_object['rfRateInput']



def d1_calc(argument):
	pass


def d2_calc(argument):
	pass



# testing

grab_stock_csv("TSLA")