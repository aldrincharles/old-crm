from api.Private_API import private_api
from flask_jwt_extended import jwt_required
from flask.json import jsonify, request
from models import Contact, Organization, db, LanguagesMulti, SalesSpecialization, DeveloperSpecialization
from flask import json
from api.helper import date_time_converter
from constants import Languages
from api.Private_API.handlers import contact_update

content_languages = Languages()
api = '/contact/<contact_id>/basic-information'


@private_api.get(api)
@jwt_required()
def contact_basic_information(contact_id):
    contact = Contact.query.filter(Contact.id == contact_id).first()
    organization = Organization.query.filter(
        Organization.id == contact.organization_id).first()

    languages_available = []
    for l in contact.languages_multiple:
        languages_available.append({"value": l.name, "label": l.name})

    dev_specializations = []
    for ds in contact.developer_specializations:
        dev_specializations.append({"value": ds.name, "label": ds.name})

    sales_specializations = []
    for ss in contact.sales_specializations:
        sales_specializations.append({"value": ss.name, "label": ss.name})

    contact_obj = {
        'name': contact.name,
        'job_title': contact.job_title,
        'organization': {'value': organization.id, 'label': organization.name},
        'organization_id': organization.id,
        'position_time_frame': contact.time_frame,
        'company_time_frame': contact.time_frame_company,
        'linkedin': contact.linked_in,
        'position': {'value': contact.position, 'label': contact.position},
        'industry':  {'value': contact.industry, 'label': contact.industry},
        'vertical': {'value': contact.vertical, 'label': contact.vertical},
        'seniority':  {'value': contact.seniority, 'label': contact.seniority},
        'sales_profile':  contact.sales_profile,
        'location': {'value': contact.location, 'label': contact.location},
        'geography': {'value': contact.geography, 'label': contact.geography},
        'gender': contact.gender,
        'age': contact.age(),
        'school_graduated': contact.school_graduated,
        'school_ranking': contact.school_ranking,
        'year_graduated': contact.year_graduated,
        'personal_email': contact.personal_email,
        'work_email': contact.work_email,
        'mobile': contact.mobile_number,
        'candidate_category': contact.candidate_category,
        'internal_grading': contact.internal_grading,
        'status': {'value': contact.id_status, 'label': contact.id_status},
        'nationality': {'value': contact.nationality, 'label': contact.nationality},
        'source': contact.source,
        'languages': languages_available,
        'sales_specializations': sales_specializations,
        'dev_specializations': dev_specializations,
        'last_updated': contact.last_updated,
        'date_added': contact.date_added
    }

    status_dict = {
        "status": 200,
        "success": True,
        "message": "Success getting contact details!",
        "contentType": 'application/json',
        "content": contact_obj
    }

    return jsonify(status_dict), status_dict["status"]


@private_api.put(api)
@contact_update
@jwt_required()
def edit_contact(contact_id):
    request_data = json.loads(request.data)
    contact = Contact.query.filter(Contact.id == contact_id).first()

    try:
        db.session.query(Contact).filter(Contact.id == contact_id).update({
            'name': request_data['name'],
            'job_title': request_data['job_title'],
            'organization_id': request_data['organization']['value'],
            'time_frame': date_time_converter(
                request_data['position_time_frame']),
            'time_frame_company': date_time_converter(
                request_data['company_time_frame']),
            'linked_in': request_data['linkedin'],
            'position': request_data['position']['value'],
            'industry': request_data['industry']['value'],
            'vertical': request_data['vertical']['value'],
            'seniority': request_data['seniority']['value'],
            'location': request_data['location']['value'],
            'geography': request_data['geography']['value'],
            'gender': request_data['gender'],
            'school_graduated': request_data['school_graduated'],
            'school_ranking': request_data['school_ranking'],
            'year_graduated': request_data['year_graduated'],
            'personal_email': request_data['personal_email'],
            'work_email': request_data['work_email'],
            'mobile_number': request_data['mobile'],
            'candidate_category': request_data['candidate_category'],
            'internal_grading': request_data['internal_grading'],
            'id_status': request_data['status']['value'],
            'nationality': request_data['nationality']['value'],
            'source': request_data['source'],
        })

        # Sales
        sales_specializations_dic = {}
        sales_specializations = SalesSpecialization.query.all()
        for item in sales_specializations:
            sales_specializations_dic[item.name] = item

        contact.sales_specializations = []

        if 'sales_specializations' in request_data:
            contact_sales_specials = request_data['sales_specializations']
            for item in contact_sales_specials:
                contact.sales_specializations.append(
                    sales_specializations_dic[item['value']])

        # Dev
        dev_specializations_dic = {}
        dev_specializations = DeveloperSpecialization.query.all()
        for item in dev_specializations:
            dev_specializations_dic[item.name] = item

        contact.developer_specializations = []

        if 'dev_specializations' in request_data:
            contact_dev_specials = request_data['dev_specializations']
            for item in contact_dev_specials:
                contact.developer_specializations.append(
                    dev_specializations_dic[item['value']])

        # Languages
        contact.languages_multiple = []

        if 'languages' in request_data:
            item_language = None
            contact_multiple_languages = request_data['languages']
            for item in contact_multiple_languages:
                if item['value'] in content_languages:
                    language_check = LanguagesMulti.query.filter_by(
                        name=item['value']).first()
                    if(language_check == None):
                        language = LanguagesMulti(
                            name=item['value']
                        )
                        item_language = language
                        db.session.add(language)
                    elif(language_check != None):
                        item_language = language_check
                contact.languages_multiple.append(item_language)

        db.session.commit()
        message = "Success editing items."
        status_dict = {
            "status": 200,
            "success": True,
            "message": message,
            "contentType": 'application/json',
            "content": request_data
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


@private_api.delete('/contact/<contact_id>')
@jwt_required()
def delete_contact(contact_id):
    try:
        (db.session.query(Contact).filter(Contact.id == contact_id).delete())
        db.session.commit()
        message = "Success Deleting Previous Role!"
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
