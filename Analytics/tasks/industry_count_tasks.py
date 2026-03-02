from collections import Counter

import pandas as pd
from celery_worker import celery
from models import Contact, Organization, db
from sqlalchemy import and_

from ..configs import analytics_sql_filters
from ...Service import create_cluster_filter
from api.helper import make_array

mdColors = ['#0288D1', '#0277BD', '#01579B', '#80D8FF', '#40C4FF', '#00B0FF', '#0091EA', '#00BCD4', '#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4', '#00ACC1', '#0097A7', '#00838F', '#006064', '#84FFFF', '#18FFFF', '#00E5FF', '#00B8D4', '#009688', '#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#00897B', '#00796B', '#00695C', '#004D40', '#A7FFEB', '#64FFDA', '#1DE9B6', '#00BFA5', '#4CAF50', '#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784',
            '#66BB6A', '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20', '#B9F6CA', '#69F0AE', '#00E676', '#00C853', '#8BC34A', '#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E', '#CCFF90', '#B2FF59', '#76FF03', '#64DD17', '#CDDC39', '#F9FBE7', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157', '#CDDC39', '#C0CA33', '#AFB42B', '#9E9D24', '#827717', '#F4FF81', '#EEFF41', '#C6FF00', '#AEEA00', '#FFEB3B', '#FFFDE7', ]


@celery.task
def industry_chart_task(args):
    columns = analytics_sql_filters(args)

    query = db.session.query(Contact.industry)\
        .join(Organization)\
        .filter(and_(*columns))

    if "cluster" in args.keys():
        cluster_list = list(make_array(args.get("cluster")))
        query = create_cluster_filter(cluster_list, query)

    df = pd.read_sql(query.statement, query.session.bind)

    industry_count = Counter(df['industry'])
    output = []
    index_counter = 0

    for key, value in industry_count.items():
        output.append(
            {"x": key, "y": value, "fill": mdColors[index_counter]}
        )
        index_counter = index_counter + 1

    return {
        "industry": output,
        "total": sum(industry_count.values())
    }
