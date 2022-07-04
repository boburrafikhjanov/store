import React from "react";
import Head from 'next/head'
import Cookies from "universal-cookie";

export default function coupon() {
  const cookies = new Cookies();
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
      {cookies.get("locale") == "uz" ? (
        <>
          <div className="containerFluid">
            <br />
            <br />
            <h3 className="h4">
              BRANDSTORE veb-saytida kuponlardan foydalanish qoidalari:
            </h3>
            <br />
            <br />
            1. Bitta kupondan faqat bir marta foydalanish mumkin.
            <br />
            <br />
            2. Bitta zakazda faqat bitta kupondan foydalanish mumkin.
            <br />
            <br />
            3. Yuridik shaxslar kuponlardan foydalana olmaydilar.
            <br />
            <br />
            4. BRANDSTORE.UZ kuponlaridan faqat BRANDSTORE.UZ veb-saytidan tovar
            sotib olish uchun foydalanishga ruxsat beriladi.
            <br />
            <br />
            5. Kuponlar foydalanuvchiga naqd shaklda berilishi yoki bank
            kartasiga o'tkazilishi mumkin emas.
            <br />
            <br />
            6. Cashback ishlatishda kupondan foydalanish mumkin emas.
            <br />
            <br />
            7. Tovarlarni qaytarishda, qaytarilgan tartibda ishlatilgan
            kuponning amal qilish muddati tugaydi.
            <br />
            <br />
            <br />
          </div>
        </>
      ) : (
        <>
          <div className="containerFluid">
            <br />
            <br />
            <h3 className="h4">
              Правила использования купонов на сайте BRANDSTORE:
            </h3>
            <br />
            <br />
            1. Один купон может быть использован только один раз.
            <br />
            <br />
            2. В одном заказе может быть использован только один купон.
            <br />
            <br />
            3. Юридические лица не могут использовать купоны.
            <br />
            <br />
            4. Купоны BRANDSTORE.UZ допускаются к использованию исключительно
            для покупки товаров на сайте BRANDSTORE.UZ.
            <br />
            <br />
            5. Купоны не могут быть выданы пользователю наличными или
            перечислены на банковскую карту.
            <br />
            <br />
            6. При использовании cashback использование купона невозможно.
            <br />
            <br />
            7. При возврате товара купон использованный в возвращенном заказе
            сгорает.
            <br />
            <br />
            <br />
          </div>
        </>
      )}
    </>
  );
}
