import Axios from "axios";

// pages/sitemap.xml.js

const generateSitemap = (data, origin) => {
  let xml = "";

  xml += `<url>
    <loc>${origin}</loc>    
    <xhtml:link  rel="alternate"  hreflang="ru" href="${origin}"/>
    <xhtml:link  rel="alternate"  hreflang="uz"  href="${origin}/uz"/>
    <lastmod>2020-06-06T11:24:19+01:00</lastmod>
    <priority>1.0</priority>
  </url>`;


  xml += `<url>
    <loc>${origin + "/about"}</loc>
    <xhtml:link  rel="alternate"  hreflang="ru" href="${origin}/about"/>
    <xhtml:link  rel="alternate"  hreflang="uz"  href="${origin}/uz/about"/>
    <lastmod>2020-06-06T11:24:20+01:00</lastmod>
    <priority>0.4</priority>
  </url>`;

  xml += `<url>
    <loc>${origin + "/contact"}</loc>
    <xhtml:link  rel="alternate"  hreflang="ru" href="${origin}/contact"/>
    <xhtml:link  rel="alternate"  hreflang="uz"  href="${origin}/uz/contact"/>  
    <lastmod>2020-06-06T11:24:22+01:00</lastmod>
    <priority>0.4</priority>
  </url>`;

  xml += `<url>
    <loc>${origin + "/news"}</loc>
    <xhtml:link  rel="alternate"  hreflang="ru" href="${origin}/news"/>
    <xhtml:link  rel="alternate"  hreflang="uz"  href="${origin}/uz/news"/>
    <lastmod>2020-06-06T11:24:22+01:00</lastmod>
    <priority>0.4</priority>
  </url>`;

  xml += `<url>
      <loc>${origin + "/about/policy"}</loc>
      <xhtml:link  rel="alternate"  hreflang="ru" href="${origin}/about/policy"/>
      <xhtml:link  rel="alternate"  hreflang="uz"  href="${origin}/uz/about/policy"/>
      <lastmod>2020-06-06T11:24:22+01:00</lastmod>
    <priority>0.4</priority>
  </url>`;

  xml += `<url>
    <loc>${origin + "/rules"}</loc>
    <xhtml:link  rel="alternate"  hreflang="ru" href="${origin}/rules"/>
    <xhtml:link  rel="alternate"  hreflang="uz"  href="${origin}/uz/rules"/>
    <lastmod>2020-06-06T11:24:23+01:00</lastmod>
    <priority>0.4</priority>
  </url>`;

  xml += `<url>
      <loc>${origin + "/payment"}</loc>
      <xhtml:link  rel="alternate"  hreflang="ru" href="${origin}/payment"/>
      <xhtml:link  rel="alternate"  hreflang="uz"  href="${origin}/uz/payment"/>  
      <lastmod>2020-06-06T11:24:23+01:00</lastmod>
      <priority>0.4</priority>
    </url>`;


  xml += `<url>
    <loc>${origin + "/return"}</loc>
    <xhtml:link  rel="alternate"  hreflang="ru" href="${origin}/return"/>
    <xhtml:link  rel="alternate"  hreflang="uz"  href="${origin}/uz/return"/>  
    <lastmod>2020-06-06T11:24:19+01:00</lastmod>
    <priority>0.4</priority>
  </url>`;

  data.categories.map((category) => {
    xml += `<url>
            <loc>${origin + "/catalog/" + category.slug}</loc>
            <xhtml:link  rel="alternate"  hreflang="ru" href="${origin}/catalog/${category.slug}"/>
            <xhtml:link  rel="alternate"  hreflang="uz"  href="${origin}/uz/catalog/${category.slug}"/>        
            <lastmod>${category.updated_at}</lastmod>
            <priority>0.8</priority>
          </url>`;
  });

  data.products.map((product) => {
    xml += `<url>
        <loc>${origin + "/productPage/" + product.slug}</loc>
        <xhtml:link  rel="alternate"  hreflang="ru" href="${origin}/productPage/${product.slug}"/>
        <xhtml:link  rel="alternate"  hreflang="ru" href="${origin}/productPageAdd/${product.slug}"/>
        <xhtml:link  rel="alternate"  hreflang="uz"  href="${origin}/uz/productPage/${product.slug}"/> 
        <xhtml:link  rel="alternate"  hreflang="uz"  href="${origin}/uz/productPageAdd/${product.slug}"/>  
        <lastmod>${product.updated_at}</lastmod>
        <priority>0.6</priority>
      </url>`;
  });

  data.posts.map((post) => {
    xml += `<url>
        <loc>${origin + "/posts/" + post.slug}</loc>
        <xhtml:link  rel="alternate"  hreflang="ru" href="${origin}/posts/${post.slug}"/>
        <xhtml:link  rel="alternate"  hreflang="uz"  href="${origin}/uz/posts/${post.slug}"/>    
        <lastmod>${post.updated_at}</lastmod>
        <priority>0.4</priority>
      </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd">
        ${xml}
      </urlset>`;
};

export async function getServerSideProps({ res }) {
  const data = await Axios("https://api.brandstore.uz/api/sitemaps");

  res.setHeader("Content-Type", "text/xml");
  res.write(generateSitemap(data.data, "https://brandstore.uz"));
  res.end();

  return {
    props: {}
  };
}

const SitemapIndex = () => null;
export default SitemapIndex;
