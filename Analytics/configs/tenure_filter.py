import datetime as dt


from dateutil.relativedelta import relativedelta

from models import Contact
from sqlalchemy import and_


def tenure_filter(value):
    # ["Below 18", "18 to 23", "24 to 36", "Above 36"]
    column = Contact.time_frame_company
    current_date = dt.datetime.now()

    if value == "Below 18":
        target_date = current_date-relativedelta(months=17)

        return column >= target_date
    elif value == "18 to 23":
        start_point = current_date-relativedelta(months=23)
        end_point = current_date-relativedelta(months=18)

        return and_(column >= start_point, column <= end_point)
    elif value == "24 to 36":
        start_point = current_date-relativedelta(months=36)
        end_point = current_date-relativedelta(months=24)

        return and_(column >= start_point, column <= end_point)

    elif value == "Above 36":
        target_date = current_date-relativedelta(months=36)

        return column <= target_date
