from collections import Counter

import pandas as pd
from celery_worker import celery
from models import Contact, LinkedInConnections, Organization, db
from sqlalchemy import and_

from ..configs import analytics_sql_filters
from ...Service import create_cluster_filter
from api.helper import make_array


@celery.task
def connections_task(args):
    columns = analytics_sql_filters(args)

    subquery = db.session.query(Contact.id)\
        .join(Organization)\
        .filter(and_(*columns))\
        .subquery()

    query = db.session.query(LinkedInConnections).join(Contact).filter(
        LinkedInConnections.contact_id.in_(subquery))

    if "cluster" in args.keys():
        cluster_list = list(make_array(args.get("cluster")))
        query = create_cluster_filter(cluster_list, query)

    df_contacts = pd.read_sql(query.statement, query.session.bind)

    connection_counter = Counter(df_contacts["name"])
    total = sum(connection_counter.values())

    mark_connections = connection_counter['Mark Kearney']
    del connection_counter['Mark Kearney']
    other = sum(connection_counter.values())

    output = [
        {
            'name': "Mark",
            'x': "Mark",
            'y': mark_connections,
            'fill': "#80D8FF",
            'symbol': {'fill': "#80D8FF"},
        },
        {
            'name': "Others (Excluding Mark)",
            'x': "Others (Excluding Mark)",
            'y':  other,
            'fill': "#01579B",
            'symbol': {'fill': "#01579B"},
        },
    ]

    return {"connections": output, "total": total}
