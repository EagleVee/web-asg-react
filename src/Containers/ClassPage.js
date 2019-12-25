import React, { Component } from "react";
import styles from "./Styles/ClassPage.module.css";
import { Table, Divider, Icon } from "antd";
import ClassActions from "../Redux/ClassActions";
import { connect } from "react-redux";

class ClassPage extends Component {
  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderTable()}
      </div>
    );
  }

  renderHeader() {
    return (
      <div className="row">
        <p>Nhập liệu</p>
        <button className={`btn ${styles.button}`}>
          <Icon type="upload" style={{ fontSize: 20 }} />
        </button>
      </div>
    );
  }

  renderTable() {
    const columns = [
      {
        title: "Mã môn học",
        dataIndex: "code",
        key: "code"
      },
      {
        title: "Tên môn học",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Giảng viên",
        dataIndex: "lecturer",
        key: "lecturer"
      }
    ];

    const { listClass } = this.props.class;

    return <Table columns={columns} dataSource={listClass} />;
  }

  getListClass = () => {
    const { getListClass } = this.props;
    getListClass();
  };

  componentDidMount() {
    this.getListClass();
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
    getListClass: (params, onSuccess, onFailed) =>
      dispatch(ClassActions.getListClass(params, onSuccess, onFailed))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassPage);
