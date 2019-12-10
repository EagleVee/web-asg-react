import React, { Component } from "react";
import { connect } from "react-redux";
import "./Styles/NotFoundPage.css";

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      postInput: "",
      files: [],
      commentPage: 0,
      isCommentLoading: false,
      isPostLoading: false
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
