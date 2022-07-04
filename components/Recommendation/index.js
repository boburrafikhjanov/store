/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import useTranslation from "next-translate/useTranslation";
import ClampLines from "react-clamp-lines";
import FavouriteBtn from "../Buttons/Favourite";
import CompareBtn from "../Buttons/Compare";
import CartBtn from "../Buttons/Cart";

import Cookies from "universal-cookie";

import { hotProduct } from "../../mockData/adBlock";
import cls from "./recommendation.module.scss";

export default function Recommendation({ recommendedProducts }) {
  const cookies = new Cookies();
  const [isInCompare, setIsCompare] = useState(false);
  const { t } = useTranslation();

  const renderProduct = () =>
    recommendedProducts?.product_request
      ? recommendedProducts?.product_request.slice(0, 6).map((item) => (
          <>
            <div key={item.id} className={cls.cartSales}>
              <div className={cls.innerContainer}>
                <div className={`${cls.imae} nextImage`}>
                  <div className={cls.feature}>
                    <FavouriteBtn active={item.favorite} id={item.id} />
                    <CompareBtn active={item.is_in_comparison} id={item.id} />
                  </div>
                  <Link
                  href={{
                    pathname: "/productPage/[product]",
                  }}
                  as={`/productPage/${item.slug}`}
                >
                  <a>
                  <Image layout="fill" alt="image" src={item?.images[0]?.types?.home_default} />
                    </a></Link>
                </div>
                <Link
                  href={{
                    pathname: "/productPage/[product]",
                  }}
                  as={`/productPage/${item.slug}`}
                >
                  <a>
                    <p className={cls.categoryTitle}>{item.class.name}</p>
                    <h4 className={cls.descriptionProduct}>
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

                <div className={cls.buyPart}>
                  <div>
                    <span className={cls.installmentPlan}>
                      {item.random_shop.monthly_price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                      {t("common:currency")} {t("common:mes")}
                    </span>
                    <p className={cls.fixPrice}>
                      {item.random_shop.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                      {t("common:currency")}
                    </p>
                  </div>
                  <div className={cls.btnA}>
                    <CartBtn active={item.is_in_cart} id={item.random_shop.item_shop_id} />
                  </div>
                </div>
              </div>
            </div>
          </>
        ))
      : null;
  return (
    <>
      <div className={cls.backgroundCart}>
        <div className="containerFluid">
          <div className={cls.wrapCart}>
            <div className={cls.headerRecommendation}>
              <div className={cls.icon}></div>
              <div className={cls.flexHeader}>
                <span className={cls.brandstore}>brandstore</span>
                <span className={cls.recommendation}>
                  {t("common:recommendation")}
                </span>
              </div>
            </div>

            <Link href="/moreRecom">
              <a>
                <button style={{ cursor: "pointer" }}>
                  {t("common:seeMore")}
                </button>
              </a>
            </Link>
          </div>
          <div className={cls.cartsPart}>
            <div className={cls.wrapContainer}>{renderProduct()}</div>
            <div className={cls.adBlock}>
              {hotProduct.map((item) => (
                <>
                  <div key={item.id} className={cls.wrapFlex}>
                    <Link href={item.href}>
                      <a>
                      <div className={`${cls.imagesCart} nextImage`}>
                      <Image src={item.link} layout="fill" alt="photo5" />
                    </div>

                    {/*<div className={cls.absolute}>{item.icon}</div>*/}
                    <div className={cls.titleAd}>
                      <div className={cls.titleAdTwo}>
                        <div className={cls.flex}>
                          <div className={cls.secondaryText}>
                            <span className={cls.adName}>
                              {cookies.get("locale") == "ru" ? (
                                <>{item.underLine}</>
                              ) : (
                                <>{item.underLineUz}</>
                              )}
                            </span>{" "}
                            {item.noline}
                          </div>
                          <div>{item.iconOne}</div>
                        </div>
                        <h3>
                          {cookies.get("locale") == "uz" ? (
                            <>{item.descriptionUz}</>
                            
                          ) : (
                            <>{item.description}</>
                          )}
                        </h3>
                      </div>
                    </div>
                      </a>
                    </Link>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
