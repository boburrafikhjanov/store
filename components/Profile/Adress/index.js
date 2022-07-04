import React, { useState, useEffect } from "react";

import Link from "next/link";

import { useTypeDispatch } from "../../../store/hooks/useDispatch";
import { useTypeSelector } from "../../../store/hooks/useSelector";
import Select from "react-select";
import cls from "./adress.module.scss";
import Cookies from "universal-cookie";

import useTranslation from "next-translate/useTranslation";

import { notifyError, notifySuccess } from "../../../helpers/NotifyBtn";

import { LocationIcon, RemoveIcon, NoAdressIcon } from "../../svg";

const Adress = ({ language, setLanguage}) => {
  const {t} = useTranslation()
  const cookies = new Cookies();
  const [regionOption, setRegionOption] = useState();
  const [cityOption, setCityOption] = useState();
  const [hide, setHide] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    full_name: "",
    address: "",
    region_id: 0,
    city_id: 0,
  });

  const {
    fetchCities,
    getUserAddresses,
    changeUserMainAddr,
    removeAdress,
    changeMain,
  } = useTypeDispatch();
  const { cities } = useTypeSelector((state) => state.checkout);
  const { userAddresses, mainAddressChanged } = useTypeSelector(
    (state) => state.profile
  );
  const { address } = formData;

  useEffect(() => {
    if (cookies.get("access_token") && !userAddresses?.length)
      getUserAddresses();
    if (!cities.length) fetchCities();

  }, []);

  useEffect(() => {
    if (mainAddressChanged) notifySuccess(t("common:popupMain"));
    getUserAddresses();

  }, [mainAddressChanged]);

  const mainAddressUpdate = (id) => {
    changeMain(id);
  };

  const parseCitiOptions = () =>
    cities.map((item) => ({ value: item.id, label: item.name }));
  const parseRegionOptions = () => {
    if (cities.length && cityOption?.value) {
      const city = cities.find((c) => c.id === cityOption.value);
      if (city?.regions?.length) {
        return city.regions.map((r) => ({ value: r.id, label: r.name }));
      }
    }
  };

  const addFormData = () => {
    changeUserMainAddr(formData);
    handleHide();
  };

  const handleCheckoutChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCitySelect = (selectOption) => {
    setRegionOption({ value: undefined, label: "Выберите город/район" });
    setCityOption(selectOption);
    setFormData({
      ...formData,

      city_id: selectOption.value ? selectOption.value : 0,
    });
  };

  const handleRegionSelect = (selectOption) => {
    setRegionOption(selectOption);
    setFormData({
      ...formData,

      region_id: selectOption.value ? selectOption.value : 0,
    });
  };

  const handleHide = () => {
    setHide(!hide);
  };

  const handleItemDelete = (id) => {
    removeAdress(id);
    notifyError(t("common:removeAdre"));
  };

  return (
    <div>
      <div>
        {userAddresses.length == 0 ? null : (
          <button onClick={handleHide} className={cls.addAdress}>
            {hide === true ? t("common:addAdress") : t("common:otmenitAdd")}
          </button>
        )}

        {hide === true ? (
          <>
            {userAddresses.length == 0 ? (
              <div className={cls.adressNo}>
                <div>
                  <NoAdressIcon />
                </div>
                <div className={cls.h3}>
                  <h3>{t("common:freeAdress")}</h3>
                  <p>{t("common:noContent")}</p>
                  <button onClick={handleHide} className={cls.addAdress}>
                    {hide === true ? t("common:addAdress") : t("common:otmenitAdd")}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className={cls.wrapCards}>
                  {userAddresses.map((item, i) => (
                    <div key={i} className={cls.card}>
                      <div className={cls.paddingCard}>
                        <div className={cls.noClass}>
                          <div className={cls.adress}>
                            <p className={cls.title}>{item.name}</p>
                            <p className={cls.describtion}>
                              {item.region?.city?.name}
                              <br />
                              {item.region?.name}
                            </p>
                          </div>
                          <div className={cls.btnFeature}>
                            <div className={cls.btn}>
                              <Link
                                href={{
                                  pathname: `/profile/update/[updateAdress]`,
                                  query: { id: item.id },
                                }}
                                as={`profile/update/${item.id}`}
                              >
                                <a>
                                  <LocationIcon />
                                  <p>{t("common:changeAddress")}</p>
                                </a>
                              </Link>
                            </div>
                            <div
                              onClick={() => handleItemDelete(item.id)}
                              className={cls.btn}
                            >
                              <RemoveIcon />
                              <p> {t("common:trash")}</p>
                            </div>
                          </div>
                        </div>

                        <div className={cls.nomerAdress}>
                          <div className={cls.nomer}>
                            <p>{t("common:number")}</p>
                            <p>{item.phone}</p>
                          </div>
                          <div className={cls.nomer}>
                            <p>{t("common:adres")}</p>
                            <p>{item.address}</p>
                          </div>
                        </div>
                        {item.main ? (
                          <button className={cls.mainBtn}>
                            {t("common:mainAdres")}
                          </button>
                        ) : null}
                        {!item.main ? (
                          <button
                            onClick={() => mainAddressUpdate(item.id)}
                            className={cls.mainBtn}
                          >
                            {t("common:addMainAd")}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className={cls.addForm}>
              <div className={cls.wrapInput}>
                <div className={cls.column}>
                  <label>{t("common:naimenivaniya")}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleCheckoutChange}
                  />
                </div>
                <div className={cls.column}>
                  <label>{t("common:fio")}</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleCheckoutChange}
                  />
                </div>
              </div>

              <div className={cls.wrapInput}>
                <div className={cls.column}>
                  <label>{t("common:nomerPoluchatel")}</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+99890 000 00 00"
                    // value={phone}
                    onChange={handleCheckoutChange}
                  />
                </div>
                <div className={cls.column}>
                  <label>Область</label>
                  <Select
                    instanceId={"new-city-addr"}
                    className="my-select"
                    color={"red"}
                    value={cityOption}
                    onChange={handleCitySelect}
                    options={parseCitiOptions()}
                    placeholder={"Выберите область"}
                  />
                </div>
              </div>

              <div className={cls.wrapInput}>
                <div className={cls.column}>
                  <label>Город/Район</label>
                  <Select
                    instanceId={"new-region-addr"}
                    className="my-select"
                    color={"red"}
                    value={regionOption}
                    onChange={handleRegionSelect}
                    options={parseRegionOptions()}
                    placeholder={"Выберите город/район"}
                  />
                </div>
                <div className={cls.column}>
                  <label>{t("common:adres")}</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleCheckoutChange}
                  />
                </div>
              </div>

              <button onClick={addFormData} className={cls.btnSave}>
                {t("common:save")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Adress;
