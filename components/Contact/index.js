import React, { useState } from "react";
import axios from "axios";
import url from "../../api/url";
import { ArrowRightIcon } from "../svg";
import styles from "./contact.module.scss";
import { notifySuccess, notifyError } from "../../helpers/NotifyBtn";

const Contact = () => {

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const SendForm = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${url}/api/call_request/send`,
      data: { phone: phone, name: name, email: email, info: message },
    })
      .then((response) => {
        notifySuccess(props.translate("notifications.modRequest"));
      })
      .catch((error) => {
        notifyError(error);
      });
  };

  return (
    <>
      <div className="containerFluid">
        <div className={styles.router}>
          <p className={styles.non}>Главная</p>
          <ArrowRightIcon />
          <p className={styles.no}>Контакты</p>
        </div>
        <form onSubmit={SendForm}>
          <div id="contacts" className={styles.Container}>
            <div className={styles.AddressContainer}>
              <div className={styles.AddressWrapper}>
                <h3 className={styles.Title}>АДРЕС</h3>
                <p className={styles.Paragraph}>
                  Узбекистан, Ташкент, улица Шота Руставели, 20
                </p>

                <h3 className={styles.Title}>Email:</h3>
                <p className={styles.Paragraph}>
                  info@brandstore.uz
                  <br />
                  <br />
                  <br />
                  <br />
                </p>
                <h3 className={styles.Title}>Контактные номера:</h3>
                <a
                  href="tel:+998781503311"
                  className={styles.Phone}
                  // onClick={handleTrackPhone}
                >
                  +998
                  <span className={styles.PhoneBig}> 71 205-93-93</span>
                </a>
              </div>
            </div>
            <div id="form-container" className={styles.FormContainer}>
              <React.Fragment>
                <input
                  type="text"
                  value={name}
                  name="name"
                  placeholder="Имя"
                  onChange={(e)=>setName(e.target.value)}
                  className={styles.Input}
                />
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  placeholder="Телефон"
                  onChange={(e)=>setPhone(e.target.value)}
                  className={styles.Input}
                />
                <input
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e)=>setEmail(e.target.value)} 
                  className={styles.Input}
                />
                <textarea
                  value={message}
                  name="message"
                  onChange={(e)=>setMessage(e.target.value)}
                  className={styles.Textarea}
                  placeholder={"Cообщение"}
                />
                <button
             type="submit"
                  className={styles.Button}
                >
                  Оставить заявку
                </button>
              </React.Fragment>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
