/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import RegForm from "./RegForm";

import { useTypeSelector } from "../../../store/hooks/useSelector";
import { useTypeDispatch } from "../../../store/hooks/useDispatch";
import { notifySuccess } from "../../../helpers/NotifyBtn";

import { UseSignIcon, YuriIcon } from "../../svg";
import Link from 'next/link'

import VerifyPhone from "./VerifyPhone";

import cls from "./signUp.module.scss";

const SignUp = ({ regStep, handleStepChange }) => {
  const [registerData, setRegisterData] = useState({
    phone: "",
    code: "",
  });
  const { authGenerateCode, authVerifyPhone } = useTypeDispatch();
  const { codeGenerate, phoneVerified } = useTypeSelector(
    (state) => state.auth
  );

  const [showInput, setShowInput] = useState(false);
  const handleShow = () => {
    setShowInput(!showInput);
  };

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
    <>
      <div className="containerFluid">
        {showInput == true ? null : (
          <>
            <div className={cls.innerContainer}>
              <div className={cls.fizLicho}>
      
                <button onClick={handleShow}>
                  <UseSignIcon />
                  <p>Физическое лицо</p>
                </button>
     
              </div>

              <div className={cls.fizLicho}>
                <button button onClick={handleShow}>
                  <YuriIcon />
                  <p>Юридическое лицо</p>
                </button>
              </div>
            </div>
          </>
        )}

        {showInput ? (
          <>
            <div className={cls.wrapRegistration}>
              <div className={cls.signUpInput}>
                <div className={cls.numberLabel}>
                  <div className={cls.numberStep}></div>
                  <div className={cls.inputRecieve}>
                    <div className={cls.style}>
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
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default SignUp;
