import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Spin, Icon, Dropdown, Button, Menu } from "antd";
import styles from "./Styles/ClassDetailPage.module.css";
import ClassActions from "../Redux/ClassActions";
import ClassStudentActions from "../Redux/ClassStudentActions";
import RoleHelper from "../Common/RoleHelper";
import UploadModal from "../Components/UploadModal";
import FormData from "form-data";
import ModalHelper from "../Common/ModalHelper";

class ClassDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      loading: false,
      uploading: false,
      uploadModalVisible: false,
      file: {},
      examStatus: true
    };
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderStudentList()}
      </div>
    );
  }

  renderHeader() {
    const classDetail = this.props.class[this.state.id];
    if (!classDetail) {
      return <div />;
    }
    const { code, name, lecturer } = classDetail;
    return (
      <div className={styles.infoContainer}>
        <div>
          <p className={styles.largeText}>Tên môn học: {name}</p>
          <p className={styles.mediumText}>Mã môn học: {code}</p>
          <p className={styles.smallText}>Giảng viên: {lecturer}</p>
        </div>
        {this.renderUploadClass()}
      </div>
    );
  }

  renderUploadClass() {
    const isAdmin = RoleHelper.isAdmin(this.props.auth.user);
    return isAdmin ? (
      <div className={styles.headerUpload}>
        <p>Tải lên danh sách lớp (.xlsx)</p>
        <button
          className={`btn ${styles.button}`}
          onClick={event => {
            event.preventDefault();
            this.setState({
              uploadModalVisible: true
            });
          }}
        >
          <Icon type="upload" style={{ fontSize: 20 }} />
        </button>
        {this.renderUploadModal()}
      </div>
    ) : (
      <div />
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
          const isAdmin = RoleHelper.isAdmin(this.props.auth.user);
          let displayText = text === true ? "Được thi" : "Không được thi";

          const renderText = () => {
            return (
              <p className={text === true ? "text-success" : "text-danger"}>
                {displayText}
              </p>
            );
          };

          const renderButton = () => {
            const className = `${
              text === true ? "btn btn-success" : "btn btn-danger"
            } ${styles.button}`;
            return (
              <button onClick={handleButtonOnClick} className={className}>
                <p>{displayText}</p>
              </button>
            );
          };

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
          return isAdmin ? renderButton() : renderText();
        }
      }
    ];

    return (
      <Spin spinning={this.state.loading}>
        <Table
          columns={columns}
          dataSource={this.populateStudentList()}
          rowKey={record => record.id}
        />
      </Spin>
    );
  }

  renderUploadModal = () => {
    const { uploadModalVisible, file, uploading } = this.state;
    const renderPreview = () => {
      if (!file.name) {
        return <div />;
      }
      return (
        <div className={styles.previewContainer}>
          <p className={styles.previewText}>{file.name}</p>
          <button
            className="btn text-danger"
            onClick={event => {
              event.preventDefault();
              this.setState({
                file: {}
              });
            }}
          >
            <Icon type="close" style={{ fontSize: 14, marginBottom: 10 }} />
          </button>
        </div>
      );
    };

    const menu = (
      <Menu
        onClick={({ key }) => {
          this.setState({
            examStatus: key === "yes"
          });
        }}
      >
        <Menu.Item key="yes">Được thi</Menu.Item>
        <Menu.Item key="no">Cấm thi</Menu.Item>
      </Menu>
    );

    return (
      <UploadModal
        visible={uploadModalVisible}
        onUpload={this.handleOnUpload}
        onCancel={() => {
          this.setState({
            uploadModalVisible: false
          });
        }}
      >
        <Spin spinning={uploading}>
          <Dropdown overlay={menu}>
            <Button>
              {this.state.examStatus ? "Được thi" : "Cấm thi "}{" "}
              <Icon type="down" />
            </Button>
          </Dropdown>
          <label className="ml-2">
            Chọn tệp từ máy tính
            <input
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="d-none"
              onChange={event => {
                if (event.target.files && event.target.files.length > 0) {
                  this.setState({
                    file: event.target.files[0]
                  });
                }
              }}
            />
            <Icon
              type="upload"
              style={{ fontSize: 20 }}
              className={`btn ${styles.button}`}
            />
          </label>
          {renderPreview()}
        </Spin>
      </UploadModal>
    );
  };

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
    this.setState(
      {
        loading: true
      },
      () => {
        getStudentList(params, this.endLoading, this.endLoading);
      }
    );
  };

  endLoading = () => {
    this.setState({
      loading: false
    });
  };

  handleOnUpload = () => {
    this.setState(
      {
        loading: true,
        uploading: true
      },
      () => {
        this.uploadFile();
      }
    );
  };

  uploadFile = () => {
    const { uploadClassStudent } = this.props;
    const { id, file, examStatus } = this.state;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("status", examStatus);
    uploadClassStudent(id, formData, this.onSuccess, this.onFailed);
  };

  onSuccess = message => {
    this.setState(
      {
        uploadModalVisible: false,
        uploading: false,
        file: {}
      },
      () => {
        this.getStudentList();
        ModalHelper.showSuccessModal({
          content: message
        });
      }
    );
  };

  onFailed = (message = "Đã có lỗi xảy ra") => {
    this.setState(
      {
        uploadModalVisible: false,
        uploading: false,
        loading: false,
        file: {}
      },
      () => {
        ModalHelper.showErrorModal({
          content: message
        });
      }
    );
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
      ),
    uploadClassStudent: (id, data, onSuccess, onFailed) =>
      dispatch(
        ClassStudentActions.uploadClassStudent(id, data, onSuccess, onFailed)
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailPage);
