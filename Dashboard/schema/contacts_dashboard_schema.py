from application import ma
from marshmallow import fields


class OrganizationSchema(ma.Schema):
    name = fields.String()


class TableSchema(ma.Schema):
    id = fields.String()
    name = fields.String(data_key='contact_name')
    linked_in = fields.String()
    position = fields.String(data_key='contact_position')
    location = fields.String(data_key='contact_location')
    geography = fields.String(data_key='contact_geography')
    candidate_category = fields.String()

    organization = fields.Nested(OrganizationSchema)


table_schema = TableSchema(many=True)
