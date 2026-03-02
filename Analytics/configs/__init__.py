from api.helper import DataType, make_array
from models import Contact, Organization

from .age_filter import age_filter
from .tenure_filter import tenure_filter

def filter_config():
    filters = [
        {
            "label": "ranking",
            "column": Organization.ranking,
            "sort": True,
            "type": DataType.LIST
        },
        {
            "label": "organization",
            "column": Organization.id,
            "sort": True,
            "type": DataType.STRING
        },
        {
            "label": "industry",
            "column": Contact.industry,
            "sort": True,
            "type": DataType.LIST
        },
        {
            "label": "vertical",
            "column": Contact.vertical,
            "sort": True,
            "type": DataType.LIST
        },
        {
            "label": "position",
            "column": Contact.position,
            "sort": True,
            "type": DataType.LIST
        },
        {
            "label": "geography",
            "column": Contact.geography,
            "sort": True,
            "type": DataType.LIST
        },
        {
            "label": "location",
            "column": Contact.location,
            "sort": True,
            "type": DataType.LIST
        },
        {
            "label": "gender",
            "column": Contact.gender,
            "sort": False,
            "type": DataType.STRING
        },
        {
            "label": "age_group",
            "column": "",
            "sort": False,
            "type": DataType.STRING
        },
        {
            "label": "tenure",
            "column": "",
            "sort": False,
            "type": DataType.STRING
        },
       
    ]
    return filters

def analytics_sql_filters(args):
    columns = []
    for item in filter_config():
        if item['label'] in args.keys():
            value = args[item['label']]
            if not value:
                continue
            dataType = item['type']
            if dataType == DataType.BOOLEAN:
                columns.append((item["column"]))
            elif dataType == DataType.LIST:
                columns.append((item["column"]).in_(make_array(value)))
            elif dataType == DataType.STRING:
                if item['label'] == "name":
                    columns.append(item["column"].ilike(f'%{value}%'))
                elif item['label'] == "age_group":
                    columns.append(age_filter(value))
                elif item['label'] == "tenure":
                    columns.append(tenure_filter(value))
                else:
                    columns.append(item["column"] == value)
    return columns