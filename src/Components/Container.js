import React, { Component } from "react";
import { Icon, Layout, Menu } from "antd";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NoImage from "../Images/no_image_available_10.png";
import "./Styles/Container.css";
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
    return (
      <Menu
        theme="dark"
        style={{ height: "100vh" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub-message"]}
        mode="inline"
      >
        <Menu.SubMenu
          key="conversation"
          onTitleClick={() => {
            this.props.menuOnClick("conversation");
          }}
          title={
            <span>
              <Icon type="message" style={{ fontSize: 20 }} />
              <span>Tin nhắn</span>
            </span>
          }
        >
          <Menu.Item key="message">
            <Link to="/message">Tất cả tin nhắn</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
