import datetime as dt
from collections import Counter

import pandas as pd
from celery_worker import celery
from models import Contact, Organization, db
from sqlalchemy import and_

from ..configs import analytics_sql_filters
from ...Service import create_cluster_filter
from api.helper import make_array


@celery.task
def tenure_rate_task(args):
    columns = analytics_sql_filters(args)

    query = db.session.query(Contact.time_frame_company)\
        .join(Organization)
    query = query.filter(and_(*columns))

    if "cluster" in args.keys():
        cluster_list = list(make_array(args.get("cluster")))
        query = create_cluster_filter(cluster_list, query)

    df = pd.read_sql(query.statement, query.session.bind)

    if(df.shape[0] == 0):  # Gives number of rows
        return {
            "tenure": [],
            "total": 0,
        }

    dates_counter = Counter(df['time_frame_company'].dt.date)
    current_date = dt.datetime.now()

    below_18 = 0
    range_18_23 = 0
    range_24_36 = 0
    above_36 = 0

    # These lines of code are test case
    # to see if I'm getting the correct month difference
    # test_date = current_date - relativedelta(months=1)
    # month_difference = (current_date.year -test_date.year) * 12 + current_date.month - test_date.month
    # output
    # test_date = 2022-10-14 10:24:55.323591
    # month_difference = 1

    for key, value in dates_counter.items():
        month_difference = (current_date.year - key.year) * \
            12 + current_date.month - key.month

        # Below 18
        if month_difference < 18:
            below_18 = below_18 + value

        # range 18 to 23
        elif month_difference >= 18 and month_difference <= 23:
            range_18_23 = range_18_23 + value

        # range 24 to 36
        elif month_difference >= 24 and month_difference <= 36:
            range_24_36 = range_24_36 + value

        # above 36
        elif month_difference > 36:
            above_36 = above_36 + value

    tenure = []
    label_list = ["Below 18", "18 to 23", "24 to 36", "Above 36"]
    colors = ["#dfdf51", "#dac82c", "#d9b220", "#d79b12"]
    counter = 0
    for item in [below_18, range_18_23, range_24_36, above_36]:
        tenure.append(
            {'name': label_list[counter],
             'x': label_list[counter],
             'y': item,
             'fill': colors[counter],
             'symbol': {'fill': colors[counter]}}
        )

        counter = counter + 1

    return {
        "tenure": tenure,
        "total": sum([below_18, range_18_23, range_24_36, above_36]),
    }
