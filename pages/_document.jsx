/* eslint-disable @next/next/next-script-for-ga */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import Document, { Html, Head, Main, NextScript } from "next/document";
import theme from "../helpers/theme";
import { ServerStyleSheets } from "@material-ui/core/styles";
import React from "react";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    let props = { ...initialProps };
    return props;
}

  render() {
    return (
      <Html>
       <Head>
                {this.props.styleTags}

                    <link rel="icon" href="/static/assets/template/avtech/images/favicon.png" type="image/x-icon"/>
                    <meta name="google-site-verification" content="-0Cb60LzIq8xaSu_VPUUgvge7JB5X7wzTSNhq9jvmJU" />
                    <meta name="facebook-domain-verification" content="lyvjjeaulocshy50c8yniv4woal17d" />
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-CY837MR5PP"></script>
                    <script dangerouslySetInnerHTML={{ __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-CY837MR5PP');
                        `}
                    }>
                    </script>
                    <script src="/static/assets/template/avtech/js/facebook.js"></script>
                    <noscript>
                        <img height="1" width="1" style={{ display:"none" }} src="https://www.facebook.com/tr?id=302442291277307&ev=PageView&noscript=1"/>
                    </noscript>
                    <script dangerouslySetInnerHTML={{
                        __html:`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-KVV99ST');`
                    }}>
                    </script>
                    
          <script
            dangerouslySetInnerHTML={{
              __html: `
                     (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                     m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                     (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                  
                     ym(61408678, 64732159,"init", {
                          clickmap:true,
                          trackLinks:true,
                          accurateTrackBounce:true,
                          webvisor:true,
                          ecommerce:"dataLayer"
                     });
                     `,
            }}
          />
                </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. register.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. register.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. register.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. register.getInitialProps
  // 3. app.render
  // 4. register.render

  // Render app and register and get the context of the register with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and register rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};