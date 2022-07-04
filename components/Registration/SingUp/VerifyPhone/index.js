import React, { useState } from "react";
import NumberFormat from "react-number-format";
import FormPassUpdate from '../UpdatePass/Form'

import RegForm from "../RegForm/RegForms";

const VerifyPhone = ({
  verifyType,
  code,
  handleInputChange,
  phone,
  step,
  handleFormSubmit,
}) => {
  return (
    <>
      {step === 1 || step === 2 ? (
        <div className="initial-verify">
          <div>
            <p className="">
              {step === 1 ? (
                <>
                  <div className="wrapStepOne">
                    <p className="activeStep">1</p>
                    <p>Номер телефона</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="wrapStepOne">
                    <p className="activeStep">2</p>
                    <p>Введите код из SMS</p>
                  </div>
                </>
              )}
            </p>
            {step === 1 ? (
              <NumberFormat
                placeholder={"+998 __ ___ __ __"}
                className="verify-element"
                name="phone"
                value={phone}
                onChange={(event) => handleInputChange(event)}
                prefix={"+998"}
                format="+998 ## ### ## ##"
                mask="_"
                allowEmptyFormatting
              />
            ) : (
              <div>
                <NumberFormat
                  placeholder={"XXXXXX"}
                  className="verify-element"
                  name="code"
                  value={code}
                  onChange={(event) => handleInputChange(event)}
                  format="### ###"
                  mask="_"
                />
                <div className="code-verify-timer">
                </div>
              </div>
            )}
          </div>
          <div className="verifybtn">
            <button onClick={handleFormSubmit} className="btnSend">
            {step === 2 ? 'Подтвердить' : 'Получить код'}
            </button>
          </div>
        </div>
      ) : step === 3 ? (
        verifyType === "register" ? (
          <RegForm />
        ) : (
          <FormPassUpdate />
        )
      ) : null}
    </>
  );
};

export default VerifyPhone;
