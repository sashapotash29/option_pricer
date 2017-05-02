import requests
from datetime import datetime, date
import pandas as pd
import io
from math import *


def erfcc(value):
    """Complementary error function."""
    z = abs(value)
    t = 1. / (1. + 0.5*z)
    r = t * exp(-z*z-1.26551223+t*(1.00002368+t*(.37409196+
        t*(.09678418+t*(-.18628806+t*(.27886807+
        t*(-1.13520398+t*(1.48851587+t*(-.82215223+
        t*.17087277)))))))))
    if (value >= 0.):
        return r
    else:
        return 2. - r

def ncdf(value):
    return 1. - 0.5*erfcc(value/(2**0.5))


def phi(value):
    #'Cumulative distribution function for the standard normal distribution'
    return (1.0 + erf(value / sqrt(2.0))) / 2.0


def compute_average(array):
	return sum(array)/len(array)

def compute_stDev(array):
	average = compute_average(array)
	print("average", average)
	sum_diff = 0
	for daily_return in array:
		diff = daily_return - average
		sum_diff += diff*diff
	print("sum_diff", sum_diff/100)
	return ((sum_diff/100)/(len(array)-1))**(1/2)


def grab_stock_csv(ticker):
	today = date.today()
	day = str(today.day)
	year = str(today.year)
	month = str(today.month -1)
	url = 'http://chart.finance.yahoo.com/table.csv?s='+ticker+'&a='+month+'&b='+day+'&c=2016&d='+month+'&e='+day+'&f='+year+'&g=d&ignore=.csv'
	result = requests.get(url).content
	df = pd.read_csv(io.StringIO(result.decode('utf-8')))
	price_list = [] 
	df.columns =['Date','Open', 'High', 'Low', 'Close', 'Volume', 'adj_close']
	for index, row in df.iterrows():
		price_list.append(row.adj_close)
	returns_list = []
	for index, price in enumerate(price_list):
		if index<len(price_list)-1:
			daily_ret = ((price/price_list[index+1])-1) * 100
			returns_list.append(daily_ret)
		else:
			pass
	return [returns_list, price_list[0]]


def price_option(variable_object):
	strike_price = float(variable_object['strikeInput'])
	maturity = float(variable_object['maturityInput'])/12
	rf_rate = float(variable_object['rfRateInput'])
	ticker = variable_object['stockChoice']
	print(ticker, strike_price, maturity, rf_rate)
	csv_package = grab_stock_csv(ticker)
	returns_list = csv_package[0]
	current_price = csv_package[1]
	variable_object['currentStockPrice'] = current_price
	st_dev = compute_stDev(returns_list)
	print('current_price', current_price)
	print('st_dev', st_dev)
	e = 2.71828182845904523536028747135266249775724709369995
	d1 = d1_calc(variable_object, st_dev, e)
	d2 = d2_calc(d1, st_dev, float(maturity))
	normal_dist_d1 = phi(d1)
	normal_dist_d2 = phi(d2)
	print('normal_dist_d1', normal_dist_d1)
	print('normal_dist_d2', normal_dist_d2)

	call_left_value = current_price*normal_dist_d1
	call_right_value = normal_dist_d2*strike_price
	print("weird part", (e**(-(rf_rate*maturity))))
	print('call_left_value', call_left_value)
	print('call_right_value', call_right_value)
	call_option_price = call_left_value - call_right_value
	print('call_option_price', call_option_price)
	return call_option_price


def d1_calc(variable_object, st_dev,e):
	strike_price = float(variable_object['strikeInput'])
	maturity = float(variable_object['maturityInput'])/12
	rf_rate = float(variable_object['rfRateInput'])
	current_price = variable_object['currentStockPrice']
	left_numer_value = 1/(e**(current_price/strike_price))
	right_numer_value = (rf_rate*100 + ((st_dev**2)/2))*maturity
	d1 = (left_numer_value + right_numer_value) / (st_dev * (maturity**(1/2)))
	return d1

	


def d2_calc(d1, st_dev, maturity):
	d2 = d1 - (st_dev*(maturity**(1/2)))
	return d2

