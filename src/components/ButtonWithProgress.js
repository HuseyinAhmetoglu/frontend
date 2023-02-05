import React from "react";

const ButtonWithProgress = (props) => {
  const { onClick, pendingApiCall, disabled, text } = props;

  return (
    <div className="mt-2 form-group text-center">
      <button disabled={disabled} onClick={onClick} className="btn btn-primary">
        {pendingApiCall && (
          <span className="spinner-border spinner-border-sm"></span>
        )}
        {text}
      </button>
    </div>
  );
};

export default ButtonWithProgress;
