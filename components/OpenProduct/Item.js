import React, { useState } from "react";
import { DownIcon } from "../svg";
import Link from "next/link";
import { connect } from "react-redux";
import { addToCart } from "../../store/actions/cart";
import useTranslation from "next-translate/useTranslation";

const InstallmentItem = ({
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
  const { t } = useTranslation();

  return (
    <>
      <div className="itemPartModal">
        <p className="buyAlif">
          {t("common:cherezKupit")} {el.name}
        </p>
        <div className="headerTarif">
          <p>{t("common:stepOn")}</p>
          <p>{t("common:totalSum")}</p>
          <p>{t("common:srokOy")}</p>
          <p>{t("common:payMonth")}</p>
          <div></div>
        </div>
        <div className="tarifItem">
          <span className="firstSum">0</span>
          <span>
            {staticObj?.total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
            {t("common:currency")}
          </span>

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
                  <>
                    <span
                      key={el.id}
                      onClick={() => {
                        setValue({ ...el, partnerId: partnerId });
                        dropdownChange(partnerId, el.id);
                      }}
                      className="select_installment_item"
                    >
                      {el.month} {t("common:month")}
                    </span>
                  </>
                ))}
              </div>
              <DownIcon />
            </div>
          </div>

          <span>
            {staticObj?.monthly_price
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
            {t("common:month")}
          </span>
          <button className="butRass">
            <button className="cart_button">
              {isInCart &&
              el.price_with_partners.find((item) => item.id == value?.id) ? (
                <Link href={`/cart`}>
                  <p className="whiteOneWe">{t("common:oformit")}</p>
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
          </button>
        </div>
      </div>
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addToCart: (id, quantity, value) => dispatch(addToCart(id, quantity, value)),
});

export default connect(null, mapDispatchToProps)(InstallmentItem);
