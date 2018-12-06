import React, { Component } from "react";
import PropTypes from "prop-types";
// CSS
import styles from "../CSS/navbar.styl";
// Dependents
import Ripples from "react-ripples";
import Media from "react-media";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    changeLogin: PropTypes.func.isRequired
  };
  state = {
    collapse: false
  };
  toggleCollapse = () => {
    this.setState({ collapse: !this.state.collapse });
  };
  logout = () => {
    if (this.state.collapse) {
      this.setState({ collapse: false });
    }
    localStorage.removeItem("token");
    this.props.changeLogin();
    return this.props.history.push("/");
  };
  render() {
    return (
      <React.Fragment>
        <div className={styles.navbar}>
          <div className={styles.navbarContainer}>
            <Media
              query={{ maxWidth: 768 }}
              render={() => (
                <Ripples
                  className={styles.navbarCollapse}
                  color={"rgba(255, 255, 255, .3)"}
                  onClick={this.toggleCollapse}
                >
                  <div className={styles.collapseIconWrap}>
                    <Icon
                      name="sidebar"
                      size="large"
                      className={styles["hamburger-icon"]}
                    />
                  </div>
                </Ripples>
              )}
            />
            {!this.props.loggedIn ? (
              <Media
                query={{ minWidth: 768 }}
                render={() => (
                  <div className={styles.navbarMainCont}>
                    <Link className={styles["navbar-link"]} to="/">
                      Home
                    </Link>
                  </div>
                )}
              />
            ) : null}

            <div className={styles.navbarBrand}>
              <Link to="/" role="logo">
                TodoList
              </Link>
            </div>
            {this.props.loggedIn ? (
              <React.Fragment>
                <Media
                  query={{ minWidth: 768 }}
                  render={() => (
                    <div className={styles["navbar-tab"]}>
                      <Link
                        to="/profile"
                        className={styles["navbar-tab__link"]}
                      >
                        <Icon name="home" size="large" />
                      </Link>
                      <Link
                        to="/profile/lists"
                        className={styles["navbar-tab__link"]}
                      >
                        <Icon name="list" size="large" />
                      </Link>
                      <button
                        className={styles["navbar-tab__link"]}
                        onClick={this.logout}
                      >
                        <Icon name="sign-out" size="large" />
                      </button>
                    </div>
                  )}
                />
                <Media
                  query={{ maxWidth: 768 }}
                  render={() => (
                    <div
                      className={classNames({
                        [styles.mobileMenu]: true,
                        [styles.collapse]: this.state.collapse
                      })}
                    >
                      <Link to="/profile" onClick={this.toggleCollapse}>
                        Home
                      </Link>
                      <Link to="/profile/lists" onClick={this.toggleCollapse}>
                        My Todos
                      </Link>
                      <a onClick={this.logout}>Logout</a>
                    </div>
                  )}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Media
                  query={{ minWidth: 768 }}
                  render={() => (
                    <div className={styles.navbarLogCont}>
                      <Link to="/login" className={styles["navbar-link"]}>
                        Login
                      </Link>
                    </div>
                  )}
                />
                <Media
                  query={{ maxWidth: 768 }}
                  render={() => (
                    <div
                      className={classNames({
                        [styles.mobileMenu]: true,
                        [styles.collapse]: this.state.collapse
                      })}
                    >
                      <Link to="/" onClick={this.toggleCollapse}>
                        Home
                      </Link>
                      <Link to="/login" onClick={this.toggleCollapse}>
                        Login
                      </Link>
                    </div>
                  )}
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(Navbar);
