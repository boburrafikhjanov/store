/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useTypeSelector } from "../../../store/hooks/useSelector";
import { useTypeDispatch } from "../../../store/hooks/useDispatch";

import NumberFormat from "react-number-format";
import { notifyError, notifySuccess } from "../../../helpers/NotifyBtn";

import { CheckIcon } from "../../svg";
import cls from "../checkout.module.scss";

const Coupon = () => {
  const cookies = new Cookies();
  const [cashback, setCashback] = useState("");
  const [coupon, setCoupon] = useState("");
  const { userInfo } = useTypeSelector((state) => state.profile);
  const { profileInfo, fetchCart } = useTypeDispatch();

  const { cart } = useTypeSelector((state) => state.cart);

  useEffect(() => {
    if (cookies.get("access_token") && !userInfo?.id) profileInfo();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "cashback") setCashback(e.target.value);
    else if (e.target.name === "coupon") setCoupon(e.target.value);
  };
  const applyCoupon = async (e) => {
    e.preventDefault()
    notifySuccess("Вы применили купон");
    await fetchCart({ code: coupon });
  };

  const applyCashback = async (e) => {
    e.preventDefault()
    const formattedCashback = +cashback.replace(/\s/g, "");
    if (userInfo?.cashback && formattedCashback <= userInfo?.cashback) {
      await fetchCart({ cashback: formattedCashback });
      notifySuccess("Вы применили cashback");
    } else notifyError("Недостаточно средств на балансе");
  };

  return (
    <>
      <h3 className={cls.headerOrder}>4. Скидки к заказу</h3>
      <div className={cls.gridOrder}>
        <div className={cls.promoCode}>
          <h3>Купон</h3>
          <p>
            У вас есть купон? Примените его для получения скидки на Вашу
            корзину!
          </p>
          <div className={cls.inputPart}>
            <form>
              <input
                type="text"
                name="coupon"
                style={{ width: "150px" }}
                className={`verify-element mr-5 ${cart?.used_cashback ? 'disab' : 'verify-element mr-5'}`}
                placeholder={"Код купона"}
                value={coupon}
                onChange={handleChange}
                disabled={cart?.used_cashback}
              />
              <button
                onClick={applyCoupon}
                className={`verifyElementCou ${cart?.used_cashback ? 'disab' : 'verifyElementCou'}`}
                style={{ width: "20px" }}
                disabled={cart?.used_cashback}
              >
                <CheckIcon />
              </button>
            </form>
          </div>
        </div>
        {userInfo?.cashback || cookies.get("access_token") ? (
          <>
            <div className={cls.cashBack}>
              <h3>Введите кэшбек</h3>
              <p>
                Используйте накопленные вами средства. Чтобы приобрести товары
                максимально выгодно
              </p>

              <div className={cls.inputPart}>
                <form>
                  <NumberFormat
                    placeholder={"Например: 50 000"}
                    className={`verify-element mr-5 ${cart?.coupon ? 'disab' : 'verify-element mr-5'}`}
                    allowNegative={false}
                    style={{ width: "35%" }}
                    thousandSeparator={" "}
                    name={"cashback"}
                    value={cashback}
                    onChange={handleChange}
                  />
                  <button
                    onClick={applyCashback}

                    className={`verifyElementCou ${cart?.coupon ? 'disab' : 'verifyElementCou'}`}
                    style={{ width: "20px" }}
                  >
                    <CheckIcon />
                  </button>
                </form>
              </div>
              <p className={cls.summaryCash}>
                Доступно: <span>{userInfo?.cashback} сум</span>
              </p>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Coupon;
