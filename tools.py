import requests

url = "http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=" + "apple"

result = requests.get(url).json()

print(type(result))