import React, { Component } from "react";
import styles from "./Styles/AccountPage.module.css";
import { Table, Input, Icon, Spin } from "antd";
import { connect } from "react-redux";
import AccountActions from "../Redux/AccountActions";
import ModalHelper from "../Common/ModalHelper";
import UploadModal from "../Components/UploadModal";
import lodash from "lodash";
import RoleHelper from "../Common/RoleHelper";
import UnapprovedComponent from "../Components/UnapprovedComponent";

const { Search } = Input;

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      uploadModalVisible: false,
      uploading: false,
      search: ""
    };
  }
  render() {
    const isAdmin = RoleHelper.isAdmin(this.props.auth.user);
    return isAdmin ? (
      <div>
        {this.renderHeader()}
        {this.renderTable()}
        {this.renderUploadModal()}
      </div>
    ) : (
      <UnapprovedComponent />
    );
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Search
            placeholder="Tìm kiếm"
            value={this.state.search}
            onChange={e => {
              this.setState(
                {
                  search: e.target.value
                },
                lodash.debounce(() => {
                  this.getListAccount();
                }, 1000)
              );
            }}
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        </div>

        <div className={styles.headerRight}>
          <p>Tải lên danh sách tài khoản (.xlsx)</p>
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
      </div>
    );
  }

  renderTable() {
    const columns = [
      {
        title: "Mã số sinh viên",
        dataIndex: "studentId",
        key: "studentId"
      },
      {
        title: "Tên sinh viên",
        dataIndex: "name",
        key: "name"
      }
    ];

    const { listAccount } = this.props.account;

    return (
      <Table
        columns={columns}
        dataSource={listAccount}
        rowKey={record => record._id}
      />
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
    const { uploadListAccount } = this.props;
    const { file } = this.state;
    const formData = new FormData();
    formData.append("file", file);
    uploadListAccount(formData, this.onSuccess, this.onFailed);
  };

  getListAccount = () => {
    const { getListAccount } = this.props;
    const { search } = this.state;
    const params = {
      search: search
    };
    this.setState(
      {
        loading: true
      },
      () => {
        getListAccount(params, this.endLoading, this.endLoading);
      }
    );
  };

  endLoading = () => {
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
        this.getListAccount();
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
    this.getListAccount();
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    account: state.account
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListAccount: (params, onSuccess, onFailed) =>
      dispatch(AccountActions.getListAccount(params, onSuccess, onFailed)),
    uploadListAccount: (data, onSuccess, onFailed) =>
      dispatch(AccountActions.uploadListAccount(data, onSuccess, onFailed))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
