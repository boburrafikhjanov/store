import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../../api/url";
import Cookies from "universal-cookie";
import Select from "react-select";

import { useTypeDispatch } from "../../../store/hooks/useDispatch";
import { useTypeSelector } from "../../../store/hooks/useSelector";

import cls from "./adress.module.scss";

const ChangeAddress = ({ addresId }) => {
  const [adresNew, setNewAdress] = useState({
    name: "",
    fio: "",
    phone: "",
    adress: "",
  });

  const [regionOption, setRegionOption] = useState();
  const [cityOption, setCityOption] = useState();

  const { fetchCities, getUserAddresses, changeUserMainAddr } =
    useTypeDispatch();
  const { cities } = useTypeSelector((state) => state.checkout);
  const { userAddresses, mainAddressChanged } = useTypeSelector(
    (state) => state.profile
  );
  useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get("access_token") && !userAddresses?.length)
      getUserAddresses();
    if (!cities.length) fetchCities();
  }, []);

  useEffect(() => {
    const cookie = new Cookies();
    let token = cookie.get("access_token");
    axios
      .get(`${url}/api/user/address`, {
        params: {
          address_id: addresId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNewAdress({
          name: response.data.data.name,
          fio: response.data.data.full_name,
          phone: response.data.data.phone,
          adress: response.data.data.address,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const handleCheckoutChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

  return (
    <>
      <div className="containerFluid">
        <div className={cls.addForm}>
          <div className={cls.wrapInput}>
            <div className={cls.column}>
              <label>Hаименование</label>
              <input
                type="text"
                name="name"
                value={adresNew.name}
                onChange={handleCheckoutChange}
              />
            </div>
            <div className={cls.column}>
              <label>ФИО</label>
              <input
                type="text"
                name="full_name"
                value={adresNew.fio}
                onChange={handleCheckoutChange}
              />
            </div>
          </div>

          <div className={cls.wrapInput}>
            <div className={cls.column}>
              <label>Hомер получателя</label>
              <input
                type="tel"
                name="phone"
                placeholder="+99890 000 00 00"
                value={adresNew.phone}
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
              <label>Адрес</label>
              <input
                type="text"
                name="address"
                value={adresNew.adress}
                // onChange={handleCheckoutChange}
              />
            </div>
          </div>

          <button className={cls.btnSave}>Сохранить</button>
        </div>
      </div>
    </>
  );
};

export default ChangeAddress;
