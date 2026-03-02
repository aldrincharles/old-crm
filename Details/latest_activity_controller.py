from api.Private_API import private_api
from flask_jwt_extended import jwt_required
from flask.json import jsonify
from models import Contact

api = '/contact/<contact_id>/latest-activity'

@private_api.get(api)
@jwt_required()
def latest_activity(contact_id):
    contact = Contact.query.filter(Contact.id == contact_id).first()
    contact_analytics = []
    for a in contact.analytics:
        contact_analytics.append({
            "action": a.action,
            "job": a.job,
            "date": a.date_of_action,
            "done_by": a.done_by
        })

    message = "Success getting latest activities."
    status_dict = {
        "status": 200,
        "success": True,
        "message": message,
        "contentType": 'application/json',
        "content": contact_analytics
    }
    return jsonify(status_dict), status_dict["status"]
