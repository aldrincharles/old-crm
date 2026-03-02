from api.Private_API import private_api
from flask_jwt_extended import jwt_required
from flask.json import jsonify, request
from models import db, Contact, SalesSpecialization, LinkedInConnections
from sqlalchemy.sql.expression import nullsfirst, nullslast
from api.helper import date_time_converter
from flask import json
from api.Private_API.handlers import contact_update


api = '/contact/<contact_id>/linkedin-connections'


@private_api.get(api)
@jwt_required()
def get_linkedin_connections(contact_id):
    conns = LinkedInConnections.query.filter(
        LinkedInConnections.contact_id == contact_id).all()

    output = []
    for c in conns:
        output.append({
            'value': c.name,
            'label': c.name
        })

    message = "Success getting linkedIn connections."
    status_dict = {
        "status": 200,
        "success": True,
        "message": message,
        "contentType": 'application/json',
        "content": {"connections": output}
    }
    return jsonify(status_dict), status_dict["status"]


@private_api.put(api)
@contact_update
@jwt_required()
def edit_linkedin_connections(contact_id):
    request_data = json.loads(request.data)

    contact = Contact.query.filter(Contact.id == contact_id).first()
    linkedin = LinkedInConnections.query.filter(
        LinkedInConnections.contact_id == contact_id).all()
    try:
        for li in linkedin:
            (db.session.query(LinkedInConnections).filter(
                LinkedInConnections.id == li.id).delete())
            db.session.commit()

            #contact.linked_in_connection = []

        if 'connections' in request_data:
            connections = []

            for c in request_data['connections']:
                connections.append(
                    LinkedInConnections(
                        contact_id=contact_id,
                        name=c['value']
                    )
                )

            contact.linked_in_connection = connections
            # db.session.flush()
            db.session.add_all(connections)

            db.session.commit()
        message = "Success editing linkedIn connections."
        status_dict = {
            "status": 200,
            "success": True,
            "message": message,
            "contentType": 'application/json',
            "content": {
                'connections': request_data['connections'] if 'connections' in request_data else []
            }
        }
        return jsonify(status_dict), status_dict["status"]
    except Exception as e:
        print(e)
        db.session.rollback()
        message = "Failed editing. Error"+str(e)
        status_dict = {
            "status": 500,
            "success": False,
            "message": message,
            "contentType": 'application/json',
        }
        return jsonify(status_dict), status_dict["status"]
