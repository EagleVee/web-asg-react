import React, { Component } from "react";
import { Icon, Layout, Menu } from "antd";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Styles/Container.module.css";
import { connect } from "react-redux";
import AuthActions from "../Redux/AuthActions";
import ModalHelper from "../Common/ModalHelper";
import history from "../Navigation/History";

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
            <Link to="/shift">Danh sách ca thi</Link>
          </Menu.Item>
          <Menu.Item key="shift-registered">
            <Link to="/shift/registered">Đã đăng ký</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="3"
          title={
            <span className={styles.viewCenter}>
              <Icon type="setting" style={{ fontSize: 16 }} />
              <span>Thiết lập</span>
            </span>
          }
        >
          <Menu.Item
            key="manage"
            onClick={() => {
              ModalHelper.showConfirmModal({
                content: "Bạn có chắc muốn đăng xuất khỏi hệ thống?",
                onOk: () => {
                  this.props.logout();
                }
              });
            }}
          >
            <Link to="/account/manage">Đăng xuất</Link>
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
            <Link to="/shift">Danh sách ca thi</Link>
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
        <Menu.SubMenu
          key="3"
          title={
            <span className={styles.viewCenter}>
              <Icon type="setting" style={{ fontSize: 16 }} />
              <span>Thiết lập</span>
            </span>
          }
        >
          <Menu.Item
            key="manage"
            onClick={() => {
              ModalHelper.showConfirmModal({
                content: "Bạn có chắc muốn đăng xuất khỏi hệ thống?",
                onOk: () => {
                  this.logout();
                }
              });
            }}
          >
            Đăng xuất
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }

  logout = () => {
    this.props.logout(this.logoutSuccess, this.logoutFailed);
  };

  logoutSuccess = () => {
    ModalHelper.showSuccessModal({
      content: "Đăng xuất thành công",
      onOk: () => {
        history.push("/login");
      }
    });
  };

  logoutFailed = () => {
    ModalHelper.showErrorModal({
      content: "Có lỗi xảy ra khi đăng xuất, vui lòng thử lại"
    });
  };
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  logout: (onSuccess, onFailed) =>
    dispatch(AuthActions.logoutToken(onSuccess, onFailed))
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
