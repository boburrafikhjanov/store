/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import { useTypeDispatch } from "../../store/hooks/useDispatch";
import { useTypeSelector } from "../../store/hooks/useSelector";
import { notifyError } from "../../helpers/NotifyBtn";
import useTranslation from "next-translate/useTranslation";
import { ArrowRightIcon, ExitIcon, FreeCartIcon } from "../svg";

import cls from "./cart.module.scss";

export default function Cart({ data }) {
  const { t } = useTranslation();
  const { adding } = useTypeDispatch((state) => state.cart);

  const { cart } = useTypeSelector((state) => state.cart);

  const [currentItem, setCurrentItem] = useState();
  const { addToCart, deleteFromCart } = useTypeDispatch();
  const handleCartQuantity = (id, quantity) => {
    if (quantity >= 1) {
      addToCart(id, quantity);
      setCurrentItem(id);
    }
  };
  const handleItemDelete = (id) => {
    deleteFromCart(id);
    notifyError("Ваш товар удален с корзины");
  };
  return (
    <>
      <div className="containerFluid">
        <div className={cls.routeCart}>
          <div className={cls.nonActiveRouteBox}>
            <h3 className={cls.nonActiveRoute}>{t("common:main")}</h3>
            <div className={cls.show}>
              <ArrowRightIcon />
            </div>
            <div className={cls.hide}>/</div>
          </div>

          <h3 className={cls.activeRoute}>{t("common:cart")}</h3>
        </div>
        {data.total_count === 0 ? (
          <>
            <div className="noClass">
              <FreeCartIcon />
              <h2>{t("common:freeCart")}</h2>
            </div>
          </>
        ) : (
          <>
            <div className={cls.productList}>
              <div className={cls.productAdd}>
                <div className="hideDesktop">
                  {data.items &&
                    data.items.map((item, id) => {
                      let itemPrice = null;
                      let originalPrice = null;
                      if (item.discount) {
                        itemPrice = Math.round(
                          item.total_with_discount / item.quantity
                        );
                        originalPrice = item.price;
                      } else {
                        itemPrice = item.price;
                      }
                      return (
                        <>
                          <div className={cls.container}>
                            <div className={`${cls.imageCart} nextImage`}>
                              {(item?.product?.images && item.product.images[0]
                                ? item?.product?.images[0].types.large_default
                                : null) && (
                                <Image
                                  layout="fill"
                                  alt={item.product.name}
                                  loading="lazy"
                                  src={
                                    item?.product?.images &&
                                    item.product.images[0]
                                      ? item?.product?.images[0].types
                                          .large_default
                                      : null
                                  }
                                />
                              )}
                            </div>
                            <div className={cls.flexBox}>
                              <div className={cls.flexAny}>
                                <p className={cls.nameProductCard}>
                                  {item.product.name}
                                </p>
                                <div className={cls.priceDiscount}>
                                  <del>
                                    {originalPrice
                                      ?.toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") &&
                                      originalPrice
                                        ?.toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
                                        `${t("common:currency")}`}
                                  </del>
                                  <p className={cls.redPriceTxt}>
                                    {itemPrice
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    {t("common:currency")}
                                  </p>
                                </div>
                              </div>
                              <div className={cls.wrapPm}>
                                <div className={cls.countFlex}>
                                  <button
                                    style={{ cursor: "pointer" }}
                                    disabled={
                                      item.quantity === item.stock_quantity
                                    }
                                    onClick={() =>
                                      handleCartQuantity(
                                        item.item_shop_id,
                                        item.quantity + 1
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                  {adding &&
                                  currentItem === item.item_shop_id ? (
                                    <p className={cls.countResult}></p>
                                  ) : (
                                    item.quantity
                                  )}

                                  <button
                                    style={{ cursor: "pointer" }}
                                    disabled={item.quantity === 1}
                                    onClick={() =>
                                      handleCartQuantity(
                                        item.item_shop_id,
                                        item.quantity - 1
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                </div>
                                <div className={cls.clearProduct}>
                                  <p>
                                    {" "}
                                    {item.total_with_discount
                                      ?.toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    {t("common:currency")}
                                    <br />
                                  </p>
                                  <span>
                                    {item.monthly_price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    {t("common:currency")} {t("common:mes")}
                                  </span>
                                </div>
                              </div>

                              <div className={cls.clearBtn}>
                                <button
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    handleItemDelete(item.item_shop_id)
                                  }
                                >
                                  <ExitIcon />
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
                <div className="hideMobileVer">
                  {data.items &&
                    data.items.map((item, id) => {
                      let itemPrice = null;
                      let originalPrice = null;
                      if (item.discount) {
                        itemPrice = Math.round(
                          item.total_with_discount / item.quantity
                        );
                        originalPrice = item.price;
                      } else {
                        itemPrice = item.price;
                      }
                      return (
                        <>
                          <div className="mobileVersion">
                            <div className="containerMobile">
                              <img
                                alt={item.product.name}
                                src={
                                  item?.product?.images &&
                                  item.product.images[0]
                                    ? item?.product?.images[0].types
                                        .large_default
                                    : null
                                }
                              />
                              <p className="paddingPrice">
                                {item.product.name}
                              </p>
                              <div className="wrapPriceMo">
                                <div className="nonClass">
                                  <del>
                                    {originalPrice
                                      ?.toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") &&
                                      originalPrice
                                        ?.toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
                                        `${t("common:currency")}`}
                                  </del>
                                  <span className="paddingPriceA">
                                    {item.total_with_discount
                                      ?.toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    {t("common:currency")}
                                  </span>
                                  <span>
                                    {item.monthly_price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    {t("common:currency")} {t("common:mes")}
                                  </span>
                                </div>
                                <div className="btnPlus">
                                  <button
                                    style={{ cursor: "pointer" }}
                                    disabled={
                                      item.quantity === item.stock_quantity
                                    }
                                    onClick={() =>
                                      handleCartQuantity(
                                        item.item_shop_id,
                                        item.quantity + 1
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                  <p>
                                    {adding &&
                                    currentItem === item.item_shop_id ? (
                                      <p className={cls.countResult}></p>
                                    ) : (
                                      item.quantity
                                    )}
                                  </p>
                                  <button
                                    style={{ cursor: "pointer" }}
                                    disabled={item.quantity === 1}
                                    onClick={() =>
                                      handleCartQuantity(
                                        item.item_shop_id,
                                        item.quantity - 1
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="positionAbsolute">
                              <button
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  handleItemDelete(item.item_shop_id)
                                }
                              >
                                <ExitIcon />
                              </button>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>

              <div className={cls.productInfo}>
                <div className={cls.wrapInner}>
                  <div className={cls.promoCode}>
                    <p>{t("common:vKarzine")}</p>
                    <span>
                      {cart?.total_count} {t("common:tovara")}
                    </span>
                  </div>
                  <div className={cls.infoPart}>
                    <div className={cls.namedHeader}>
                      <p>{t("common:totalPayment")}:</p>
                    </div>

                    <div className={cls.pricePart}>
                      <span>
                        {cart?.total_with_discount
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                        {t("common:currency")}
                      </span>
                    </div>

                    {cart.total_with_discount ? (
                      <>

                        <div className={cls.namedHeader}>
                          <p className={cls.itogoRass}>Итого в рассрочку:</p>
                        </div>

                        <div className={cls.pricePart}>
                          <span>
                            {cart?.monthly_price
                              ?.toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                            {t("common:currency")}
                          </span>
                        </div>

                      </>
                    ) : (
                      <br />
                    )}
                  </div>
                  <Link href="/checkout">
                    <a>
                      <button>{t("common:oformitZakaz")}</button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
