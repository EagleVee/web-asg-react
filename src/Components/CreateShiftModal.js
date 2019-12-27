import React, { Component } from "react";
import { Modal, TimePicker, DatePicker, Spin, Input, Icon, Button } from "antd";
import moment from "moment";
import PropTypes from "prop-types";

export default class CreateShiftModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState(props);
  }

  getState = props => {
    const { shift } = props;
    if (!shift._id) {
      return {
        date: moment(),
        start: moment(),
        end: moment(),
        classCode: "",
        rooms: [""]
      };
    } else {
      const { beginAt, endAt, rooms } = shift;
      const roomNames = [];
      for (const room of rooms) {
        roomNames.push(room.room.name);
      }
      console.log(roomNames);
      return {
        date: moment.unix(beginAt),
        start: moment.unix(beginAt),
        end: moment.unix(endAt),
        classCode: shift.class.code,
        rooms: roomNames
      };
    }
  };
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    shift: PropTypes.object,
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
    const { date, start, end, classCode, rooms } = this.state;
    const dateFormat = "DD-MM-YYYY";
    const timeFormat = "HH:mm";
    return (
      <Modal
        visible={visible}
        title={title}
        onOk={() => {
          onOk(date, start, end, classCode, rooms);
        }}
        onCancel={onCancel}
      >
        <Spin spinning={spinning}>
          <div className="row">
            <div>
              <p>Chọn ngày thi</p>
              <DatePicker
                className="mt-1"
                value={date}
                format={dateFormat}
                onChange={date => {
                  this.handleOnChange("date", date);
                }}
                placeholder="Chọn ngày"
              />
            </div>
            <div className="pl-2">
              <p>Chọn giờ bắt đầu</p>
              <TimePicker
                className="mt-1"
                placeholder="Bắt đầu"
                format={timeFormat}
                value={start}
                onChange={time => {
                  this.handleOnChange("start", time);
                }}
              />
            </div>
            <div className="pl-2">
              <p>Chọn giờ kết thúc</p>
              <TimePicker
                className="mt-1"
                placeholder="Kết thúc"
                format={timeFormat}
                value={end}
                onChange={time => {
                  this.handleOnChange("end", time);
                }}
              />
            </div>
          </div>
          <div className="mt-2">
            <p>Chọn mã môn thi</p>
            <Input
              className="mt-1"
              placeholder="Môn thi"
              onChange={e => {
                this.setState({
                  classCode: e.target.value
                });
              }}
              value={this.state.classCode}
            />
          </div>
          <div className="mt-2">
            <div className="row align-items-center">
              <p className="w-75">Chọn phòng thi</p>
              <button
                className="btn text-success"
                onClick={() => {
                  const { rooms } = this.state;
                  rooms.push("");
                  this.setState({
                    rooms: rooms
                  });
                }}
              >
                <Icon type="plus-circle" style={{ fontSize: 20 }} />
              </button>
            </div>
            {this.renderRoomInputs()}
          </div>
        </Spin>
      </Modal>
    );
  }

  renderRoomInputs = () => {
    const { rooms } = this.state;
    let render = [];
    for (let i = 0; i < rooms.length; i++) {
      render.push(
        <div key={i} className="row pt-1 align-items-center">
          <Input
            className="w-75"
            placeholder="Phòng thi"
            onChange={e => {
              rooms[i] = e.target.value;
              this.setState({
                rooms: rooms
              });
            }}
            value={rooms[i]}
          />
          <button
            className="btn text-danger ml-2"
            onClick={e => {
              e.preventDefault();
              if (rooms.length > 1) {
                rooms.splice(i, 1);
                this.setState({
                  rooms: rooms
                });
              }
            }}
          >
            <Icon type="close" style={{ fontSize: 14, marginBottom: 10 }} />
          </button>
        </div>
      );
    }

    return render;
  };

  handleOnChange = (momentValue, moment) => {
    this.setState({
      [momentValue]: moment
    });
  };

  componentWillReceiveProps(nextProps, nextContext) {
    console.log(this.getState(nextProps));
    this.setState(this.getState(nextProps));
  }
}
