import React, {useEffect} from "react";
import axios from "axios";
import Head from "next/head";
import BreadCrump from '../../components/BreadCrumb-new/'
import OpenProduct from "../../components/OpenProduct";
import Cookies from "universal-cookie";
import url from "../../api/url";
import Tracker from '../../components/Tracker/index'
const open_product = ({ singleProduct }) => {
    const {
      meta_description,
      meta_keywords, meta_title, name,
      images, random_shop, brand, features, id,
      is_in_comparison, favorite, slug, is_in_cart
   } = singleProduct;

  return (
    <>
      <Head>
        <title>
        {meta_title}
        </title>
        <meta
               name="google-site-verification"
               content="3kTZ1AFA-Ys6DV-oZgCXUqlfNqsP6r2YJ0mpAmcaL-k"
            />
            <meta
               name="description"
               content={singleProduct.meta_description}
            />
            <meta
               name="keywords"
               content={singleProduct.meta_keywords}
            />
            <meta property="og:title" content={singleProduct.meta_title} />
            <meta property="og:description" content={singleProduct.meta_description} />
            <meta property="og:image" content={singleProduct.image} />
            <meta property="og:url" content={`https://brandstore.uz/catalog/${singleProduct.slug}`} />

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
      <BreadCrump
      catalogCrumbs={{slug, name, id, parent: singleProduct.categories[0]}}
        url={"/catalog"}
      />
      <OpenProduct
        isInCompare={singleProduct.is_in_comparison}
        isInFavourite={singleProduct.favorite}
        data={singleProduct}
      />
    </>
  );
};

export const getServerSideProps = async (context) => {
  let data = {};
  const cookies = new Cookies(context.req.headers.cookie);
  let locale = cookies.get("locale");
  await axios
    .get(`${url}/api/products?slug=${context.query.product}`, {
      params: {
        device_token: cookies.get("device_token"),
        device_type: cookies.get("device_type"),
      },
      headers: { "X-Localization": `${locale}` },
    })
    .then((res) => (data = res.data.data))
    .catch((e) => {
      context.res.statusCode = 302;
      context.res.setHeader("Location", `/404`);
      return { props: {} };
    });
  
  if (!data.hasOwnProperty("id")) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  }
  return {
    props: {
      singleProduct: data,
    },
  };
};

export default open_product;
