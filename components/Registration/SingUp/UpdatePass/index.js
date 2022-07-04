import React, { useState, useEffect } from "react";

import VerifyPhone from "../VerifyPhone";
import { Form, Formik, Field } from "formik";
import { object, string } from "yup";
import { useRouter } from "next/router";
import { useTypeSelector } from "../../../../store/hooks/useSelector";
import { useTypeDispatch } from "../../../../store/hooks/useDispatch";
import { notifySuccess, notifyError } from "../../../../helpers/NotifyBtn";
import StepBy from "../Step";

import cls from "./update.module.scss";

const UpdatePass = ({ forgotStep, handleStepChange }) => {
  const { authVerifyPhone, authUpdateCode } = useTypeDispatch();
  const { codeUpdate, phoneVerified } = useTypeSelector((state) => state.auth);

  const [forgotData, setForgotData] = useState({
    phone: "",
    code: "",
  });

  useEffect(() => {
    if (codeUpdate?.message && codeUpdate.phone) {
      notifySuccess(codeUpdate.message);
      handleStepChange(2);
    }
    if (phoneVerified?.id && phoneVerified.key) {
      notifySuccess(phoneVerified.message);
      handleStepChange(3);
    }
  }, [codeUpdate, phoneVerified]);

  const handleChange = (e) => {
    setForgotData({ ...forgotData, [e.target.name]: e.target.value });
  };

  const handleForgotClick = async () => {
    const formattedPhone = forgotData.phone.replace(/\s|\+|_/g, "");
    const formattedCode = forgotData.code.replace(/\s/g, "");
    const defaultData = { phone: formattedPhone };

    if (forgotStep === 1) {
      await authUpdateCode(defaultData);
    } else if (forgotStep === 2) {
      await authVerifyPhone({ ...defaultData, code: formattedCode });
    }
  };

  return (
    <>
      <div className={cls.container}>
        <VerifyPhone
          verifyType={"forgot"}
          step={forgotStep}
          phone={forgotData.phone}
          code={forgotData.code}
          handleInputChange={handleChange}
          handleFormSubmit={handleForgotClick}
        />
      </div>
    </>
  );
};

export default UpdatePass;
