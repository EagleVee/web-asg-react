import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "../Components/Container";
import history from "../Navigation/History";
import { Route, Router, Switch, Redirect } from "react-router-dom";

import StartupActions from "../Redux/StartupActions";

import NotFoundPage from "./NotFoundPage";
import LoginPage from "./LoginPage";
import SubjectList from "./SubjectList";
import PrivateRoute from "../Navigation/PrivateRoute";

class RootContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={props => {
              return <Redirect to="/login" />;
            }}
          />
          <Route exact path="/login" component={LoginPage} />
          <Container>
            <PrivateRoute
              exact
              path="/message"
              component={SubjectList}
              isAuthenticated={isAuthenticated}
            />
          </Container>
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }

  componentDidMount() {
    this.props.startup();
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup())
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
