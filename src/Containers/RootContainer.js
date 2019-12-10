import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "../Components/Container";
import history from "../Navigation/History";
import { Route, Router, Switch, Redirect } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

import StartupActions from "../Redux/StartupActions";

class RootContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageNotification: false,
      timelineNotification: false
    };
  }

  render() {
    return (
      <Router history={history}>
        <Container>
          <Switch>
            <Route component={NotFoundPage} />
          </Switch>
        </Container>
      </Router>
    );
  }

  componentDidMount() {
    this.props.startup();
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup())
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
