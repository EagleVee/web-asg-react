import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Styles/NotFoundPage.module.css";

class NotFoundPage extends Component {
  render() {
    return (
      <div className={styles.viewCenter}>
        <p className={styles.notFoundText}>404 Not Found</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundPage);
