from api.Private_API import private_api
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask.json import jsonify, request
from models import LongTermComment, db, User
from flask import json
from datetime import datetime
from api.Private_API.handlers import contact_update

api = '/contact/<contact_id>/comments'


@private_api.get(api)
@jwt_required()
def get_comments(contact_id):
    #contact = Contact.query.filter(Contact.id == contact_id).firs()
    comments_query = LongTermComment.query.filter(
        LongTermComment.contact_id == contact_id).all()
    comments = []
    for c in comments_query:
        comments.append({
            'comment_id': c.id,
            'date': c.datetime,
            'comment': c.comment,
            'author': c.author.first_name
        })

    message = "Success getting comments list."
    status_dict = {
        "status": 200,
        "success": True,
        "message": message,
        "contentType": 'application/json',
        "content": comments
    }
    return jsonify(status_dict), status_dict["status"]


@private_api.post(api)
@contact_update
@jwt_required()
def contact_add_comment(contact_id):
    request_data = json.loads(request.data)
    # print(request_data)
    try:
        user = User.query.filter_by(id=get_jwt_identity()).first()
        data = LongTermComment(
            contact_id=contact_id,
            author_id=user.id,
            comment=request_data['comment'],
            datetime=datetime.today(),
            source="Contacts"
        )
        db.session.add(data)
        db.session.commit()

        message = "Success adding comment"
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


@private_api.delete('/contact/comments')
@jwt_required()
def delete_comment():
    request_data = json.loads(request.data)

    try:
        comments_id_list = request_data['comment_ids']

        for c in comments_id_list:
            db.session.query(LongTermComment).filter(
                LongTermComment.id == c['id']).delete()
            db.session.commit()
        message = "Success deleting comment"
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
