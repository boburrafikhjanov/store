import React, {useState, useEffect} from "react";
import Link from 'next/link'
import {useTypeDispatch} from '../../../store/hooks/useDispatch'
import {notifySuccess} from '../../../helpers/NotifyBtn'
import {DownIcon } from '../../svg'
import cls from "./mobileVersion.module.scss";

import useTranslation from "next-translate/useTranslation";

const ItemMobile = ({
  itemName,
  index,
  key,
  value,
  partnerId,
  staticEl,
  setValue,
  setStatic,
  elementId,
  staticObj,
  dropdownChange,
  addToCartInstallment,
  isInCart,
  el,
  name,
  data,
  ...props
}) => {
    const [open, setOpen] = useState(false);

    const {t} = useTranslation()
  
  
    const { addToCart } = useTypeDispatch();

  return (
    <>
      <div className={cls.itemRassrochka}>
        <table>
          <tr>
            <td className={cls.boldParent}>{t("common:cherezKupit")} {el.name}</td>
            <td>{el.name}</td>
          </tr>
          <tr>
            <td className={cls.boldParent}>{t("common:stepOn")}</td>
            <td className={cls.redChild}>0</td>
          </tr>
          <tr>
            <td className={cls.boldParent}>{t("common:totalSum")}</td>
            <td className={cls.redChild}>
            {staticObj?.total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
            {t("common:currency")}
            </td>
          </tr>
          <tr>
            <td className={cls.boldParent}>{t("common:srokOy")}</td>
            <td className={cls.monthly}>
            <div className="custom_droprown" onMouseLeave={() => setOpen(false)}>
            <div onClick={() => setOpen(!open)} className="select_installment">
              <span>
                {value?.partnerId === partnerId
                  ? value?.month
                  : staticObj?.month}{" "}
                {t("common:month")}
              </span>
              <div
                className="select_installment_option"
                style={{
                  display: open ? "flex" : "none",
                  flexDirection: "column",
                }}
              >
                {el.price_with_partners.map((el) => (
                  <span
                    key={el.id}
                    style={{color: '#E30909'}}
                    onClick={() => {
                      setValue({ ...el, partnerId: partnerId });
                      dropdownChange(partnerId, el.id);
                    }}
                    className="select_installment_item"
                  >
                    {el.month}{t("common:month")}
                  </span>
                ))}
              </div>
              <DownIcon/>
            </div>
          </div>
            </td>
          </tr>
          <tr>
            <td className={cls.boldParent}>{t("common:payMonth")}</td>
            <td className={cls.redChild}>
            {staticObj?.monthly_price
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
            {t("common:currency")}
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button className={cls.butRass}>
              {isInCart &&
              el.price_with_partners.find((item) => item.id == value?.id) ? (
                <Link href={`/cart`}>
                  <p className="whiteOneTwo">{t("common:oformit")}</p>
                </Link>
              ) : (
                <p
                  className="whiteOneTwo"
                  onClick={() => {
                    addToCartInstallment(staticObj.id);
                    setValue(
                      value?.id != elementId ? { id: elementId } : value
                    );
                  }}
                >
                  {t("common:kupit")}
                </p>
              )}
              </button>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default ItemMobile;
