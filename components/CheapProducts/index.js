/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";

import Image from "next/image";

import Link from "next/link";
import CartBtn from "../Buttons/Cart";
import FavouriteBtn from "../Buttons/Favourite";
import CompareBtn from "../Buttons/Compare";
import SkeletonProductCard from "../Skeleton/SkeletonProduct";
import useTranslation from "next-translate/useTranslation";
import ClampLines from "react-clamp-lines";
import { hotProduct } from "../../mockData/adBlockRecom";
import cls from "./cheapProducts.module.scss";
import Cookies from "universal-cookie";

export default function CheapProducts({
  maxPriceMillion,
  maxPriceHalfMillion,
  maxPriceTwoHundredThousands,
}) {
  const cookies = new Cookies();
  const [value, setValue] = useState(0);
  const { t } = useTranslation();

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <div className="containerFluid">
        <div className={cls.hotProducts}>
          <div className={cls.headerCheap}>
            <div className={cls.flexPart}>
              <div>
                <div className={cls.icon}></div>
              </div>
              <div className={cls.tovarHeader}>
                <div className={cls.tovar}>{t("common:tovari")}</div>
                <span>{t("common:arzon")}</span>
              </div>
            </div>
          </div>
          <div className="bloc-tabs">
            <button
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              200 000 {t("common:currency")}
            </button>
            <button
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              500 000 {t("common:currency")}
            </button>
            <button
              className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(3)}
            >
              1 000 000 {t("common:currency")}
            </button>
          </div>

          <Link href="/moreCheap">
            <a>
              <button className={cls.btnMoreChep}>{t("common:seeMore")}</button>
            </a>
          </Link>
        </div>

        <div className={cls.cartsPart}>
          <div className={`${cls.wrapContainer} wrapContainer`}>
            <div className="content-tabs">
              <div
                className={
                  toggleState === 1 ? "content  active-content" : "content"
                }
              >
                <p className="mobileTabs">
                  {maxPriceTwoHundredThousands.product_request &&
                  maxPriceTwoHundredThousands.product_request.length
                    ? maxPriceTwoHundredThousands.product_request
                        ?.slice(0, 6)
                        .map((item) => (
                          <div key={item.id} className={cls.cartSales}>
                            <div className={cls.innerContainer}>
                              <div className={`${cls.imae} nextImage`}>
                                <div className={cls.feature}>
                                  <FavouriteBtn onClick={fbq('track', 'ADD_TO_WISHLIST')} id={item.id} />
                                  <CompareBtn id={item.id} />
                                </div>
                                <Link
                                  href={{
                                    pathname: "/productPage/[product]",
                                  }}
                                  as={`/productPage/${item.slug}`}
                                >
                                  <a
                                    className={cls.ims}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <Image
                                      loading="lazy"
                                      layout="fill"
                                      alt="image"
                                      src={item?.images[0]?.types?.home_default}
                                    />
                                  </a>
                                </Link>
                              </div>

                              <Link
                                href={{
                                  pathname: "/productPage/[product]",
                                }}
                                as={`/productPage/${item.slug}`}
                              >
                                <a style={{ cursor: "pointer" }}>
                                  <p className={cls.categoryTitle}>
                                    {item.class.name}
                                  </p>
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
                                <div className={cls.padding}>
                                  <span className={cls.installmentPlan}>
                                    {item.random_shop.monthly_price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    {t("common:currency")} {t("common:mes")}
                                  </span>
                                  <p className={cls.fixPrice}>
                                    {item.random_shop.price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    {t("common:currency")}
                                  </p>
                                </div>
                                <div className={`${cls.btnOrder} btnPrimary`}>
                                  <CartBtn
                                    active={item.is_in_cart}
                                    id={item.random_shop.item_shop_id}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                    : !maxPriceTwoHundredThousands.loading && (
                        <SkeletonProductCard count={6} type={"catalog"} />
                      )}
                </p>
              </div>

              <div
                className={
                  toggleState === 2 ? "content  active-content" : "content"
                }
              >
                <p className="mobileTabs">
                  {maxPriceHalfMillion.product_request &&
                  maxPriceHalfMillion.product_request.length
                    ? maxPriceHalfMillion.product_request
                        .slice(0, 6)
                        .map((item) => (
                          <div key={item.id} className={cls.cartSales}>
                            <div className={cls.innerContainer}>
                              <div className={`${cls.imae} nextImage`}>
                                <div className={cls.feature}>
                                  <FavouriteBtn onClick={fbq('track', 'ADD_TO_WISHLIST')} id={item.id} />
                                  <CompareBtn id={item.id} />
                                </div>
                                <Link
                                  href={{
                                    pathname: "/productPage/[product]",
                                  }}
                                  as={`/productPage/${item.slug}`}
                                >
                                  <a style={{ cursor: "pointer" }}>
                                    <Image
                                      layout="fill"
                                      alt="image"
                                      loading="lazy"
                                      src={item?.images[0]?.types?.home_default}
                                    />
                                  </a>
                                </Link>
                              </div>
                              <Link
                                href={{
                                  pathname: "/productPage/[product]",
                                }}
                                as={`/productPage/${item.slug}`}
                              >
                                <a style={{ cursor: "pointer" }}>
                                  <p className={cls.categoryTitle}>
                                    {item.class.name}
                                  </p>
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
                                <div className={cls.anyPadding}>
                                  <span className={cls.installmentPlan}>
                                    {item.random_shop.monthly_price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    {t("common:currency")} {t("common:mes")}
                                  </span>
                                  <p className={cls.fixPrice}>
                                    {item.random_shop.price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    {t("common:currency")}
                                  </p>
                                </div>
                                <div className={`${cls.btnOrder} btnPrimary`}>
                                  <CartBtn id={item.random_shop.item_shop_id} />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                    : !maxPriceHalfMillion.loading && (
                        <SkeletonProductCard count={6} type={"catalog"} />
                      )}
                </p>
              </div>

              <div
                className={
                  toggleState === 3 ? "content  active-content" : "content"
                }
              >
                <p className="mobileTabs">
                  {maxPriceMillion.product_request &&
                    maxPriceMillion.product_request.slice(0, 6).map((item) => (
                      <div key={item.id} className={cls.cartSales}>
                        <div className={cls.innerContainer}>
                          <div className={`${cls.imae} nextImage`}>
                            <div className={cls.feature}>
                              <FavouriteBtn onClick={fbq('track', 'ADD_TO_WISHLIST')} id={item.id} />
                              <CompareBtn id={item.id} />
                            </div>
                            <Link
                              href={{
                                pathname: "/productPage/[product]",
                              }}
                              as={`/productPage/${item.slug}`}
                            >
                              <a style={{ cursor: "pointer" }}>
                                <Image
                                  layout="fill"
                                  alt="image"
                                  loading="lazy"
                                  src={item.images[0]?.types?.home_default}
                                />
                              </a>
                            </Link>
                          </div>
                          <Link
                            href={{
                              pathname: "/productPage/[product]",
                            }}
                            as={`/productPage/${item.slug}`}
                          >
                            <a style={{ cursor: "pointer" }}>
                              <p className={cls.categoryTitle}>
                                {item.class.name}
                              </p>
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
                            <div className={cls.anyPadding}>
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
                            <div className={`${cls.btnOrder} btnPrimary`}>
                              <CartBtn id={item.random_shop.item_shop_id} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </p>
              </div>
            </div>
          </div>

          <div className={cls.adBlock}>
            {hotProduct.map((item) => (
              <>
                <div key={item.id} className={cls.wrapFlex}>
                  <Link href={item.href}>
                    <a>
                      <div className={`${cls.imagesCart} nextImage`}>
                        <Image src={item.link} layout="fill" alt="photo5" />
                      </div>

                      <div className={cls.titleAd}>
                        <div className={cls.titleAdTwo}>
                          <div className={cls.flex}>
                            <div className={cls.secondaryText}>
                              <span className={cls.adName}>
                                {item.underLine}
                              </span>{" "}
                              {item.noline}
                            </div>
                            <div>{item.iconOne}</div>
                          </div>
                          {cookies.get("locale") === "uz" ? (
                            <>
                              <h3>{item.descriptionUz}</h3>
                            </>
                          ) : (
                            <>
                              <h3>{item.description}</h3>
                            </>
                          )}
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
    </>
  );
}
