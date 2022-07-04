/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useTypeSelector } from "../../../store/hooks/useSelector";
import { useTypeDispatch } from "../../../store/hooks/useDispatch";

const Payment = ({ disable, formData, handlePayClick }) => {
  const cookies = new Cookies();

  const { paymentOptions } = useTypeSelector((state) => state.checkout);
  const { userInfo } = useTypeSelector((state) => state.profile);

  const { fetchPaymentOptions, profileInfo } = useTypeDispatch();
  const { payment_id } = formData;

  useEffect(() => {
    if (!paymentOptions.length) fetchPaymentOptions();
    if (cookies.get("access_token") && !userInfo?.id) profileInfo();
  }, []);

  const items = paymentOptions;
  const valuesToRemove = [paymentOptions[0], paymentOptions[3]];
  const filteredItems =
    disable == 4
      ? items.filter((item) => !valuesToRemove.includes(item))
      : paymentOptions;

  const renderPaymentOptions = () =>
    (filteredItems || items).map((item, i) => (
      <div className="wrappayment" key={i}>
        <div title={item.description}>
          <div
            className={`checkoutOption ${
              payment_id === item.id ? "activeOne" : ""
            }`}
            onClick={() => handlePayClick(item.id)}
          >
            <img
              className={i <= 1 || i === 3 ? "invertible" : ""}
              src={`/img/categories/${item.code}.svg`}
              alt={item.code}
            />
            <h4
              className={`contentOne ${
                payment_id === item.id ? "activeOne" : ""
              }`}
            >
              {item.name}
            </h4>
          </div>
        </div>
      </div>
    ));
  return (
    <>
      <div className="wrapAll">{renderPaymentOptions()}</div>
    </>
  );
};

export default Payment;
