import React, { Component } from "react";
import styles from "./Styles/ClassPage.module.css";
import { Table, Divider } from "antd";

class ClassPage extends Component {
  render() {
    return <div>{this.renderTable()}</div>;
  }

  renderTable() {
    const columns = [
      {
        title: "Mã môn học",
        dataIndex: "code",
        key: "code"
      },
      {
        title: "Tên môn học",
        dataIndex: "name",
        key: "name",
        render: text => <a>{text}</a>
      },

      {
        title: "Giảng viên",
        dataIndex: "lecturer",
        key: "lecturer"
      }
    ];

    return (
      <Table
        columns={columns}
        dataSource={[
          {
            code: "INT1234",
            name: "Phát triển ứng dụng web",
            lecturer: "Lê Đình Thanh"
          }
        ]}
      />
    );
  }
}

export default ClassPage;
