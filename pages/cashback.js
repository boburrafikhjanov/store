/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Head from 'next/head'
import Cookies from "universal-cookie";
export default function cashback() {
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
      <div className="containerFluid">
        {cookies.get("locale") == "uz" ? (
          <>
            <br />
            <br />
            <h3 className="h4">
              BRANDSTORE veb-saytida cashback-dan foydalanish/hisoblash
              qoidalari:
            </h3>
            <br />
            <br />
            Cashback BRANDSTORE.UZ. onlayn-do'konining barcha mahsulotlariga
            tegishli
            <br />
            <br />
            1. Cashback bonus hisobiga tovarlar xaridorga yetkazib berilgan
            vaqtdan boshlab 72 soat ichida beriladi.
            <br />
            <br />
            2. Cashback yuridik shaxslarga, shuningdek "O'tkazma" to'lov turini
            tanlashda hisobga olinmaydi.
            <br />
            <br />
            3. Bonus jamg'armalari faqat saytda tovarlar sotib olish uchun
            ishlatilishi mumkin.
            <br />
            <br />
            4. Bonus jamg'armalari foydalanuvchiga naqd pul berish yoki bank
            kartasiga o'tkazilishi mumkin emas.
            <br />
            <br />
            5. Telefon orqali buyurtma berishda bonus hisob mablag'laridan
            foydalanish mumkin emas.
            <br />
            <br />
            6. Kupondan foydalanganda bonus hisobidan foydalanish mumkin emas.
            <br />
            <br />
            7. Mahsulot qaytarib berilganda, ushbu mahsulot uchun hisoblangan
            cashback kuyadi.
            <br />
            <br />
            8. Tovarlarni qaytarib berishda, agar xarid ularning yordami bilan
            to'langan bo'lsa, bonus mablag'lari qaytariladi.
            <br />
            <br />
            <br />
          </>
        ) : (
          <>
            <br />
            <br />
            <h3 className="h4">
              Правила использования/начисления cashback на сайте BRANDSTORE:
            </h3>
            <br />
            <br />
            Cashback распространяется на все товары интернет-магазина
            BRANDSTORE.UZ.
            <br />
            <br />
            1. Cashback начисляется на бонусный счет в течение 72-х часов с
            момента доставки товара покупателю.
            <br />
            <br />
            2. Cashback не начисляется юридическим лицам, а также при выборе
            вида оплаты «Перечислением» и «Корпоративной картой».
            <br />
            <br />
            3. Бонусные накопления допускаются к использованию исключительно для
            покупки товаров на сайте.
            <br />
            <br />
            4. Бонусные накопления не могут быть выданы пользователю наличными
            или перечислены на банковскую карту.
            <br />
            <br />
            4. При заказе по телефону, использование средств бонусного счета
            невозможно.
            <br />
            <br />
            5. При использовании купона использование бонусного счета
            невозможно.
            <br />
            <br />
            6. При возврате товара cashback начисленный за данный товар сгорает.
            <br />
            <br />
            7. При возврате товара бонусные средства возвращаются, в случае если
            покупка была оплачена с их помощью.
            <br />
            <br />
            <br />
          </>
        )}
      </div>
    </>
  );
}
