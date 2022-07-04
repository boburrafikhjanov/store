import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ExitIconly } from "../../svg";
import useTranslation from "next-translate/useTranslation";
import Item from "../Item";

const ModalInstallment = ({
  data,
  modalIsOpen,
  hideModal,
  staticEl,
  value,
  callback,
  dropdownChange,
  setStatic,
  isInCart,
  setValue,
  name,
  autoOpen,
  ...props
}) => {

  const { t } = useTranslation();

  return (
    <>
      <Modal className="podal" isOpen={modalIsOpen}>
        <div className="wrapModal">
          <div className="headerModal">
            <span>{name}</span>
            <button style={{cursor: "pointer"}} className="exitIconRass" onClick={hideModal}>
              <ExitIconly />
            </button>
          </div>
        </div>{" "}
        <h3 className="paddingLeft">{t("common:catchRass")}</h3>
        {data?.partners &&
          data?.partners.map((el, i) => {
            const elementId =
              el.price_with_partners[el.price_with_partners.length - 1].id;
            return (
              <>
                <Item
                  el={el}
                  name={name}
                  index={i}
                  key={el.id}
                  value={value}
                  partnerId={el.id}
                  staticEl={staticEl}
                  setValue={setValue}
                  setStatic={setStatic}
                  elementId={elementId}
                  addToCartInstallment={callback}
                  data={data}
                  isInCart={isInCart}
                  staticObj={
                    staticEl &&
                    staticEl.find((item) => item.partnerId === el.id)
                  }
                  props={props && { ...props }}
                  dropdownChange={dropdownChange}
                />
              </>
            );
          })}
        <div className="privacy">
          <span>{t("common:poRassro")} +998 71 205-93-93</span>
          <button>{t("common:pozvanit")}</button>
        </div>
      </Modal>
    </>
  );
};

export default ModalInstallment;
