from celery_worker import celery

from ..common.filter_config import filter_config

@celery.task(bind=True)
def contact_list_task(self, args):
    candidates = filter_config(args).all()
    
    headers = [
        {'label': "Age/Year", 'key': "age_year"},
        {
            'label': "Month Started on Current Company",
            'key': "month_started_company",
        },
        {
            'label': "Year Started on Current Company",
            'key': "year_started_company",
        },
        {'label': "Month Started on Current Role", 'key': "month_started_role"},
        {'label': "Year Started on Current Role", 'key': "year_started_role"},
        {'label': "Internal Grading", 'key': "internal_grading"},
        {'label': "LinkedIn URL", 'key': "linkedin"},
        {'label': "Organization", 'key': "organization"},
        {'label': "Name", 'key': "name"},
        {'label': "Gender", 'key': "gender"},
        {'label': "Nationality", 'key': "nationality"},
        {'label': "Job Title", 'key': "job_title"},
        {'label': "Industry", 'key': "industry"},
        {'label': "Vertical", 'key': "vertical"},
        {'label': "Seniority", 'key': "seniority"},
        {'label': "Position", 'key': "position"},
        {'label': "Location", 'key': "location"},
        {'label': "ID Status", 'key': "id_status"},
        {'label': "Geography", 'key': "geography"},
        {'label': "Company E-mail", 'key': "company_email"},
        {'label': "Personal E-mail", 'key': "personal_email"},
        {'label': "Phone", 'key': "phone"},
        {'label': "FSI", 'key': "fsi"},
        {'label': "Gov General", 'key': "gov_general"},
        {'label': "Gov Defense", 'key': "gov_defense"},
        {'label': "Gov Education", 'key': "gov_education"},
        {'label': "Gov Health", 'key': "gov_health"},
        {'label': "Telco", 'key': "telco"},
        {'label': "Retail", 'key': "retail"},
        {'label': "Construction", 'key': "construction"},
        {'label': "Hightech", 'key': "hightech"},
        {'label': "Hospitality", 'key': "hospitality"},
        {'label': "Travel", 'key': "travel"},
        {'label': "Media", 'key': "media"},
        {'label': "Mobility", 'key': "mobility"},
        {'label': "OEM", 'key': "oem"},
        {'label': "Petrochemical", 'key': "petrochemical"},
        {'label': "Utilities", 'key': "utilities"},
        {'label': "Pharmaceutical", 'key': "pharmaceutical"},
        {'label': "Automobile", 'key': "automobile"},
        {'label': "Aerospace", 'key': "aerospace"},
        {'label': "Mining", 'key': "mining"},
        {'label': "GSI", 'key': "gsi"},
        {'label': "Big 6", 'key': "big_6"},
        {'label': "ISV", 'key': "isv"},
        {'label': "Distributors", 'key': "distributors"},
        {'label': "Alliance", 'key': "alliance"},
        {'label': "MSP", 'key': "msp"},
    ]

    output = []
    for i, row in enumerate(candidates):
        specialization_list = check_sp(row)
        output.append(
            {
                "age_year": row.year_graduated,
                'month_started_company': row.time_frame_company.strftime('%B'),
                'year_started_company': row.time_frame_company.strftime('%Y'),
                'month_started_role': row.time_frame.strftime('%B'),
                'year_started_role': row.time_frame.strftime('%Y'),
                'internal_grading': row.internal_grading,
                "linkedin": row.linked_in,
                'organization': row.organization.name,
                'name': row.name,
                'gender': row.gender,
                'nationality': row.nationality,
                'job_title': row.job_title,
                'industry': row.industry,
                'vertical': row.vertical,
                'seniority': row.seniority,
                'position': row.position,
                'id_status': row.id_status,
                'location': row.location,
                'geography': row.geography,
                'company_email': row.work_email,
                'personal_email': row.personal_email,
                'phone': row.mobile_number,
                'fsi': "Y" if "fsi" in specialization_list else "",
                'gov_general': "Y" if "Gov General" in specialization_list else "",
                'gov_defense': "Y" if "Gov Defense" in specialization_list else "",
                'gov_education': "Y" if "Gov Education" in specialization_list else "",
                'gov_health': "Y" if "Gov Health" in specialization_list else "",
                'telco': "Y" if "Telco" in specialization_list else "",
                'commercial': "Y" if "Commercial" in specialization_list else "",
                'retail': "Y" if "Retail" in specialization_list else "",
                'construction': "Y" if "Construction" in specialization_list else "",
                'hightech': "Y" if "Hightech" in specialization_list else "",
                'hospitality': "Y" if "Hospitality" in specialization_list else "",
                'travel': "Y" if "Travel" in specialization_list else "",
                'manufacturing': "Y" if "Manufacturing" in specialization_list else "",
                'media': "Y" if "Media" in specialization_list else "",
                'mobility': "Y" if "Mobility" in specialization_list else "",
                'oem': "Y" if "OEM" in specialization_list else "",
                'petrochemical': "Y" if "Petrochemical" in specialization_list else "",
                'utilities': "Y" if "Utilities" in specialization_list else "",
                'pharmaceutical': "Y" if "Pharmaceutical" in specialization_list else "",
                'automobile': "Y" if "Automobile" in specialization_list else "",
                'aerospace': "Y" if "Aerospace" in specialization_list else "",
                'mining': "Y" if "Mining" in specialization_list else "",
                'gsi': "Y" if "GSI" in specialization_list else "",
                'big_6': "Y" if "Big 6" in specialization_list else "",
                'isv': "Y" if "ISV" in specialization_list else "",
                'distributors': "Y" if "Distributors" in specialization_list else "",
                'alliance': "Y" if "Alliance" in specialization_list else "",
                'msp': "Y" if "MSP" in specialization_list else "",
            }
        )
        
        self.update_state(
            state='PROGRESS',
            meta={
                'current': i,
                'total': len(candidates),
            }
        )

    return {
        "row": output,
        "headers": headers
    }


def check_sp(contact):
    specialization_list = [s.name for s in contact.sales_specializations]
    return specialization_list
