from api.Private_API import private_api
from flask_jwt_extended import jwt_required
from flask.json import jsonify, request
from models import db, AffiliatedOrganizationBoard, Organization
from flask import json
from api.helper import date_time_converter

api = '/contact/<contact_id>/board-affiliations'


@private_api.get(api)
@jwt_required()
def get_board_affiliations(contact_id):
    affiliations = AffiliatedOrganizationBoard.query.filter(
        AffiliatedOrganizationBoard.contact_id == contact_id).all()

    output = []
    for item in affiliations:
        output.append({
            'id': item.id,
            'organization': {
                'value':item.organization.id, 
                'label':item.organization.name},
            'start_date':item.date_started
        })

    message = "Success getting board affiliations information."
    status_dict = {
        "status": 200,
        "success": True,
        "message": message,
        "contentType": 'application/json',
        "content": output
    }
    return jsonify(status_dict), status_dict["status"]


@private_api.post(api)
@jwt_required()
def add_board_affiliations(contact_id):
    try:
        request_data = json.loads(request.data)

        affiliation = AffiliatedOrganizationBoard(
            contact_id=contact_id,
            organization_id=request_data['organization']['value'],
            date_started=date_time_converter(
                request_data['start_date']))

        db.session.add(affiliation)
        db.session.commit()

        message = "Success adding board affiliations information."
        status_dict = {
            "status": 200,
            "success": True,
            "message": message,
            "contentType": 'application/json',
        }
        return jsonify(status_dict), status_dict["status"]
    except Exception as e:
        print(e)
        db.session.rollback()
        message = "Failed editing item. Error"+str(e)
        status_dict = {
            "status": 500,
            "success": False,
            "message": message,
            "contentType": 'application/json',
        }
        return jsonify(status_dict), status_dict["status"]


@private_api.delete(api)
@jwt_required()
def delete_board_affiliations(contact_id):
    request_data = json.loads(request.data)
    id_list = [i['id'] for i in request_data['items']]

    try:
        for id in id_list:
            (db.session.query(AffiliatedOrganizationBoard).filter(
                AffiliatedOrganizationBoard.id == id,
                AffiliatedOrganizationBoard.contact_id == contact_id)
             .delete())
        db.session.commit()

        message = "Success deleting board affiliations information."
        status_dict = {
            "status": 200,
            "success": True,
            "message": message,
            "contentType": 'application/json',
        }
        return jsonify(status_dict), status_dict["status"]
    except Exception as e:
        print(e)
        db.session.rollback()
        message = "Failed editing item. Error"+str(e)
        status_dict = {
            "status": 500,
            "success": False,
            "message": message,
            "contentType": 'application/json',
        }
        return jsonify(status_dict), status_dict["status"]
