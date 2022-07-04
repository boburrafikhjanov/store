import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import url from "../../../api/url";
import useTranslation from "next-translate/useTranslation";

import ClampLines from "react-clamp-lines";
import FavouriteBtn from "../../Buttons/Favourite";
import CompareBtn from "../../Buttons/Compare";
import CartBtn from "../../Buttons/Cart";
import Cookies from "universal-cookie";
import cls from "./similarProduct.module.scss";

const SimilarProduct = (props) => {
  const [similar, setSimilar] = useState([]);
  const { t } = useTranslation();
  const cookies = new Cookies();
  const locale = cookies.get("locale") == "ru" && "uz";

  useEffect(() => {
    let locale = cookies.get("locale");
    axios
      .get(`${url}/api/products/similar`, {
        headers: { "X-Localization": `${locale}` },
        params: {
          product_id: props.prodId,
          per_page: 4,
        },
      })
      .then((res) => {
        setSimilar(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [locale]);

  // similar

  return (
    <>
      <div className="containerFluid">
        <p className={cls.nameE}>
        {t("common:poxojie")}
        </p>
        <div className={cls.cartsPartS}>
          {similar.map((item) => (
            <>
              <div className={cls.wrapContainer}>
              <Link
                    href={{
                      pathname: "/productPage/[product]",
                    }}
                    as={`/productPage/${item.slug}`}
                  >
                    <a>
                <img src={item.images[0].url} />
                </a>
                  </Link>
                <div className={cls.feature}>
                    <FavouriteBtn id={item.id} />
                    <CompareBtn id={item.id} />
                  </div>
                <div className={cls.opisaniy}>
                  <Link
                    href={{
                      pathname: "/productPage/[product]",
                    }}
                    as={`/productPage/${item.slug}`}
                  >
                    <a>
                      <span className={cls.router}>{item.class.name}</span>
                      <p className={cls.title}>
                        <ClampLines
                          text={item.name}
                          id={item.id}
                          lines={2.5}
                          buttons={false}
                          innerElement="h4"
                        />
                      </p>
                    </a>
                  </Link>

                  <div className={cls.wrapBtn}>
                    <div className={cls.first}>
                      <p className={cls.isntal}>
                        {" "}
                        {item.random_shop.monthly_price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                        {t("common:currency")}
                      </p>
                      <p className={cls.fixPRice}>
                        {" "}
                        {item.random_shop.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                        {t("common:currency")}
                      </p>
                    </div>
                    <div className={cls.btn}>
                      <button>
                        <CartBtn id={item.random_shop.item_shop_id} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default SimilarProduct;
