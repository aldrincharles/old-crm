from api.Private_API import private_api
from flask import jsonify, request
from flask_jwt_extended import jwt_required

from .tasks import iv_notes_task


@private_api.post('/contacts/analytics/iv-notes')
@jwt_required()
def iv_notes():
    result = iv_notes_task.apply_async(args=[request.args])
    return {'task_id': result.id}


@private_api.get('/contacts/analytics/iv-notes/<task_id>')
@jwt_required()
def iv_notes_status(task_id):
    result = iv_notes_task.AsyncResult(task_id)
    if result.state == 'PENDING':
        status_dict = {
            "status": 202,
            "status_state": result.state,
            "success": True,
            "message": '',
            "contentType": 'application/json',
            "content": {}
        }
    elif result.state == 'SUCCESS':
        status_dict = {
            "status": 200,
            "status_state": result.state,
            "success": True,
            "message": '',
            "contentType": 'application/json',
            "content": result.get()
        }
    else:
        status_dict = {
            "status": 400,
            "status_state": result.state,
            "success": False,
            "message": '',
            "contentType": 'application/json',
            "content": {}
        }
    return jsonify(status_dict), status_dict["status"]
