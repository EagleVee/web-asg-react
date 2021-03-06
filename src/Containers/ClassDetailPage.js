import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Spin, Icon, Dropdown, Button, Menu, Divider } from "antd";
import styles from "./Styles/ClassDetailPage.module.css";
import ClassActions from "../Redux/ClassActions";
import ClassStudentActions from "../Redux/ClassStudentActions";
import ShiftActions from "../Redux/ShiftActions";
import RoleHelper from "../Common/RoleHelper";
import UploadModal from "../Components/UploadModal";
import FormData from "form-data";
import ModalHelper from "../Common/ModalHelper";
import TimeHelper from "../Common/TimeHelper";

class ClassDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      loading: false,
      uploading: false,
      uploadModalVisible: false,
      file: {},
      shiftLoading: false
    };
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderRoomList()}
        {this.renderStudentList()}
      </div>
    );
  }

  renderHeader() {
    const classDetail = this.props.class[this.state.id];
    if (!classDetail) {
      return <div />;
    }
    const { code, name, lecturer, examStatus } = classDetail;
    const isStudent = RoleHelper.isStudent(this.props.auth.user);
    const renderExamStatus = () => {
      if (!isStudent) return <div />;
      if (examStatus === false) {
        return (
          <p className={`text-danger ${styles.smallText}`}>Không được dự thi</p>
        );
      } else if (examStatus === true) {
        return (
          <p className={`text-success ${styles.smallText}`}>Được dự thi</p>
        );
      }

      return (
        <p className={`text-danger ${styles.smallText}`}>
          Bạn không thuộc lớp học này
        </p>
      );
    };
    return (
      <div className={styles.infoContainer}>
        <div>
          <p className={styles.largeText}>Tên môn học: {name}</p>
          <p className={styles.mediumText}>Mã môn học: {code}</p>
          <p className={styles.smallText}>Giảng viên: {lecturer}</p>
          {renderExamStatus()}
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

  renderRoomList() {
    const isStudent = RoleHelper.isStudent(this.props.auth.user);
    if (!isStudent) {
      return <div />;
    }
    const classDetail = this.props.class[this.state.id];
    if (!classDetail) {
      return <div />;
    }
    const { examStatus } = classDetail;

    const columns = [
      {
        title: "Ngày thi",
        dataIndex: "date",
        key: "date"
      },
      {
        title: "Bắt đầu",
        dataIndex: "begin",
        key: "begin"
      },
      {
        title: "Kết thúc",
        dataIndex: "end",
        key: "end"
      },
      {
        title: "Phòng thi",
        dataIndex: "roomName",
        key: "roomName"
      },
      {
        title: "Số lượng",
        dataIndex: "number",
        key: "number"
      },
      {
        title: "Đăng ký",
        dataIndex: "register",
        key: "register",
        render: (text, record) => {
          const { registered, available } = record;
          let displayText = registered === false ? "Đăng ký" : "Hủy đăng ký";
          let className =
            registered === false ? "btn btn-success" : "btn btn-danger";
          const buttonDisabled =
            examStatus === null || examStatus === false || available === false;
          return (
            <button
              onClick={() => {
                this.handleOnRegister(record);
              }}
              className={className}
              disabled={buttonDisabled}
            >
              <p>{displayText}</p>
            </button>
          );
        }
      }
    ];

    return (
      <Spin spinning={this.state.shiftLoading}>
        <Table
          columns={columns}
          dataSource={this.populateShiftRooms()}
          rowKey={record => record.id}
        />
      </Spin>
    );
  }

  populateShiftRooms = () => {
    let result = [];
    const shiftRooms = this.props.shift[this.state.id];
    if (!shiftRooms) {
      return result;
    }

    for (const shiftRoom of shiftRooms) {
      const { room, shift, students } = shiftRoom;
      const { beginAt, endAt } = shift;
      const { name, seat } = room;
      const data = {
        ...shiftRoom,
        date: TimeHelper.getDayFromDate(beginAt),
        begin: TimeHelper.getHourFromDate(beginAt),
        end: TimeHelper.getHourFromDate(endAt),
        roomName: name,
        number: students.length + "/" + seat
      };

      result.push(data);
    }
    return result;
  };

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
    const { getClassDetail, auth } = this.props;
    const { id } = this.state;
    const isStudent = RoleHelper.isStudent(auth.user);
    let params = {};
    if (isStudent) {
      params = {
        student: auth.user._id
      };
    }

    getClassDetail(id, params);
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

  getShiftRooms = () => {
    const { getShiftRooms, auth } = this.props;
    const { id } = this.state;
    const params = {
      class: id,
      student: auth.user._id
    };
    this.setState(
      {
        shiftLoading: true
      },
      () => {
        getShiftRooms(params, this.shiftLoadingDone, this.shiftLoadingDone);
      }
    );
  };

  shiftLoadingDone = () => {
    this.setState({
      shiftLoading: false
    });
  };

  handleOnRegister = record => {
    const { studentRegister, auth } = this.props;
    const { room, shift, registered } = record;
    const data = {
      student: auth.user._id,
      newRoom: room._id,
      shift: shift._id,
      register: !registered
    };
    this.setState(
      {
        shiftLoading: true
      },
      () => {
        studentRegister(data, this.registerSuccess, this.registerFailed);
      }
    );
  };

  registerSuccess = () => {
    ModalHelper.showSuccessModal({
      content: "Bạn đã cập nhật ca thi thành công"
    });
    this.getShiftRooms();
  };

  registerFailed = () => {
    this.setState(
      {
        shiftLoading: false
      },
      () => {
        ModalHelper.showErrorModal({
          content: "Đã có lỗi xảy ra, vui lòng thử lại"
        });
      }
    );
  };

  componentDidMount() {
    this.getClassDetail();
    this.getShiftRooms();
    this.getStudentList();
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    class: state.class,
    classStudent: state.classStudent,
    shift: state.shift
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClassDetail: (id, params, onSuccess, onFailed) =>
      dispatch(ClassActions.getClassDetail(id, params, onSuccess, onFailed)),
    getStudentList: (params, onSuccess, onFailed) =>
      dispatch(ClassStudentActions.getStudentList(params, onSuccess, onFailed)),
    updateClassStudent: (id, data, onSuccess, onFailed) =>
      dispatch(
        ClassStudentActions.updateClassStudent(id, data, onSuccess, onFailed)
      ),
    uploadClassStudent: (id, data, onSuccess, onFailed) =>
      dispatch(
        ClassStudentActions.uploadClassStudent(id, data, onSuccess, onFailed)
      ),
    getShiftRooms: (params, onSuccess, onFailed) =>
      dispatch(ShiftActions.getShiftRooms(params, onSuccess, onFailed)),
    studentRegister: (data, onSuccess, onFailed) =>
      dispatch(ShiftActions.studentRegister(data, onSuccess, onFailed))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailPage);
