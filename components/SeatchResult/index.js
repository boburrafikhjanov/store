/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { useTypeDispatch } from "../../store/hooks/useDispatch";
import { useTypeSelector } from "../../store/hooks/useSelector";
import ClampLines from "react-clamp-lines";
import FavouriteBtn from "../Buttons/Favourite";
import CompareBtn from "../Buttons/Compare";
import CartBtn from "../Buttons/Cart";
import SkeletonProductCard from "../Skeleton/SkeletonProduct";

import cls from "./search.module.scss";
import Search from "./../Search/index";

export default function SearchResult({ data, query }) {
  const renderProduct = () =>
    data
      ? data?.map((item) => (
          <>
            <div key={item.id} className={cls.cartSales}>
              <div className={cls.innerContainer}>
                <div className={`${cls.imae} nextImage`}>
                  <div className={cls.feature}>
                    <FavouriteBtn id={item?.random_shop?.id} />
                    <CompareBtn id={item?.random_shop?.id} />
                  </div>
                  <Link
                    href={{
                      pathname: "/productPage/[product]",
                    }}
                    as={`/productPage/${item.slug}`}
                  >
                    <a>
                      <Image layout="fill" alt="image" src={item?.image} />
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
                    <p className={cls.categoryTitle}></p>
                    <h4 className={cls.descriptionProduct}>
                      <ClampLines
                        text={item.name}
                        id={item.id}
                        lines={2}
                        buttons={false}
                        // ellipsis="..."
                        // moreText="false"
                        innerElement="h4"
                      />
                    </h4>
                  </a>
                </Link>

                <div className={cls.buyPart}>
                  <div>
                    <span className={cls.installmentPlan}>
                      {item?.random_shop?.monthly_price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                      сум
                    </span>
                    <p className={cls.fixPrice}>
                      {item?.random_shop?.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                      сум
                    </p>
                  </div>
                  <div>
                    <CartBtn id={item?.random_shop?.item_shop_id} />
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
              {/* <div className={cls.icon}></div> */}
              <div className={cls.flexHeader}>
                <span className={cls.brandstore}>brandstore</span>
                <span className={cls.recommendation}>
                  Найдено {data.length} товаров по запросу:{query}
                </span>
              </div>
            </div>
          </div>
          <div className={cls.cartsPart}>
            <div className={cls.wrapContainer}>{renderProduct()}</div>
            <div className={cls.adBlock}></div>
          </div>
        </div>
      </div>
    </>
  );
}
