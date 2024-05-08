import { Component } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
  };

  renderUserName = () => {
    const { username } = this.state;
    return (
      <div className="username">
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          value={username}
          onChange={this.updateUserName}
          id="username"
        />
      </div>
    );
  };

  renderPassword = () => {
    const { password } = this.state;
    return (
      <div className="password">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={this.updatePassword}
          id="password"
        />
      </div>
    );
  };

  updateUserName = (event) => {
    this.setState({ username: event.target.value });
  };

  updatePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;

    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
    });
    history.push("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  render() {
    const { showSubmitError, errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-containor">
        <form onSubmit={this.submitForm} className="form-containor">
          <h1 className="heading">Login Form</h1>
          {this.renderUserName()}
          {this.renderPassword()}
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    );
  }
}

export default LoginForm;
