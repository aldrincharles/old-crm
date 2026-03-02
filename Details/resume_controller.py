from api.Private_API import private_api
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask.json import jsonify, request
from models import db, Contact, User, Archive
from flask import json, current_app
from api.Private_API.handlers import contact_update

import os
import boto3

api = '/contact/<contact_id>/resume'


@private_api.get(api)
@jwt_required()
def get_archive(contact_id):

    contact = Contact.query.filter(Contact.id == contact_id).first()

    archives = []
    for archive in contact.archives:
        archive.aws_file_name = (
            '{}{}'.format(
                current_app.config["S3_LOCATION"], archive.file_name)
        )

        string_url = f'{archive.file_name}'
        fileName = string_url.rsplit("/")
        if len(fileName) is not 1:
            data = {
                "resume_id": archive.id,
                "date": archive.date_added.strftime("%m/%d/%Y"),
                "link": archive.aws_file_name,
                "fileName": fileName[2],
                "uploader": archive.author.first_name+" "+archive.author.last_name
            }
            archives.append(data)
    message = "Success getting comments list."
    status_dict = {
        "status": 200,
        "success": True,
        "message": message,
        "contentType": 'application/json',
        "content": archives
    }
    return jsonify(status_dict), status_dict["status"]


@private_api.post(api)
@contact_update
@jwt_required()
def contact_upload_basic_resume(contact_id):
    # Get the file from input, save it to static folder,
    # return a json of the filename to be used to display it immediately.
    # Check first if there is a current resume saved.
    # If there is, add it to the archives for future use.
    user = User.query.filter_by(id=get_jwt_identity()).first()
    data = (
        Contact.query.add_column(Contact.orig_resume)
        .filter(Contact.id == contact_id).first()
    )

    if data[1] != "":
        archive = Archive(
            contact_id=contact_id,
            file_name=data[1],
            added_by=user.id
        )
        db.session.add(archive)

    data_file = request.files['file']
    data_file_name = f'{str(contact_id)}/basic_resume/{data_file.filename}'

    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.environ['S3_KEY'],
        aws_secret_access_key=os.environ['S3_SECRET']
    )

    try:
        s3.upload_fileobj(
            data_file,
            current_app.config['S3_BUCKET'],
            data_file_name,
            ExtraArgs={
                'ContentType': data_file.content_type
            }
        )

        db.session.query(Contact).filter(Contact.id == contact_id)\
            .update({'orig_resume': data_file_name})

        db.session.commit()
        message = "Success uploading file"
        status_dict = {
            "status": 201,
            "success": True,
            "message": message,
            "contentType": 'application/json',
        }
        return jsonify(status_dict), status_dict["status"]

    except Exception as e:
        db.session.rollback()
    #     # This is a catch all exception, edit this part to fit your needs.
        print("Error uploading file: ", e)
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


@private_api.delete('/contact/resume')
@jwt_required()
def delete_resume_archive():
    request_data = json.loads(request.data)

    try:
        archive_ids = request_data['archive_ids']

        for a in archive_ids:
            db.session.query(Archive).filter(Archive.id == a['id']).delete()
            db.session.commit()

        message = "Success deleting file"
        status_dict = {
            "status": 201,
            "success": True,
            "message": message,
            "contentType": 'application/json',
        }
        return jsonify(status_dict), status_dict["status"]
    except Exception as e:
        db.session.rollback()
    #     # This is a catch all exception, edit this part to fit your needs.
        print("Error deleting file: ", e)
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
