import datetime as dt
from collections import Counter

import pandas as pd
from celery_worker import celery
from models import Contact, Organization, db
from sqlalchemy import and_

from ...Service import create_cluster_filter
from ..configs import analytics_sql_filters
from api.helper import make_array


@celery.task
def age_group_tier_task(args):
    columns = analytics_sql_filters(args)

    query = db.session.query(Contact.year_graduated)\
        .join(Organization)\
        .add_column(Organization.ranking)

    query = query.filter(and_(*columns))
    
    if "cluster" in args.keys():
        cluster_list = list(make_array(args.get("cluster")))
        query = create_cluster_filter(cluster_list, query)


    result = map(async_create_coordinates,
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


def async_create_coordinates(object):
    query = object['query']
    ranking = object['ranking']
    query = query.filter(Organization.ranking == ranking)
    df = pd.read_sql(query.statement, query.session.bind)
    years_counter = Counter(df['year_graduated'])

    _20s = 0
    _30s = 0
    _40s = 0
    _50s = 0
    _60s = 0
    now = dt.datetime.now().year
    for year, value in years_counter.items():
        year = int(year)
        x = (now - year) + 22
        if x >= 20 and x <= 29:
            _20s = _20s + value
        elif x >= 30 and x <= 39:
            _30s = _30s + value
        elif x >= 40 and x <= 49:
            _40s = _40s + value
        elif x >= 50 and x <= 59:
            _50s = _50s + value
        elif x >= 60 and x <= 69:
            _60s = _60s + value
    return {
        'data': [
            {'x': '20s', 'y': _20s, 'fill': '#F44336'},
            {'x': '30s', 'y': _30s, 'fill': '#E53935'},
            {'x': '40s', 'y': _40s, 'fill': '#E91E63'},
            {'x': '50s', 'y': _50s, 'fill': '#AB47BC'},
            {'x': '60s', 'y': _60s, 'fill': '#E040FB'}],
        'total': sum(years_counter.values())
    }
