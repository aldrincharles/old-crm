from api.Private_API import private_api
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask.json import jsonify, request
from models import db, Contact, User, Salary
from flask import json, current_app
import os
import boto3
from api.helper import null_checker
from api.Private_API.handlers import contact_update

api = '/contact/<contact_id>/salary-information'


@private_api.get(api)
@jwt_required()
def contact_salary_information(contact_id):
    contact_salary = Salary.query.filter(
        Salary.contact_id == contact_id
    ).first()

    contact_salary_obj = {
        'currency': null_checker("None", contact_salary.currency),
        'annual_base_salary': null_checker("-", contact_salary.base_salary),
        'annual_commission': null_checker("-", contact_salary.incentives),
        # 'total_annual_package': "-",
        'ote_split': null_checker("-", contact_salary.ote_split),
        'travel_allowance': null_checker("-", contact_salary.travel_allowance),
        'rsu_stock': null_checker("-", contact_salary.rsu_stock),
        'annual_leave': null_checker("-", contact_salary.annual_leave),
        'notice_period': null_checker("-", contact_salary.notice_period),
    }
    status_dict = {
        "status": 200,
        "success": True,
        "message": "Success getting contact details!",
        "contentType": 'application/json',
        "content": contact_salary_obj
    }

    return jsonify(status_dict), status_dict["status"]


@private_api.put(api)
@contact_update
@jwt_required()
def edit_salary_information(contact_id):
    request_data = json.loads(request.data)

    try:
        db.session.query(Salary).filter(
            Salary.contact_id == contact_id
        ).update({
            'currency': request_data['currency'],
            'base_salary': request_data['annual_base_salary'],
            'incentives': request_data['annual_commission'],
            'ote_split': request_data['ote_split'],
            'travel_allowance': request_data['travel_allowance'],
            'rsu_stock': request_data['rsu_stock'],
            'annual_leave': request_data['annual_leave'],
            'notice_period': request_data['notice_period']
        })

        db.session.commit()
        message = "Success editing salary information."
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
        message = "Failed editing salary information. Error"+str(e)
        status_dict = {
            "status": 500,
            "success": False,
            "message": message,
            "contentType": 'application/json',
        }
        return jsonify(status_dict), status_dict["status"]
