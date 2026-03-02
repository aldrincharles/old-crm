from api.Private_API import private_api
from flask_jwt_extended import jwt_required
from flask.json import jsonify, request
from models import PreviousRole, Organization, db, Contact, SalesSpecialization
from sqlalchemy.sql.expression import nullsfirst, nullslast
from api.helper import date_time_converter
from flask import json
from constants import (Geographies, Languages, Locations, Nationalities,
                       Seniority_Levels)

from api.Private_API.handlers import contact_update

api = '/contact/<contact_id>/previous-role'


@private_api.get(api)
@jwt_required()
def get_previous_roles(contact_id):

    prev_roles = []
    for p, o in db.session.query(PreviousRole, Organization).filter(
        PreviousRole.contact_id == contact_id,
        Organization.id == PreviousRole.organization_id
    ).order_by(PreviousRole.time_frame.desc()).all():
        sales_specializations = []
        for ss in p.sales_specializations:
            sales_specializations.append({"value": ss.name, "label": ss.name})

        prev_roles.append({
            'previous_role_id': p.id,
            'job_title': p.job_title,
            'organization': {'value': o.id, 'label': o.name},
            'position': {'value': p.position, 'label': p.position},
            'vertical': {'value': p.vertical, 'label': p.vertical},
            'industry': {'value': p.industry, 'label': p.industry},
            'seniority': {'value': p.seniority, 'label': p.seniority},
            'location': {'value': p.location, 'label': p.location},
            'geography': {'value': p.geography, 'label': p.geography},
            'time_frame': p.time_frame,
            'sales_specializations': sales_specializations,
            'winners_club': bool(p.winners_club)
        })

    message = "Success getting previous roles list."
    status_dict = {
        "status": 200,
        "success": True,
        "message": message,
        "contentType": 'application/json',
        "content": prev_roles
    }
    return jsonify(status_dict), status_dict["status"]


@private_api.post(api)
@contact_update
@jwt_required()
def add_previous_role(contact_id):
    request_data = json.loads(request.data)

    try:
        contact = Contact.query.filter(Contact.id == contact_id).first()
        prev_role = PreviousRole(
            contact_id=contact.id,
            job_title=request_data['job_title'],
            organization_id=request_data['organization']['value'],
            position=request_data['position']['value'],
            vertical=request_data['vertical']['value'],
            industry=request_data['industry']['value'],
            seniority=request_data['seniority']['value'],
            location=request_data['location']['value'],
            geography=request_data['geography']['value'],
            time_frame=date_time_converter(request_data['time_frame']),
            winners_club=bool(request_data['winners_club'])
        )
        # Sales
        if 'sales_specializations' in request_data:
            sales_specializations_dic = {}
            sales_specializations = SalesSpecialization.query.all()
            for item in sales_specializations:
                sales_specializations_dic[item.name] = item

            contact_sales_specials = request_data['sales_specializations']
            for item in contact_sales_specials:
                prev_role.sales_specializations.append(
                    sales_specializations_dic[item['value']])

        db.session.add(prev_role)
        db.session.flush()
        db.session.commit()

        message = "Success Adding  Previous Role!"
        status_dict = {
            "status": 201,
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


@private_api.put('/contact/<previous_role_id>/previous-role')
@jwt_required()
def edit_previous_role(previous_role_id):
    request_data = json.loads(request.data)

    try:
        print(request_data['winners_club'])
        previous_role = PreviousRole.query.filter(
            PreviousRole.id == previous_role_id).first()
        (db.session.query(PreviousRole).filter(PreviousRole.id == previous_role_id).update({
            'job_title': request_data['job_title'],
            'organization_id': request_data['organization']['value'],
            'position': request_data['position']['value'],
            'vertical': request_data['vertical']['value'],
            'industry': request_data['industry']['value'],
            'seniority': request_data['seniority']['value'],
            'location': request_data['location']['value'],
            'geography': request_data['geography']['value'],
            'time_frame': date_time_converter(
                request_data['time_frame']),
            'winners_club': bool(request_data['winners_club'])

        }))
        # Sales
        sales_specializations_dic = {}
        sales_specializations = SalesSpecialization.query.all()
        for item in sales_specializations:
            sales_specializations_dic[item.name] = item
        previous_role.sales_specializations = []
        if 'sales_specializations' in request_data:
            contact_sales_specials = request_data['sales_specializations']
            for item in contact_sales_specials:
                previous_role.sales_specializations.append(
                    sales_specializations_dic[item['value']])

        db.session.commit()

        return_content = {
            'job_title': request_data['job_title'],
            'organization': request_data['organization'],
            'position': request_data['position'],
            'vertical': request_data['vertical'],
            'seniority': request_data['seniority'],
            'industry': request_data['industry'],
            'location': request_data['location'],
            'geography': request_data['geography'],
            'time_frame': request_data['time_frame'],
            'sales_specializations': request_data['sales_specializations'] if 'sales_specializations' in request_data else [],
            'winners_club': request_data['winners_club']

        }
        message = "Success Editing  Previous Role!"
        status_dict = {
            "status": 201,
            "success": True,
            "message": message,
            "contentType": 'application/json',
            "content": return_content
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


@private_api.delete('/contact/<previous_role_id>/previous-role')
@jwt_required()
def delete_previous_role(previous_role_id):

    (
        PreviousRole.query.filter_by(id=previous_role_id).delete()
    )

    db.session.commit()
    try:
        message = "Success Deleting  Previous Role!"
        status_dict = {
            "status": 201,
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
