import React, { Component } from "react";
import styles from "./Styles/RoomPage.module.css";
import { Table, Input, Icon, Spin, Modal } from "antd";
import { connect } from "react-redux";
import FormData from "form-data";
import RoomActions from "../Redux/RoomActions";
import ModalHelper from "../Common/ModalHelper";
import UploadModal from "../Components/UploadModal";

class RoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      uploadModalVisible: false,
      uploading: false,
      roomModalVisible: false,
      selectedRoom: {
        _id: "",
        name: "",
        seat: 0
      },
      updating: false,
      loading: false
    };
  }
  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderTable()}
        {this.renderUploadModal()}
        {this.renderRoomModal()}
      </div>
    );
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <p>Tải lên danh sách phòng thi (.xlsx)</p>
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
        title: "Tên phòng",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Số máy tính",
        dataIndex: "seat",
        key: "seat"
      }
    ];

    const { listRoom } = this.props.room;

    return (
      <Spin spinning={this.state.loading}>
        <Table
          columns={columns}
          dataSource={listRoom}
          rowKey={record => record._id}
          onRow={(record, index) => {
            return {
              onClick: event => {
                event.preventDefault();
                this.setState({
                  selectedRoom: record,
                  roomModalVisible: true
                });
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

  renderRoomModal = () => {
    const { updating, roomModalVisible, selectedRoom } = this.state;
    return (
      <Modal
        visible={roomModalVisible}
        onCancel={this.closeRoomModal}
        onOk={this.handleUpdateRoom}
      >
        <Spin spinning={updating}>
          <div className="row pt-3">
            <div className="w-50 p-1">
              <p>Tên phòng</p>
              <Input
                value={selectedRoom.name}
                onChange={e => {
                  this.setState({
                    selectedRoom: {
                      ...selectedRoom,
                      name: e.target.value
                    }
                  });
                }}
              />
            </div>
            <div className="w-50 p-1">
              <p>Số máy tính</p>
              <Input
                type="number"
                value={selectedRoom.seat}
                onChange={e => {
                  this.setState({
                    selectedRoom: {
                      ...selectedRoom,
                      seat: e.target.value
                    }
                  });
                }}
              />
            </div>
          </div>
        </Spin>
      </Modal>
    );
  };

  closeRoomModal = () => {
    this.setState({
      roomModalVisible: false
    });
  };

  handleUpdateRoom = () => {
    const onSuccess = message => {
      this.setState(
        {
          roomModalVisible: false,
          updating: false
        },
        () => {
          ModalHelper.showSuccessModal({
            content: message
          });
          this.getListRoom();
        }
      );
    };

    const onFailed = message => {
      this.setState(
        {
          roomModalVisible: false,
          updating: false
        },
        () => {
          ModalHelper.showErrorModal({
            content: message
          });
        }
      );
    };
    const { selectedRoom } = this.state;
    const { updateRoom } = this.props;
    this.setState(
      {
        updating: true
      },
      () => {
        updateRoom(selectedRoom._id, selectedRoom, onSuccess, onFailed);
      }
    );
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
    const { uploadRoom } = this.props;
    const { file } = this.state;
    const formData = new FormData();
    formData.append("file", file);
    uploadRoom(formData, this.onSuccess, this.onFailed);
  };

  getListRoom = () => {
    const { getListRoom } = this.props;
    this.setState(
      {
        loading: true
      },
      () => {
        getListRoom({}, this.loadingDone, this.loadingDone);
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
        this.getListRoom();
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
    this.getListRoom();
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    room: state.room
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListRoom: (params, onSuccess, onFailed) =>
      dispatch(RoomActions.getListRoom(params, onSuccess, onFailed)),
    uploadRoom: (data, onSuccess, onFailed) =>
      dispatch(RoomActions.uploadRoom(data, onSuccess, onFailed)),
    updateRoom: (id, data, onSuccess, onFailed) =>
      dispatch(RoomActions.updateRoom(id, data, onSuccess, onFailed))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
