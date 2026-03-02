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
def age_group_task(args):
    columns = analytics_sql_filters(args)

    query = db.session.query(Contact.year_graduated)\
        .join(Organization)\
        .add_column(Organization.ranking)\
        .filter(and_(*columns))
    
    if "cluster" in args.keys():
        cluster_list = list(make_array(args.get("cluster")))
        query = create_cluster_filter(cluster_list, query)

    df = pd.read_sql(query.statement, query.session.bind)
    years_counter = Counter(df['year_graduated'])

    _20s = 0
    _30s = 0
    _40s = 0
    _50s = 0
    _60s = 0

    now = dt.datetime.now().year
    for year, value in years_counter.items():
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
        "age_group":
            [{"x": "20s", "y": _20s, "fill": '#0288D1'},
             {"x": "30s", "y": _30s, "fill": '#0277BD'},
             {"x": "40s", "y": _40s, "fill": '#01579B'},
             {"x": "50s", "y": _50s, "fill": '#80D8FF'},
             {"x": "60s", "y": _60s, "fill": '#40C4FF'}],
            "total": sum(years_counter.values())
    }
