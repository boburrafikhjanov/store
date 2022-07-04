/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import { useTypeDispatch } from "../../../store/hooks/useDispatch";
import { useTypeSelector } from "../../../store/hooks/useSelector";

import Select from "react-select";
import Cookies from "universal-cookie";

const themeCustom = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    neutral0: "#fafafa",
    primary: "#dddddd",
    primary25: "#eeeeee",
    primary50: "#fafafa",
    primary75: "#dddddd",
  },
});

const AdressForm = ({ formData, setFormData }) => {
  const cookies = new Cookies();
  const { fetchCities, getUserAddresses } = useTypeDispatch();

  const { cities } = useTypeSelector((state) => state.checkout);

  const { userAddresses } = useTypeSelector((state) => state.profile);

  const [cityOption, setCityOption] = useState();
  const [regionOption, setRegionOption] = useState();
  const { address } = formData;

  const handleCitySelect = (selectOption) => {
    setRegionOption({ value: undefined, label: "Выберите город/район" });
    setCityOption(selectOption);
    setFormData({
      ...formData,
      address: {
        ...address,
        city_id: selectOption.value ? selectOption.value : 0,
      },
    });
  };

  const handleRegionSelect = (selectOption) => {
    setRegionOption(selectOption);
    setFormData({
      ...formData,
      address: {
        ...address,
        region_id: selectOption.value ? selectOption.value : 0,
      },
    });
  };

  const handleCheckoutChange = (e) => {
    setFormData({
      ...formData,
      address: { ...address, [e.target.name]: e.target.value },
    });
  };

  useEffect(() => {
    if (cookies.get("access_token") && !userAddresses?.length)
      getUserAddresses();
    if (!cities.length) fetchCities();
  }, []);

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
  return (
    <>
      <form>
        <label htmlFor="fname">Область</label>
        <Select
          theme={(theme) => themeCustom(theme)}
          instanceId={"new-city-addr"}
          className="my-select"
          color={"red"}
          value={cityOption}
          onChange={handleCitySelect}
          options={parseCitiOptions()}
          placeholder={"Выберите область"}
          components={{ IndicatorSeparator: null }}
        />
      </form>
      <form>
        <label htmlFor="fname">Город/Район</label>
        <Select
          components={{ IndicatorSeparator: null }}
          instanceId={"new-region-addr"}
          className="my-select"
          color={"red"}
          value={regionOption}
          onChange={handleRegionSelect}
          options={parseRegionOptions()}
          placeholder={"Выберите город/район"}
          theme={(theme) => themeCustom(theme)}
        />
      </form>
      <form>
        <label htmlFor="fname">Полный адрес</label>
        <input
          type="text"
          name="address"
          value={address.address}
          className="verify-element"
          placeholder={"Например: д.1, кв. 8"}
          onChange={handleCheckoutChange}
          required
          autoComplete={"new-password"}
        />
      </form>
    </>
  );
};

export default AdressForm;
