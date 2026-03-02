from api.handlers import exception_hanlder, session_scope
from api.Private_API import private_api
from flask.json import jsonify, request
from flask_jwt_extended import jwt_required
from models import Contact, Subcategory, contact_subcategory_association
from .schema import subcategory_schema, subcategories_schema
from flask import json

api = '/contact/details/<contact_id>/subcategories'


@private_api.get(api)
@jwt_required()
@exception_hanlder()
def contact_subcategories(contact_id):
    subcategories = Subcategory.query\
        .join(contact_subcategory_association)\
        .filter(
            contact_subcategory_association.c.contact_id == contact_id
        ).all()

    output = []

    for sub in subcategories:
        output.append({
            'value': sub.name,
            'label': sub.name
        })

    message = "Request Success"
    status_dict = {
        "status": 200,
        "success": True,
        "message": message,
        "contentType": 'application/json',
        "content": {"subcategories": output}
    }

    return jsonify(status_dict), status_dict["status"]


@private_api.post(api)
@jwt_required()
@exception_hanlder()
def add_contact_subcategories(contact_id):
    request_data = json.loads(request.data)

    with session_scope() as session:
        contact = session.query(Contact).get(contact_id)
        contact.subcategories = []

        for sub in request_data['subcategories']:
            value = subcategory_schema.load({'subcategories': sub})

            subcategory_item = session.query(Subcategory)\
                .filter(Subcategory.name == value['subcategories'])\
                .first()

            contact.subcategories.append(
                subcategory_item
            )

    message = "Request Success"
    status_dict = {
        "status": 200,
        "success": True,
        "message": message,
        "contentType": 'application/json',
        "content": {"subcategories": request_data['subcategories']}
    }

    return jsonify(status_dict), status_dict["status"]
