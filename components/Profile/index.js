import React, { useState } from "react";

import Image from "next/image";
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";
import { useTypeDispatch } from "../../store/hooks/useDispatch";
import { useTypeSelector } from "../../store/hooks/useSelector";
import { notifySuccess } from "../../helpers/NotifyBtn";

import MobileSetting from "./MobileSetting";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import useTranslation from "next-translate/useTranslation";

import cls from "./profile.module.scss";
import { ArrowRightIcon, KashIcon, DefaultUserIcon } from "../svg";
import OrderProfile from "./Orders";
import Adress from "./Adress";

export default function Profile() {
  const router = useRouter();
  const { t } = useTranslation();

  const [change, setChange] = useState(false);
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

  const handleProfileChangeForm = (e) => {
    e.preventDefault();
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

  const phoneVerification = () => {
    const formattedPhone = userUpdate.phone.replace(/\s|\+|_/g, "");
    authUpdateCode({ phone: formattedPhone });
  };

  const codeVerification = () => {
    const formattedPhone = userUpdate.phone.replace(/\s|\+|_/g, "");
    const formattedCode = userUpdate.code.replace(/\s/g, "");
    authUpdatePhone({ phone: formattedPhone, code: formattedCode });
  };

  const changeOne = () => {
    setChange((change) => !change);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <>
      <div className="containerFluid">
        <div className={cls.routeLink}>
          <div>
            <h3 className={cls.nonactiveTitle}>{t("common:main")}</h3>
          </div>
          <div>
            <ArrowRightIcon />
          </div>
          <div>
            <span className={cls.activeTitle}>{t("common:userKabinet")}</span>
          </div>
        </div>
        <div className={cls.tabsProfile}>
          <Tabs>
            <TabList>
              <Tab>{t("common:dataUser")}</Tab>
              <Tab>{t("common:moiZakaz")}</Tab>
              <Tab>{t("common:moiAdress")}</Tab>
            </TabList>
            <TabPanel>
              <div className={cls.profileSection}>
                <div className={cls.containerProfile}>
                  <div className={`${cls.imageProfile} nextImage`}>
                    {userInfo?.image ? (
                      <>
                        <Image layout="fill" src={userInfo?.image.url} />
                      </>
                    ) : (
                      <DefaultUserIcon />
                    )}

                    <input
                      id={"img-file"}
                      type={"file"}
                      name={"image"}
                      accept=".jpg, .jpeg, .png, image/*"
                      onChange={handleInputChange}
                      style={{ display: "none" }}
                    />
                    <div className={cls.btnImage}>
                      <div className="col-xl-4 mt-4">
                        <label
                          htmlFor="img-file"
                          className={"verify-element text-center"}
                        >
                          {t("common:changeImage")}
                        </label>
                        <input
                          id={"img-file"}
                          type={"file"}
                          name={"image"}
                          accept=".jpg, .jpeg, .png, image/*"
                          // onChange={handleInputChange}
                          style={{ display: "none" }}
                        />
                      </div>

                      <button
                        style={{ cursor: "pointer" }}
                        className={cls.removeImage}
                        onClick={userDetailsUpdate}
                      >
                        {t("common:verify")}
                      </button>
                    </div>
                  </div>

                  <div className={cls.infoPerson}>
                    <div className={`${cls.balanceProfile} ${change === true ? 'noooo' : ""}`}>
                      {change === true ? null : (
                        <div className={cls.balanceMan}>
                          <KashIcon />
                          <span>{t("common:balans")}</span>
                          <p>
                            {userInfo.cashback
                              ?.toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                            {t("common:currency")}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      {change === true ? null : (
                        <>
                          <div className={cls.itemInfo}>
                            <table>
                              <tr className={cls.lkj}>
                                <td className={cls.name}>
                                  {t("common:name")}:
                                </td>
                                <td className={cls.paddingLeft}>
                                  {" "}
                                  {userInfo.first_name}
                                </td>
                              </tr>
                              <tr className={cls.lkj}>
                                <td className={cls.name}>
                                  {t("common:familiya")}:
                                </td>
                                <td className={cls.paddingLeft}>
                                  {userInfo.last_name}
                                </td>
                              </tr>
                              <tr className={cls.lkj}>
                                <td className={cls.name}>
                                  {t("common:phoneNumber")}:
                                </td>
                                <td className={cls.paddingLeft}>
                                  {userInfo.phone}
                                </td>
                              </tr>
                              <tr className={cls.lkj}>
                                <td className={cls.name}>
                                  {t("common:elPochta")}
                                </td>
                                <td className={cls.paddingLeft}>
                                  {userInfo.email}
                                </td>
                              </tr>

                              <tr className={cls.lkj}>
                                <td className={cls.name}>BRANDSTORE_ID:</td>
                                <td className={cls.paddingLeft}>
                                  {" "}
                                  {userInfo.id}
                                </td>
                              </tr>
                            </table>
                          </div>
                        </>
                      )}

                      {change ? (
                        <div className="yoqotma">
                          <MobileSetting />
                        </div>
                      ) : null}

                      <div className="yoqot">
                        {change ? (
                          <>
                            <div className={cls.changeInfo}>
                              <form className={cls.inputChange}>
                                <label>{t("common:name")}</label>
                                <div className={cls.inputOne}>
                                  <input
                                    type="text"
                                    name={"first_name"}
                                    className={"verify-element"}
                                    value={userUpdate.first_name}
                                    placeholder={userInfo?.first_name}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </form>
                              <form className={cls.inputChange}>
                                <label>{t("common:familiya")}</label>
                                <div className={cls.inputOne}>
                                  <input
                                    type="text"
                                    name={"last_name"}
                                    className={"verify-element"}
                                    value={userUpdate.last_name}
                                    placeholder={userInfo?.last_name}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <button
                                  style={{
                                    position: "relative",
                                    marginLeft: "135px",
                                  }}
                                  onClick={userDetailsUpdate}
                                  className="reciveSms"
                                >
                                  {t("common:save")}
                                </button>
                              </form>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div className={cls.inputChange}>
                                  <label>{t("common:vvediteNumber")}</label>
                                  <div className={cls.inputOne}>
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
                                  </div>
                                </div>
                                <button
                                  onClick={phoneVerification}
                                  className="reciveSms"
                                >
                                  {t("common:poluchitKod")}
                                </button>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div className={cls.inputChange}>
                                  <label>{t("common:podverditKod")}</label>
                                  <div className={cls.inputOne}>
                                    <NumberFormat
                                      placeholder={"XXXXXX"}
                                      className="verify-element"
                                      name="code"
                                      value={userUpdate.code}
                                      onChange={handleInputChange}
                                      format="### ###"
                                      mask="_"
                                    />
                                  </div>
                                </div>
                                <button
                                  onClick={codeVerification}
                                  className="reciveSms"
                                >
                                  {t("common:podverjdeniya")}
                                </button>
                              </div>

                              <div className={cls.inputChange}>
                                <label>{t("common:oldCode")}</label>
                                <div className={cls.inputOne}>
                                  <input
                                    type="password"
                                    name={"old_password"}
                                    placeholder="* * * * * *"
                                    value={userUpdate.old_password}
                                    // placeholder={t("common:oldCode")}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className={cls.inputChange}>
                                <label>{t("common:newparol")}</label>
                                <div className={cls.inputOne}>
                                  <input
                                    type="password"
                                    name={"password"}
                                    placeholder="* * * * * *"
                                    value={userUpdate.password}
                                    // placeholder={t("common:newparol")}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className={cls.inputChange}>
                                <label>{t("common:")}</label>
                                <div className={cls.inputOne}>
                                  <input
                                    type="password"
                                    name={"password_confirmation"}
                                    placeholder="* * * * * *"
                                    value={userUpdate.password_confirmation}
                                    // placeholder={t("common:veryNewParol")}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                      <div className={cls.btnClear}>
                        {change ? (
                          <>
                            <button
                              onClick={userChangePass}
                              className={cls.changeBtn}
                            >
                              {t("common:preminitChange")}
                            </button>
                            <button className={cls.exitBtn} onClick={changeOne}>
                              {t("common:otmen")}
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className={cls.changeBtn}
                              onClick={changeOne}
                            >
                              {t("common:chaneg")}
                            </button>
                            <button
                              onClick={async () => {
                                await authLogout();
                                notifySuccess("Вы вышли из аккаунта");
                                router.push("/");
                              }}
                              className={cls.exitBtn}
                            >
                              {t("common:logOUt")}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <OrderProfile />
            </TabPanel>
            <TabPanel>
              <Adress />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
}
