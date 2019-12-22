import React, { Component } from "react";
import { connect } from "react-redux";
import "./Styles/NotFoundPage.module.css";

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="view-center">
        <p className="not-found-text">404 Not Found</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
