import React, { Component } from "react";
import { Table, Icon, Button } from "antd";
import TimeHelper from "../Common/TimeHelper";
import { connect } from "react-redux";
import ShiftActions from "../Redux/ShiftActions";
import styles from "./Styles/ShiftPage.module.css";
import CreateShiftModal from "../Components/CreateShiftModal";
import moment from "moment";
import ModalHelper from "../Common/ModalHelper";

class ShiftPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      uploading: false,
      shiftModalVisible: false,
      creating: false
    };
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderTable()}
        {this.renderShiftModal()}
      </div>
    );
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <Button className={`${styles.transparentButton}`}>
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
      </div>
    );
  }

  renderTable() {
    const columns = [
      {
        title: "Ngày thi",
        dataIndex: "date",
        key: "date"
      },
      {
        title: "Bắt đầu",
        dataIndex: "beginAt",
        key: "begin"
      },
      {
        title: "Kết thúc",
        dataIndex: "endAt",
        key: "end"
      },
      {
        title: "Phòng thi",
        dataIndex: "room",
        key: "room"
      },
      {
        title: "Môn thi",
        dataIndex: "className",
        key: "className"
      }
    ];

    return <Table columns={columns} dataSource={this.populateShiftList()} />;
  }

  renderShiftModal = () => {
    const { shiftModalVisible, creating } = this.state;
    return (
      <CreateShiftModal
        spinning={creating}
        visible={shiftModalVisible}
        onOk={this.handleOkShift}
        onCancel={this.closeShiftModal}
      />
    );
  };

  handleOkShift = (date, start, end, className) => {
    const { createShift } = this.props;
    const dateString = date.format("YYYY-MM-DD");
    const startString = start.format("HH:mm");
    const endString = end.format("HH:mm");
    const startUnix = moment(dateString + "T" + startString).unix();
    const endUnix = moment(dateString + "T" + endString).unix();
    const shiftData = {
      beginAt: startUnix,
      endAt: endUnix,
      class: className
    };
    this.setState(
      {
        creating: true
      },
      () => {
        createShift(shiftData, this.createSuccess, this.createFailed);
      }
    );
  };

  createSuccess = () => {
    this.setState(
      {
        creating: false,
        shiftModalVisible: false
      },
      () => {
        ModalHelper.showSuccessModal({
          content: "Tạo ca thi thành công"
        });
      }
    );
  };

  createFailed = message => {
    this.setState(
      {
        creating: false,
        shiftModalVisible: false
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
      shiftModalVisible: false
    });
  };

  populateShiftList() {
    let result = [];
    const { listShift } = this.props.shift;
    for (const shift of listShift) {
      const { beginAt, endAt } = shift;
      const _shift = {
        date: TimeHelper.getDayFromDate(beginAt),
        begin: TimeHelper.getHourFromDate(beginAt),
        end: TimeHelper.getHourFromDate(endAt),
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
      dispatch(ShiftActions.createShift(data, onSuccess, onFailed))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShiftPage);
