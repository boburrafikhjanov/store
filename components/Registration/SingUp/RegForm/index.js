import React, { FC, useEffect, useState } from "react";
import { useTypeSelector } from "../../../../store/hooks/useSelector";
import { useTypeDispatch } from "../../../../store/hooks/useDispatch";
import { notifySuccess } from "../../../../helpers/NotifyBtn";
import VerifyPhone from "../VerifyPhone";

const Register = ({ regStep, handleStepChange }) => {
  const [registerData, setRegisterData] = useState({
    phone: "",
    code: "",
  });
  const { authGenerateCode, authVerifyPhone } = useTypeDispatch();
  const { codeGenerate, phoneVerified } = useTypeSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (codeGenerate?.message && codeGenerate.phone) {
      notifySuccess(codeGenerate.message);
      handleStepChange(2);
    }
    if (phoneVerified?.id && phoneVerified.key) {
      notifySuccess(phoneVerified.message);
      handleStepChange(3);
    }
  }, [codeGenerate, phoneVerified]);

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const renderRegSteps = () =>
    [1, 2, 3].map((i) => (
      <div className={`step ${regStep === i ? "active" : ""}`} key={i}></div>
    ));

  const handleRegisterClick = async () => {
    const formattedPhone = registerData.phone.replace(/\s|\+|_/g, "");
    const formattedCode = registerData.code.replace(/\s/g, "");
    const defaultData = { phone: formattedPhone };

    if (regStep === 1) {
      await authGenerateCode(defaultData);
    } else if (regStep === 2) {
      await authVerifyPhone({ ...defaultData, code: formattedCode });
    }
  };

  return (
    <div className="containerFluid">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="auth-box">
            <div className="a-head">
              <h4>
                <strong>Регистрация</strong>
              </h4>
            </div>
            <div className="register-steps">{/* {renderRegSteps()} */}</div>

            <VerifyPhone
              verifyType={"register"}
              step={regStep}
              phone={registerData.phone}
              code={registerData.code}
              handleInputChange={handleChange}
              handleFormSubmit={handleRegisterClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
