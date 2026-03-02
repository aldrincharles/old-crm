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
def tenure_group_tier_task(args):
    columns = analytics_sql_filters(args)

    query = db.session.query(Contact.time_frame_company)\
        .join(Organization)\
        .add_column(Organization.ranking)
    query = query.filter(and_(*columns))

    if "cluster" in args.keys():
        cluster_list = list(make_array(args.get("cluster")))
        query = create_cluster_filter(cluster_list, query)


    result = map(create_coordinates,
                 [
                     {"ranking": "T1", "query": query},
                     {"ranking": "T2", "query": query},
                     {"ranking": "T3", "query": query},
                     {"ranking": "T4", "query": query},
                     {"ranking": "T5", "query": query}
                 ]
                 )
    result = list(result)

    return {
        "total": sum([item["total"] for item in result]),
        "tier_1": result[0]['data'],
        "tier_2": result[1]['data'],
        "tier_3": result[2]['data'],
        "tier_4": result[3]['data'],
        "tier_5": result[4]['data'],
        "legend": [
            {"name": "T1"},
            {"name": "T2"},
            {"name": "T3"},
            {"name": "T4"},
            {"name": "T5"},
        ]
    }


def create_coordinates(object):
    query = object['query']
    ranking = object['ranking']
    query = query.filter(Organization.ranking == ranking)
    df = pd.read_sql(query.statement, query.session.bind)

    dates_counter = Counter(df['time_frame_company'])
    below_18 = 0
    range_18_23 = 0
    range_24_36 = 0
    above_36 = 0

    current_date = dt.datetime.now()

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
    colors = ["#bcd9ea","#72a9cd", "#4889bc", "#3e7cb0", "#040494"]
    counter = 0
    for item in [below_18, range_18_23, range_24_36, above_36]:
        tenure.append(
            {'x': label_list[counter],
             'y': item,
             'fill': colors[counter]}
        )

        counter = counter + 1

    return{
        'data': tenure,
        'total': sum(dates_counter.values())
    }
