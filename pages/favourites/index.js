/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import Head from "next/head";
import Favorite from "../../components/Favorite";
import { useRouter } from "next/router";

import { useTypeSelector } from "../../store/hooks/useSelector";
import { useTypeDispatch } from "../../store/hooks/useDispatch";

import useTranslation from "next-translate/useTranslation";
import Tracker from '../../components/Tracker/index'

export default function favorite({ langauge, setLanguage }) {
  const router = useRouter();
  const t = useTranslation()
  const { favLoading, meta, favouriteProducts } = useTypeSelector(
    (state) => state.favourite
  );
  const { fetchFavourites } = useTypeDispatch();

  useEffect(() => {
    fetchFavourites(1);
    return ()=>{
      setLanguage(false)
    }
  }, [langauge]);
  return (
    <>
      <Head>
      {router.locale === "ru" ? (

        <title>
        Избранные
        </title>
        ) : (
        <title>
        Sevimlilar
        </title>

        )}
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
      
      <Favorite favorite={favouriteProducts} />
    </>
  );
}
