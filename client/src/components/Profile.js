// Dependants
import React, { Component } from "react";
import { Grid, Col, Row } from "react-flexbox-grid";
import { Icon, Segment, Dimmer, Image, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import _ from "lodash";
// CSS
import styles from "../CSS/profile.styl";
// Requests
import { getUser, getAllTodoList } from "./helpers/requests";
import MessageBox from "./partials/MessageBox";
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      numberOfLists: 0,
      recentTodoLists: []
    };
  }
  async componentWillMount() {
    const User = await getUser();
    const todoList = await getAllTodoList();
    if (User.logout) {
      return this.props.logout();
    }
    return this.setState({
      user: User.results,
      numberOfLists: todoList.length,
      recentTodoLists: _.takeRight(todoList, 3)
    });
  }
  changeDelete = () => {
    this.setState({ deleteClicked: !this.state.deleteClicked });
  };
  renderRecent = () => {
    const { recentTodoLists } = this.state;
    if (recentTodoLists.length !== 0) {
      return recentTodoLists.map(todoList => (
        <Link
          to={`/list?id=${todoList.id}`}
          key={todoList.id}
          className={styles["todo-item"]}
        >
          <li>{todoList.item}</li>
        </Link>
      ));
    } else {
      return (
        <MessageBox
          icon="info circle"
          color="blue"
          message="There are no lists."
        />
      );
    }
  };
  render() {
    const { user, numberOfLists } = this.state;
    return user !== null ? (
      <Grid>
        <Row center="xs">
          <Col xs={12} lg={9}>
            <div className={styles["profile-banner"]}>
              <div className={styles["profile-title"]}>
                <ul className={styles["profile-info"]}>
                  <li> {user.username}</li>
                  <li>{user.email}</li>
                </ul>
                <ul className={styles["profile-status"]}>
                  <li>
                    <span> {numberOfLists} </span>Todo Lists
                  </li>
                </ul>
                <Link to="/profile/settings">
                  <Icon
                    link
                    name="setting"
                    style={{ fontSize: "2em", color: "#FFF" }}
                  />
                </Link>
              </div>
            </div>
            <h1>My Recent Lists</h1>
            <ul className={styles["todo-list"]}>{this.renderRecent()}</ul>
          </Col>
        </Row>
      </Grid>
    ) : (
      <Segment>
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
        <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
      </Segment>
    );
  }
}

export default Profile;
