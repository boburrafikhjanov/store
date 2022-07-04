/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";

import CartBtn from "../../Buttons/Cart";
import CompareBtn from "../../Buttons/Compare";
import FavoriteBtn from "../../Buttons/Favourite";
import SkeletonProductCard from "../../Skeleton/SkeletonProduct";
import useTranslation from "next-translate/useTranslation";
import cls from "../../ProductCard/productCard.module.scss";
import { useTypeSelector } from "../../../store/hooks/useSelector";


const ContentProduct = () => {
  const { filteredProducts } = useTypeSelector((state) => state.category);
  const { t } = useTranslation();
  return (
    <>
  {filteredProducts.products && filteredProducts.products.length ? (
        filteredProducts.products.map((item) => (
          <div key={item.id}>
            <div className={cls.cartSales}>
              <div className={cls.innerContainer}>
                <div className={`${cls.imagePro} nextImage`}>
                  <div className={cls.feature}>
                    <div className={cls.btn}>
                      <CompareBtn
                        active={item.is_in_comparison}
                        style={{ cursor: "pointer" }}
                        id={item.id}
                      />
                      <FavoriteBtn
                        active={item.favorite}
                        style={{ cursor: "pointer" }}
                        id={item.id}
                      />
                    </div>
                  </div>
                  {item.random_shop.discount?.percent ? (
                    <div className={cls.percent}>
                      <>-{item.random_shop.discount?.percent}%</>
                    </div>
                  ) : null}
                  <Link
                    href={{
                      pathname: "/productPage/[product]",
                    }}
                    as={`/productPage/${item.slug}`}
                  >
                    <a>
                      <img
                        alt="asd"
                        src={item?.images[0]?.types.home_default}
                        objectFit="contain"
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
                  <a>
                    <p className={cls.categoryTitle}>{item.class.name}</p>
                    <div className={cls.descriptionProduct}>{item.name}</div>
                  </a>
                </Link>
                <div className={cls.buyPart}>
                  {item.random_shop.quantity ? (
                    (
                      item.random_shop.discount
                        ? item.random_shop.discount.price
                        : null
                    ) ? (
                      <div className="product_price">
                        <div className="pirceNon">
                          {(item.random_shop.discount
                            ? item.random_shop.discount.price
                            : null
                          )
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                          {t("common:currency")}
                        </div>
                        <del>
                          {item.random_shop.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                          {t("common:currency")}
                        </del>
                      </div>
                    ) : (
                      <div className="product_price">
                        {item.random_shop.price ? (
                          <div
                            className="red_text"
                            style={{ fontWeight: "800" }}
                          >
                            {item.random_shop.monthly_price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                            {t("common:currency")} {t("common:mes")}
                          </div>
                        ) : (
                          <br />
                        )}
                        <div className="product_price">
                          <div className="noredTxt">
                            {item.random_shop.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                            {t("common:currency")}
                            &nbsp;
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="product_price">Нет в наличии</div>
                  )}
                  <button>
                    <CartBtn
                      active={item.is_in_cart}
                      id={item.random_shop.item_shop_id}
                    />
                  </button>
                </div>
              </div>
            </div>
            </div>
        ))
      ) : !filteredProducts.loading ? (
        <SkeletonProductCard count={12} type={"catalog"} />
      ) : (
            <SkeletonProductCard count={12} type={"catalog"} />
      )}

    
    </>
  );
};

export default ContentProduct;
