from api.Private_API import private_api
from flask import jsonify, request
from flask_jwt_extended import jwt_required

from .tasks import tier_chart_task


@private_api.post('/contacts/analytics/tier')
@jwt_required()
def tier_chart():
    result = tier_chart_task.apply_async(args=[request.args])
    return {'task_id': result.id}


@private_api.get('/contacts/analytics/tier/<task_id>')
@jwt_required()
def tier_chart_status(task_id):
    result = tier_chart_task.AsyncResult(task_id)
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
