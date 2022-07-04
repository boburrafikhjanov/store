import React from "react";
import Head from "next/head";

export default function SEO({
  articleTitle,
  title,
  description,
  image,
  keywords,
}) {
  return (
    <Head>
      <title>BrandStore </title>
      {/*<meta name="description" content={description}/>*/}
      {/*<meta property="og:locale" content="uz"/>*/}
      {/*<meta*/}
      {/*    name="facebook-domain-verification"*/}
      {/*    content="j38avqf7rm0igxhi1uqaw4730c5rrt"*/}
      {/*/>*/}
      {/*<meta name="author" content="Biznes Rivoj"/>*/}
      {/*<meta name="viewport" content="width=device-width, initial-scale=1"/>*/}
      {/*<meta charSet="utf-8"/>*/}

      {/*<meta*/}
      {/*    name="keywords"*/}
      {/*    content={*/}
      {/*        keywords ||*/}
      {/*        ``*/}
      {/*    }*/}
      {/*/>*/}

      {/*<meta property="og:type" content={title || "website"}/>*/}
      {/*<meta*/}
      {/*    property="og:title"*/}
      {/*    content={articleTitle ? `${articleTitle}` : `BiznesRivoj | ${title} `}*/}
      {/*    key="ogtitle"*/}
      {/*/>*/}
      {/*<meta property="og:url" content="http://www.biznesrivoj.com"/>*/}
      {/*<meta property="og:description" content={description} key="ogdesc"/>*/}
      {/*<meta property="og:site_name" content="BiznesRivoj" key="ogsitename"/>*/}
      {/*<meta*/}
      {/*    property="og:image"*/}
      {/*    content={*/}
      {/*        image?.url ??*/}
      {/*        "https://biznesrivoj.s3.ap-southeast-1.amazonaws.com/uploads/logoTitle.png"*/}
      {/*    }*/}
      {/*    key="ogimage"*/}
      {/*/>*/}
      {/*<link*/}
      {/*    rel="alternate"*/}
      {/*    type="application/rss+xml"*/}
      {/*    title={title}*/}
      {/*    href="/rss"*/}
      {/*/>*/}
      {/*<meta name="theme-color" content="#10272f"/>*/}
      {/*<meta name="twitter:card" content="summary_large_image"/>*/}
      {/*<meta*/}
      {/*    name="twitter:title"*/}
      {/*    content={articleTitle ? `${articleTitle}` : `BiznesRivoj | ${title}`}*/}
      {/*/>*/}
      {/*<meta name="twitter:url" content="http://www.biznesrivoj.com"/>*/}
      {/*<meta name="twitter:description" content={description}/>*/}
      {/*<meta name="twitter:site" content="BiznesRivoj"/>*/}
      {/*<meta name="twitter:creator" content="NolBir"/>*/}
      {/*<meta*/}
      {/*    name="twitter:image"*/}
      {/*    content={*/}
      {/*        image?.url ??*/}
      {/*        "https://biznesrivoj.s3.ap-southeast-1.amazonaws.com/uploads/logoTitle.png"*/}
      {/*    }*/}
      {/*/>*/}
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/Favicon/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/Favicon/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/Favicon/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/Favicon/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/Favicon/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/Favicon/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/Favicon/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/Favicon/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/Favicon/apple-icon-180x180.png"
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
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      {/*<meta name="theme-color" content="#ffffff"/>*/}
    </Head>
  );
}
