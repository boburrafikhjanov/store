import useTranslation from "next-translate/useTranslation";

import Cookies from "universal-cookie";

import React from "react";
import cls from "./policy.module.scss";
const Policy = () => {
  const cookies = new Cookies();
  const { t } = useTranslation();
  return (
    <>
      <div className="containerFluid">
        <br />
        <br />
        <div className={cls.wrap}>
          <h3 className="h4">1. {t("common:policeOne")}</h3>
          <br />
          <br />
          <p>{t("common:sayt")}</p>
          <p>{t("common:administrator")}</p>

          <p>{t("common:titleAd")}</p>
          <h3 className={cls.allH3}>
            <br />2 {t("common:obshiy")}
          </h3>
          <br />
      
 
          <p>2.1. {t("common:twoStep")}</p>
          <br/>
          <p>2.2. {t("common:3")}</p>
          <br/>
          <p>{t("common:4")}</p>
          <br/>
          <p>2.4. {t("common:5")}</p>
          <br/>
          <p>2.5. {t("common:6")}</p>
          <br/>
          <p>2.6. {t("common:7")}</p>
          <br/>
          <p>2.7. {t("common:8")}</p>
          <br/>
          <p>2.9. {t("common:9")}</p>
          <br/>
          <br/>
          <h3 className={cls.allH3}>3. {t("common:10")}</h3>
          <br/>
          <br/>
          <p>3.1.{t("common:11")}</p>
          <br />
          <p>3.2. {t("common:12")}</p>
          <br />
          <p>3.3. {t("common:13")}</p>
          <br />
          <p>
            3.4.{t("common:14")}
            <br />
            <br />
            {t("common:15")}
            <br />
            {t("common:16")}
            <br />
            
            {t("common:17")}
            <br />
            {t("common:18")}
            <br />
            <br />
          </p>
          
          <p>{t("common:19")}</p>
          <br/>
          <br/>
          <h3 className={cls.allH3}>{t("common:20")}</h3>
          <br/>
          <br/>
          <p>{t("common:21")}</p>
          <br/>
          <br/>
          <h3 className={cls.allH3}>{t("common:22")}</h3>

          <br/>
          <br/>
          <p>
            {t("common:23")}
            <br />

            {t("common:24")}
            <br />
            <br/>
          </p>

          <h3 className={cls.allH3}>{t("common:25")}</h3>
          <br />
          <br />
          <p>
            {t("common:26")}
            <br />
            <br />
            {t("common:27")}
          </p>
          <br />
          <br />
          
          <h3 className={cls.allH3}>{t("common:28")}</h3>
          <br />
          <br />
          {cookies.get("locale") == "uz" ? (
            <>
              <span>Foydalanuvchilar haqli:</span>
              <p>
                · sayt ma'muriyati va (yoki) operator, shuningdek, uchinchi
                shaxsning shaxsiy ma'lumotlari va ularning tarkibi mavjudligini
                bilish;
                <br />
                <br />
                • so'rov bo'yicha sayt ma'muriyatidan va (yoki) operatordan
                shaxsiy ma'lumotlarni qayta ishlash haqida ma'lumot olish;
                <br />
                <br />
                • sayt ma'muriyatidan va (yoki) operatordan shaxsiy
                ma'lumotlarga kirish shartlari haqida ma'lumot olish;
                <br />
                <br />
                • o'z shaxsiy ma'lumotlariga nisbatan huquq va qonuniy
                manfaatlarni himoya qilish masalalari bo'yicha vakolatli davlat
                organiga yoki sudga murojaat etish;
                <br />
                <br />
                • o'z shaxsiy ma'lumotlarini qayta ishlashga rozilik berish va
                bunday rozilikni bekor qilish, qonun hujjatlarida nazarda
                tutilgan hollar bundan mustasno;
                <br />
                <br />
                • sayt ma'muriyatiga va (yoki) operatorga, shuningdek uchinchi
                shaxsga shaxsiy ma'lumotlarini omma uchun ochiq bo'lgan shaxsiy
                ma'lumot manbalariga tarqatishga rozilik bering;
                <br />
                <br />• sayt ma'muriyatidan va (yoki) operatordan shaxsiy
                ma'lumotlarini qayta ishlashni vaqtincha to'xtatib turishni
                talab qilish, agar shaxsiy ma'lumotlar to'liq bo'lmagan,
                eskirgan, noto'g'ri, noqonuniy ravishda olingan yoki qayta
                ishlash uchun zarur bo'lmasa.
              </p>
              <br />
              <br />
              <h3 className={cls.allH3}>
                8. FOYDALANUVCHILAR HAQIDAGI MA'LUMOTLARNI HIMOYA QILISH
                CHORALARI
              </h3>
              <p>
                Sayt administratori va (yoki) operator, shuningdek uchinchi
                shaxs shaxsiy ma'lumotlarni himoya qilish uchun huquqiy,
                tashkiliy va texnik choralarni ko'radi:
                <br />
                <br />
                sub'ektning shaxsiy hayotiga aralashishdan himoya huquqini
                amalga oshirish; shaxsiy ma'lumotlarning yaxlitligi va
                xavfsizligi; shaxsiy ma'lumotlarning maxfiyligiga rioya qilish;
                shaxsiy ma'lumotlarning noqonuniy ishlashiga yo'l qo'ymaslik..
              </p>
              <br />
              <h3 className={cls.allH3}>
                9. FOYDALANUVCHILARNING MUROJAATLARI
              </h3>
              <p>
                9.1. Foydalanuvchi 1-bandda ko'rsatilgan manzilga yozma ravishda
                ushbu maxfiylik siyosatining 3-bandida nazarda tutilgan shaxsiy
                ma'lumotlarini ishlatish/o'chirish bo'yicha o'z so'rovlarini
                sayt ma'muriyatiga yuborish huquqiga ega.
                <br />
                <br /> 9.2. Foydalanuvchi tomonidan yuborilgan so'rov quyidagi
                ma'lumotlarni o'z ichiga olishi kerak: jismoniy shaxs uchun:
                <br />- Foydalanuvchining yoki uning vakilining shaxsini
                tasdiqlovchi asosiy hujjat raqami; <br /> – ko'rsatilgan
                hujjatning berilgan sanasi va uni chiqargan organ haqida
                ma'lumot; <br /> - ro'yxatga olish sanasi; <br />- bepul shaklda
                so'rov matni;
                <br />- vakilning vakolatini tasdiqlovchi hujjatlar ilova
                qilingan holda foydalanuvchi yoki uning vakilining imzosi.
                yuridik shaxs uchun: <br /> - firma blankida erkin shaklda
                so'rov
                <br /> – ro'yxatga olish sanasi; <br />- so'rov vakolatli shaxs
                tomonidan shaxsning vakolatlarini tasdiqlovchi hujjatlarni ilova
                qilgan holda imzolanishi kerak.
                <br /> <br />
                9.3. Sayt ma'muriyati murojaat kelib tushgan kundan boshlab 30
                kun ichida kelib tushgan foydalanuvchi so'roviga javobni ko'rib
                chiqish va jo'natish majburiyatini oladi. <br /> <br />
                9.4. Ma'muriyat tomonidan foydalanuvchidan olingan barcha
                yozishmalar (yozma / elektron shaklda) kirish cheklangan
                ma'lumotlarga tegishli va foydalanuvchining yozma roziligisiz
                oshkor qilinmaydi. So'rovni yuborgan Foydalanuvchi to'g'risidagi
                shaxsiy ma'lumotlar va boshqa ma'lumotlardan foydalanuvchining
                maxsus roziligisiz foydalanish mumkin emas, ular olingan so'rov
                mavzusiga javob berishdan yoki qonunda aniq ko'rsatilgan
                hollardan tashqari.
              </p>
            </>
          ) : (
            <>
              <span>Пользователи вправе:</span>
              <p>
                · знать о наличии у Администрации Сайта и (или) оператора, а
                также третьего лица своих персональных данных и их состав;
                <br />
                <br />
                · получать по запросу информацию об обработке персональных
                данных от Администрации Сайта и (или) оператора;
                <br />
                <br />
                · получать информацию об условиях предоставления доступа к своим
                персональным данным от Администрации Сайта и (или) оператора;
                <br />
                <br />
                · обращаться по вопросам защиты прав и законных интересов в
                отношении своих персональных данных в уполномоченный
                государственный орган или суд;
                <br />
                <br />
                · дать согласие на обработку своих персональных данных и
                отозвать такое согласие, кроме случаев, предусмотренных
                Законодательством;
                <br />
                <br />
                · дать согласие Администрации Сайта и (или) оператору, а также
                третьему лицу на распространение своих персональных данных в
                общедоступных источниках персональных данных;
                <br />
                <br />· требовать от Администрации Сайта и (или) оператора
                временного приостановления обработки своих персональных данных,
                в случае, если персональные данные являются неполными,
                устаревшими, неточными, незаконно полученными или не являются
                необходимыми для целей обработки.
              </p>
              <br />
              <br />
              <h3 className={cls.allH3}>
                8. МЕРЫ ПО ЗАЩИТЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЯХ
              </h3>
              <br/>
              <br/>
              <p>
                Администратор Сайта и (или) оператор, а также третье лицо
                принимают правовые, организационные и технические меры по защите
                персональных данных, обеспечивающие:

                <br />
                реализацию права субъекта на защиту от вмешательства в его
                частную жизнь; целостность и сохранность персональных данных;
                соблюдение конфиденциальности персональных данных;
                предотвращение незаконной обработки персональных данных..
              </p>
              <br />
              <br/>
              <h3 className={cls.allH3}>9. ОБРАЩЕНИЯ ПОЛЬЗОВАТЕЛЕЙ</h3>
              <br/>
              <br/>
              <p>
                9.1. Пользователь вправе направлять Администрации Сайта свои
                запросы, в т.ч. относительно использования/удаления его
                персональных данных, предусмотренные п.3 настоящей Политики
                конфиденциальности в письменной форме по адресу, указанному в
                п.1.
                <br />
                <br /> 9.2. Запрос, направляемый Пользователем, должен содержать
                следующую информацию: для физического лица:
                <br /> – номер основного документа, удостоверяющего личность
                Пользователя или его представителя; <br /> – сведения о дате
                выдачи указанного документа и выдавшем его органе; <br /> – дату
                регистрации; <br /> – текст запроса в свободной форме; <br /> –
                подпись Пользователя или его представителя с приложением
                документов, подтверждающих полномочия представителя. для
                юридического лица: <br /> – запрос в свободной форме на
                фирменном бланке; – дата регистрации; <br />– запрос должен быть
                подписан уполномоченным лицом с приложением документов,
                подтверждающих полномочия лица. <br /> <br /> 9.3. Администрация
                Сайта обязуется рассмотреть и направить ответ на поступивший
                запрос Пользователя в течение 30 дней с момента поступления
                обращения. <br /> <br />
                9.4. Вся корреспонденция, полученная Администрацией от
                Пользователя (обращения в письменной/электронной форме)
                относится к информации ограниченного доступа и без письменного
                согласия Пользователя разглашению не подлежит. Персональные
                данные и иная информация о Пользователе, направившем запрос, не
                могут быть без специального согласия Пользователя использованы
                иначе, как для ответа по теме полученного запроса или в случаях,
                прямо предусмотренных законодательством.
              </p>
              <br/>
              <br/>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Policy;
