import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";

// Styles
import "../CSS/app.styl";
// Component Routes
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Settings from "./Settings";
import Lists from "./Lists";
import TodoList from "./TodoList";
import NotFound from "./NotFound";
class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    };
  }
  componentDidMount() {
    if (localStorage.getItem("token")) {
      return this.setState({
        loggedIn: true
      });
    }
  }
  changeLogin = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    });
  };

  render() {
    const { loggedIn } = this.state;
    return (
      <React.Fragment>
        <BrowserRouter>
          <React.Fragment>
            <Navbar loggedIn={loggedIn} changeLogin={this.changeLogin} />
            {loggedIn ? (
              <Switch>
                <Route
                  path="/profile/settings"
                  render={() => <Settings changeLogin={this.changeLogin} />}
                />
                <Route
                  exact
                  path="/profile"
                  render={() => <Profile logout={this.changeLogin} />}
                />
                <Route
                  exact
                  path="/profile/lists"
                  render={() => <Lists changeLogin={this.changeLogin} />}
                />
                <Route
                  path="/list"
                  render={props => (
                    <TodoList {...props} changeLogin={this.changeLogin} />
                  )}
                />
                <Redirect to="/profile" />
              </Switch>
            ) : (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route
                  path="/login"
                  render={() => <Login changeLogin={this.changeLogin} />}
                />
                <Route path="/register" component={Register} />
                <Route component={NotFound} />
              </Switch>
            )}
          </React.Fragment>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}
export default App;
