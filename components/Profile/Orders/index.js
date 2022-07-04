/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";

import Link from "next/link";

import { useTypeDispatch } from "../../../store/hooks/useDispatch";
import { useTypeSelector } from "../../../store/hooks/useSelector";

import cls from "./orderProfile.module.scss";

import useTranslation from "next-translate/useTranslation";

export default function OrderProfile() {
  const { orders } = useTypeSelector((state) => state.profile);
  const { getUserOrders } = useTypeDispatch();
  const {t} = useTranslation()

  useEffect(() => {
    if (!orders.length) getUserOrders({ page: 1 });
  }, []);
  return (

    <>
    {orders.length == 0 ? (
      <>
      <div className={cls.noZakaz}>
      <img src="/noZakaz.png"/>
        <p>
        Здесь ещё нет заказов
        </p>
      </div>
        
      </>
    ):(
      <>
        <div className={cls.wrapOrders}>
        <table>
          <tr className={cls.main}>
            <th>{t("common:numberZakaz")}</th>
            <th>{t("common:data")}</th>
            <th>{t("common:oplata")}</th>
            <th>{t("common:totalSum")}</th>
            <th>{t("common:cashback")}</th>
            <th></th>
          </tr>
          {orders.map((item) => (
            <>
              <tr>
                <td>{item.id}</td>
                <td>{item.created_at}</td>
                <td>{item.payment.name}</td>
                <td>
                  {item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                  {t("common:currency")}
                </td>
                <td>
                  {item.cart.potential_cashback
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                  {t("common:currency")}
                </td>
                <td>
                  <Link
                    href={{
                      pathname: "/profile/[orderID]",
                      query: { orderID: item.id },
                    }}
                    as={`/profile/${item.id}`}
                  >
                    <a>
                      <button className={cls.moreBtns}>{t("common:more")}</button>
                    </a>
                  </Link>
                </td>
              </tr>
            </>
          ))}
        </table>
        <div className={cls.mobile}>
          <div className={cls.dates}>
            <th>{t("common:numberZakaz")}</th>
            <th>{t("common:data")}</th>
            <th>{t("common:oplata")}</th>
            <th>{t("common:totalSum")}</th>
            <th>{t("common:cashback")}</th>
            <th></th>
          </div>
          {orders.map((itemMobile, i) => (
            <div className={cls.column}>
              <td>{itemMobile.id}</td>
              <td>{itemMobile.created_at}</td>
              <td>{itemMobile.payment.name}</td>
              <td>
                {itemMobile.total
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                {t("common:currency")}
              </td>
              <td>
                {itemMobile.cart.used_cashback
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                {t("common:currency")}
              </td>
              <td>
                <Link
                  href={{
                    pathname: "/profile/[orderID]",
                    query: { orderID: itemMobile.id },
                  }}
                  as={`/profile/${itemMobile.id}`}
                >
                  <a>
                    <button className={cls.moreBtns}>{t("common:more")}</button>
                  </a>
                </Link>
              </td>
            </div>
          ))}
        </div>
      </div>
      </>
    )}
      
    </>
  );
}
