import React, { Component } from "react";
import { Modal, TimePicker, DatePicker, Spin, Input } from "antd";
import moment from "moment";
import PropTypes from "prop-types";

export default class CreateShiftModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      start: moment(),
      end: moment(),
      className: ""
    };
  }

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    spinning: PropTypes.bool
  };

  static defaultProps = {
    title: "Tạo ca thi",
    visible: false,
    onOK: () => {},
    onCancel: () => {},
    spinning: false
  };

  render() {
    const { title, visible, onOk, onCancel, spinning } = this.props;
    const { date, start, end, className } = this.state;
    const dateFormat = "DD-MM-YYYY";
    const timeFormat = "HH:mm";
    return (
      <Spin spinning={spinning}>
        <Modal
          visible={visible}
          title={title}
          onOk={() => {
            onOk(date, start, end, className);
          }}
          onCancel={onCancel}
        >
          <div>
            <DatePicker
              value={date}
              format={dateFormat}
              onChange={date => {
                this.handleOnChange("date", date);
              }}
              placeholder="Chọn ngày"
            />
            <TimePicker
              className="ml-2"
              placeholder="Bắt đầu"
              format={timeFormat}
              value={start}
              onChange={time => {
                this.handleOnChange("start", time);
              }}
            />
            <TimePicker
              className="ml-2"
              placeholder="Kết thúc"
              format={timeFormat}
              value={end}
              onChange={time => {
                this.handleOnChange("end", time);
              }}
            />
          </div>
          <Input
            className="mt-2"
            placeholder="Môn thi"
            onChange={e => {
              this.setState({
                className: e.target.value
              });
            }}
            value={this.state.className}
          />
        </Modal>
      </Spin>
    );
  }

  handleOnChange = (momentValue, moment) => {
    this.setState({
      [momentValue]: moment
    });
  };
}
