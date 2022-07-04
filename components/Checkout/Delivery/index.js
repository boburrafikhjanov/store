/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import { useTypeSelector } from "../../../store/hooks/useSelector";
import { useTypeDispatch } from "../../../store/hooks/useDispatch";


const Delivery = ({ formData, setFormData }) => {

  const { deliveryOptions } = useTypeSelector((state) => state.checkout);
  const { fetchDeliveryOptions } = useTypeDispatch();
  const { delivery_id, address } = formData;
  
  useEffect(() => {
    if (!deliveryOptions.length) fetchDeliveryOptions();

  }, []);

  const images = ["shopping-cart",  "location","delivery","shipped"];

  const handleDeliveryClick = (id) => {
    setFormData({ ...formData, delivery_id: id });
  };

  const renderDeliveryOptions = () => {
    return deliveryOptions?.map((item, i) => {
      if (item.id === 2 && address.city_id && address.city_id !== 1)
        return null;
      else if (item.id === 4 && address.city_id === 1) return null;
      else
        return (
          <div className="wrapDelvery" key={i}>
            <div title={item.description}>
              <div
                className={`checkoutoOption ${
                  delivery_id === item.id ? "activeOne" : ""
                }`}
                onClick={() => handleDeliveryClick(item.id)}
              >
                <img
                  className={"invertible"}
                  src={`/img/categories/${images[i]}.svg`}
                  alt={images[i]}
                />
                <h4 className={`contentOne ${
                  delivery_id === item.id ? "activeOne" : ""
                }`}>{item.name}</h4>
              </div>
            </div>
          </div>
        );
    });
  };

  return (
    <>
      <div className="contentCheckout">{renderDeliveryOptions()}</div>
    </>
  );
};

export default Delivery;
