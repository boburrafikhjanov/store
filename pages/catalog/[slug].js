/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import url from "../../api/url";
import Head from "next/head";
import Cookies from "universal-cookie";
import BreadCrumb from "../../components/BreadCrumb-new";
import MobileFilter from "../../components/ProductCard/mobileFilter";
import Filter from "../../components/ProductCard/Filter";
import ContentProduct from "../../components/ProductCard/ContentProduct";
import Pagination from "../../components/Pagination";
import cls from "../../components/ProductCard/productCard.module.scss";
import { stringToArrayParser } from "../../helpers/arrayOperations";
import List from "../../components/List";
import Tracker from "../../components/Tracker/index";
import useTranslation from "next-translate/useTranslation";

import { useTypeDispatch } from "../../store/hooks/useDispatch";
import { useTypeSelector } from "../../store/hooks/useSelector";

const catalog = ({ singleCategory }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { query } = router;
  const { fetchCategoryFilteredProducts, clearFilteredProducts, fetchFilters } =
    useTypeDispatch();

  const cookies = new Cookies();
  const locale = cookies.get("locale") == "ru" && "uz";

  const {
    description,
    meta_description,
    meta_keywords,
    meta_title,
    name,
    image,
  } = singleCategory;

  const createMarkup = (html) => {
    return { __html: html };
  };

  useEffect(() => {
    const page = query.page ? query.page : 1;
    const brand_ids = stringToArrayParser(query.brand_ids);
    const feature_value_ids = stringToArrayParser(query.feature_value_ids);

    if (query.slug && singleCategory.id) {
      const params = {
        category_id: singleCategory.id,
        page,
        brand_ids,
        feature_value_ids,
      };
      sortbyPriceMin()
      fetchFilters(params);
      clearFilteredProducts({});
      fetchCategoryFilteredProducts(params);
    }
  }, [query.slug, locale]);
  const [sortName, setSortName] = useState("");

  const sortbyPriceMin = async () => {
    if (router.query.brand_ids) {
      setSortName(t("common:poVozrasti"));
      await fetchCategoryFilteredProducts({
        sort: "price",
        asc: 1,
        category_id: singleCategory.id,
        "brand_ids[]": router.query.brand_ids,
      });
    } else {
      setSortName(t("common:poVozrasti"));
      await fetchCategoryFilteredProducts({
        sort: "price",
        asc: 1,
        category_id: singleCategory.id,
      });
    }
  };

  const sortbyPopular = async () => {
    if (router.query.brand_ids) {
      setSortName(t("common:popular"));
      await fetchCategoryFilteredProducts({
        sort: "view_count",
        asc: 0,
        category_id: singleCategory.id,
        "brand_ids[]": router.query.brand_ids,
      });
    } else {
      setSortName(t("common:popular"));
      await fetchCategoryFilteredProducts({
        sort: "view_count",
        asc: 0,
        category_id: singleCategory.id,
      });
    }
  };

  console.log(router, "asd");

  // useEffect(() => {
  //   sortbyPopular();
  // }, []);

  const sortbyPriceMax = async () => {
    if (router.query.brand_ids) {
      setSortName(t("common:poUbivayushiy"));

      await fetchCategoryFilteredProducts({
        sort: "price",
        asc: 0,
        category_id: singleCategory.id,
        "brand_ids[]": router.query.brand_ids,
      });
    } else {
      setSortName(t("common:poUbivayushiy"));

      await fetchCategoryFilteredProducts({
        sort: "price",
        asc: 0,
        category_id: singleCategory.id,
      });
    }
  };
  return (
    <>
      <Head>
        <title>{meta_title}</title>
        <meta
          name="google-site-verification"
          content="3kTZ1AFA-Ys6DV-oZgCXUqlfNqsP6r2YJ0mpAmcaL-k"
        />
        <meta name="description" content={singleCategory.meta_description} />
        <meta name="keywords" content={singleCategory.meta_keywords} />
        <meta property="og:title" content={singleCategory.meta_title} />
        <meta
          property="og:description"
          content={singleCategory.meta_description}
        />
        <meta property="og:image" content={singleCategory.image} />
        <meta
          property="og:url"
          content={`https://brandstore.uz/catalog/${singleCategory.slug}`}
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
      <Tracker />
      <div className="wrapBread">
        <BreadCrumb
          catalogCrumbs={{
            id: singleCategory.id,
            slug: singleCategory.slug,
            name: singleCategory.name,
            parent: singleCategory.parent,
          }}
          url={'/catalog'}
        />
      </div>
      <div className="containerFluid">
        {singleCategory.level_depth == 0 ? null : (
          <>
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
          </>
        )}
      </div>
      <div className="containerFluidCatalog">
        {/* {singleCategory.level_depth == 0 ? (
          <>
            <div className="containerAAA">
              <List descr={singleCategory} child={singleCategory.childs} />
            </div>
            <div></div>
          </>
        ) : (
          <>
            <div className={cls.wrapGrid}>
              <div className="desFiltersPart">
                <Filter type={"category"} />
              </div>
              <div className="mobileFilter">
                <MobileFilter type={"category"} />
              </div>

              <div className={cls.cartsPart}>
                <div className={cls.wrapCarts}>
                  <div className={cls.wrapContainer}>
                    <ContentProduct />
                  </div>
                  <Pagination type={"category"} id={singleCategory.id} />
                  <div
                    className="aseoSeo"
                    dangerouslySetInnerHTML={{
                      __html: singleCategory.description,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </>
        )} */}
        {(() => {
          switch (singleCategory?.level_depth) {
            case 0:
              return (
                <div className="containerAAA">
                  <List descr={singleCategory} child={singleCategory.childs} />
                </div>
              );
            case 1:
              return (
                <div className={cls.wrapGrid}>
                  <div className="desFiltersPart">
                    <Filter type={"category"} />
                  </div>
                  <div className="mobileFilter">
                    <MobileFilter type={"category"} />
                  </div>

                  <div className={cls.cartsPart}>
                    <div className={cls.wrapCarts}>
                      <div className={cls.wrapContainer}>
                        <ContentProduct />
                      </div>
                      <Pagination type={"category"} id={singleCategory.id} />
                      <div
                        className="aseoSeo"
                        dangerouslySetInnerHTML={{
                          __html: singleCategory.description,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )
              case 2:
                return(
                  <div className={cls.wrapGrid}>
                  <div className="desFiltersPart">
                    <Filter type={"category"} />
                  </div>
                  <div className="mobileFilter">
                    <MobileFilter type={"category"} />
                  </div>

                  <div className={cls.cartsPart}>
                    <div className={cls.wrapCarts}>
                      <div className={cls.wrapContainer}>
                        <ContentProduct />
                      </div>
                      <Pagination type={"category"} id={singleCategory.id} />
                      <div
                        className="aseoSeo"
                        dangerouslySetInnerHTML={{
                          __html: singleCategory.description,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                )
          }
        })()}
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  let data = {};

  const cookies = new Cookies(context.req.headers.cookie);
  let locale = cookies.get("locale");

  await axios
    .get(`${url}/api/categories?slug=${context.query.slug}`, {
      headers: { "X-Localization": `${locale}` },
    })
    .then((res) => (data = res.data.data))
    .catch((e) => {
      context.res.statusCode = 302;
      context.res.setHeader("Location", `/404`);
      return { props: {} };
    });

  return {
    props: {
      singleCategory: data,
    },
  };
};

export default catalog;
