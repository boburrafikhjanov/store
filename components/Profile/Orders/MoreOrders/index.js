/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import Link from "next/link";

import useTranslation from "next-translate/useTranslation";
import cls from "./moreOrders.module.scss";
import { ArrowRightIcon } from "../../../svg";

export default function MoreOrders({ orders }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const { t } = useTranslation();
  return (
    <>
      <div className="containerFluid">
        <div className={cls.routeLink}>
          <div>
            <Link href="/">
              <a>
                <h3 className={cls.nonactiveTitle}>{t("common:main")}</h3>
              </a>
            </Link>
          </div>
          <div className={cls.iocon}>
            <ArrowRightIcon />
          </div>
          <div className={cls.ioc}>/</div>
          <div>
            <span className={cls.activeTitle}>{t("common:moiZakaz")}</span>
          </div>
        </div>
        <div className={cls.wrapAll}>
          <div className={cls.wrapMy}>
            {orders?.cart?.items.map((item) => (
              <>
                <div className={cls.wrapList}>
                  <img src={item.product?.images[0]?.url} />
                  <div className={cls.cardList}>
                    <span className={cls.title}>{item.product.class.name}</span>
                    <h3>{item.product.name}</h3>
                    <div className={cls.wrapWidth}>
                      <div className={cls.wrapChildGrid}>
                        <span>Количество</span>
                        <p>{item.quantity} шт.</p>
                      </div>
                    </div>
                    <div className={cls.wrapWidth}>
                      <div className={cls.wrapChildGrid}>
                        <span>Цена</span>
                        <p>
                          {" "}
                          {item.delivery_price ? (
                            <>
                              {item?.total_with_discount + item.delivery_price}
                            </>
                          ) : (
                            <>{item?.total_with_discount}</>
                          )}
                          {/* {item?.total_with_discount
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "} */}
                          сум
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className={cls.orderInfo}>
            <div className={cls.padding}>
              <h3>Заказ № {orders?.id}</h3>
              <div className={cls.inforFlex}>
                <span>Создан:</span>
                <span>{orders?.created_at}</span>
              </div>
              <div className={cls.inforFlex}>
                <span>Метод оплаты:</span>
                <span>{orders?.payment?.name}</span>
              </div>
              <div className={cls.inforFlex}>
                <span>Статус:</span>
                <span>{orders?.state?.name}</span>
              </div>
              <div className={cls.bottomInfo}>
                <div className={cls.inforFlex}>
                  <span className={cls.noRed}>Итого:</span>
                  <span className={cls.red}>
                    {orders?.delivery_price ? (
                      <>
                        {(
                          orders?.cart?.total_with_discount +
                          orders.delivery_price
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                        {t("common:currency")}
                      </>
                    ) : (
                      <>
                        {orders?.cart?.total_with_discount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                        {t("common:currency")}
                      </>
                    )}
                  </span>
                </div>
                <div className={cls.inforFlex}>
                  <span className={cls.noRed}>Кэшбек:</span>
                  <span className={cls.red}>
                    {" "}
                    {orders?.cart?.potential_cashback
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                    {t("common:currency")}
                  </span>
                </div>
                {orders?.delivery_price ? (
                  <>
                    <div className={cls.inforFlex}>
                      <span className={cls.noRed}>Доставка:</span>
                      <span className={cls.red}>
                        {orders?.delivery_price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                        {t("common:currency")}
                      </span>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
