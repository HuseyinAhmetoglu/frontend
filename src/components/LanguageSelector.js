import React from "react";
import { withTranslation } from "react-i18next";
import { changeLanguage } from "../api/apiCalls";

const LanguageSelector = (props) => {
  const onChangeLanguage = (language) => {
    const { i18n } = props;
    i18n.changeLanguage(language);
    changeLanguage(language);
  };

  return (
    <div className="container">
      <img
        src="https://flagsapi.com/TR/flat/24.png"
        alt="turkiye-flag"
        onClick={() => onChangeLanguage("tr")}
        style={{ cursor: "pointer" }}
      ></img>
      <img
        src="https://flagsapi.com/US/flat/24.png"
        alt="usa-flag"
        onClick={() => onChangeLanguage("en")}
        style={{ cursor: "pointer" }}
      ></img>
    </div>
  );
};

export default withTranslation()(LanguageSelector);
