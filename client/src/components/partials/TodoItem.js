import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";
import classNames from "classnames";
import styles from "../../CSS/todolist.styl";
function TodoItem({ todo, checkTodoItem, deleteTodoItem }) {
  return (
    <List.Item key={todo.id} className={styles["list"]}>
      <List.Icon
        name="close"
        size="large"
        verticalAlign="middle"
        className={styles["list-icon__close"]}
        onClick={() => deleteTodoItem(todo.id)}
      />
      <List.Icon
        name={todo.checked ? "check circle" : "circle outline"}
        size="large"
        verticalAlign="middle"
        className={styles["list-icon"]}
        onClick={() => checkTodoItem(todo.id, todo.checked)}
      />

      <List.Content>
        <List.Header>
          <h1
            className={classNames({
              [styles["todo-title"]]: true,
              [styles["todo-cross"]]: todo.checked
            })}
          >
            {todo.item}
          </h1>
        </List.Header>
      </List.Content>
    </List.Item>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  checkTodoItem: PropTypes.func.isRequired,
  deleteTodoItem: PropTypes.func.isRequired
};

export default TodoItem;
