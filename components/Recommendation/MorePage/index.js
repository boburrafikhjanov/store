import React, { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import { useTypeDispatch } from "../../../store/hooks/useDispatch";
import { useTypeSelector } from "../../../store/hooks/useSelector";
import ClampLines from "react-clamp-lines";
import FavouriteBtn from "../../Buttons/Favourite";
import CompareBtn from "../../Buttons/Compare";
import CartBtn from "../../Buttons/Cart";
import useTranslation from "next-translate/useTranslation";

import cls from "./more.module.scss";

const MoreRecom = () => {
  const [isInCompare, setIsCompare] = useState(false);
  const { fetchHomeProducts } = useTypeDispatch();
  const { recommendedProducts } = useTypeSelector((state) => state.home);
  useEffect(() => {
    fetchHomeProducts("recommended_products");
  }, []);
  const {t} = useTranslation()

  const renderProduct = () =>
    recommendedProducts?.product_request
      ? recommendedProducts?.product_request?.map((item) => (
          <>
            <div key={item.id} className={cls.cartSales}>
              <div className={cls.innerContainer}>
                <div className={`${cls.imae} nextImage`}>
                  <div className={cls.feature}>
                    <div className={cls.btn}>

                    <FavouriteBtn active={item.favorite} id={item.id} />
                    <CompareBtn active={item.is_in_comparison} id={item.id} />
                    </div>
                  </div>
                  <Link
                  href={{
                    pathname: "/productPage/[product]",
                  }}
                  as={`/productPage/${item.slug}`}
                >
                  <a>
                  <Image layout="fill" alt="image" src={item.images[0].url} />
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
                    <h4 className={cls.descriptionProduct}>
                      <ClampLines
                        text={item.name}
                        id={item.id}
                        lines={2.5}
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
                  <button className={`${cls.btnOrder} btnPrimary`}>
                    <CartBtn active={item.is_in_cart} id={item.random_shop.item_shop_id} />
                  </button>
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
          <div className="brad">
            <div className="bradA">
              <div className="garakmas"></div>
              <div className="bradHead">
                <span className="spanm">brandstore</span>
                <span className="spannnn">{t("common:recommendation")}</span>
              </div>
            </div>
          </div>
          <div className={cls.cartsPartOne}>
            <div className={cls.wrapContainer}>{renderProduct()}</div>
            <div className={cls.adBlock}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreRecom;
