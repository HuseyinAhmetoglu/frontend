import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/hoaxify.png";

class TopBar extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="shadow-sm bg-body-tertiary mb-3">
        <nav className="navbar navbar-light container navbar-expand">
          <Link className="navbar-brand" to="/">
            <img src={logo} width="60" />
            Hoaxify
          </Link>

          <ul className="navbar-nav ms-auto">
            <li>
              <Link className="nav-link" to="/login">
                {t("Login")}
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/signup">
                {t("Sign Up")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default withTranslation()(TopBar);
