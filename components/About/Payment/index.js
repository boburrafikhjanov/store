/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import Link from 'next/link'
const Payment = () => {
  const router = useRouter();
  const cookies = new Cookies();
  console.log(router, "router");
  return (
    <>
      <div className="containerFluid">
        {router.locale == "uz" ? (
          <>
            {" "}
            <div>
              <br />
              <br />
              <h3 className="h4">To'lov va yetkazib berish usullari</h3>
              <br />
              <br />
              <strong>To'lov usullari:</strong>
              <br />
              <br />
              Jismoniy shaxslar uchun:
              <br />
              Siz tanlagan va "Savatga" qo'shgan tovarlar uchun to'lovni amalga
              oshirish uchun siz:
              <br />
              <br />
              1. Sotib olish tugmasini bosing.
              <br />
              2. Yangi oynada "Aloqa ma'lumotlari" va "Etkazib berish usullari"
              paydo bo'ladi, ularni to'ldirishingiz kerak.
              <br />
              3. Siz o'zingiz uchun mosroq to'lov usulini tanlashingiz mumkin:
              <br />
              <br />
              - Joyida toʻlov: naqd yoki terminalda UzCard orqali;
              <br />
              - To'lov tizimlari orqali to'lov: CLICK, Payme va Apelsin kabi;
              <br />
              <br />
              <strong>Yuridik shaxslar uchun:</strong>
              <br />
              <br />
              Sizda to'lash imkoniyati bor
              <br />
              <br />
              - Perechislenie;
              <br />
              - Korporativ karta;
              <br />
              <br />
              Buyurtma berish uchun call-markazimizga murojaat qiling: 71 205 93
              93.
              <br />
              <br />
              <br />
              <strong>Yetkazib berish usullari</strong>
              <br />
              <br />
              Do'konlar va savdo nuqtalari:
              <br />
              <br />
              Do'konlarga va PVZ-ga bepul yetkazib berish (buyurtma berish
              nuqtasi)
              <br />
              Kartada savdo nuqtalarni va do'konlarni ko'rish
              <br />
              <br />
              <strong> Qabul qilish uchun hujjatlar</strong>
              <br />
              <br />
              Talab qilinmaydi. Buyurtmani olish uchun xodimimizga buyurtma
              ID-sini ayting.
              <br />
              <br />
              Saqlash muddati
              <br />
              <br />
              Do'konlarda va qabul qilish punktlarida buyurtmangizning saqlash
              muddati 72 soat.
              <br />
              <br />
              Agar siz buyurtma uchun oldindan toʻlovni amalga oshirgan
              boʻlsangiz, +998 71 205 93 93 raqamiga qoʻngʻiroq qilib, saqlash
              muddatini oshirishingiz mumkin.
              <br />
              <br />
              <strong>Yetkazib berish:</strong>
              <br />
              <br />
              Yetkazib berish haftada 7 kun soat 10:00 dan 19:00 gacha buyurtma
              berishda ko'rsatilgan manzilga amalga oshiriladi. Agar etkazib
              berish manzili o'zgargan bo'lsa, Call Center operatorlariga
              +99871-205-93-93 raqami orqali xabar bering. Buni kurer yetkazib
              berish jarayonini boshlashdan oldin bajaring.
              <br />
              <br />
              Yopiq hududga yetkazib berilsa, kuryer unga etib borishi
              mumkinligiga ishonch hosil qiling.
              <br />
              <br />
              <strong>Pulli yetkazib berish:</strong>
              <br />
              <br />
              Toshkent shahri boʻylab yetkazib berish 48 ish soati ichida amalga oshiriladi. Tovar mahalliy omborda yoki chakana savdo nuqtalarida bo'lishi sharti bilan.
Yetkazib berish narxi 29 900 so'm
              <br />
              <br />
              <strong>Hududlarga:</strong>
              <br />
              <br />
              Hududlarga yetkazib berish kuryerlik xizmatlari orqali 1-5 ish
              kuni ichida amalga oshiriladi. Yetkazib berish narxi o'lchamlarga,
              vaznga va etkazib berish manzilining uzoqligiga bog'liq.
              <br />
              <br />
            </div>
          </>
        ) : (
          <>
            <div>
              <br />
              <br />
              <h3 className="h4">Способы оплаты и доставки</h3>
              <br />
              <br />
              <strong>Способы оплаты для физ.лиц.:</strong>
              <br />
              <br />
              <strong>для физических лиц:</strong>
              <br />
              <br />
              Для того, чтобы оплатить товар, который Вы выбрали и добавили в
              "Корзину" необходимо:
              <br />
              <br />
              1. Нажать кнопку купить
              <br />
              2. В новом окне появится «Контактная информация» и «Способы
              доставки», которые Вам необходимо заполнить.
              <br />
              3. Вы можете выбрать более подходящий для Вас способ оплаты:
              <br />
              <br />
              - Оплата на месте: наличный расчет, либо посредством UzCard по
              терминалу;
              <br />
              - Оплата через платёжные системы, такие как CLICK, Payme и
              Apelsin;
              <br />
              <br />
              <strong>для юридических лиц:</strong>
              <br />
              <br />
              У вас есть возможность оплатить
              <br />
              <br />
              - Перечислением;
              <br />
              <br />
              - Корпоративной картой;
              <br />
              <br />
              Для этого обратитесь в наш call-центр для оформления заказа: 71
              205 93 93.
              <br />
              <br />
              <br />
              <strong>Способы доставки</strong>
              <br />
              <br />
              <strong>Магазины и пункты выдачи:</strong>
              <br />
              <br />
              Осуществляется бесплатная доставка до магазинов и ПВЗ (пункта
              выдачи заказов)
              <br />
              Посмотреть пункты выдачи и магазины на <Link href="/map">
              <a style={{ color: "blue"}}>
              карте
              </a>
              </Link> 
              <br />
              <br />
              <strong>Документы для получения</strong>
              <br />
              <br />
              Не требуется. Для получения заказа назовите ID заказа нашему
              сотруднику.
              <br />
              <br />
              <strong>Срок хранения</strong>
              <br />
              <br />
              Срок хранения вашего заказа в магазинах и ПВЗ - 72 часа.
              <br />
              <br />
              Если вы произвели предоплату заказа, то Вы можете увеличить срок
              хранения сообщив операторам по номеру +998 71 205 93 93
              <br />
              <br />
              <strong>Курьерская доставка:</strong>
              <br />
              <br />
              Доставка осуществляется 7 дней в неделю с 10:00 до 19:00 по
              адресу, указанному при оформлении заказа. В случае, если адрес
              доставки изменился, оповестите об этом операторов Колл-центра по
              номеру +99871-205-93-93. Сделайте это до того, как курьер начнет
              осуществлять процедуру доставки.
              <br />
              <br />
              В случае оформления доставки на закрытую территорию, убедитесь,
              что курьер сможет на нее попасть.
              <br />
              <br />
              <strong>Платная  доставка:</strong>
              <br />
              <br />
              Доставка в пределах города Ташкент осуществляется в течение 48 рабочих часов. При условии, если товар есть на локальном складе или в торговых точках.
Стоимость доставки 29.900 сум.
              <br />
              <br />
              <strong>В регионы:</strong>
              <br />
              <br />
              Доставка в регионы осуществляется через курьерские службы в
              течении 1-5 рабочих дней. Цена доставки зависит от габаритов,
              массы и в зависимости от отдаленности адреса доставки.
              <br />
              <br />
              <br />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Payment;
