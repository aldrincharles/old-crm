from api.Private_API import private_api
from flask_jwt_extended import jwt_required
from flask.json import jsonify
from models import Job, Sourcing, Organization, db
from constants import Verification_Grading_String

verification_grading_string = Verification_Grading_String()

api = '/contact/<contact_id>/jobs-exported'

@private_api.get(api)
@jwt_required()
def jobs_exported(contact_id):
    
    jobs_export = []
    for j, s, o in db.session.query(Job, Sourcing, Organization).filter(
        Sourcing.contact_id == contact_id,
        Job.id == Sourcing.job_id,
        Organization.id == Job.organization_id
    ).all():
        jobs_export.append({
            'job': j.name,
            'client': o.name,
            'position': j.activation_document.title,
            'location': j.activation_document.location,
            'verified_grade': verification_grading_string[s.verification_grade-1] if s.verification_grade is not None else "none",
        })

    message = "Success getting jobs list."
    status_dict = {
        "status": 200,
        "success": True,
        "message": message,
        "contentType": 'application/json',
        "content": jobs_export
    }
    return jsonify(status_dict), status_dict["status"]
