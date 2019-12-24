import React, { Component } from "react";
import styles from "./Styles/LoadingIndicator.module.css";

export default class LoadingIndicator extends Component {
  render() {
    return (
      <div className={styles.viewCenter}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}
