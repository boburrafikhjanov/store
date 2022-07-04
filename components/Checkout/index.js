/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

import { useTypeDispatch } from "../../store/hooks/useDispatch";
import { useTypeSelector } from "../../store/hooks/useSelector";
import { useRouter } from "next/router";

import { Checkbox } from "@material-ui/core";
import { makeStyles } from "@mui/styles";

import Coupon from "./Coupon";
import Verify from "./VerifyPhone";
import Payment from "./Payment";
import AdressForm from "./AdressForm";
import Deliveryfrom from "./Delivery";
import RecipientForm from "./RecipientForm";
import ModalInstallment from "../../components/OpenProduct/ModalInstallment";

import useTranslation from "next-translate/useTranslation";

import { notifyError, notifySuccess } from "../../helpers/NotifyBtn";
import cls from "./checkout.module.scss";
import { ArrowRightIcon } from "../svg";

import MobileVersion from "../OpenProduct/MobileVersion";
import policy from "./../../pages/about/policy";

const useStyles = makeStyles(() => ({
  checkbox: {
    width: "1px",
    height: "2px",
  },
}));

export default function Checkout(props) {
  const [value, setValue] = useState(undefined);
  const [staticEl, setStatic] = useState();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    delivery_id: 0,
    payment_id: 0,
    address: {
      phone: "",
      full_name: "",
      address: "",
      region_id: 0,
      city_id: 0,
    },
    user_id: "",
    user_key: "",
  });
  const cookies = new Cookies();
  const classes = useStyles();

  const [deviceWidth, setDeviceWidth] = useState(0);
  const [checked, setChecked] = useState(false);
  const [percent, setPercent] = useState(null);
  const [percentCalc, setPercentCalc] = useState(null);

  const { createOrder, fetchPaymentOptions } = useTypeDispatch();
  const { profileInfo } = useTypeDispatch();
  const { cart } = useTypeSelector((state) => state.cart);
  const { userInfo } = useTypeSelector((state) => state.profile);
  const [modalIsOpen, setModalOpen] = useState(false);
  const locale = cookies.get("locale");
  const router = useRouter();

  useEffect(() => {
    if (!paymentOptions.length) fetchPaymentOptions();
  }, []);

  const { fetchCart, updatePartnerWithPayment, updatePartner } =
    useTypeDispatch();

  useEffect(() => {
    if (cookies.get("access_token") && !userInfo?.id) profileInfo();
  }, []);

  const { orderCreated, orderAny, paymentOptions } = useTypeSelector(
    (state) => state.checkout
  );

  const handleChecked = (e) => {
    const { checked } = e.target;
    setChecked(checked);
  };

  const formDataHandler = (newFormData) => {
    setFormData(newFormData);
  };
  useEffect(() => {
    if (orderCreated) {
      notifySuccess("Успешно оформлено");
      fetchCart();
      if (cookies.get("access_token")) {
        router.push({
          pathname: "/profile/[orderID]",
          query: { orderID: orderAny?.orderAny?.id },
        });
      } else {
        router.push({
          pathname: "/",
        });
      }
    }
  }, [orderCreated]);

  useEffect(() => {
    fetchCart();
  }, [locale]);

  useEffect(() => {
    setDeviceWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (Object.keys(cart || fetchCart())) {
      setStatic(
        cart?.partners?.map((item) => ({
          partnerId: item.id,
          id: item.price_with_partners[item.price_with_partners.length - 1].id,
          total:
            item.price_with_partners[item.price_with_partners.length - 1].total,
          monthly_price:
            item.price_with_partners[item.price_with_partners.length - 1]
              .monthly_price,
          month:
            item.price_with_partners[item.price_with_partners.length - 1].month,
        }))
      );
    }
  }, [cart]);

  const dropdownChange = (partnerId, optionId) => {
    setStatic([
      ...staticEl.filter((item) => item.partnerId !== partnerId),
      {
        partnerId,
        id: cart.partners
          .find((item) => item.id === partnerId)
          .price_with_partners.find((el) => el.id === optionId).id,
        total: cart.partners
          .find((item) => item.id === partnerId)
          .price_with_partners.find((el) => el.id === optionId).total,
        monthly_price: cart.partners
          .find((item) => item.id === partnerId)
          .price_with_partners.find((el) => el.id === optionId).monthly_price,
        month: cart.partners
          .find((item) => item.id === partnerId)
          .price_with_partners.find((el) => el.id === optionId).month,
      },
    ]);
  };

  const updateCheckout = (value) => {
    updatePartner({ partner_installment_id: value }, () => {
      setModalOpen(false);
    });
  };

  const validateOrderFormData = () => {
    const { payment_id, delivery_id, address } = formData;

    // if (address.full_name && delivery_id == 1) {
    //   notifyError('Поле "Имя получателя" не может быть пустым');
    //   return false;
    // }

    if (!delivery_id) {
      notifyError("Выберите способ доставки");
      return false;
    }
    if (!payment_id) {
      notifyError("Выберите способ оплаты");
      return false;
    }
    return true;
  };

  const submitOrder = () => {
    fbq("track", "Purchase");
    fbq("track", "Purchase", {
      currency: "UZS",
      value: cart.total_with_discount,
    });
    if (validateOrderFormData()) createOrder(formData);
    (window.b24order = window.b24order || []).push({
      id: orderAny?.orderAny?.id,
      customer: orderAny?.user?.first_name + orderAny?.user?.last_name,
      sum: orderAny?.cart?.total_with_discount,
      Phone: orderAny?.user_phone,
      Payment_Type: orderAny?.payment?.name,
      Delivery_Type: orderAny?.delivery?.name,
    });
  };

  const handlePayClick = (id) => {
    setFormData({ ...formData, payment_id: id });
    if (id == 9 || (cart.paymentID == id && cart.paymentID == 9)) {
      setModalOpen(true);
    } else if (cart.with_installment) {
      setModalOpen(false);
      updatePartnerWithPayment(parseInt(id), () => {});
    } else if (cart.with_installment && cart.paymentID != 9) {
      setModalOpen(false);
      updatePartnerWithPayment(parseInt(id), () => {});
    }
  };

  const hideModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (cart?.with_installment) {
      handlePayClick(9);
      setModalOpen(true);
    }
  }, []);

  useEffect(() => {
    let dataInner = cart?.total_with_discount;
    const percent = 1;
    const result = dataInner - (percent / 100) * dataInner;
    const percentResult = (percent / 100) * dataInner;

    setPercentCalc(percentResult);

    setPercent(result);
  }, [formData.delivery_id == 1]);

  return (
    <>
      <div className="containerFluid">
        <div className={cls.routeCart}>
          <h3 className={cls.nonActiveRoute}>{t("common:main")}</h3>
          <div>
            <ArrowRightIcon />
          </div>
          <h3 className={cls.nonActiveRoute}>{t("common:cart")}</h3>
          <div>
            <ArrowRightIcon />
          </div>
          <h3 className={cls.activeRoute}>{t("common:oformileno")}</h3>
        </div>

        <div className={cls.wrapTwoPart}>
          <div className={cls.orderPart}>
            <div className={cls.stepBy}>
              <div className={cls.firstStep}>
                <h3>{t("common:stepOneCart")}</h3>
                <Deliveryfrom
                  formData={formData}
                  setFormData={formDataHandler}
                />
              </div>
              {formData.delivery_id == 1 ? null : (
                <div className={cls.adressPart}>
                  <h2> {t("common:deliviry")}</h2>
                  <div className={cls.formsAdress}>
                    <AdressForm
                      formData={formData}
                      setFormData={formDataHandler}
                    />
                  </div>
                </div>
              )}

              <div className={cls.paymentPart}>
                <h3>{t("common:stepTwoCart")}</h3>

                <Payment
                  disable={formData.delivery_id}
                  handlePayClick={handlePayClick}
                  setFormData={setFormData}
                  formData={formData}
                />
                {deviceWidth > 700 ? (
                  <>
                    <div className="hideDesktopIns">
                      <ModalInstallment
                        dropdownChange={dropdownChange}
                        staticEl={staticEl}
                        value={value}
                        {...props}
                        modalIsOpen={modalIsOpen}
                        hideModal={hideModal}
                        setStatic={setStatic}
                        setValue={setValue}
                        callback={updateCheckout}
                        data={cart}
                      />
                    </div>
                  </>
                ) : null}

                <div className="hideMobileIns">
                  <MobileVersion
                    dropdownChange={dropdownChange}
                    staticEl={staticEl}
                    value={value}
                    {...props}
                    modalIsOpen={modalIsOpen}
                    hideModal={hideModal}
                    setStatic={setStatic}
                    setValue={setValue}
                    callback={updateCheckout}
                    data={cart}
                  />
                </div>
              </div>
              <div className={cls.senderOrder}>
                {cookies.get("access_token") ? null : (
                  <div>
                    <h3>{t("common:stepThree")}</h3>
                    <div className={cls.gridPart}>
                      <Verify
                        formData={formData}
                        setFormData={formDataHandler}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <RecipientForm
                    formData={formData}
                    setFormData={formDataHandler}
                  />
                </div>
              </div>

              <div className={cls.discountOrder}>
                <Coupon />
              </div>
            </div>
          </div>
          <div className={cls.orderInfo}>
            <div className={cls.wrapContainer}>
              <h4>{t("common:totalCart")}</h4>
              {cart?.items?.length &&
                cart?.items?.map((cart, i) => (
                  <>
                    <h3>{cart.product.name}</h3>
                    <p className={cls.perPrice}>
                      {cart.quantity} {t("common:count")} х{" "}
                      {cart.total_with_discount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                      {t("common:currency")}
                    </p>
                  </>
                ))}

              <div className={cls.totalPrice}>
                <br />
                <div>
                  {(() => {
                    switch (formData.delivery_id) {
                      case 1:
                        return (
                          <>
                            <div className="any">
                              <p>Всего:</p>
                              <span>
                                {Math.trunc(cart?.total_with_discount)
                                  ?.toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                                {t("common:currency")}
                              </span>
                            </div>

                            <div className="any">
                              <p>Доставка:</p>
                              <span> 0 {t("common:currency")}</span>
                            </div>
                            <div className="any">
                              <p>Экономия:</p>
                              <span>
                                {(
                                  (cart?.coupon_price ||
                                  cart?.used_cashback) ||
                                  percentCalc
                                )
                                  ?.toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                                {t("common:currency")}
                              </span>
                            </div>
                            <div className="chizi1"></div>
                            <div className="any">
                              <p>Итого к оплате:</p>
                              <span>
                                {(
                                  percent -
                                  (cart?.coupon_price || cart?.used_cashback)
                                )
                                  ?.toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                                {t("common:currency")}
                              </span>
                            </div>
                          </>
                        );
                      case 5:
                        return (
                          <>
                            <div className="any">
                              <p>Всего:</p>
                              <span>
                                {Math.trunc(cart?.total_with_discount)
                                  ?.toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                                {t("common:currency")}
                              </span>
                            </div>

                            <div className="any">
                              <p>Доставка:</p>
                              <span> 29 900 {t("common:currency")}</span>
                            </div>
                            <div className="any">
                              <p>Экономия:</p>
                              <span>
                                {(cart?.coupon_price || cart?.used_cashback)
                                  ?.toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                                {t("common:currency")}
                              </span>
                            </div>
                            <div className="chizi1"></div>
                            <div className="any">
                              <p>Итого к оплате:</p>
                              <span>
                              {(
                                cart?.total_with_discount +
                                29900 -
                                (cart?.coupon_price || cart?.used_cashback)
                              )
                                ?.toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}   {t("common:currency")}
                              </span>
                           
                            </div>
                          </>
                        );
                      default:
                        return (
                          <>
                            <div className="any">
                              <p>Всего:</p>
                              <span>
                                {Math.trunc(cart?.total_with_discount)
                                  ?.toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                                {t("common:currency")}
                              </span>
                            </div>

                            <div className="any">
                              <p>Доставка:</p>
                              <span>0             {t("common:currency")}</span>
                            </div>
                            <div className="any">
                              <p>Экономия:</p>
                              <span>
                                {cart?.coupon_price || cart?.used_cashback}{" "}
                                {t("common:currency")}
                              </span>
                            </div>
                            <div className="chizi1"></div>
                            <div className="any">
                              <p>Итого к оплате:</p>
                              <span>
                                {" "}
                                {Math.trunc(cart?.total_with_discount)
                                  ?.toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                                {t("common:currency")}
                              </span>
                            </div>
                          </>
                        );
                    }
                  })()}
                </div>

                <div className={cls.checkbox}>
                  <Checkbox
                    type="checkbox"
                    onChange={(e) => handleChecked(e)}
                    defaultChecked={checked}
                  />
                  <span className="">{t("common:clickOformit")}</span>
                </div>
                <button
                  disabled={!checked}
                  className={!checked ? "disable" : ""}
                  style={{ cursor: "pointer" }}
                  onClick={submitOrder}
                >
                  {t("common:oformitZakaz")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
