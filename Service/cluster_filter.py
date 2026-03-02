from models import Contact, db
from sqlalchemy.sql import case, label


def create_cluster_filter(cluster_list, query):
    subq = contact_subquery()
    columns = []

    if "Main APAC Locations" in cluster_list:
        columns.append(
            subq.c.location_cluster == "Main APAC Locations"
        )
    if "Main Industries" in cluster_list:
        columns.append(
            subq.c.industry_cluster == "Main Industries"
        )
    if "Direct Sales IC" in cluster_list:
        columns.append(
            subq.c.sales_cluster == "Direct Sales IC"
        )

    query = query.join(subq, Contact.id == subq.c.id)\
        .filter(*columns)
        
    return query


def contact_subquery():
    subq = db.session.query(
        Contact.id,
        label('location_cluster',
              case(
                  [
                      (Contact.location.in_(
                          [
                              "Singapore", "Australia", "New Zealand", "Malaysia", "Thailand",
                              "Indonesia", "Philippines", "Vietnam", "Hong Kong", "Taiwan", "Korea", "Perth", "Canberra", "Sydney", "Melbourne", "Brisbane", "Adelaide", "Auckland"
                              # perth canberra sydney melbourne
                          ]
                      ), 'Main APAC Locations'),

                  ],
                  else_=None
              )),
        label('industry_cluster',
              case(
                  [
                      (Contact.industry.in_(
                          ["S&C", "SaaS", "Analytics", "Security",
                              "AI", "CX", "Platform", "VTS"]
                      ), 'Main Industries'),

                  ],
                  else_=None
              )),
        label('sales_cluster',
              case(
                  [
                      (Contact.position.in_(
                          ["IC", "Senior IC", "Junior IC", "GAM", "Named Accounts"]
                      ), 'Direct Sales IC'),

                  ],
                  else_=None
              )),
    )\
        .group_by(Contact.id)\
        .subquery()

    return subq
