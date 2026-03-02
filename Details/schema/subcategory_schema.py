from application import ma
from marshmallow import fields

from api.helper import (deserialize_option, serialize_option)


class ContactSubCategory(ma.Schema):
    subcategories = fields.Method(
        'get_subcategories', deserialize='load_subcategories')
    
    def get_subcategories(self, obj):
        return serialize_option(obj.name)

    def load_subcategories(self, value):
        return deserialize_option(value)

subcategories_schema = ContactSubCategory(many=True)
subcategory_schema = ContactSubCategory()
