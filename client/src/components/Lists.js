// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Grid, Row, Col } from "react-flexbox-grid";
import {
  Form,
  Input,
  Button,
  Icon,
  Header,
  Modal,
  Card
} from "semantic-ui-react";
import Media from "react-media";
// Requests
import {
  getAllTodoList,
  addTodoList,
  editTodoList,
  deleteTodoList
} from "./helpers/requests";
// Partials
import ListItem from "./partials/ListItem";
import MessageBox from "./partials/MessageBox";
// CSS
import styles from "../CSS/lists.styl";
// Inline styles
const formStyles = {
  padding: "20px",
  margin: "20px"
};
const btnStyle = {
  display: "block",
  margin: "30px auto",
  width: "20%"
};
// Updaters
async function updateTodoList() {
  const getAllTodos = await getAllTodoList();
  if (getAllTodos.logout) {
    localStorage.removeItem("token");

    return { error: true };
  }
  return getAllTodos;
}
class Lists extends Component {
  static propTypes = {
    changeLogin: PropTypes.func.isRequired
  };
  constructor() {
    super();
    this.state = {
      todoLists: [],
      title: "",
      loading: false,
      error: false,
      errorMessage: "",
      deleteTarget: "",
      editMode: false,
      editId: "",
      modalOpen: false,
      success: false
    };
  }
  async componentWillMount() {
    const getAllTodos = await updateTodoList();
    if (getAllTodos.error) {
      this.props.changeLogin();
      return this.props.history.push("/");
    }
    return this.setState({ todoLists: getAllTodos });
  }

  changeInput = e => this.setState({ [e.target.name]: e.target.value });

  toggleHandle = () => this.setState({ modalOpen: !this.state.modalOpen });

  // Add TodoList
  addTodoList = async () => {
    const { title } = this.state;
    this.setState({ loading: true });
    const newList = await addTodoList({
      title
    });

    if (newList.error) {
      return this.setState({
        error: true,
        loading: false,
        success: false,
        errorMessage: newList.errorMessage
      });
    }
    this.setState({
      success: true,
      loading: false,
      error: false,
      errorMessage: "",
      todoLists: this.state.todoLists.concat(newList),
      title: ""
    });
    document.querySelector("input[name='title'").value = "";
    setTimeout(() => {
      this.setState({ success: false });
    }, 5000);
    return;
  };

  selectDeleteTarget = target => {
    return this.setState({
      deleteTarget: target,
      modalOpen: true
    });
  };
  toggleEditTarget = id => {
    return this.setState({
      editId: id,
      editMode: !this.state.editMode
    });
  };
  editTarget = async (id, item) => {
    // Send Edit Request.
    const editList = await editTodoList({ id, item });
    // Send A Response in the front end.
    if (editList.error) {
      return this.setState({
        error: true,
        errorMessage: "Cannot edit todo list. Try again later."
      });
    }
    // Update Todo List
    const updatedTodos = await updateTodoList();
    if (updatedTodos.error) {
      return this.props.changeLogin();
    }
    this.setState({ todoLists: updatedTodos });

    return this.toggleEditTarget("");
  };
  deleteTodoList = async () => {
    const { deleteTarget } = this.state;
    // Delete Todo List
    const deleteTodo = await deleteTodoList(deleteTarget);
    if (deleteTodo.error) {
      return this.setState({
        error: true,
        errorMessage: "Cannot delete todo list right now. Try again later."
      });
    }
    // Update Todo List
    const updatedTodos = await updateTodoList();
    if (updatedTodos.error) {
      this.props.changeLogin();
      return this.props.history.push("/");
    }
    this.setState({ todoLists: updatedTodos });

    return this.toggleHandle();
  };

  renderAllTodos = () => {
    const { todoLists, editMode, editId } = this.state;
    return todoLists.map(todo => (
      <ListItem
        key={todo.id}
        todo={todo}
        selectDeleteTarget={this.selectDeleteTarget}
        toggleEditTarget={this.toggleEditTarget}
        editMode={editMode}
        editTarget={this.editTarget}
        editId={editId}
      />
    ));
  };
  renderTodoList = () => {
    const { todoLists } = this.state;
    if (todoLists.length !== 0) {
      return this.renderAllTodos();
    } else {
      return (
        <MessageBox
          color="blue"
          message="Add your first todo list!"
          icon="info"
        />
      );
    }
  };
  render() {
    const { loading, error, errorMessage, success, modalOpen } = this.state;
    return (
      <Grid>
        <Row center="xs">
          <Col lg={9} xs={12}>
            <h1 className={styles["title"]}>My Todo Lists</h1>
            {/* Render the todo lists. */}
            <div className={styles["todo-container"]}>
              {this.renderTodoList()}
            </div>
            {error ? (
              <MessageBox
                color="red"
                icon="exclamation"
                message={errorMessage}
              />
            ) : null}
            {success ? (
              <MessageBox
                icon="checkmark"
                color="green"
                message="Todolist has been added successfully!"
              />
            ) : null}
            <Card fluid style={{ margin: "10px" }}>
              <Form style={formStyles}>
                <div className={styles["form-header"]}>
                  <h1 className={styles["title"]}>Create A Todo List</h1>
                </div>
                <Form.Field>
                  <label
                    className={styles["input-label"]}
                    htmlFor="email"
                    style={{ paddingTop: "50px" }}
                  >
                    Title
                  </label>
                  <Input
                    placeholder="Title for your new todolist."
                    maxLength="20"
                    onChange={this.changeInput}
                    size="large"
                    name="title"
                    error={error}
                  />
                </Form.Field>
                <Media query={{ maxWidth: 768 }}>
                  {matches =>
                    matches ? (
                      <Button
                        color="purple"
                        content="Submit"
                        fluid
                        onClick={this.addTodoList}
                        style={{ marginBottom: "20px" }}
                      />
                    ) : (
                      <Button
                        color="black"
                        content="Submit"
                        style={btnStyle}
                        basic
                        onClick={this.addTodoList}
                        loading={loading}
                      />
                    )
                  }
                </Media>
              </Form>
            </Card>
            <Modal
              open={modalOpen}
              onClose={this.toggleHandle}
              basic
              size="large"
              closeIcon
            >
              <Header icon="question" content="Delete A TodoList" size="huge" />
              <Modal.Content>
                <p>Are you sure? This change cannot be undone.</p>
              </Modal.Content>
              <Modal.Actions>
                <Button basic color="red" inverted onClick={this.toggleHandle}>
                  <Icon name="remove" /> No
                </Button>
                <Button color="purple" inverted onClick={this.deleteTodoList}>
                  <Icon name="checkmark" /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default withRouter(Lists);
