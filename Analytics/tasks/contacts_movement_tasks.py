import datetime as dt
from collections import Counter
import pandas as pd
from models import Contact, Organization, db
from celery_worker import celery
from sqlalchemy import and_

from ..configs import analytics_sql_filters
from ...Service import create_cluster_filter
from api.helper import make_array


@celery.task
def contacts_movement_task(args):
    columns = analytics_sql_filters(args)

    query = db.session.query(Contact.time_frame_company)\
        .join(Organization)\
        .filter(and_(*columns))

    if "cluster" in args.keys():
        cluster_list = list(make_array(args.get("cluster")))
        query = create_cluster_filter(cluster_list, query)

    df = pd.read_sql(query.statement, query.session.bind)

    if(df.shape[0] == 0):  # Gives number of rows
        return []

    years = Counter(df['time_frame_company'].dt.year)
    output = []
    counter = 0
    current_year = dt.datetime.now().year

    for _ in range(4):
        key = (current_year - counter)
        output.append(
            {"x": str(key),
             "y": years[key]}
        )
        counter = counter + 1

    sorted_output = sorted(output, key=lambda d: d['x'])

    return sorted_output
