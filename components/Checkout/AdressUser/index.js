import React, { useState, useEffect } from "react";

import { useTypeDispatch } from "../../../store/hooks/useDispatch";
import { useTypeSelector } from "../../../store/hooks/useSelector";

import Select from "react-select";
import Cookies from "universal-cookie";

const AdressUser = ({ formData, setFormData }) => {
  const cookies = new Cookies();
  const {  getUserAddresses } = useTypeDispatch();
  const { userAddresses } = useTypeSelector((state) => state.profile);

  const [cityOption, setCityOption] = useState();
  
  useEffect(() => {
    if (cookies.get("access_token") && userAddresses?.length)
      getUserAddresses();

  }, []);

  const handleCitySelect = (selectOption) => {
    setRegionOption({ value: undefined, label: t("common:catchRegion") });
    setCityOption(selectOption);
    setFormData({
      ...formData,
      address: {
        ...address,
        city_id: selectOption.value ? selectOption.value : 0,
      },
    });
  };

  return (
    <>
      <Select
        instanceId={"new-city-addr"}
        className="my-select"
        color={"red"}
        value={userAddresses[0]?.name}
        onChange={handleCitySelect}
        options={userAddresses.id}
      />
    </>
  );
};

export default AdressUser;
