/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { useTypeDispatch } from "../../store/hooks/useDispatch";
import { useTypeSelector } from "../../store/hooks/useSelector";

import ClampLines from "react-clamp-lines";
import Countdown from "react-countdown";
import Cookies from "universal-cookie";

import FavouriteBtn from "../Buttons/Favourite";
import CompareBtn from "../Buttons/Compare";
import CartBtn from "../Buttons/Cart";
import useTranslation from "next-translate/useTranslation";
import cls from "./hotOffer.module.scss";

const HotOffer = () => {
  const cookies = new Cookies();
  const locale = cookies.get("locale");
  const { fetchHomeProducts } = useTypeDispatch();
  const { hotProducts } = useTypeSelector((state) => state.home);
  const { t } = useTranslation();

  useEffect(() => {
    fetchHomeProducts("hot_products");
  }, [locale]);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {

      return (
        <div className="deals_timer_content">
          {days ? (
            <>
              <div className="wrapTimer1" data-target-time="">
                <div className="unitDay">
                  <div id="deals_timer1_days" className="timerDays">
                    {days}
                  </div>
                  <span>{t("common:day")}</span>
                </div>

                <div className="unitDay">
                  <div id="deals_timer1_hr" className="timerHour">
                    {hours}
                  </div>
                  <span>{t("common:hours")}</span>
                </div>
                <div className="unitDay">
                  <div id="deals_timer1_min" className="timerMinute">
                    {minutes}
                  </div>
                  <span>{t("common:minutes")}</span>
                </div>
                <div className="unitDay">
                  <div id="deals_timer1_sec" className="timerSecond">
                    {seconds}
                  </div>
                  <span>{t("common:second")}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="wrapTimer1" data-target-time="">
              <div className="unitDay">
                <div id="deals_timer1_hr" className="timerHour">
                  {hours}
                </div>
                <span>{t("common:hours")}</span>
              </div>
              <div className="unitDay">
                <div id="deals_timer1_min" className="timerMinute">
                  {minutes}
                </div>
                <span>{t("common:minutes")}</span>
              </div>
              <div className="unitDay">
                <div id="deals_timer1_sec" className="timerSecond">
                  {seconds}
                </div>
                <span>{t("common:second")}</span>
              </div>
            </div>
          )}
        </div>
      );
    }
  };
  return (
    <>
      {hotProducts?.product_request?.length ? (
        <>
          <div className={cls.wrapAll}>
            <div className="containerFluid">
              <div className={cls.wrapTitle}>
                <div className={cls.wrapFlex}>
                  <i className={cls.iconPercent}></i>
                  <div className={cls.hotOfferTitle}>
                    <span className={cls.hotRed}>{t("common:hotDeals")}</span>{" "}
                    {t("common:predlojeniya")}
                  </div>
                </div>
                <div className={cls.moreBtn}>
                  <Link href={{
                    pathname: `/moreProduct`,
                    query:{
                      category_id:hotProducts.params.category_id,
                    discount:hotProducts.params.discount,
                    }
                  }}>
                    <a>
                      <button style={{ cursor: "pointer" }}>
                        {t("common:seeMore")}
                      </button>
                    </a>
                  </Link>
                </div>
              </div>

              <div className={cls.gridProduct}>
                {hotProducts?.product_request &&
                  hotProducts?.product_request.map((item) => (
                    <div key={item.id} className={cls.bckgrColor}>
                      <div className={cls.icons}>
                        <FavouriteBtn active={item.favorite} id={item.id} />
                        <CompareBtn   active={item.is_in_comparison} id={item.id} />
                      </div>
                      <div className={cls.percent}>
                        -{item.random_shop.discount.percent}%
                      </div>

                      <div className={cls.innerContainer}>
                        <div className={`${cls.imageProduct} nextImage`}>
                          <Link href={`/productPage/${item.slug}`}>
                            <a>
                              <Image
                                layout="fill"
                                src={item.images[0]?.types.medium_default}
                                alt="image"
                              />
                            </a>
                          </Link>
                        </div>
                        <div className={cls.wrapCart}>
                          <Link href={`/productPage/${item.slug}`}>
                            <a>
                              <p className={cls.title}>{item.class.name}</p>
                              <h4 className={cls.description}>
                                <ClampLines
                                  text={item.name}
                                  id={item.id}
                                  lines={2}
                                  buttons={false}
                                  innerElement="h4"
                                />
                              </h4>
                            </a>
                          </Link>
                          <div>
                            <p className={cls.countTitle}>
                              {t("common:finishHot")}
                            </p>
                            {item.random_shop.discount ? (
                              <Countdown
                                date={
                                  Date.now() + item.random_shop.discount
                                    ? new Date(
                                        item.random_shop.discount
                                          ? item.random_shop.discount.until
                                          : null
                                      ).getTime()
                                    : null
                                }
                                renderer={renderer}
                              />
                            ) : null}
                          </div>

                          <div className={cls.btnBuy}>
                            <div className={cls.priceProduct}>
                              <span className={cls.rassrochka}>
                                {item.random_shop.price ? (
                                  <del>
                                    {item.random_shop.price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                  </del>
                                ) : null}
                                {t("common:currency")}
                              </span>
                              <span className={cls.priceBuy}>
                                {item.random_shop.discount.price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                                {t("common:currency")}
                              </span>
                            </div>
                            <CartBtn active={item.is_in_cart} id={item.random_shop.item_shop_id} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default HotOffer;
