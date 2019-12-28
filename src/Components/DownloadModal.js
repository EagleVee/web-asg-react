import React, { Component } from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";

export default class DownloadModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string,
    onDownload: PropTypes.func,
    onCancel: PropTypes.func
  };

  static defaultProps = {
    title: "Tải tệp xuống",
    onDownload: () => {},
    onCancel: () => {}
  };

  render() {
    const { visible, title, children, onDownload, onCancel } = this.props;
    return (
      <Modal
        visible={visible}
        title={title}
        okText="Tải xuống"
        cancelText="Quay lại"
        onOk={onDownload}
        onCancel={onCancel}
      >
        {children}
      </Modal>
    );
  }
}


