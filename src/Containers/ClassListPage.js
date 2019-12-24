import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Styles/ClassListPage.module.css";
import ReactTable from "react-table";
import "react-table/react-table.css";

class ClassListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="container"></div>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password, onSuccess, onFailed) =>
      dispatch(AuthActions.login(username, password, onSuccess, onFailed))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassListPage);
