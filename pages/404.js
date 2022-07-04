import React from "react";


import Head from 'next/head'
import Link from "next/link";
import Image from "next/image";
import error from "../public/404.png";

import { ArrowRightIcon } from "../components/svg";
import SimilarProduct from "../components/SimilarProduct";
import useTranslation from "next-translate/useTranslation";

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <>
     <Head>
        <title>
          Интернет-магазин компьютерной техники в Ташкенте | BRANDSTORE.UZ
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
      <div className="containerFluid">
        <div className="routeCart">
          <h3 className="nonActiveRoute">{t("common:main")}</h3>
          <div>
            <ArrowRightIcon />
          </div>
          <h3 className="activeRoute">@$@$#@$%</h3>
        </div>

        <div className="itemPart">
          <div className="container-404">
            <div className="wrapContainer">
              <div className="nextImage">
                <Image layout="fill" src={error} alt="" />
              </div>
              <div className="contentPart">
                <h1>404</h1>
                <div className="returnHome">
                  <p>{t("common:404")}</p>
                  <Link href={"/"}>
                    <a>
                      <button style={{cursor:"pointer"}}>{t("common:returnBack")}</button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="termsAnd">
            <p>
              {t("common:why404")}
            </p>
            <span>
              {t("common:why404a")}
            </span>
          </div>
        </div>

        {/* <SimilarProduct /> */}
      </div>
    </>
  );
};

export default Page404;
