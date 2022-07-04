import React, { useState } from "react";

import cls from "./mobileSetting.module.scss";

import NumberFormat from "react-number-format";
import { useRouter } from "next/router";
import { useTypeDispatch } from "../../../store/hooks/useDispatch";
import { useTypeSelector } from "../../../store/hooks/useSelector";
import { notifySuccess } from "../../../helpers/NotifyBtn";

const MobileSetting = () => {
  const [userUpdate, setUserUpdate] = useState({
    first_name: "",
    last_name: "",
    image: null,
    base64Image: null,
    phone: "",
    code: "",
    old_password: "",
    password: "",
    password_confirmation: "",
  });
  const { authLogout } = useTypeDispatch();
  const { userInfo } = useTypeSelector((state) => state.profile);

  const {
    updateProfileInfo,
    authPasswordChange,
    authUpdateCode,
    authUpdatePhone,
  } = useTypeDispatch();

  const userDetailsUpdate = (e) => {
    e.preventDefault();
    const { first_name, last_name, image } = userUpdate;
    const formData = new FormData();
    if (first_name) formData.append("first_name", first_name);
    if (last_name) formData.append("last_name", last_name);
    if (image) formData.append("image", image);
    updateProfileInfo(formData);
    setTimeout(() => {
      notifySuccess("Информация обновлена");
    });
  };

  const phoneVerification = () => {
    const formattedPhone = userUpdate.phone.replace(/\s|\+|_/g, "");
    authUpdateCode({ phone: formattedPhone });
  };

  const codeVerification = () => {
    const formattedPhone = userUpdate.phone.replace(/\s|\+|_/g, "");
    const formattedCode = userUpdate.code.replace(/\s/g, "");
    authUpdatePhone({ phone: formattedPhone, code: formattedCode });
  };

  const userChangePass = () => {
    const { old_password, password, password_confirmation } = userUpdate;
    authPasswordChange({
      old_password,
      password,
      password_confirmation,
    });
    setUserUpdate((prev) => ({
      ...prev,
      old_password: "",
      password: "",
      password_confirmation: "",
    }));
  };

  const handleInputChange = async (e) => {
    if (e.target.files && e.target.files.length) {
      let file = e.target.files[0];
      const base64 = await getBase64(file);
      setUserUpdate((prev) => ({ ...prev, image: file, base64Image: base64 }));
    } else {
      setUserUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  return (
    <>
      <div className={cls.noname}>
        <div className={cls.flex}>
          <label>Имя</label>
          <input
            type="text"
            name={"first_name"}
            className={"verify-element"}
            value={userUpdate.first_name}
            placeholder={userInfo?.first_name}
            onChange={handleInputChange}
          />
        </div>

        <div className={cls.flex}>
          <label>Фамилия</label>
          <input
            type="text"
            name={"last_name"}
            className={"verify-element"}
            value={userUpdate.last_name}
            placeholder={userInfo?.last_name}
            onChange={handleInputChange}
          />
          <button onClick={userDetailsUpdate} className="reciveSms">
            Сохранить
          </button>
        </div>

        <div className={cls.flexIkki}>
          <label>Введите новый номер</label>
          <NumberFormat
            placeholder={"+998"}
            className="verify-element"
            value={userUpdate.phone}
            name={"phone"}
            onChange={handleInputChange}
            prefix={"+998"}
            format="+998 ## ### ## ##"
            mask="_"
            allowEmptyFormatting
            required
            autoComplete={"new-password"}
          />
          <button onClick={phoneVerification} className="reciveSms">
            Получить код
          </button>
        </div>

        <div className={cls.flex}>
          <label>Подтвердите код</label>
          <NumberFormat
            placeholder={"XXXXXX"}
            className="verify-element"
            name="code"
            value={userUpdate.code}
            onChange={handleInputChange}
            format="### ###"
            mask="_"
          />
          <button onClick={codeVerification} className="reciveSmss">
            Подтверждение
          </button>
        </div>
        <div className={cls.flex}>
          <label>Старый пароль</label>
          <input
            type="password"
            name={"old_password"}
            placeholder="* * * * * *"
            value={userUpdate.old_password}
            // placeholder={t("common:oldCode")}
            onChange={handleInputChange}
            className={"verify-element"}
          />
        </div>
        <div className={cls.flex}>
          <label>Новый пароль</label>
          <input
            type="password"
            name={"password"}
            placeholder="* * * * * *"
            value={userUpdate.password}
            // placeholder={t("common:newparol")}
            onChange={handleInputChange}
            className={"verify-element"}
          />
        </div>
        <div className={cls.flex}>
          <label>Подтвердите новый пароль</label>
          <input
            type="password"
            name={"password_confirmation"}
            placeholder="* * * * * *"
            value={userUpdate.password_confirmation}
            // placeholder={t("common:veryNewParol")}
            onChange={handleInputChange}
            className={"verify-element"}
          />
        </div>
      </div>
    </>
  );
};

export default MobileSetting;
