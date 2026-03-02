import logging
from api.Private_API import private_api
from flask_jwt_extended import jwt_required
from flask.json import jsonify, request
from models import (Contact, db)
from flask import json

@private_api.put('/contact/<contact_id>/candidate-category')
@jwt_required()
def edit_candidate_category(contact_id):
    request_data = json.loads(request.data)
    logging.warning(contact_id)
    try:
        (Contact.query.filter_by(id=contact_id).update({
            'candidate_category': request_data['value']
        }))

        db.session.commit()

        message = "Success editing candidate category"
        status_dict = {
            "status": 200,
            "success": True,
            "message": message,
            "contentType": 'application/json',
        }
        return jsonify(status_dict), status_dict["status"]

    except Exception as e:
        print("ERROR:", e)
        db.session.rollback()
        message = "Oops! Something went wrong!"
        status_dict = {
            "status": 500,
            "statusText": "Bad Request",
            "success": False,
            "message": message,
            "error": True,
            "contentType": 'application/json'
        }
        return jsonify(status_dict), status_dict["status"]