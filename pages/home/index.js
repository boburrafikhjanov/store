/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Head from "next/head";

/*========== Packages ============== */
import Cookies from "universal-cookie";
import { useRouter } from "next/router";

/*========== Packages ============== */
import { useTypeDispatch } from "../../store/hooks/useDispatch";
import { useTypeSelector } from "../../store/hooks/useSelector";

/*========= Components ============*/
import Blur from "../../components/Blur/Blur";
import HeroSlider from "../../components/HeroSlider";
import HotOffer from "../../components/HotOffer";
import PopularCategory from "../../components/PopularCategory";
import CheapProducts from "../../components/CheapProducts";
import Collection from "../../components/Collection";
import BrandFilter from "../../components/BrandFilter";
import Recommendation from "../../components/Recommendation";
import Tracker from "../../components/Tracker/index";
import News from "../../components/News/index";

import NewsDetail from '../../components/News/NewsDetail'
/*========= Components ============*/

const Home = () => {
  const { fetchBanners, fetchHomeProducts } = useTypeDispatch();
  const {
    maxPriceMillion,
    maxPriceHalfMillion,
    maxPriceTwoHundredThousands,
    recommendedProducts,
  } = useTypeSelector((state) => state.home);
  const { banners } = useTypeSelector((state) => state.banners);
  const [deviceWidth, setDeviceWidth] = useState(0);
  const cookies = new Cookies();
  const router = useRouter();
  // const locale = cookies.get("locale") == "ru" && "uz";
  const locale = router.locale;

  useEffect(() => {
    fetchBanners();
    setDeviceWidth(window.innerWidth);
  }, [locale]);

  useEffect(() => {
    fetchHomeProducts("max_price_million");
    fetchHomeProducts("max_price_two_hundred_thousands");
    fetchHomeProducts("max_price_half_million");
    fetchHomeProducts("recommended_products");
  }, [locale]);

  useEffect(() => {
    router.locale === "uz"
      ? cookies.set("locale", "uz") && router.push("/uz")
      : cookies.set("locale", "ru");
    // cookies.get("locale") == "uz" ? router.push('/uz') : router.push('/')
  }, []);

  return (
    <>
      <Head>
        {router.locale === "ru" ? (
          <>
            <title>
              Интернет-магазин компьютерной техники в Ташкенте | BRANDSTORE.UZ
            </title>
            <meta
              name="description"
              content={
                "Купить ноутбуки, мониторы, видеокарты, комплектующие, wi-fi в Ташкенте по доступной цене и бесплатной доставкой? Легко на Brandstore.uz! "
              }
            />
            <meta
              name="keywords"
              content={
                "интернет-магазин, компьютерная техника, ташкент, моноблоки, телефоны, смартфоны, ИБП, блоки питания, гарнитуры, точки доступа wi fi, сетевые хранилища nas, материнские платы, адаптеры wi fi, сетевое оборудование, игровые мыши, модули памяти, игровые клавиатуры, asus , cougar, наушники, в узбекистане"
              }
            />

            <meta
              property="og:title"
              content={
                "Интернет-магазин компьютерной техники в Ташкенте | BRANDSTORE.UZ"
              }
            />
            <meta
              property="og:description"
              content={
                "Купить ноутбуки, мониторы, видеокарты, комплектующие, wi-fi в Ташкенте по доступной цене и бесплатной доставкой? Легко на Brandstore.uz!"
              }
            />
          </>
        ) : (
          <>
            <title>
              BRANDSTORE.UZ kompyuter texnikasi internet dokoni | Oson muddatli
              to`lov O`zbekistonda
            </title>
            <meta
              name="description"
              content={
                "Noutbuklar, monitorlar, videokartalar, tarkibiy qismlar, wi-fi Toshkent shahridan hamyonbop narxda va bepul yetkazib berish orqali sotib olasizmi? BRANDSTORE.UZ saytida sotib olish yoki muddatli to`lov oson!"
              }
            />
            <meta
              name="keywords"
              content={
                "internet do`kon, kompyuter texnikasi, toshkent, monobloklar, telefonlar, smartfonlar, UPS, quvvat manbai, naushniklar, wi fi ulanish nuqtalari, nas tarmoq omborlari, anakartlar, wi fi adapterlari, tarmoq uskunalari, o`yin sichqonlari, xotira modullari, o'yin klaviaturalari, asus, cougar, minigarnituralar, o`zbekistonda"
              }
            />

            <meta
              property="og:title"
              content={
                "BRANDSTORE.UZ kompyuter texnikasi internet dokoni | Oson muddatli to`lov O`zbekistonda"
              }
            />
            <meta
              property="og:description"
              content={
                "Noutbuklar, monitorlar, videokartalar, tarkibiy qismlar, wi-fi Toshkent shahridan hamyonbop narxda va bepul yetkazib berish orqali sotib olasizmi? BRANDSTORE.UZ saytida sotib olish yoki muddatli to`lov oson!"
              }
            />
          </>
        )}

        <meta name="author" content="brandstore" />

        <meta property="og:image" content="/Favicon/android-icon-192x192.png" />
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
        <meta
          name="google-site-verification"
          content="-aJCq23fZvSXOYJ8AQUwTmgRFgx-rC97EvtFvSt8j8E"
        />
        <meta name="yandex-verification" content="0588fead5dcdbb0e" />
        <meta property="og:site_name" content="brandstore.uz" />
        <meta property="og:locale" content={"ru_RU"} />
      </Head>
      <div>
        <Tracker />
        <Blur>
          <HeroSlider banners={banners} deviceWidth={deviceWidth} />
        </Blur>
        <Blur>
          <PopularCategory />
        </Blur>
        <HotOffer />
        <Blur>
          <CheapProducts
            maxPriceMillion={maxPriceMillion}
            maxPriceHalfMillion={maxPriceHalfMillion}
            maxPriceTwoHundredThousands={maxPriceTwoHundredThousands}
          />
        </Blur>
        <Blur>
          <Collection />
        </Blur>
        <Blur>
          <BrandFilter />
        </Blur>
        <Blur>
          <Recommendation recommendedProducts={recommendedProducts} />
        </Blur>
        <Blur>
          <News />
        </Blur>

        {/* <NewsDetail/> */}
      </div>
    </>
  );
};

export default Home;
