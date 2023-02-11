import React from "react";
import { signup } from "../api/apiCalls";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";

class UserSignupPage extends React.Component {
  //setstate fonksiyonu react'a bir güncellemenin olduğunu haber veriyor.
  // react ise bu güncelleme haberinden sonra render fonksiyonunu çağıyor
  // ve sayfada anlık gücellemeler oluyor.

  state = {
    username: null,
    displayname: null,
    password: null,
    passwordRepeat: null,
    errors: {},
  };

  onChange = (event) => {
    const { t } = this.props;
    const { name, value } = event.target;
    const errors = { ...this.state.errors };

    errors[name] = undefined;
    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = t("Password mismatch");
      } else if (name === "passwordRepeat" && value !== this.state.password) {
        errors.passwordRepeat = t("Password mismatch");
      } else {
        errors.passwordRepeat = undefined;
      }
    }
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

    try {
      const response = await signup(body);
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({ errors: error.response.data.validationErrors });
      }
    }

    // bu yöntem promise biz bunun yerine async await kullandık

    // signup(body)
    //   .then((response) => {
    //     this.setState({ pendingApiCall: false });
    //   })
    //   .catch((error) => {
    //     this.setState({ pendingApiCall: false });
    //   });
  };

  render() {
    const { errors } = this.state;
    const { username, displayname, password, passwordRepeat } = errors;
    const { t, pendingApiCall } = this.props;

    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t("Sign Up")}</h1>
          <Input
            name="username"
            label={t("Username")}
            error={username}
            onChange={this.onChange}
          />
          <Input
            name="displayname"
            label={t("Display Name")}
            error={displayname}
            onChange={this.onChange}
          />
          <Input
            name="password"
            label={t("Password")}
            error={password}
            onChange={this.onChange}
            type="password"
          />
          <Input
            name="passwordRepeat"
            label={t("Password Repeat")}
            error={passwordRepeat}
            onChange={this.onChange}
            type="password"
          />
          <ButtonWithProgress
            disabled={pendingApiCall || passwordRepeat !== undefined}
            onClick={this.onClickSignUp}
            text={t("Sign Up")}
            pendingApiCall={pendingApiCall}
          />
        </form>
      </div>
    );
  }
}


const UserSignupPageWithApiProgress = withApiProgress(
  UserSignupPage,
  "/api/1.0/users"
);
const UserSignupPageWithTranslation = withTranslation()(UserSignupPageWithApiProgress);
export default UserSignupPageWithTranslation;
