import React, { Component } from "react";
import { connect } from "react-redux";

import ClassActions from "../Redux/ClassActions";

class ClassDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id
    };
  }

  render() {
    const classDetail = this.props.class[this.state.id];
    if (!classDetail) {
      return <div />;
    }
    const { code, name, lecturer } = classDetail;
    return (
      <div>
        <p>Mã môn học: {code}</p>
        <p>Tên môn học: {name}</p>
        <p>Giảng viên: {lecturer}</p>
      </div>
    );
  }

  getClassDetail = () => {
    const { getClassDetail } = this.props;
    const { id } = this.state;
    getClassDetail(id);
  };

  componentDidMount() {
    this.getClassDetail();
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    class: state.class
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClassDetail: id => dispatch(ClassActions.getClassDetail(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailPage);
