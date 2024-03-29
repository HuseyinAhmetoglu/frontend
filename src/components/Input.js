import React from "react";

const Input = (props) => {
  const { name, label, error, onChange, type } = props;
  const className = error ? "form-control is-invalid" : "form-control";
  return (
    <div className="form-group">
      <label className="form-label mt-2">{label}</label>
      <input
        name={name}
        onChange={onChange}
        className={className}
        type = {type}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Input;
