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
      <div className={styles.header}>
        <p>Tải lên danh sách môn học</p>
        <label>
          <input type="file" className="d-none" />
          <Icon
            type="upload"
            style={{ fontSize: 20 }}
            className={`btn ${styles.button}`}
          />
        </label>
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

    return (
      <Table
        columns={columns}
        dataSource={listClass}
        onRow={(record, index) => {
          return {
            onClick: event => {
              event.preventDefault();
              this.props.history.push("/class/" + record._id);
            }
          };
        }}
      />
    );
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
