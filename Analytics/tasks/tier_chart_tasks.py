from collections import Counter

import pandas as pd
from celery_worker import celery
from models import Contact, Organization, db
from sqlalchemy import and_

from ..configs import analytics_sql_filters
from ...Service import create_cluster_filter
from api.helper import make_array

colorsArr = ["#bcd9ea","#72a9cd", "#4889bc", "#3e7cb0", "#040494"]


@celery.task
def tier_chart_task(args):
    columns = analytics_sql_filters(args)

    query = db.session.query(Contact.id)\
        .join(Organization)\
        .add_column(Organization.ranking)\
        .filter(and_(*columns), Organization.ranking.in_(["T1", "T2", "T3", "T4","T5"]))\
        .order_by(Organization.ranking)

    if "cluster" in args.keys():
        cluster_list = list(make_array(args.get("cluster")))
        query = create_cluster_filter(cluster_list, query)

    df = pd.read_sql(query.statement, query.session.bind)
    ranking_count = Counter(df['ranking'])

    output = []
    counter = 0
    for key, value in ranking_count.items():
        output.append(
            {
                'name': key,
                'x': key,
                'y': value,
                'fill': colorsArr[counter],
                'symbol': {'fill': colorsArr[counter]},
            }
        )
        counter = counter + 1

    total = sum(ranking_count.values())

    return {"tier_list": output, "total": total}
