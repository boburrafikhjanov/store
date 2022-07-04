/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
const Pokupka = () => {
  const router = useRouter();
  const cookies = new Cookies();
  return (
    <>
      <div className="containerFluid">
        {router.locale == "uz" ? (
          <>
            <br />
            <h3 className="h4">
              Hozir sotib oling, keyinroq to'lang, dastlabki to'lovsiz.
            </h3>
            <br />
            <br />
            Tovarlarni boʻlib-boʻlib sotib olish uchun quyidagi manzil orqali
            Telegram’ga ariza yuborishingiz mumkin: @brandstore24_bot.
            <br />
            To'lov rejasini berish shartlari:
            <br />
            <br />
            - 3 oydan 15 oygacha bo'lib to'lash mumkin.
            <br />
            - Mahsulot O‘zbekiston Respublikasining 21 yoshga to‘lgan va undan
            katta fuqarolariga bo‘lib-bo‘lib sotiladi.
            <br />
            - Istalgan vaqtda muddatidan oldin to'lash imkoniyati.
            <br />
            - Bo'lib-bo'lib sotish shartnomasi tuzilgandan keyin tovar xaridorga
            o'tkaziladi.
            <br />
            - Tovarlarni pullik yetkazib berish sharti bilan yetkazib berish
            qiymati bo‘lib-bo‘lib to‘lov summasiga kiritilmaydi.
            <br />
            <br />
            Ariza uchun zarur hujjatlar ro'yxati*:
            <br />
            - O‘zbekiston Respublikasi fuqarosining pasporti.
            <br />
            - O‘zbekiston Respublikasi fuqarosini ro‘yxatga olish.
            <br />
            - Arizachi nomidagi ish haqi plastik kartasining raqami.
            <br />
            - Pasport bilan selfi.
            <br />
            <br />
            * Bo‘lib-bo‘lib to‘lash uchun ariza 1-3 ish kuni ichida ko‘rib
            chiqiladi. Tovarlarni kreditga sotib olish boʻyicha batafsil
            shartlarni “BRANDSTORE” doʻkonlar tarmogʻi, yordamchilar yoki (+998)
            71 205-93-93 telefon orqali bilishingiz mumkin.
            <br />
            <br />
            <br />
            <br />
          </>
        ) : (
          <>
            <br />
            <h3 className="h4">
              Покупайте сейчас — платите потом, без первого взноса.
            </h3>
            <br />
            <br />
            Оформить заявку на приобретение товара в рассрочку вы можете,
            отправив заявку в Телеграм, по адресу: <a href="https://t.me/brandstore24_bot"  style={{ color: "blue"}}> @brandstore24_bot</a>
            <br />
            <br />
            <strong>Условия для оформления рассрочки:</strong>
            <br />
            <br />
            - Рассрочка предоставляется на срок от 3 до 15 месяцев.
            <br />
            - Товар продается в рассрочку гражданам Республики Узбекистан, в
            возрасте от 21 года.
            <br />
            - Возможность досрочного погашения на любом сроке.
            <br />
            - Товар передается покупателю после оформления договора о продаже в
            рассрочку.
            <br />
            - При условии платной доставки товара, стоимость доставки в сумму
            рассрочки не входит.
            <br />
            <br />
            <strong>Список необходимых документов для подачи заявки*:</strong>
            <br />
            <br />
            - Паспорт гражданина Республики Узбекистан
            <br />
            - Прописка гражданина Республики Узбекистан
            <br />
            - Номер зарплатной пластиковой карты на имя заявителя.
            <br />
            - Selfie c паспортом.
            <br />
            <br />
            *Заявка на оформление рассрочки рассматривается в течении 1-3
            рабочих дней. Подробные условия о приобретении товара в кредит можно
            уточнить в сети магазинов 'BRANDSTORE', у продавцов-консультантов
            или по телефону: (+998) 71 205-93-93.
            <br />
            <br />
            <br />
            <br />
          </>
        )}
      </div>
    </>
  );
};

export default Pokupka;
