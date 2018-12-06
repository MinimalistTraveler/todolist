// Dependants
import React, { Component } from "react";
import Proptypes from "prop-types";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Form, Input, Button, Icon, Modal, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { updateUser, deleteUser } from "./helpers/requests";
import { withRouter } from "react-router";
import MessageBox from "./partials/MessageBox";
import { Message } from "semantic-ui-react";
// CSS
import styles from "../CSS/settings.styl";

class Settings extends Component {
  static propTypes = {
    changeLogin: Proptypes.func.isRequired
  };
  constructor() {
    super();
    this.state = {
      loadWhich: "",
      username: "",
      email: "",
      password: "",
      cpass: "",
      error: false,
      modalOpen: false,
      success: false,
      message: ""
    };
  }
  changeLoading = e => {
    console.log("Loading");
  };
  changeInput = e => this.setState({ [e.target.name]: e.target.value });
  editUser = async e => {
    const target = e.target.dataset.name;
    console.log(target);
    this.setState({ loadWhich: target });
    const { username, email, password, cpass } = this.state;
    if (target === "password") {
      if (password !== cpass) {
        return this.setState({
          error: true,
          loadWhich: "",
          message: "Password doesn't match. Please try again."
        });
      }
    }
    // Send an update request to update the user.
    const editUser = await updateUser({
      username: target === "username" ? username : undefined,
      email: target === "email" ? email : undefined,
      password: target === "password" ? password : undefined
    });
    if (editUser.logout) {
      this.props.changeLogin();
      return this.props.history.push("/");
    }
    if (editUser.error) {
      return this.setState({
        error: true,
        loadWhich: "",
        message: editUser.errorMessage
      });
    }
    document.querySelector(`input[name='${target}'`).value = "";
    setTimeout(() => {
      this.setState({
        success: false
      });
    }, 7000);
    return this.setState({
      error: false,
      success: true,
      loadWhich: "",
      message: "Changes added successfully"
    });
  };
  toggleBox = () => {
    const { error, message, success } = this.state;
    if (error) {
      return <MessageBox color="red" icon="exclamation" message={message} />;
    } else if (success) {
      return <MessageBox color="green" icon="check" message={message} />;
    } else {
      return null;
    }
  };
  toggleHandle = () => this.setState({ modalOpen: !this.state.modalOpen });
  deleteAccount = async () => {
    this.toggleHandle();
    const deleteAccount = await deleteUser();
    if (deleteAccount.error) {
      return this.setState({
        error: true,
        message:
          "Hmm...Having issues communicating with the server. Try again later."
      });
    }
    this.props.changeLogin();
    return this.props.history.push("/");
  };
  render() {
    const { loadWhich, modalOpen } = this.state;
    return (
      <React.Fragment>
        <span className={styles["settings-panel"]} />

        <Grid fluid>
          <Row center="xs">
            <Col xs={12} lg={7}>
              <Message
                size="mini"
                warning
                header="Caution!"
                content="Changing the email address will result in you being logged out. You will have to login with your new email address."
              />
              {this.toggleBox()}
              <Form>
                <Form.Field>
                  <label htmlFor="username" className={styles["form-label"]}>
                    Username
                  </label>
                  <Input
                    placeholder="username"
                    icon
                    iconPosition="left"
                    action
                    size="large"
                    loading={loadWhich === "username" ? true : null}
                  >
                    <input
                      type="text"
                      name="username"
                      onChange={this.changeInput}
                    />
                    <Icon name="user" />
                    <Button
                      color="purple"
                      data-name="username"
                      disabled={loadWhich !== "" ? true : null}
                      onClick={this.editUser}
                    >
                      {loadWhich === "username" ? "Saving" : "Save"}
                    </Button>
                  </Input>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="email" className={styles["form-label"]}>
                    Email
                  </label>
                  <Input
                    placeholder="email"
                    icon
                    iconPosition="left"
                    action
                    size="large"
                    loading={loadWhich === "email" ? true : null}
                  >
                    <Icon name="at" />
                    <input
                      type="email"
                      name="email"
                      onChange={this.changeInput}
                    />
                    <Button
                      onClick={this.editUser}
                      color="purple"
                      data-name="email"
                      disabled={loadWhich !== "" ? true : null}
                    >
                      {loadWhich === "email" ? "Saving" : "Save"}
                    </Button>
                  </Input>
                </Form.Field>

                <Form.Field>
                  <label htmlFor="email" className={styles["form-label"]}>
                    Password
                  </label>
                  <Input
                    placeholder="password"
                    icon
                    iconPosition="left"
                    action
                    loading={loadWhich === "password" ? true : null}
                    size="large"
                  >
                    <Icon name="key" />
                    <input
                      type="password"
                      name="password"
                      onChange={this.changeInput}
                    />
                  </Input>
                </Form.Field>
                <Form.Field>
                  <Input
                    placeholder="confirm password"
                    icon
                    iconPosition="left"
                    action
                    loading={loadWhich === "password" ? true : false}
                    size="medium"
                  >
                    <Icon name="check" />
                    <input
                      type="password"
                      name="cpass"
                      onChange={this.changeInput}
                    />
                    <Button
                      onClick={this.editUser}
                      color="purple"
                      data-name="password"
                      disabled={loadWhich !== "" ? true : null}
                    >
                      {loadWhich === "password" ? "Saving" : "Save"}
                    </Button>
                  </Input>
                </Form.Field>
              </Form>
              <Message
                size="small"
                error
                header="WARNING:"
                content="This will erase everything. Including your account. Proceed with caution."
              />
              <Form>
                <Form.Field>
                  <Button
                    color="red"
                    content="Delete Account"
                    onClick={this.toggleHandle}
                  />
                </Form.Field>
              </Form>
              <Link
                className="ui button violet inverted fluid"
                style={{ margin: "40px auto" }}
                to="/profile"
              >
                Go Back
              </Link>
            </Col>
          </Row>
        </Grid>
        <Modal
          open={modalOpen}
          onClose={this.toggleHandle}
          basic
          size="large"
          closeIcon
        >
          <Header icon="warning sign" content="Warning!" size="huge" />
          <Modal.Content>
            <p>
              This will delete your account! This action cannot be reversed. Are
              you certain about this?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button color="blue" onClick={this.toggleHandle}>
              <Icon name="remove" /> No! I change my mind!
            </Button>
            <Button color="red" inverted onClick={this.deleteAccount}>
              <Icon name="checkmark" /> Yes! Certain.
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}
export default withRouter(Settings);
