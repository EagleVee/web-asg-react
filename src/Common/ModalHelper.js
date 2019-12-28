import { Modal } from "antd";

export default class ModalHelper {
  static showErrorModal({ content = "", title = "Lỗi", onOk = () => {} }) {
    Modal.error({
      title: title,
      content: content,
      onOk: onOk
    });
  }

  static showSuccessModal({
    content = "",
    title = "Thành công",
    onOk = () => {}
  }) {
    Modal.success({
      title: title,
      content: content,
      onOk: onOk
    });
  }

  static showConfirmModal({
    content = "",
    title = "Xác nhận",
    onOk = () => {}
  }) {
    Modal.confirm({
      title: title,
      content: content,
      onOk: onOk
    })
  }
}
