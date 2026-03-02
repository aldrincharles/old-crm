import "./ContactCards.css";
import React from "react";

import { motion } from "framer-motion";
import { Card, CardBody, Badge } from "reactstrap";

import { ContactInformation } from "../../Contact_Information/ContactInformation";

export const ContactCards = ({ data }) => {
  const renderCard = (card, index) => {
    return (
      <motion.div key={index} whileHover={{ scale: 1.1 }}>
        <Card
          style={{ width: "18rem" }}
          className="shadow-sm p-3 mb-5 bg-white rounded box"
        >
          <CardBody style={{ textAlign: "left" }}>
            <Badge color="primary">{card?.location}</Badge>
            <div style={{ textAlign: "center" }}>
              <h4>{card?.name}</h4>
              <h5>{card?.position}</h5>
              <ContactInformation
                modal_contact_id={card?.contact_id}
                shortcut_linked_in={card?.linked_in}
              />
            </div>
          </CardBody>
        </Card>
      </motion.div>
    );
  };

  return (
    <>
      <div className="grid">{data.length > 0 && data.map(renderCard)}</div>
    </>
  );
};
