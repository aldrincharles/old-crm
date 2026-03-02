from api.Private_API import private_api
from flask_jwt_extended import jwt_required
from flask.json import jsonify, request
from models import db, RolePreference
from flask import json
from api.helper import date_time_converter
from api.Private_API.handlers import contact_update

api = '/contact/<contact_id>/preferences'


@private_api.get(api)
@jwt_required()
def get_preferences(contact_id):
    prefs = RolePreference.query.filter(
        RolePreference.contact_id == contact_id).first()
    if prefs is None:
        date_looking_to_move = None
        industry = {'value': "-", "label": "-"}
        position = {'value': "-", "label": "-"}
        type_of_company = {'value': "-", "label": "-"}
    else:
        date_looking_to_move = prefs.date_looking_to_move
        industry = {'value': prefs.industry, 'label': prefs.industry}
        position = {'value': prefs.position, 'label': prefs.position}
        type_of_company = {'value': prefs.type_of_company,
                           'label': prefs.type_of_company}
    message = "Success getting preferences."
    status_dict = {
        "status": 200,
        "success": True,
        "message": message,
        "contentType": 'application/json',
        "content": {
            "date_looking_to_move":  date_looking_to_move,
            "industry": industry,
            "position": position,
            "type_of_company": type_of_company
        }
    }
    return jsonify(status_dict), status_dict["status"]


@private_api.put(api)
@contact_update
@jwt_required()
def contact_edit_preferences(contact_id):
    request_data = json.loads(request.data)

    prefs = RolePreference.query.filter(
        RolePreference.contact_id == contact_id).first()
    if prefs is None:
        db.session.add(RolePreference(contact_id=contact_id))
        db.session.commit()

        prefs = RolePreference.query.filter(
            RolePreference.contact_id == contact_id).first()

    try:
        prefs.date_looking_to_move = date_time_converter(
            request_data['date_looking_to_move'])
        prefs.industry = request_data['industry']['value']
        prefs.position = request_data['position']['value']
        prefs.type_of_company = request_data['type_of_company']['value']
        db.session.commit()
        message = "Success editing preferences."
        status_dict = {
            "status": 200,
            "success": True,
            "message": message,
            "contentType": 'application/json',
            "content": {
                "date_looking_to_move": request_data['date_looking_to_move'],
                "industry": {'value': request_data['industry'], 'label': request_data['industry']},
                "position": {'value': request_data['position'], 'label': request_data['position']},
                "type_of_company": {'value': request_data['type_of_company'], 'label': request_data['type_of_company']},
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
