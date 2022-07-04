/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect,useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTypeSelector } from "../../store/hooks/useSelector";
import { useTypeDispatch } from "../../store/hooks/useDispatch";
import { stringToArrayParser } from "../../helpers/arrayOperations";

import Pagination from "../../components/Pagination/index";
// import BrandFilterSidebar from '../../components/BrandFilter/BrandFilterSidebar'
import Filter from "../../components/ProductCard/Filter";
import ContentProduct from "../../components/ProductCard/ContentProduct";
import MobileFilter from "../../components/ProductCard/mobileFilter";
import BreadCrumb from "../../components/BreadCrumb";

import useTranslation from "next-translate/useTranslation";

import cls from "../../components/ProductCard/productCard.module.scss";
import Tracker from '../../components/Tracker/index'

const Brand = () => {
  const { query, push } = useRouter();
  const { t } = useTranslation();
  const { fetchCategoryFilteredProducts, clearFilteredProducts, fetchFilters } =
    useTypeDispatch();

  useEffect(() => {
    const page = query.page ? query.page : 1;
    const brand_id = query.brand_id;
    const feature_value_ids = stringToArrayParser(query.feature_value_ids);

    if (query.brand && brand_id) {
      const params = {
        page,
        brand_id,
        feature_value_ids,
      };
      fetchFilters(params);
      clearFilteredProducts({});
      fetchCategoryFilteredProducts(params);
    }
  }, [query.brand]);


  const [sortName, setSortName] = useState("");
  const [asc, setAsc] = useState(null);
  const [sortType, setSortType] = useState(null);

  const sortbyPriceMin = async () => {
    setSortType("price");
    // setAsc(1);
    setSortName(t("common:poVozrasti"));
    await fetchCategoryFilteredProducts({
      sort: sortType,
      asc: 1,
      brand_id: query.brand_id,
    });
  };
  const sortbyPopular = async () => {
    setSortType("price");
    // setAsc(0);
    setSortName(t("common:popular"));
    await fetchCategoryFilteredProducts({
      sort: "view_count",
      asc: 0,
      brand_id: query.brand_id,
    });
  };
  const sortbyPriceMax = async () => {
    setTimeout(() => {
      setSortType("price");
      // setAsc(0);
      setSortName(t("common:poUbivayushiy"));
    }, 300);
    await fetchCategoryFilteredProducts({
      sort: sortType,
      asc: 1,
      brand_id: query.brand_id,
    });
  };

  useEffect(() => {
    sortbyPopular();
  }, []);

  return (
    <>
    <Head>
        <title>
          {`BRANDSTORE.UZ - ${query.brand}`}
        </title>
        <meta
          name="description"
          content={
            "Купить в Ташкенте по доступной цене и бесплатной доставкой? Легко на brandstore.uz!"
          }
        />
        <meta name="keywords" content={"Онлайн-магазин, Техника, Ташкент"} />
        <meta name="author" content="brandstore" />

        <meta
          property="og:title"
          content={"Интернет-магазин техники в Ташкенте | brandstore.uz"}
        />
        <meta
          property="og:description"
          content={
            "Купить в Ташкенте по доступной цене и бесплатной доставкой? Легко на brandstore.uz!"
          }
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/Favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/Favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/Favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/Favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/Favicon/manifest.json" />
        <meta property="og:url" content={"https://brandstore.uz"} />
        <meta property="og:type" content={"website"} />
        <meta property="og:site_name" content="brandstore.uz" />
        <meta property="og:locale" content={"ru_RU"} />
      </Head>
      <Tracker/>
      <div className="wrapBread">
        <BreadCrumb />
        </div>
        <div className="containerFluid">
        <div className="sortSort">
              <div className="shop_sorting">
                <span>{t("common:sorting")}:</span>
                <ul>
                  <li>
                    <span className="sorting_text">
                      {sortName}
                      <i className="fas fa-chevron-down"></i>
                    </span>
                    <ul>
                      <li
                        className="shop_sorting_button"
                        data-isotope-option='{ "sortBy": "price" }'
                        onClick={sortbyPopular}
                      >
                        {t("common:popular")}
                      </li>
                      <li
                        className="shop_sorting_button"
                        data-isotope-option='{ "sortBy": "price" }'
                        onClick={sortbyPriceMin}
                      >
                        {t("common:poVozrasti")}
                      </li>
                      <li
                        className="shop_sorting_button"
                        data-isotope-option='{ "sortBy": "price" }'
                        onClick={sortbyPriceMax}
                      >
                        {t("common:poUbivayushiy")}
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            </div>
      <div className="containerFluidCatalog">
        <div className={cls.wrapGrid}>
          <div className="desFiltersPart">
            <Filter type={"brand"} />
          </div>
          <div className="mobileFilter">
            <MobileFilter type={"brand"} />
          </div>
          <div className={cls.cartsPart}>
            <div className={cls.wrapCarts}>
              <div className={cls.wrapContainer}>
                <ContentProduct />
              </div>
              <Pagination type={"brand"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Brand;
