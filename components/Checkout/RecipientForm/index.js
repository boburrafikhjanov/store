import React, { useState } from "react";

import NumberFormat from "react-number-format";
import cls from "./recipient.module.scss";

const RecipientForm = ({ formData, setFormData }) => {
  const { address } = formData;
  const [phone, setPhone] = useState("");
  const handleCheckoutChange = (e) => {
    setFormData({
      ...formData,
      address: { ...address, [e.target.name]: e.target.value },
    });
  };
  
  const handlePhoneChange = (e) => {
    const formattedPhone = e.target.value.replace(/\s|\+|_/g, "");
    setPhone(e.target.value);
    setFormData({
      ...formData,
      address: { ...address, phone: formattedPhone },
    });
  };
  return (
    <>
      <div className={cls.wrapInput}>
        <div className={cls.wrapLabel}>
          <p>Имя получателя</p>
          <input
           type="text"
           name="full_name"
            value={address.full_name}
            onChange={handleCheckoutChange}
            className={cls.input}
          />
        </div>
        <div className={cls.wrapLabel}>
          <p>Номер телефона получателя</p>
          <NumberFormat
            placeholder={"+998"}
            className={cls.input}
            value={phone}
            onChange={handlePhoneChange}
            prefix={"+998"}
            format="+998 ## ### ## ##"
            mask="_"
            allowEmptyFormatting
            required
            autoComplete={"new-password"}
          />
        </div>
      </div>
    </>
  );
};

export default RecipientForm;
