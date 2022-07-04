import React, { useState } from "react";
import NumberFormat from "react-number-format";

const VerifyCode = ({
  verifyType,
  code,
  handleInputChange,
  phone,
  step,
  handleFormSubmit,
}) => {
  return (
    <>
      <NumberFormat
        placeholder={"XXXXXX"}
        className="verify-element"
        name="code"
        value={code}
        onChange={(event) => handleInputChange(event)}
        format="### ###"
        mask="_"
      />
    </>
  );
};

export default VerifyCode;
