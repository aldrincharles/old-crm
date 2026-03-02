/* eslint-disable react/display-name */
import React from "react";
import PropTypes from "prop-types";

export const IconButton = React.memo(
  ({ style, className, onClick = () => {}, children }) => {
    return (
      <i style={style} className={className} onClick={onClick}>
        {children}
      </i>
    );
  }
);

IconButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export const IconLinkButton = React.memo((props) => {
  return (
    <a href={props.href} target={props.target} rel={props.rel}>
      <i style={props.style} className={props.className}></i>
    </a>
  );
});

IconLinkButton.propTypes = {
  href: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  className: PropTypes.string,
};
