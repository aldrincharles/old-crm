from api.helper import date_time_converter
from api.Private_API import private_api
from constants import Languages
from flask import json
from flask.json import jsonify, request
from flask_jwt_extended import jwt_required
from models import (Contact, DeveloperSpecialization, LanguagesMulti,
                    LinkedInConnections, Salary, SalesSpecialization, db)
from sqlalchemy.sql import text
from sqlalchemy.sql.expression import nullsfirst, nullslast

from ..Dashboard.common.filter_config import filter_config
from .schema import table_schema

api = '/contact'
content_languages = Languages()

@private_api.get(api)
@jwt_required()
def contacts():
    page = request.args.get('page', type=int)
    size = request.args.get('size', type=int)
    accessor = request.args.get('accessor', type=str)
    direction = request.args.get("direction", type=str).lower()
    null_pos = nullsfirst if direction == "desc" else nullslast

    query = filter_config(request.args)

    if direction in ["asc", "desc"]:
        query = query.order_by(
            null_pos(text(accessor + " " + direction)))
    else:
        query = query.order_by(Contact.name)

    contacts = query.paginate(page, size, False)
    content = table_schema.dump(contacts.items)

    message = "Success getting list of contacts."
    status_dict = {
        "status": 200,
        "success": True,
        "message": message,
        "contentType": 'application/json',
        "totalCount": contacts.total,
        "content": content
    }
    return jsonify(status_dict), status_dict["status"]


@private_api.post(api)
@jwt_required()
def add_contact():
    request_data = json.loads(request.data)

    try:
        contact = Contact(
            name=request_data['name'],
            gender=request_data['gender'],
            school_graduated=request_data['school_graduated'],
            school_ranking=request_data['school_ranking'],
            year_graduated=request_data['year_graduated'],
            organization_id=request_data['organization']['value'],
            industry=request_data['industry']['value'],
            vertical=request_data['vertical']['value'],
            linked_in=request_data['linkedin'],
            job_title=request_data['job_title'],
            position=request_data['position']['value'],
            seniority=request_data['seniority']['value'],
            time_frame=date_time_converter(
                request_data['position_time_frame']),
            time_frame_company=date_time_converter(
                request_data['company_time_frame']),
            personal_email=request_data['personal_email'],
            work_email=request_data['work_email'],
            mobile_number=request_data['mobile'],
            location=request_data['location']['value'] if type(
                request_data['location']) != str else None,
            geography=request_data['geography']['value'] if type(
                request_data['geography']) != str else None,
            id_status=request_data['status']['value'] if type(
                request_data['status']) != str else None,
            nationality=request_data['nationality']['value'] if type(
                request_data['nationality']) != str else None,
            internal_grading=request_data['internal_grading'],
            candidate_category=request_data['candidate_category'],
            source=request_data['source'],
            sales_profile=request_data['sales_profile'] if 'sales_profile' in request_data else None
        )

        # Sales
        if 'sales_specializations' in request_data:
            sales_specializations_dic = {}
            sales_specializations = SalesSpecialization.query.all()
            for item in sales_specializations:
                sales_specializations_dic[item.name] = item

            contact_sales_specials = request_data['sales_specializations']
            for item in contact_sales_specials:
                contact.sales_specializations.append(
                    sales_specializations_dic[item['value']])

        # Dev
        if 'dev_specializations' in request_data:
            dev_specializations_dic = {}
            dev_specializations = DeveloperSpecialization.query.all()
            for item in dev_specializations:
                dev_specializations_dic[item.name] = item

            contact_dev_specials = request_data['dev_specializations']
            for item in contact_dev_specials:
                contact.developer_specializations.append(
                    dev_specializations_dic[item['value']])

        # Languages
        # Languages
        contact.languages_multiple = []

        if 'languages' in request_data:
            item_language = None
            contact_multiple_languages = request_data['languages']
            for item in contact_multiple_languages:
                if item['value'] in content_languages:
                    language_check = LanguagesMulti.query.filter_by(
                        name=item['value']).first()
                    if (language_check == None):
                        language = LanguagesMulti(
                            name=item['value']
                        )
                        item_language = language
                        db.session.add(language)
                    elif (language_check != None):
                        item_language = language_check
                contact.languages_multiple.append(item_language)

        # Connections
        if 'connections' in request_data:
            connections = []

            for c in request_data['connections']:
                connections.append(
                    LinkedInConnections(
                        contact_id=contact.id,
                        name=c['value']
                    )
                )
        db.session.add(contact)
        db.session.add_all(connections)
        db.session.flush()

        # Put a salary
        db.session.add(Salary(contact_id=contact.id))

        db.session.commit()

        message = "Success adding contact to list"
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
        message = "Failed adding contact. Error"+str(e)
        status_dict = {
            "status": 500,
            "success": False,
            "message": message,
            "contentType": 'application/json',
        }
        return jsonify(status_dict), status_dict["status"]
