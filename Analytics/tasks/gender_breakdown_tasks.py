from collections import Counter

import pandas as pd
from celery_worker import celery
from models import Contact, Organization, db
from sqlalchemy import and_

from ..configs import analytics_sql_filters
from ...Service import create_cluster_filter
from api.helper import make_array


@celery.task
def gender_task(args):
    columns = analytics_sql_filters(args)

    query = db.session.query(Contact.gender)\
        .join(Organization)\
        .filter(and_(*columns))
        
    if "cluster" in args.keys():
        cluster_list = list(make_array(args.get("cluster")))
        query = create_cluster_filter(cluster_list, query)

    df = pd.read_sql(query.statement, query.session.bind)

    gender_count = Counter(df['gender'])

    gender_output = []

    label_list = ["Male", "Female", "Unknown"]
    colors = ['#2c5b8d', '#e68da6', '#505254']

    counter = 0

    gc = gender_count
    for item in [gc["Male"], gc["Female"], gc["Unknown"]]:
        gender_output.append(
            {'name': label_list[counter],
             'x': label_list[counter],
             'y': item,
             'fill': colors[counter],
             'symbol': {'fill': colors[counter]}}
        )

        counter = counter + 1

    return {
        "gender": gender_output,
        "total": sum(gender_count.values())
    }
