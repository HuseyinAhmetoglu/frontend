import React from "react";
import { signup } from "../api/apiCalls";
import Input from "../components/Input";

class UserSignupPage extends React.Component {
  state = {
    username: null,
    displayname: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false,
    errors: {},
  };

  onChange = (event) => {
    const { name, value } = event.target;
    const errors = { ...this.state.errors };
    errors[name] = undefined;
    this.setState({
      [name]: value,
      errors,
    });
  };

  onClickSignUp = async (event) => {
    event.preventDefault();
    const { username, displayname, password } = this.state;
    const body = {
      username,
      displayname,
      password,
    };
    this.setState({ pendingApiCall: true });

    try {
      const response = await signup(body);
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({ errors: error.response.data.validationErrors });
      }
    }
    this.setState({ pendingApiCall: false });

    // signup(body)
    //   .then((response) => {
    //     this.setState({ pendingApiCall: false });
    //   })
    //   .catch((error) => {
    //     this.setState({ pendingApiCall: false });
    //   });
  };

  render() {
    const { pendingApiCall, errors } = this.state;
    const { username, displayname } = errors;

    return (
      <div className="container">
        <form>
          <h1 className="text-center">Sign Up</h1>
          <Input name="username" label="Username" error={username} onChange={this.onChange} /> 
          <Input name="displayname" label="Display Name" error={displayname} onChange={this.onChange} /> 

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              onChange={this.onChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password Repeat</label>
            <input
              type="password"
              name="passwordRepeat"
              onChange={this.onChange}
              className="form-control"
            />
          </div>
          <div className="form-group mt-2">
            <button
              disabled={pendingApiCall}
              onClick={this.onClickSignUp}
              className="btn btn-primary"
            >
              {pendingApiCall ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                ""
              )}{" "}
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserSignupPage;
