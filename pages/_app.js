import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/globals.scss";
import { useRouter } from "next/router";
import { wrapper } from "../store/store";

import Tracker from '../components/Tracker/index'

import "mapbox-gl/dist/mapbox-gl.css";

import Cookies from "universal-cookie";

import theme from "../helpers/theme";
import { ThemeProvider } from "@material-ui/core/styles";

import { v4 as uuidv4 } from 'uuid';

import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const cookies = new Cookies();
  const router = useRouter()
  const [langauge, setLanguage] = useState();
  const uuidv1 = uuidv4()
  
  useEffect(()=>{
    const current = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(current.getFullYear() + 1);

    cookies.set("device_type", "web");
    if (!cookies.get("device_token")) {
      let device_id = uuidv1
      cookies.set("device_token", device_id, {
         path: "/",
         expires: nextYear
      })
    }
  },[])


  useEffect(()=>{
    router.locale == "ru" ? cookies.set('locale', "ru") : cookies.set('locale', "uz")
  },[])

  const localeLang = cookies.get("locale");
  return (
    <ThemeProvider theme={theme}>
               <Tracker/>
      <Layout langauge={setLanguage} lang={langauge}>
        <Component
          localeLang={localeLang}
          setLanguage={setLanguage}
          langauge={langauge}
          {...pageProps}
        />
      </Layout>

    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
