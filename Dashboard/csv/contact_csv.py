from api.Private_API import private_api
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import Contact, User
from flask.json import jsonify, request

from .contact_csv_task import contact_list_task


@private_api.post('/contact/export-to-csv')
@jwt_required()
def contacts_export_to_csv():
    user = User.query.filter_by(id=get_jwt_identity()).first()
    if (user.access_limit != 0):
        return {"message": "access denied"}, 403
    
    result = contact_list_task.apply_async(args=[request.args])

    return {'task_id': result.id}


@private_api.get('/contact/export-to-csv/<task_id>')
@jwt_required()
def contacts_export_to_csv_status(task_id):
    result = contact_list_task.AsyncResult(task_id)

    if result.state == 'PENDING':
        status_dict = {
            "status": 202,
            "status_state": result.state,
            "content": {
                "progress": 0,
            }
        }
    elif result.state == 'PROGRESS':
        status_dict = {
            "status": 202,
            "status_state": result.state,
            "content": {
                "progress": result.info['current'] * 1.0 / result.info['total'],
            }
        }
    elif result.state == 'SUCCESS':
        status_dict = {
            "status": 200,
            "status_state": result.state,
            "content": result.get()
        }
    else:
        status_dict = {
            "status": 500,
            "status_state": result.state,
        }

    return jsonify(status_dict), status_dict["status"]
