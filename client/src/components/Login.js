// React Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Form, Button, Message, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import Media from "react-media";
import classNames from "classnames";
import { loginUser } from "./helpers/requests";
// CSS
import styles from "../CSS/login.styl";

class Login extends Component {
  static propTypes = {
    changeLogin: PropTypes.func.isRequired
  };
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      error: false,
      errorMessage: ""
    };
  }

  changeInput = e => this.setState({ [e.target.name]: e.target.value });
  loginUser = async () => {
    const { email, password } = this.state;
    this.setState({ loading: true });
    const login = await loginUser({
      email,
      password
    });
    if (login.error) {
      return this.setState({
        error: true,
        loading: false,
        errorMessage: login.errorMessage
      });
    }
    this.setState({ loading: false });
    this.props.history.push("/profile");
    this.props.changeLogin();
    return;
  };
  render() {
    const { error, loading, errorMessage } = this.state;
    return (
      <Grid fluid>
        <Row>
          <Col lg={6} xs={12}>
            {error ? (
              <Message attached="top" icon error className={styles["w50"]}>
                <Icon name="exclamation" size="large" iconposition="left" />
                <Message.Header>{errorMessage}</Message.Header>
              </Message>
            ) : null}
            <Form className={styles["login-form"]}>
              <h1 className={styles["form-title"]}>Login</h1>
              <Form.Field>
                <label className={styles["input-label"]} htmlFor="email">
                  Email
                </label>
                <input
                  name="email"
                  placeholder="email"
                  onChange={this.changeInput}
                  className={classNames({
                    [styles["form-input"]]: true,
                    [styles["errorInput"]]: error
                  })}
                />
              </Form.Field>
              <Form.Field>
                <label className={styles["input-label"]} htmlFor="password">
                  Password
                </label>
                <input
                  name="password"
                  placeholder="password"
                  onChange={this.changeInput}
                  className={classNames({
                    [styles["form-input"]]: true,
                    [styles["errorInput"]]: error
                  })}
                />
              </Form.Field>
              <div className={styles["form-btn-wrap"]}>
                <Button
                  className={styles["form-btn"]}
                  color="violet"
                  inverted
                  content="Sign In"
                  onClick={this.loginUser}
                  loading={loading}
                />
                <span> OR </span>
                <Link to="/register" className="ui button purple" role="button">
                  Register
                </Link>
              </div>
            </Form>
          </Col>
          <Media
            query={{ minWidth: 992 }}
            render={() => (
              <Col lg={6} xs={12}>
                <div className={styles["banner"]} role="banner">
                  <h1>Start your todo list today!</h1>
                </div>
              </Col>
            )}
          />
        </Row>
      </Grid>
    );
  }
}

export default withRouter(Login);
