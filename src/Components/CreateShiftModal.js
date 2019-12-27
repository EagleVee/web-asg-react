import React, { Component } from "react";
import { Modal, TimePicker, DatePicker } from "antd";
import moment from "moment";
import PropTypes from "prop-types";

export default class CreateShiftModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      start: moment(),
      end: moment(),
      dateString: moment().format("DD/MM/YYYY"),
      startString: moment().format("HH:mm"),
      endString: moment().format("HH:mm")
    };
  }

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
  };

  static defaultProps = {
    title: "Tạo ca thi",
    visible: false,
    onOK: () => {},
    onCancel: () => {}
  };

  render() {
    const { title, visible, onOk, onCancel } = this.props;
    const { date, start, end, dateString, startString, endString } = this.state;
    const dateFormat = "DD-MM-YYYY";
    const timeFormat = "HH:mm";
    return (
      <Modal
        visible={visible}
        title={title}
        onOk={() => {
          onOk(date, start, end);
        }}
        onCancel={onCancel}
      >
        <DatePicker
          value={date}
          format={dateFormat}
          onChange={(date, dateString) => {
            this.handleOnChange("date", date, "dateString", dateString);
          }}
          placeholder="Chọn ngày"
        />
        <TimePicker
          placeholder="Chọn giờ bắt đầu"
          format={timeFormat}
          value={start}
          onChange={(time, timeString) => {
            this.handleOnChange("start", time, "startString", timeString);
          }}
        />
        <TimePicker
          placeholder="Chọn giờ kết thúc"
          format={timeFormat}
          value={end}
          onChange={(time, timeString) => {
            this.handleOnChange("end", time, "endString", timeString);
          }}
        />
      </Modal>
    );
  }

  handleOnChange = (momentValue, moment, stringValue, string) => {
    this.setState({
      [momentValue]: moment,
      [stringValue]: string
    });
  };
}
