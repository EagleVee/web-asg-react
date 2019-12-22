import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Styles/LoginPage.module.css";
import LoginImage from "../Images/login.png";
import AuthActions from "../Redux/AuthActions";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.renderForm()}
          <div className="align-self-center col-6 d-sm-none d-md-none d-lg-inline overflow-hidden">
            <img src={LoginImage} className={styles.loginImage} alt="login" />
          </div>
        </div>
      </div>
    );
  }

  renderForm() {
    const { error } = this.state;
    return (
      <div className="align-self-center col-lg-6 col-md-12 col-sm-12">
        <div>
          <h2 className={styles.headerMainText}>ABC Uni</h2>
          <h2 className={styles.headerText}>Đăng nhập</h2>
        </div>
        <form onSubmit={this.loginOnSubmit}>
          <div className="">
            {error !== "" ? <p className="text-danger">{error}</p> : <div />}
            <p className="p-2 text-left">Tên đăng nhập</p>
            <input
              type="email"
              className={`mb-3 col-md-10 ${styles.loginInput}`}
              name="email"
              placeholder="Tên đăng nhập của bạn"
              onChange={this.handleUsernameOnChange}
            />
            <p className="p-2 text-left">Password</p>
            <input
              type="password"
              className={`mb-3 col-md-10 ${styles.loginInput}`}
              name="password"
              placeholder="Mật khẩu của bạn"
              onChange={this.handlePasswordOnChange}
            />
          </div>
          {this.renderFormFooter()}
        </form>
      </div>
    );
  }

  renderFormFooter() {
    return (
      <div className="footer row">
        <div className="col-5 text-left">
          <Link
            className={`btn btn-outline-primary btn-white ${styles.footerBtn}`}
            to="/register"
          >
            Register
          </Link>
        </div>
        <div className="col-5 text-right">
          <button
            type="submit"
            className={`btn btn-primary ${styles.footerBtn}`}
            onClick={this.loginOnSubmit}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  handleUsernameOnChange = event => {
    const value = event.target.value;
    this.setState({
      username: value
    });
  };

  handlePasswordOnChange = event => {
    const value = event.target.value;
    this.setState({
      password: value
    });
  };

  loginOnSubmit = event => {
    event.preventDefault();
    this.doLogin();
  };

  doLogin = () => {
    const { username, password } = this.state;
    const { login } = this.props;
    login(username, password, this.loginOnSuccess, this.loginOnFailed);
  };

  loginOnSuccess = () => {
    // this.props.history.push("/");
  };

  loginOnFailed = response => {
    const { message } = response;
    this.setState({
      error: message
    });
  };
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password, onSuccess, onFailed) =>
      dispatch(AuthActions.login(username, password, onSuccess, onFailed))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
