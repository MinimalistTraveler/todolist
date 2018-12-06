import React, { Component } from "react";
import Proptypes from "prop-types";
import { Icon, Input, Button } from "semantic-ui-react";
import styles from "../../CSS/lists.styl";
import { Link } from "react-router-dom";

// Inline styles
const linkStyle = {
  color: "#FFF",
  flexBasis: "10%"
};
const inputStyle = {
  borderRadius: "0px !important",
  flexBasis: "100%"
};
// Class Component
class ListItem extends Component {
  static propTypes = {
    todo: Proptypes.object.isRequired,
    selectDeleteTarget: Proptypes.func.isRequired,
    toggleEditTarget: Proptypes.func.isRequired,
    editTarget: Proptypes.func.isRequired,
    editId: Proptypes.string.isRequired
  };
  constructor() {
    super();
    this.state = {
      editInput: ""
    };
  }

  changeInput = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    const {
      todo,
      selectDeleteTarget,
      toggleEditTarget,
      editId,
      editTarget
    } = this.props;
    const { editInput } = this.state;
    return (
      <div className={styles["todo-card"]}>
        <h1 className={styles["todo-title"]}>{todo.item}</h1>
        {editId !== todo.id ? (
          <div className={styles["button-wrap"]}>
            <Link to={`/list?id=${todo.id}`} style={linkStyle}>
              <span>
                <Icon name="reply" />
              </span>
            </Link>
            <span onClick={() => selectDeleteTarget(todo.id)}>
              <Icon name="close" />
            </span>
            <span onClick={() => toggleEditTarget(todo.id)}>
              <Icon name="pencil" />
            </span>
          </div>
        ) : (
          <div className={styles["edit-input"]}>
            <h3>Change {`'${todo.item}'`} to...</h3>
            <Input action fluid>
              <input
                type="text"
                style={inputStyle}
                name="editInput"
                onChange={this.changeInput}
              />
              <Button
                color="violet"
                onClick={() => editTarget(todo.id, editInput)}
              >
                Save
              </Button>
              <Button color="red" basic onClick={() => toggleEditTarget("")}>
                Cancel
              </Button>
            </Input>
          </div>
        )}
      </div>
    );
  }
}

export default ListItem;
