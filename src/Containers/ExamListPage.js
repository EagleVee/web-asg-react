import React, { Component } from "react";
import styles from "./Styles/ExamListPage.module.css";
import { Table, Button, Icon, Spin } from "antd";
import { connect } from "react-redux";
import FormData from "form-data";
import ExamActions from "../Redux/ExamAction";
import ModalHelper from "../Common/ModalHelper";
import DownloadModal from "../Components/DownloadModal";

class ExamListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      downloadModalVisible: false,
      downloading: false
    };
  }
  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderTable()}
        {this.renderDownloadModal()}
      </div>
    );
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <h1 className={styles.headerLeft}>Lịch thi</h1>

        <div className={styles.headerRight}>
          <p>Tải xuống lịch thi(.xlsx)</p>
          <button
              className={`btn ${styles.button}`}
              onClick={event => {
              event.preventDefault();
              this.setState({
                  downloadloadModalVisible: true
              });
              }}
          >
              <Icon type="download" style={{ fontSize: 20 }} />
          </button>
        </div>
      </div>
    );
  }

  renderTable() {
    const columns = [
      {
        title: "Môn thi",
        dataIndex: "className",
        key: "className"
      },
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
        dataIndex: "rooms",
        key: "rooms",
        /* render: rooms => {
          return (
            <span>
              {rooms.map(v => {
                const { _id, room } = v;
                const { name } = room;
                return (
                  <Tag key={_id} color="#2db7f5" className="mt-1">
                    {name}
                  </Tag>
                );
              })}
            </span>
          );
        } */
      }
    ];

    const { listExam } = this.props.exam;

    return (
      <Table
        columns={columns}
        dataSource={listExam}
        rowKey={record => record._id}
        onRow={(record) => {
          return {
            onClick: event => {
              event.preventDefault();
              this.props.history.push("/exam/" + record._id);
            }
          };
        }}
      />
    );
  }

  renderDownloadModal = () => {
    const { downloadModalVisible, file, downloading } = this.state;
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
      <DownloadModal
        visible={downloadModalVisible}
        onDownload={this.handleOnDownload}
        onCancel={() => {
          this.setState({
            downloadModalVisible: false
          });
        }}
      >
        <Spin spinning={downloading}>
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
              type="download"
              style={{ fontSize: 20 }}
              className={`btn ${styles.button}`}
            />
          </label>
          {renderPreview()}
        </Spin>
      </DownloadModal>
    );
  };

  handleOnDownload = () => {
    /* this.setState(
      {
        downloading: true
      },
      () => {
        this.downloadFile();
      }
    ); */
  };

  downloadFile = () => {
    /* const { downloadListExam } = this.props;
    const { file } = this.state;
    const formData = new FormData();
    formData.append("file", file);
    downloadListExam(formData, this.onSuccess, this.onFailed); */
  };

  getListExam = () => {
    const { getListExam } = this.props;
    getListExam();
  };

  onSuccess = message => {
    this.setState(
      {
        downloadModalVisible: false,
        downloading: false,
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
        downloadModalVisible: false,
        downloading: false,
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
    this.getListExam();
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    exam: state.exam
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListExam: (params, onSuccess, onFailed) =>
      dispatch(ExamActions.getListExam(params, onSuccess, onFailed)),
    downloadloadListExam: (data, onSuccess, onFailed) =>
      dispatch(ExamActions.downloadListExam(data, onSuccess, onFailed))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamListPage);
