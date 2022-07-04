/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState,useEffect} from 'react'
import Cookies from "universal-cookie";
import NewsDetail from '../../components/News/NewsDetail/index'
import url from '../../components/url'
import axios from 'axios'
import Head from 'next/head'

const newMore =({data})=>{
   
    const [news, setNews] = useState([])

    useEffect(() => {
        axios
           .get(`${url}/api/posts`)
           .then(response => {
              setNews(response.data.data);
           })
           .catch(error => {
              console.log(error);
           });
     }, []);

    return(
      <><Head>
          <title>{data.meta_title}</title>
          <meta charset="UTF-8" />
          <meta name="description" content={data.meta_description} />
          <meta name="keywords" content={data.meta_keywords} />

          <meta
             name="google-site-verification"
             content="3kTZ1AFA-Ys6DV-oZgCXUqlfNqsP6r2YJ0mpAmcaL-k" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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

          <meta property="og:type" content="article" />
          <meta property="og:site_name" content="BRANDSTORE.UZ" />
          <meta property="og:title" content={data.meta_title} />
          <meta property="og:description" content={data.meta_description} />
          <meta property="og:locale" content="ru_RU" />
          <meta property="og:image" content={data.image.url} />
       </Head><div>
             <NewsDetail data={data} />
          </div></>
    )
}


export async function getServerSideProps({ params, req }) {
    // Fetch data from external API
    const cookies = new Cookies(req.headers.cookie);
    let locale = cookies.get('locale');
 
    const res = await axios.get(`${url}/api/posts?slug=${params.news}`,
       {
          headers: { 'X-Localization': `${locale}` }
       });
    const data = await res.data.data;
    // Pass data to the page via props
    return { props: { data } };
 }

 
export default newMore