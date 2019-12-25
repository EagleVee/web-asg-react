import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "../Components/Container";
import history from "../Navigation/History";
import { Route, Router, Switch, Redirect } from "react-router-dom";

import StartupActions from "../Redux/StartupActions";

import NotFoundPage from "./NotFoundPage";
import LoginPage from "./LoginPage";
import ClassPage from "./ClassPage";
import PrivateRoute from "../Navigation/PrivateRoute";
import LoadingIndicator from "../Components/LoadingIndicator";
import ClassDetailPage from "./ClassDetailPage";

class RootContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    console.log(isAuthenticated);
    return !this.state.isLoading ? (
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
              path="/class"
              component={ClassPage}
              isAuthenticated={isAuthenticated}
            />
            <PrivateRoute
              exact
              path="/class/:id"
              component={ClassDetailPage}
              isAuthenticated={isAuthenticated}
            />
          </Container>
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    ) : (
      <LoadingIndicator />
    );
  }

  componentDidMount() {
    this.props.startup(this.startupDone);
  }

  startupDone = () => {
    this.setState({
      isLoading: false
    });
  };
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  startup: callback => dispatch(StartupActions.startup(callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
