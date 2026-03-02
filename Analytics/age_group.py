from api.Private_API import private_api
from flask import jsonify, request
from flask_jwt_extended import jwt_required

from .tasks import age_group_task


@private_api.post('/contacts/analytics/age-group')
@jwt_required()
def age_group():
    result = age_group_task.apply_async(args=[request.args])
    return {'task_id': result.id}


@private_api.get('/contacts/analytics/age-group/<task_id>')
@jwt_required()
def age_group_status(task_id):
    result = age_group_task.AsyncResult(task_id)
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
