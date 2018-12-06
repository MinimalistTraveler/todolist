import React from "react";
import PropTypes from "prop-types";
import { Message, Icon } from "semantic-ui-react";
function MessageBox({ color, message, icon }) {
  return (
    <Message color={color} icon>
      <Icon name={icon} iconposition="left" />
      <Message.Header>{message}</Message.Header>
    </Message>
  );
}

MessageBox.propTypes = {
  color: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  secondText: PropTypes.string
};

export default MessageBox;
