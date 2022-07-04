import React, { useState, useEffect } from "react";

import { useTypeDispatch } from "../../../store/hooks/useDispatch";

import { notifySuccess } from "../../../helpers/NotifyBtn";

import cls from "./mobileVersion.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { ExitIconly, FilterIcon } from "../../svg";
import ItemMobile from "./ItemMobile";

import useTranslation from "next-translate/useTranslation";

export default function MobileVersion({
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
}) {
  const { t } = useTranslation();

  return (
    <>
      <div className={cls.main}>
        <AnimatePresence>
          {modalIsOpen && (
            <motion.aside
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              exit={{ width: 0 }}
              className={modalIsOpen === true ? "scroll" : ""}
            >
              <div className={cls.navContainer}>
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { x: 0, opacity: 0 },
                    visible: {
                      x: 0,
                      opacity: 1,
                      transition: { duration: 0.5 },
                    },
                  }}
                  whileHover={{
                    scale: [1, 1.1, 1],
                    transition: { duration: 0.4 },
                  }}
                >
                  <div className={cls.wrapFilter}>
                    <div className={cls.filterContainer}>
                      <div className={cls.wrapHeader}>
                        <span>Купить в рассрочку</span>
                        <div className={cls.exitIcon}>
                          <button
                            className={cls.exitIconone}
                            onClick={hideModal}
                          >
                            <ExitIconly />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.p>
                <div className={cls.containerSlide}>
                  <div className={cls.itemFilter}>
                    <h3>{t("common:catchRass")}</h3>
                    {data?.partners &&
                      data?.partners.map((el, i) => {
                        const elementId =
                          el.price_with_partners[
                            el.price_with_partners.length - 1
                          ].id;
                        return (
                          <>
                            <ItemMobile
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
                                staticEl.find(
                                  (item) => item.partnerId === el.id
                                )
                              }
                              props={props && { ...props }}
                              dropdownChange={dropdownChange}
                            />
                          </>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className={cls.moreAndClear}>
                <div className={cls.buttom}>
               
                  <a href="tel:+998712059393">
                      <button className={cls.moreBtn}>
                        {t("common:pozvanit")}
                      </button>
                  </a>
                </div>
              
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
