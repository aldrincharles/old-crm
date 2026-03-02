from api.helper import make_array
import datetime as dt
from sqlalchemy import and_
from models import Contact


def age_filter(value):
    range_list = []
    current_date = dt.datetime.now().year
    year_min, year_max = 0, 0
    value_array = list(make_array(value))
    
    for age in value_array:
        age_group = {
            "20s":  {"min": ((current_date + 22) - 29), "max": ((current_date + 22) - 20)},
            "30s":  {"min": ((current_date + 22) - 39), "max": ((current_date + 22) - 30)},
            "40s":  {"min": ((current_date + 22) - 49), "max": ((current_date + 22) - 40)},
            "50s":  {"min": ((current_date + 22) - 59), "max": ((current_date + 22) - 50)},
            "60s":  {"min": ((current_date + 22) - 69), "max": ((current_date + 22) - 60)},
        }
        if(len(value_array) == 1):
            year_min = age_group[age]['min']
            year_max = age_group[age]['max']
        elif(len(value_array) > 1):
            range_list = range_list + \
                list(age_group[age].values())
    if range_list:
        year_min = min(range_list)
        year_max = max(range_list)
        
    return and_(
        Contact.year_graduated <= year_max, Contact.year_graduated >= year_min)
    
