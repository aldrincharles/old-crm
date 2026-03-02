from celery_worker import celery
from models import Contact, Interview, Organization, db
from sqlalchemy import and_

from ..configs import analytics_sql_filters
from ...Service import create_cluster_filter
from api.helper import make_array


@celery.task
def iv_notes_task(args):
    columns = analytics_sql_filters(args)

    query = db.session.query(Contact)\
        .join(Organization)\
        .filter(and_(*columns))

    if "cluster" in args.keys():
        cluster_list = list(make_array(args.get("cluster")))
        query = create_cluster_filter(cluster_list, query)

    total_query = query.count()

    query = query.join(Interview)\
        .filter(Interview.contact_id == Contact.id)\
        .add_column(Interview.file_name)
    has_notes = query.count()
    output = [
        {
            'name': "Has IV Notes",
            'x': "Has IV Notes",
            'y': has_notes,
            'fill': "#80D8FF",
            'symbol': {'fill': "#80D8FF"},
        },
        {
            'name': "No IV Notes",
            'x': "No IV Notes",
            'y':  total_query - has_notes,
            'fill': "#01579B",
            'symbol': {'fill': "#01579B"},
        }
    ]

    return {"iv_notes": output, "total": total_query}
