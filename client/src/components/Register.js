import React, { Component } from "react";
import { Form, Button, Input, Icon, Message } from "semantic-ui-react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Link } from "react-router-dom";
import styles from "../CSS/register.styl";
import { registerUser } from "./helpers/requests";
import { withRouter } from "react-router";
import classNames from "classnames";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      error: false,
      errorMessage: "",
      loading: false,
      success: false
    };
  }
  registerUser = async () => {
    const { username, email, password } = this.state;
    // Set loading state
    this.setState({ loading: true });
    // Register User
    const newUser = await registerUser({
      username,
      email,
      password
    });
    // Return the error if it exist.
    if (newUser.error) {
      this.setState({
        error: true,
        loading: false,
        errorMessage: newUser.errorMessage
      });
      return;
    }
    // If Successful change the state to success
    this.setState({
      success: true,
      loading: false
    });
    // Undo it after 7 seconds
    setTimeout(() => {
      this.setState({
        success: false
      });
    }, 7000);
    this.props.history.push("/login");
  };
  changeInput = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { error, success, loading } = this.state;
    return (
      <Grid>
        <Row center="xs">
          <Col xs={12} lg={7}>
            {error ? (
              <Message attached="top" icon error>
                <Icon name="exclamation" iconposition="left" />
                <Message.Header>{this.state.errorMessage}</Message.Header>
              </Message>
            ) : null}
            {success ? (
              <Message attached="top" icon success>
                <Icon name="check" iconposition="left" />
                <Message.Header>
                  Registered Successfully. Go to the login page to login.
                </Message.Header>
              </Message>
            ) : null}
            <Form className={styles["form-main"]}>
              <h1 className={styles["form-title"]}>Register</h1>
              <div />
              <Form.Field>
                <label htmlFor="Email" className={styles["form-label"]}>
                  Username
                </label>
                <Input icon iconPosition="left" size="big">
                  <input
                    type="text"
                    placeholder="username"
                    name="username"
                    onChange={this.changeInput}
                    className={classNames({ [styles["errorInput"]]: error })}
                  />
                  <Icon name="user" />
                </Input>
              </Form.Field>
              <Form.Field>
                <label htmlFor="Email" className={styles["form-label"]}>
                  Email
                </label>
                <Input icon iconPosition="left" size="big">
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    autoComplete="email"
                    onChange={this.changeInput}
                    className={classNames({ [styles["errorInput"]]: error })}
                  />
                  <Icon name="at" />
                </Input>
              </Form.Field>
              <Form.Field>
                <label htmlFor="Email" className={styles["form-label"]}>
                  Password
                </label>
                <Input size="big" icon iconPosition="left">
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={this.changeInput}
                    className={classNames({ [styles["errorInput"]]: error })}
                  />
                  <Icon name="key" />
                </Input>
              </Form.Field>
              <div className={styles["form-btn-wrap"]}>
                <Button.Group fluid>
                  <Button
                    color="violet"
                    inverted
                    content="Register"
                    className="opacity-hover"
                    onClick={() => this.registerUser()}
                    loading={loading}
                  />
                  <Button.Or />
                  <Link
                    to="/login"
                    className="ui button purple"
                    style={{ textDecoration: "none", color: "#FFF" }}
                  >
                    Login
                  </Link>
                </Button.Group>
              </div>
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default withRouter(Register);
