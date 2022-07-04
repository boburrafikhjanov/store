import React from "react";

import { ArrowRightIcon, ColumnIcon, ListIcon } from "../svg";

import ContentProduct from "./ContentProduct";
import Filter from "./Filter";

import cls from "./productCard.module.scss";
import useTranslation from "next-translate/useTranslation";
import MobileFilter from "./mobileFilter";

export default function ProductCard() {
  const {t} = useTranslation()
  return (
    <>
      <div className="containerFluid">
        <div className={cls.wrapGrid}>
          <div className={cls.filtersPart}>
            <Filter />
          </div>
          <div className={cls.cartsPart}>
            <div className={cls.wrapCarts}>
                <ContentProduct />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
