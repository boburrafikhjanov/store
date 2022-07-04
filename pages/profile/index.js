/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { useTypeSelector } from "../../store/hooks/useSelector";
import { useTypeDispatch } from "../../store/hooks/useDispatch";
import Tracker from '../../components/Tracker/index'


import Profile from "../../components/Profile";

const profile = () => {
  const { push } = useRouter();
  const { profileInfo } = useTypeDispatch();
  const { userInfo } = useTypeSelector((state) => state.profile);

  useEffect(() => {
    const cookies = new Cookies();
    if (!cookies.get("access_token")) push("/login");
    else profileInfo();
  }, []);
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
      <Tracker/>
      <Profile />
    </>
  );
};

export default profile;
