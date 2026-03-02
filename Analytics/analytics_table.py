from api.Private_API import private_api
from flask import jsonify, request
from flask_jwt_extended import jwt_required
from models import Contact, Organization, db
from sqlalchemy import and_
from sqlalchemy.sql import text
from sqlalchemy.sql.expression import nullsfirst, nullslast

from .configs import analytics_sql_filters
from .schema import table_schema
from ..Service import create_cluster_filter
from api.helper import make_array

@private_api.get('/contacts/analytics/table')
@jwt_required()
def analytics_table():
    page = request.args.get('page', 1, type=int)
    size = request.args.get('size', 10, type=int)
    accessor = request.args.get('accessor', type=str)
    direction = request.args.get("direction", type=str).lower()
    null_pos = nullsfirst if direction == "desc" else nullslast

    columns = analytics_sql_filters(request.args)

    query = db.session.query(Contact)\
        .join(Organization)\
        .filter(and_(*columns))
    
    if "cluster" in request.args.keys():
        cluster_list = list(make_array(request.args.get("cluster")))
        query = create_cluster_filter(cluster_list, query)

    if direction in ["asc", "desc"]:
        query = query.order_by(
            null_pos(text(accessor + " " + direction)))

    query = query.paginate(page, size, False)
    content = table_schema.dump(query.items)

    message = "Success getting Organization list"
    status_dict = {
        "status": 200,
        "success": True,
        "message": message,
        "contentType": 'application/json',
        "totalCount": query.total,
        "content": content
    }
    return jsonify(status_dict), status_dict["status"]
