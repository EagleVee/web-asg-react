import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "../Components/Container";
import history from "../Navigation/History";
import { Route, Router, Switch, Redirect } from "react-router-dom";

import StartupActions from "../Redux/StartupActions";

import NotFoundPage from "./NotFoundPage";
import LoginPage from "./LoginPage";
import SubjectList from "./SubjectList";


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
            <Route exact path="/message" component={SubjectList}/>
            <Route component={NotFoundPage} />
          </Container>
        </Switch>
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
