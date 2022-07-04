/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import NumberFormat from "react-number-format";
import { useTypeSelector } from "../../../store/hooks/useSelector";
import { useTypeDispatch } from "../../../store/hooks/useDispatch";
import { notifySuccess } from "../../../helpers/NotifyBtn";

import "notyf/notyf.min.css";

const VerifyPhone = ({ formData, setFormData }) => {
  
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [hide, setHide] = useState(false);
  const [active, setActive] = useState(false)

  const { phoneVerified } = useTypeSelector((state) => state.auth);
  const { authUpdateCode, authVerifyPhone } = useTypeDispatch();

  const phoneVerification = () => {
    const formattedPhone = phone.replace(/\s|\+|_/g, "");
    authUpdateCode({ phone: formattedPhone });
    setActive(true)
  };

  const codeVerification = () => {
    const formattedPhone = phone.replace(/\s|\+|_/g, "");
    const formattedCode = code.replace(/\s/g, "");
    authVerifyPhone({ phone: formattedPhone, code: formattedCode });
    setTimeout(() => {
      setHide(true);
    }, 50);
  };

  const handleChange = (e) => {
    if (e.target.name === "phone") setPhone(e.target.value);
    else if (e.target.name === "code") setCode(e.target.value);
  };

  useEffect(() => {
    if (phoneVerified?.id) {
      notifySuccess(phoneVerified.message);
      setFormData({
        ...formData,
        user_id: phoneVerified.id.toString(),
        user_key: phoneVerified.key,
      });
    }
  }, [phoneVerified]);

  return (
    <>
      {hide == false ? (
        <>
          <form>
            <label htmlFor="fname">Телефон</label>
            <div className="wrapPhone">
              <NumberFormat
                placeholder={"+998"}
                className="verify-element"
                value={phone}
                name={"phone"}
                onChange={handleChange}
                prefix={"+998"}
                format="+998 ## ### ## ##"
                mask="_"
                allowEmptyFormatting
                required
                autoComplete={"new-password"}
              />
              <button
                type={"button"}
                style={{ cursor: "pointer" }}
                className={`${active ? "activeeee" : "bttm"}`}
                disabled={active === true}
                onClick={phoneVerification}
              >
                Получить код
              </button>
            </div>
          </form>

          <form className="code">
            <label htmlFor="fname">Код</label>
            <div className="wrapPhone">
              <NumberFormat
                placeholder={"XXXXXX"}
                className="verify-element"
                name="code"
                value={code}
                onChange={handleChange}
                format="### ###"
                mask="_"
              />

              <button
                type={"button"}
                className="verifyElement"
                onClick={codeVerification}
                style={{ cursor: "pointer" }}
              >
                Подтверждение
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="hideSucces">
            <div>
              <h4>Номер телефона подтвержден</h4>
              <p>Пожалуйста, продолжите оформление заказа ниже</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VerifyPhone;
