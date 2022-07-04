/* eslint-disable @next/next/no-img-element */
import React from "react";

import Link from "next/link";
import { notifyError } from "../../helpers/NotifyBtn";
import { useTypeDispatch } from "../../store/hooks/useDispatch";
import { useTypeSelector } from "../../store/hooks/useSelector";
import cls from "./favorite.module.scss";

import useTranslation from "next-translate/useTranslation";

import {
  ArrowRightIcon,
  CompareIcon,
  FreeFavouriteIcon,
  ColumnIcon,
  ExitIcon,
  CashNewIcon,
} from "../svg";
import CartBtn from "../Buttons/Cart";
import CompareBtn from "../Buttons/Compare";

export default function Favorite({ favorite }) {
  const { t } = useTranslation();
  const { toggleFavourite, fetchFavourites } = useTypeDispatch();
  const { favouriteProducts } = useTypeSelector((state) => state.favourite);

  const handleFavouriteRemove = async (product_id) => {
    await toggleFavourite(product_id);
    notifyError("Продукт удален с Избранных");
    await fetchFavourites(1);
  };
  return (
    <>
      <div className="containerFluid">
        {favorite.length === 0 ? (
          <>
            <div className={cls.wrapRoute}>
              <div className={cls.routeLink}>
                <div>
                  <Link href="/">
                    <a>
                      <h3 className={cls.nonactiveTitle}>{t("common:main")}</h3>
                    </a>
                  </Link>
                </div>
                <div className={cls.show}>
                  <ArrowRightIcon />
                </div>
                <div className={cls.hide}>
                  /
                </div>
                <div>
                  <span className={cls.activeTitle}>
                    {t("common:favourite")}
                  </span>
                </div>
              </div>
            </div>
            <div className="noClass">
              <FreeFavouriteIcon />
              <h2>{t("common:freeFavorite")}</h2>
            </div>
          </>
        ) : (
          <>
            <div className={cls.wrapRoute}>
              <div className={cls.routeLink}>
                <div>
                  <Link href="/">
                    <a>
                      <h3 className={cls.nonactiveTitle}>{t("common:main")}</h3>
                    </a>
                  </Link>
                </div>
                <div className={cls.show}>
                  <ArrowRightIcon />
                </div>
                <div className={cls.hide}>
                  /
                </div>
                <div>
                  <span className={cls.activeTitle}>
                    {t("common:favourite")}
                  </span>
                </div>
              </div>
              <div className={cls.filters}>
                <div className={cls.viewPosition}>
                  <span>{t("common:vid")}</span>

                  <button className={cls.column}>
                    <ColumnIcon />{" "}
                  </button>
                </div>
              </div>
            </div>

            <div className={cls.productsList}>
              {favorite &&
                favorite.map((item, i) => (
                  <>
                    <div className={cls.wrapList}>
                      <div className={cls.productPart}>
                        <div className={cls.exitBtn}>
                          <button
                            style={{ cursor: "pointer" }}
                            onClick={() => handleFavouriteRemove(item.id)}
                          >
                            <ExitIcon />
                          </button>
                        </div>
                        <div className={cls.catch}>
                          <div className={`${cls.widthImg} nextImage`}>
                            <img
                              src={item.images[0]?.types?.home_default}
                              layout="fill"
                              alt="asdasdada"
                            />
                          </div>
                          <div className={cls.icons}>
                            {/* <CompareBtn id={item.id}/> */}
                          </div>
                        </div>
                        <div className={cls.aboutProduct}>
                          <Link href={`/productPage/${item.slug}`}>
                            <a style={{ cursor: "pointer" }}>
                              <span className={cls.category}>
                                {item.class.name}
                              </span>
                              <p>{item.name}</p>
                            </a>
                          </Link>
                          <div className={cls.infoProductW}>
                            <div className={cls.wrapAllFeature}>
                              {item?.features?.length &&
                                item?.features
                                  .slice(0, 3)
                                  .map((featuresProduct, i) => (
                                    <>
                                      <div className={cls.wrapFeatureName}>
                                        <span>
                                          {featuresProduct.feature.name}
                                        </span>
                                      </div>
                                    </>
                                  ))}
                            </div>
                            <div className={cls.wrapValueAny}>
                              {item?.features?.length &&
                                item?.features
                                  .slice(0, 3)
                                  .map((featuresProduct, i) => (
                                    <>
                                      <div className={cls.wrapFeature}>
                                        <span>{featuresProduct.value}</span>
                                      </div>
                                    </>
                                  ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={cls.orderPart}>
                        <div className={cls.innerContainer}>
                          <div className={cls.partBox}>
                            <div>
                              <span>
                                {item.random_shop.monthly_price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                                {t("common:currency")} / {t("common:month")}
                              </span>
                              <h3>
                                {item.random_shop.price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                                {t("common:currency")}
                              </h3>
                            </div>
                            <div>
                              <div className={cls.cash}>
                                <div className="nextImage">
                                  <CashNewIcon />
                                </div>
                                <div className={cls.cashOne}>
                                  <span className={cls.cashbackTxt}>
                                    Cashback
                                  </span>
                                  <span className={cls.cashbackPrice}>
                                    {item.random_shop.cashback
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    {t("common:currency")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <button>
                            <CartBtn id={item.random_shop.item_shop_id} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
