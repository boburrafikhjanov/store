/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

import NumberFormat from "react-number-format";

import { useTypeDispatch } from "../../../store/hooks/useDispatch";
import { useTypeSelector } from "../../../store/hooks/useSelector";
import { notifySuccess } from "../../../helpers/NotifyBtn";

import cls from "./authorization.module.scss";

const Authorization = () => {
  const [registerData, setRegisterData] = useState({
    phone: "",
    password: "",
  });
  const { push } = useRouter();
  const { authLogin, profileInfo } = useTypeDispatch();
  const { userLogin } = useTypeSelector((state) => state.auth);

  const { phone, password } = registerData;

  useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get("access_token")) push("/profile");
    else handleLogin();
  }, [userLogin]);

  const handleLogin = async () => {
    if (userLogin) {
      notifySuccess("Вы успешно авторизовались");
      await profileInfo();
      push("/profile");
    }
  };

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleAuth = (e) => {
    e.preventDefault();
    const phone = registerData.phone.replace(/\s|\+|_/g, "");
    authLogin({ ...registerData, phone });
  };
  return (
    <>
      <div className="containerFluid">
        <div className={cls.containerAuth}>
          <form onSubmit={handleAuth} className={cls.wrapInput}>
            <label>Номер телефона</label>
            <NumberFormat
              placeholder={"+998 __ ___ __ __"}
              className="verify-element"
              name="phone"
              value={phone}
              onChange={handleChange}
              prefix={"+998"}
              format="+998 ## ### ## ##"
              mask="_"
              allowEmptyFormatting
            />
            <br />

            <label>Пароль</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="verify-element"
              placeholder={"Введите пароль"}
            />
            <br />

            <div className={cls.submitBtn}>
              <button className={cls.signIn}>Войти</button>
              <Link href="/changePassword">
                <a>
                  <button className={cls.forgot}>Забыли пароль</button>
                </a>
              </Link>
            </div>
            <div className={cls.noAccount}>
              <p>
                У вас нет аккаунта?
                <Link href="/register">
                  <a>
                   <span> Зарегистрироваться</span>
                  </a>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Authorization;
