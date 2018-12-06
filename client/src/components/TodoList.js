// Dependants
import React, { Component } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import Media from "react-media";
import { List, Form, Input, Button } from "semantic-ui-react";
import _ from "lodash";
import moment from "moment";
import { Grid, Col, Row } from "react-flexbox-grid";
import MessageBox from "./partials/MessageBox";
// Requests
import {
  getTodoItems,
  getTodoList,
  addTodoItem,
  editTodoItem,
  deleteTodoItem
} from "./helpers/requests";
// Partials
import TodoItem from "./partials/TodoItem";
// CSS
import styles from "../CSS/todolist.styl";
class TodoList extends Component {
  static propTypes = {
    changeLogin: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      todoList: [],
      todoListName: null,
      todoListDate: null,
      itemError: false,
      titleError: false,
      message: "",
      item: "",
      success: false,
      listid: ""
    };
  }
  async componentWillMount() {
    const id = queryString.parse(this.props.location.search);

    // Get Todo List and Todo Items by id.
    const todoList = await getTodoList(id);
    const todoItems = await getTodoItems(id);
    if (todoList.logout || todoItems.logout) {
      return this.props.changeLogin();
    }
    // If there is an error return it.
    if (todoList.error || todoItems.error) {
      return this.setState({
        titleError: true,
        message: "Unable to load the todo list. Try again later."
      });
    }

    return this.setState({
      listid: id.id,
      todoListName: todoList.item,
      todoListDate: todoList.datecreated,
      todoList: _.orderBy(todoItems, ["item"], ["asc"])
    });
  }
  renderTodoListName = todoListName => {
    return todoListName !== null ? (
      <div>
        <h1 className={styles["list-title"]}>{todoListName}</h1>
      </div>
    ) : (
      <React.Fragment>
        <h1>Loading...</h1>
      </React.Fragment>
    );
  };
  addItem = async () => {
    const { item, listid, todoList } = this.state;
    // Add item to the todo list back end
    const addItem = await addTodoItem({ item, listid });
    if (addItem.error) {
      setTimeout(() => {
        this.setState({
          itemError: false
        });
      }, 7000);
      return this.setState({
        itemError: true,
        message: addItem.errorMessage
      });
    }
    // Clear Input
    document.querySelector("input[name='item']").value = "";
    // Add Item to the todo list on front ene
    this.setState({
      success: true,
      todoList: todoList.concat(addItem)
    });
    // Clear todo list input
    return setTimeout(() => {
      this.setState({
        success: false
      });
    }, 7000);
  };
  changeInput = e => {
    return this.setState({
      [e.target.name]: e.target.value
    });
  };
  checkTodoItem = async (id, checked) => {
    const { listid } = this.state;
    // Add checked to the todo list.
    const checkTodoItem = await editTodoItem({ id, checked: !checked });
    // Update Todo List (To rerender)
    const todoItems = await getTodoItems({ id: listid });
    if (checkTodoItem.error) {
      return this.setState({
        itemError: true,
        message: "Something went wrong. Try again later."
      });
    }
    return this.setState({
      todoList: _.orderBy(todoItems, ["item"], ["asc"])
    });
  };
  deleteTodo = async id => {
    const { listid } = this.state;
    const deleteItem = await deleteTodoItem(id);
    // Update Todo List (To rerender)
    const todoItems = await getTodoItems({ id: listid });
    if (deleteItem.error || todoItems.error) {
      this.setState({
        itemError: true,
        message: "Cannot delete todo item right now. Try again later."
      });
      return setTimeout(() => {
        this.setState({
          itemError: false
        });
      }, 7000);
    }
    this.setState({
      success: true,
      todoList: _.orderBy(todoItems, ["item"], ["asc"]),
      message: "Item Deleted Successfully"
    });
    return setTimeout(() => {
      this.setState({
        success: false
      });
    }, 7000);
  };
  renderTodoItems = todoList => {
    // Render Todo Items
    return todoList.length !== 0 ? (
      todoList.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          checkTodoItem={this.checkTodoItem}
          deleteTodoItem={this.deleteTodo}
        />
      ))
    ) : (
      <MessageBox
        icon="info"
        color="blue"
        message="Nothing here yet. Time to add something to do."
      />
    );
  };
  render() {
    const {
      todoList,
      todoListDate,
      todoListName,
      titleError,
      itemError,
      message,
      success
    } = this.state;
    return (
      <Grid>
        <Row center="xs">
          <Col xs={12}>
            {titleError ? (
              <MessageBox icon="exclamation" color="red" message={message} />
            ) : (
              <React.Fragment>
                <h1 className={styles["todolist-title"]}>
                  {this.renderTodoListName(todoListName)}
                  <span>{moment(todoListDate).format("dddd, MM-DD-YYYY")}</span>
                </h1>
                <List divided>{this.renderTodoItems(todoList)}</List>
              </React.Fragment>
            )}
          </Col>
          {!titleError ? (
            <Col xs={12} lg={8}>
              {success ? (
                <MessageBox icon="checkmark" color="green" message={message} />
              ) : null}
              {itemError ? (
                <MessageBox icon="exclamation" color="red" message={message} />
              ) : null}

              <Form
                style={{ padding: "20px", background: "#FFF", margin: "20px" }}
              >
                <h1 className={styles["form-header"]}>
                  What is on your todo list?
                </h1>
                <Form.Field>
                  <Input
                    placeholder="Item List"
                    name="item"
                    maxLength="100"
                    onChange={this.changeInput}
                  />
                </Form.Field>
                <Media query="(max-width: 768px)">
                  {matches =>
                    matches ? (
                      <Button
                        content="Submit"
                        fluid
                        color="purple"
                        inverted
                        onClick={this.addItem}
                      />
                    ) : (
                      <Button
                        content="Submit"
                        color="purple"
                        style={{
                          display: "block",
                          margin: "40px auto",
                          width: "50%"
                        }}
                        onClick={this.addItem}
                      />
                    )
                  }
                </Media>
              </Form>
            </Col>
          ) : null}
        </Row>
      </Grid>
    );
  }
}

export default TodoList;
