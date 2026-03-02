from api.helper import DataType, construct_filter, make_array
from models import Contact, Organization, PreviousRole, db
from sqlalchemy.sql.expression import and_

from ...Service import create_cluster_filter


def filter_config(request_args):
    filters = [
        {
            "label": "name",
            "column": Contact.name,
            "type": DataType.STRING
        },
        {
            "label": "organization",
            "column": Organization.id,
            "type": DataType.LIST
        },
        {
            "label": "industry",
            "column": Contact.industry,
            "type": DataType.LIST
        },
        {
            "label": "vertical",
            "column": Contact.vertical,
            "type": DataType.LIST
        },
        {
            "label": "position",
            "column": Contact.position,
            "type": DataType.LIST
        },
        {
            "label": "location",
            "column": Contact.location,
            "type": DataType.LIST
        },
        {
            "label": "geography",
            "column": Contact.geography,
            "type": DataType.LIST
        },
        {
            "label": "position",
            "column": Contact.position,
            "type": DataType.LIST
        },
        {
            "label": "candidate_category",
            "column": Contact.candidate_category,
            "type": DataType.STRING
        },
        {
            "label": "previous_organization",
            "column": PreviousRole.organization_id,
            "type": DataType.LIST
        },
        {
            "label": "previous_position",
            "column": PreviousRole.position,
            "type": DataType.LIST
        },
        {
            "label": "previous_industry",
            "column": PreviousRole.industry,
            "type": DataType.LIST
        },
        {
            "label": "previous_vertical",
            "column": PreviousRole.vertical,
            "type": DataType.LIST
        },
        {
            "label": "previous_location",
            "column": PreviousRole.location,
            "type": DataType.LIST
        },
        {
            "label": "previous_geography",
            "column": PreviousRole.geography,
            "type": DataType.LIST
        },
        {
            "label": "organization_industry",
            "column": Organization.industry,
            "type": DataType.LIST
        }
    ]

    columns = construct_filter(filters, request_args)

    query = db.session.query(Contact)\
        .join(Organization)

    if "cluster" in request_args.keys():
        cluster_list = list(make_array(request_args.get("cluster")))
        query = create_cluster_filter(cluster_list, query)

    prev_keys = ["previous_organization", "previous_position", "previous_industry",
                 "previous_vertical", "previous_location", "previous_geography"]
    if any(arg_key in prev_keys for arg_key in request_args.keys()):
        query = query.join(PreviousRole, Contact.id == PreviousRole.contact_id)\
            .group_by(Contact.id)

    return query.filter(and_(*columns))
