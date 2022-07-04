import React from "react";
import { CategoryBurgerIcon } from "../svg";
import cls from "./popularCategory.module.scss";
import { popularCategory } from "../../mockData/popularCategories";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import MobileVersion from './MobilVersion'

export default function PopularCategory() {
  const cookies = new Cookies();
  const { t } = useTranslation();
  return (
    <>
      <div className="containerFluid">
        <div className={cls.wrapTitleCategory}>
          <div className={cls.popularTitle}>
            <i className={cls.iconBack}></i>
            <span className={cls.popularFocused}>
              <span>{t("common:popular")}</span> {t("common:categoryPop")}
            </span>
          </div>
        </div>

        <div className={cls.wrapCards}>
          {popularCategory.map((item) => (
            <Link href={item.href} key={item.id}>
              <a className={cls.wrapCard}>
                <div className={cls.innerCardContainer}>
                  <p className={cls.titleCard}>
                    {cookies.get("locale") == "uz" ? (
                      <>{item.uzTitle}</>
                    ) : (
                      <>{item.title}</>
                    )}
                  </p>
                </div>
              </a>
            </Link>
          ))}
        </div>

        <MobileVersion/>

      </div>
    </>
  );
}