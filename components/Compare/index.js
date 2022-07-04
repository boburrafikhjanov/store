/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ArrowRightIcon, FreeCompareIcon } from "../svg";
import Image from "next/image";
import Link from "next/link";
import { notifyError } from "../../helpers/NotifyBtn";

import "react-tabs/style/react-tabs.css";
import cls from "./compare.module.scss";

import ClampLines from "react-clamp-lines";
import CartBtn from "../Buttons/Cart";
import FavouriteBtn from "../Buttons/Favourite";
import { useRouter } from "next/router";
import { useTypeDispatch } from "../../store/hooks/useDispatch";
import { useTypeSelector } from "../../store/hooks/useSelector";
import { isElementInArray } from "../../helpers/arrayOperations";

import useTranslation from "next-translate/useTranslation";

const Compare = () => {
  // =============================================================Tabs
  const { t } = useTranslation();
  const router = useRouter();
  const [compareClass, setCompareClass] = useState("");
  const { fetchCompareClasses } = useTypeDispatch();
  const { classes } = useTypeSelector((state) => state.compare);

  useEffect(() => {
    fetchCompareClasses();
  }, []);

  useEffect(() => {
    const queryCompareClass = router.query.compareClass;
    if (queryCompareClass) {
      if (!isElementInArray(classes, +queryCompareClass) && classes.length)
        router.push(`/compare?compareClass=${classes[0].id.toString()}`);
      else setCompareClass(queryCompareClass);
    } else if (compareClass === "" && classes.length)
      router.push(`/compare?compareClass=${classes[0].id.toString()}`);
  }, [router, classes]);

  const filterCompareClasses = () => {
    return classes.map((category, i) => (
      <div
        key={i}
        className={`catClass ${
          +compareClass == category.id ? "activeCompare" : ""
        }`}
        onClick={() => handleClassCompare(category.id.toString())}
      >
        {category.name}
      </div>
    ));
  };

  const handleClassCompare = (compName) => {
    router.push(`/compare?compareClass=${compName}`);
  };
  // =============================================================Tabs end

  // =============================================================PANEL start
  const { compareProducts, compareFeatures } = useTypeSelector(
    (state) => state.compare
  );
  const { fetchCompare, toggleCompare } = useTypeDispatch();

  useEffect(() => {
    if (router.query.compareClass && router.query.compareClass.length)
      fetchCompare(+router.query.compareClass);
  }, [router]);

  const handleCompareDelete = async (id) => {
    await toggleCompare(id);
    notifyError("Продукт удален со Сравнений");
    if (router.query.compareClass && router.query.compareClass.length) {
      await fetchCompare(+router.query.compareClass);
    }
    fetchCompareClasses();
  };

  const renderFeatures = () =>
    compareFeatures.map((item, i) => (
      <div>
        <div className="compare-row" key={i}>
          <div className="containerFluid">
            <div className="compare-features">
              {item.values.map((value, j) => (
                <div className="feature" key={`${i}-${j}`}>
                  <p className={"light"}>{item.name}</p>
                  <p>{value.value == null ? "-" : value.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ));
  // =============================================================PANEL end
  return (
    <>
      {classes.length === 0 ? (
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
                <span className={cls.activeTitle}>
                  {t("common:compareBread")}
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "60px 0",
              flexDirection: "column",
            }}
            className="idon"
          >
            <FreeCompareIcon />
            <h2 className="acti">{t("common:freeCompare")}</h2>
          </div>
        </>
      ) : (
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
              <div className={cls.btnDas}>
                <ArrowRightIcon />
              </div>
              <div className={cls.ioc}>/</div>
              <div>
                <span className={cls.activeTitle}>
                  {t("common:compareBread")}
                </span>
              </div>
            </div>

            <div className={cls.tabs}>

                <div className="compare-classes">{filterCompareClasses()}</div>


              <div className={cls.itemPart}>
                <div className={cls.wrapProduct}>
                  {compareProducts.map((item, i) =>
                    router &&
                    router.query.compareClass &&
                    +router.query.compareClass === item.class.id ? (
                      <>
                        <div key={`${i}-${JSON.stringify(new Date())}`}>
                          <div
                            style={{ paddingTop: "50px" }}
                            className={cls.productPart}
                          >
                            <div className={cls.innerContainer}>
                              <button
                                onClick={() => handleCompareDelete(item.id)}
                                className={cls.removeList}
                                type={"button"}
                              >
                                x
                              </button>
                              <div className={`${cls.imae} nextImage`}>
                                <Image
                                  layout="fill"
                                  src={item.images[0].types?.home_default}
                                  alt={item.name}
                                />
                              </div>

                              <Link href={`/productPage/${item.slug}`}>
                                <a>
                                  <ClampLines
                                    text={item["name"]}
                                    id={item.id}
                                    lines={1.5}
                                    buttons={false}
                                    className={cls.productName}
                                    innerElement="p"
                                  />
                                </a>
                              </Link>
                              <p className={cls.padding}>
                                {item.random_shop.price?.toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                                {t("common:currency")}
                              </p>
                              <div className={cls.btnsOrder}>
                                <div className={cls.red}>
                                  <CartBtn id={item.random_shop.item_shop_id} />
                                </div>
                                <div className={cls.favorite}>
                                  <FavouriteBtn id={item.id} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null
                  )}
                </div>
              </div>
              {renderFeatures()}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Compare;
