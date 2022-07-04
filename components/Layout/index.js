import React, {useEffect} from "react";

import { YMInitializer } from "react-yandex-metrika";
import { initGA, logPageView } from "../googleAnalytics.js"

import Language from "./LanguageSwitcher";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, langauge, lang }) {
  
  useEffect(()=>{
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    
  },[])

  return (
    <>
      <Language langauge={langauge} />
      <Header lang={lang} langauge={langauge} />
      <YMInitializer
          accounts={[61408678, 64732159]}
          options={{
            webvisor: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            ecommerce:"dataLayer"
          }}
        />
      {children}
      <Footer />
    </>
  );
}
