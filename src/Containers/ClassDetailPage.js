import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Spin } from "antd";
import styles from "./Styles/ClassDetailPage.module.css";
import ClassActions from "../Redux/ClassActions";
import ClassStudentActions from "../Redux/ClassStudentActions";

class ClassDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      loading: false
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
        {this.renderStudentList()}
      </div>
    );
  }

  renderStudentList() {
    const columns = [
      {
        title: "Mã sinh viên",
        dataIndex: "studentId",
        key: "studentId"
      },
      {
        title: "Họ và tên",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Trạng thái thi",
        dataIndex: "examStatus",
        key: "examStatus",
        render: (text, record) => {
          let displayText = text === true ? "Được thi" : "Không được thi";
          const className = `${
            text === true ? "btn btn-success" : "btn btn-danger"
          } ${styles.button}`;

          const handleButtonOnClick = () => {
            const { id, examStatus } = record;
            const { updateClassStudent } = this.props;
            const newRecord = {
              examStatus: !examStatus,
              classId: this.state.id
            };
            this.setState(
              {
                loading: true
              },
              () => {
                updateClassStudent(
                  id,
                  newRecord,
                  this.endLoading,
                  this.endLoading
                );
              }
            );
          };
          return (
            <button onClick={handleButtonOnClick} className={className}>
              <p>{displayText}</p>
            </button>
          );
        }
      }
    ];

    return (
      <Spin spinning={this.state.loading}>
        <Table columns={columns} dataSource={this.populateStudentList()} />
      </Spin>
    );
  }

  populateStudentList = () => {
    let result = [];
    const studentList = this.props.classStudent[this.state.id]
      ? this.props.classStudent[this.state.id]
      : [];
    for (const classStudent of studentList) {
      const { _id, student, examStatus } = classStudent;
      const { studentId, name } = student;
      const _student = {
        key: studentId,
        id: _id,
        studentId: studentId,
        name: name,
        examStatus: examStatus
      };
      result.push(_student);
    }

    return result;
  };

  getClassDetail = () => {
    const { getClassDetail } = this.props;
    const { id } = this.state;
    getClassDetail(id);
  };

  getStudentList = () => {
    const { getStudentList } = this.props;
    const { id } = this.state;
    const params = {
      class: id
    };
    getStudentList(params);
  };

  endLoading = () => {
    this.setState({
      loading: false
    });
  };

  componentDidMount() {
    this.getClassDetail();
    this.getStudentList();
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    class: state.class,
    classStudent: state.classStudent
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClassDetail: id => dispatch(ClassActions.getClassDetail(id)),
    getStudentList: (params, onSuccess, onFailed) =>
      dispatch(ClassStudentActions.getStudentList(params, onSuccess, onFailed)),
    updateClassStudent: (id, data, onSuccess, onFailed) =>
      dispatch(
        ClassStudentActions.updateClassStudent(id, data, onSuccess, onFailed)
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailPage);
