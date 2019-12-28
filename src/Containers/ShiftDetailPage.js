import React, { Component } from "react";
import styles from "./Styles/ShiftDetailPage.module.css";
import { Table, Button, Icon, Spin } from "antd";
import { connect } from "react-redux";
import ShiftActions from "../Redux/ShiftActions";
import RoleHelper from "../Common/RoleHelper";
import TimeHelper from "../Common/TimeHelper";
import ModalHelper from "../Common/ModalHelper";

class ShiftDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      loading: false
    };
  }
  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderRoomList()}
      </div>
    );
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <p>Tải lên danh sách (.xlsx)</p>
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

  renderRoomList() {
    const isStudent = RoleHelper.isStudent(this.props.auth.user);
    if (!isStudent) {
      return <div />;
    }

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
        title: "Đăng ký",
        dataIndex: "register",
        key: "register",
        render: (text, record) => {
          const { registered } = record;
          let displayText = registered === false ? "Đăng ký" : "Hủy đăng ký";
          let className =
            registered === false ? "btn btn-success" : "btn btn-danger";
          return (
            <button
              onClick={() => {
                this.handleOnRegister(record);
              }}
              className={className}
            >
              <p>{displayText}</p>
            </button>
          );
        }
      }
    ];

    return (
      <Spin spinning={this.state.loading}>
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
    const { registeredRooms } = this.props.shift;
    for (const shiftRoom of registeredRooms) {
      const { room, shift } = shiftRoom;
      const { beginAt, endAt } = shift;
      const { name } = room;
      const data = {
        ...shiftRoom,
        date: TimeHelper.getDayFromDate(beginAt),
        begin: TimeHelper.getHourFromDate(beginAt),
        end: TimeHelper.getHourFromDate(endAt),
        roomName: name
      };

      result.push(data);
    }
    return result;
  };

  getRegisteredRooms = () => {
    const { getRegisteredRooms, auth } = this.props;
    const params = {
      student: auth.user._id
    };
    this.setState(
      {
        loading: true
      },
      () => {
        getRegisteredRooms(params, this.endLoading, this.endLoading);
      }
    );
  };

  endLoading = () => {
    this.setState({
      loading: false
    });
  };

  handleOnRegister = record => {
    const { studentRegister, auth } = this.props;
    const { room, shift } = record;
    const data = {
      student: auth.user._id,
      newRoom: room._id,
      shift: shift._id,
      register: false
    };
    this.setState(
      {
        loading: true
      },
      () => {
        studentRegister(data, this.registerSuccess, this.registerFailed);
      }
    );
  };

  registerSuccess = () => {
    ModalHelper.showSuccessModal({
      content: "Hủy ca thi thành công"
    });
    this.getRegisteredRooms();
  };

  registerFailed = () => {
    this.setState({
      loading: false
    });
    ModalHelper.showErrorModal({
      content: "Đã có lỗi xảy ra, vui lòng thử lại"
    });
  };

  componentDidMount() {
    this.getRegisteredRooms();
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
    getRegisteredRooms: (params, onSuccess, onFailed) =>
      dispatch(ShiftActions.getRegisteredRooms(params, onSuccess, onFailed)),
    studentRegister: (data, onSuccess, onFailed) =>
      dispatch(ShiftActions.studentRegister(data, onSuccess, onFailed))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShiftDetailPage);
