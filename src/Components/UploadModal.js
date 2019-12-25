import React, { Component } from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";

export default class UploadModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string,
    onUpload: PropTypes.func,
    onCancel: PropTypes.func
  };

  static defaultProps = {
    title: "Tải tệp lên",
    onUpload: () => {},
    onCancel: () => {}
  };

  render() {
    const { visible, title, children, onUpload, onCancel } = this.props;
    return (
      <Modal
        visible={visible}
        title={title}
        okText="Tải lên"
        cancelText="Quay lại"
        onOk={onUpload}
        onCancel={onCancel}
      >
        {children}
      </Modal>
    );
  }
}
