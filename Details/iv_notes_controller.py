from api.Private_API import private_api
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask.json import jsonify, request
from models import db, User, Interview
from flask import json, current_app
from api.Private_API.handlers import contact_update

import os
import boto3

api = '/contact/<contact_id>/interview-notes'


@private_api.get(api)
@jwt_required()
def get_interview_notes(contact_id):
    interviews = Interview.query.filter(
        Interview.contact_id == contact_id).all()

    interview_notes = []
    for i in interviews:
        i.aws_file_name = (
            '{}{}'.format(
                current_app.config["S3_LOCATION"], i.file_name)
        )

        string_url = f'{i.file_name}'
        fileName = string_url.rsplit("/")
        if len(fileName) is not 1:
            data = {
                "interview_id": i.id,
                "date": i.date_added.strftime("%m/%d/%Y"),
                "link": i.aws_file_name,
                "fileName": fileName[2],
                "uploader": i.author.first_name+" "+i.author.last_name
            }
            interview_notes.append(data)
    message = "Success getting comments list."
    status_dict = {
        "status": 200,
        "success": True,
        "message": message,
        "contentType": 'application/json',
        "content": interview_notes
    }
    return jsonify(status_dict), status_dict["status"]


@private_api.post(api)
@contact_update
@jwt_required()
def add_interview_notes(contact_id):

    try:

        data_file = request.files['file']
        data_file_name = f'{str(contact_id)}/interview/{data_file.filename}'

        s3 = boto3.client(
            "s3",
            aws_access_key_id=os.environ['S3_KEY'],
            aws_secret_access_key=os.environ['S3_SECRET']
        )

        s3.upload_fileobj(
            data_file,
            current_app.config['S3_BUCKET'],
            data_file_name,
            ExtraArgs={
                'ContentType': data_file.content_type
            }
        )

        user = User.query.filter_by(id=get_jwt_identity()).first()

        interview = Interview(
            contact_id=contact_id,
            author_id=user.id,
            file_name=data_file_name
        )
        db.session.add(interview)
        db.session.commit()
        message = "Success uploading file."
        status_dict = {
            "status": 201,
            "success": True,
            "message": message,
            "contentType": 'application/json',
        }
        return jsonify(status_dict), status_dict["status"]
    except Exception as e:
        db.session.rollback()
        print("Error uploading file: ", e)
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


@private_api.delete('/contact/interview-notes')
@jwt_required()
def delete_interview_notes():
    request_data = json.loads(request.data)

    try:
        interviews = request_data['interview_ids']

        for i in interviews:
            db.session.query(Interview).filter(
                Interview.id == i['id']).delete()
            db.session.commit()
        message = "Success deleting interview(s)"
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
