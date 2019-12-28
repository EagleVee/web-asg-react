import React, { Component } from "react";
import styles from "./Styles/ClassPage.module.css";
import { Table, Button, Icon, Spin } from "antd";
import { connect } from "react-redux";
import FormData from "form-data";
import ClassActions from "../Redux/ClassActions";
import ModalHelper from "../Common/ModalHelper";
import UploadModal from "../Components/UploadModal";
import RoleHelper from "../Common/RoleHelper";

class ClassPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      uploadModalVisible: false,
      uploading: false,
      loading: false
    };
  }
  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderTable()}
        {this.renderUploadModal()}
      </div>
    );
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <p>Tải lên danh sách môn học (.xlsx)</p>
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
      <Spin spinning={this.state.loading}>
        <Table
          columns={columns}
          dataSource={listClass}
          rowKey={record => record._id}
          onRow={(record, index) => {
            return {
              onClick: event => {
                event.preventDefault();
                this.props.history.push("/class/" + record._id);
              }
            };
          }}
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
          <label>
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

  handleOnUpload = () => {
    this.setState(
      {
        uploading: true
      },
      () => {
        this.uploadFile();
      }
    );
  };

  uploadFile = () => {
    const { uploadListClass } = this.props;
    const { file } = this.state;
    const formData = new FormData();
    formData.append("file", file);
    uploadListClass(formData, this.onSuccess, this.onFailed);
  };

  getListClass = () => {
    const { getListClass, auth } = this.props;
    const isStudent = RoleHelper.isStudent(auth.user);
    const params = isStudent ? { student: auth.user._id } : {};
    this.setState(
      {
        loading: true
      },
      () => {
        getListClass(params, this.loadingDone, this.loadingDone);
      }
    );
  };

  loadingDone = () => {
    this.setState({
      loading: false
    });
  };

  onSuccess = message => {
    this.setState(
      {
        uploadModalVisible: false,
        uploading: false,
        file: {}
      },
      () => {
        ModalHelper.showSuccessModal({
          content: message
        });
      }
    );
  };

  onFailed = message => {
    this.setState(
      {
        uploadModalVisible: false,
        uploading: false,
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
      dispatch(ClassActions.getListClass(params, onSuccess, onFailed)),
    uploadListClass: (data, onSuccess, onFailed) =>
      dispatch(ClassActions.uploadListClass(data, onSuccess, onFailed))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassPage);
