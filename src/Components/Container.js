import React, { Component } from "react";
import { Icon, Layout, Menu } from "antd";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Styles/Container.module.css";
import { connect } from "react-redux";

const { Sider, Content } = Layout;

class Container extends Component {
  static propTypes = {
    containerStyle: PropTypes.object,
    menuOnClick: PropTypes.func
  };

  static defaultProps = {
    menuOnClick: () => {}
  };

  render() {
    const layoutStyle = {
      height: "100vh",
      overflowY: "hidden",
      ...this.props.containerStyle
    };
    return (
      <Layout style={layoutStyle}>
        <Sider breakpoint="md">{this.renderMenu()}</Sider>
        <Content>{this.props.children}</Content>
      </Layout>
    );
  }

  renderMenu() {
    const { role } = this.props.auth.user;
    if (role === "student") {
      return this.renderStudentMenu();
    } else if (role === "admin") {
      return this.renderAdminMenu();
    }
    return (
      <Menu
        theme="dark"
        style={{ height: "100vh" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["1"]}
        mode="inline"
      />
    );
  }

  renderStudentMenu() {
    return (
      <Menu
        theme="dark"
        style={{ height: "100vh" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["1"]}
        mode="inline"
      >
        <Menu.SubMenu
          key="1"
          onTitleClick={() => {
            this.props.menuOnClick("1");
          }}
          title={
            <span className={styles.viewCenter}>
              <Icon type="calendar" style={{ fontSize: 16 }} />
              <span>Đăng ký thi</span>
            </span>
          }
        >
          <Menu.Item key="message">
            <Link to="/message">Danh sách đăng ký</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }

  renderAdminMenu() {
    return (
      <Menu
        theme="dark"
        style={{ height: "100vh" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["1"]}
        mode="inline"
      >
        <Menu.SubMenu
          key="1"
          onTitleClick={() => {
            this.props.menuOnClick("1");
          }}
          title={
            <span className={styles.viewCenter}>
              <Icon type="calendar" style={{ fontSize: 16 }} />
              <span>Đăng ký thi</span>
            </span>
          }
        >
          <Menu.Item key="class">
            <Link to="/class">Danh sách môn học</Link>
          </Menu.Item>
          <Menu.Item key="shift">
            <Link to="/shift">Ca thi</Link>
          </Menu.Item>
          <Menu.Item key="room">
            <Link to="/room">Danh sách phòng thi</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="2"
          onTitleClick={() => {
            this.props.menuOnClick("2");
          }}
          title={
            <span className={styles.viewCenter}>
              <Icon type="user" style={{ fontSize: 16 }} />
              <span>Tài khoản</span>
            </span>
          }
        >
          <Menu.Item key="manage">
            <Link to="/account/manage">Quản lý tài khoản</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
