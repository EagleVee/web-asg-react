import React, { Component } from "react";
import { Table, Icon, Button, Spin, Tag } from "antd";
import TimeHelper from "../Common/TimeHelper";
import { connect } from "react-redux";
import ShiftActions from "../Redux/ShiftActions";
import styles from "./Styles/ShiftPage.module.css";
import CreateShiftModal from "../Components/CreateShiftModal";
import moment from "moment";
import ModalHelper from "../Common/ModalHelper";
import UploadModal from "../Components/UploadModal";
import FormData from "form-data";
import RoleHelper from "../Common/RoleHelper";

class ShiftPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      uploading: false,
      shiftModalVisible: false,
      uploadModalVisible: false,
      creating: false,
      selectedShift: {},
      file: {}
    };
  }

  render() {
    const isAdmin = RoleHelper.isAdmin(this.props.auth.user);
    return (
      <div>
        {isAdmin ? this.renderHeader() : <div />}
        {this.renderTable()}
      </div>
    );
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <Button
          className={styles.transparentButton}
          onClick={() => {
            this.setState({
              uploadModalVisible: true
            });
          }}
        >
          <Icon type="upload" style={{ fontSize: 20 }} />
        </Button>
        <Button
          onClick={() => {
            this.setState({
              shiftModalVisible: true
            });
          }}
          className={`text-success ${styles.transparentButton}`}
        >
          <Icon type="plus-circle" style={{ fontSize: 20 }} />
        </Button>
        {this.renderShiftModal()}
        {this.renderUploadModal()}
      </div>
    );
  }

  renderTable() {
    const isAdmin = RoleHelper.isAdmin(this.props.auth.user);
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
        dataIndex: "rooms",
        key: "rooms",
        render: rooms => {
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
        }
      },
      {
        title: "Môn thi",
        dataIndex: "className",
        key: "className"
      }
    ];

    return (
      <Spin spinning={this.state.loading}>
        <Table
          columns={columns}
          dataSource={this.populateShiftList()}
          rowKey={record => record._id}
          onRow={record => {
            return {
              onClick: e => {
                if (isAdmin) {
                  this.setState(
                    {
                      selectedShift: record
                    },
                    () => {
                      this.setState({
                        shiftModalVisible: true
                      });
                    }
                  );
                }
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

  renderShiftModal = () => {
    const { shiftModalVisible, creating, selectedShift } = this.state;
    return (
      <CreateShiftModal
        shift={selectedShift}
        spinning={creating}
        visible={shiftModalVisible}
        onOk={this.handleOkShift}
        onCancel={this.closeShiftModal}
      />
    );
  };

  handleOkShift = (date, start, end, code, rooms) => {
    const { createShift, updateShift } = this.props;
    const dateString = date.format("YYYY-MM-DD");
    const startString = start.format("HH:mm");
    const endString = end.format("HH:mm");
    const startUnix = moment(dateString + "T" + startString).unix();
    const endUnix = moment(dateString + "T" + endString).unix();
    const shiftData = {
      beginAt: startUnix,
      endAt: endUnix,
      code: code,
      rooms: rooms
    };
    if (this.state.selectedShift._id) {
      this.setState(
        {
          creating: true
        },
        () => {
          updateShift(
            this.state.selectedShift._id,
            shiftData,
            this.createSuccess,
            this.createFailed
          );
        }
      );
    } else {
      this.setState(
        {
          creating: true
        },
        () => {
          createShift(shiftData, this.createSuccess, this.createFailed);
        }
      );
    }
  };

  createSuccess = message => {
    this.setState(
      {
        creating: false,
        shiftModalVisible: false,
        selectedShift: {}
      },
      () => {
        ModalHelper.showSuccessModal({
          content: message
        });
      }
    );
  };

  createFailed = message => {
    this.setState(
      {
        creating: false,
        shiftModalVisible: false,
        selectedShift: {}
      },
      () => {
        ModalHelper.showErrorModal({
          content: message
        });
      }
    );
  };

  closeShiftModal = () => {
    this.setState({
      shiftModalVisible: false,
      selectedShift: {}
    });
  };

  populateShiftList() {
    let result = [];
    const { listShift } = this.props.shift;
    for (const shift of listShift) {
      const { beginAt, endAt, rooms } = shift;
      const _shift = {
        ...shift,
        date: TimeHelper.getDayFromDate(beginAt),
        begin: TimeHelper.getHourFromDate(beginAt),
        end: TimeHelper.getHourFromDate(endAt),
        rooms: rooms,
        className: shift.class ? shift.class.name : ""
      };
      result.push(_shift);
    }
    return result;
  }

  getListShift = () => {
    const { getListShift } = this.props;
    const params = {};
    this.setState(
      {
        loading: true
      },
      () => {
        getListShift(params, this.endLoading, this.endLoading);
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
        uploading: true,
        loading: true
      },
      () => {
        this.uploadFile();
      }
    );
  };

  uploadFile = () => {
    const { uploadShift } = this.props;
    const { file } = this.state;
    const formData = new FormData();
    formData.append("file", file);
    uploadShift(formData, this.onSuccess, this.onFailed);
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
        this.getListShift();
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
    this.getListShift();
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    shift: state.shift
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListShift: (params, onSuccess, onFailed) =>
      dispatch(ShiftActions.getListShift(params, onSuccess, onFailed)),
    createShift: (data, onSuccess, onFailed) =>
      dispatch(ShiftActions.createShift(data, onSuccess, onFailed)),
    uploadShift: (data, onSuccess, onFailed) =>
      dispatch(ShiftActions.uploadShift(data, onSuccess, onFailed)),
    updateShift: (id, data, onSuccess, onFailed) =>
      dispatch(ShiftActions.updateShift(id, data, onSuccess, onFailed))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShiftPage);
