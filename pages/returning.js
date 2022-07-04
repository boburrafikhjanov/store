import React from "react";
import Head from 'next/head'
import Cookies from "universal-cookie";

export default function returning() {
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
            <h3 className="h4">Mahsulotni qaytarish va almashtirish</h3>
            <br />
            <br />
            Sifatli mahsulotni qaytarish va almashtirish.
            <br />
            <br />
            Xaridor buyurtma qilingan sifatli mahsulotdan voz kechishga
            haqlidir:
            <br />
            <br />
            Uni olishdan oldin, shuningdek uni olganingizdan keyin - 5 kun
            ichida.. Eslatma! Tovarni qaytarib berish yoki almashtirish, uni
            taqdim etish (qadoqlash, muhrlar, zavod yorliqlari), iste'mol
            xususiyatlari, shuningdek ko'rsatilgan tovarlarni sotib olish
            (tekshirish) haqiqati va shartlarini tasdiqlovchi hujjat saqlangan
            taqdirda mumkin. Mahsulotda ekspluatatsiya belgilari bo'lmasligi
            kerak, mahsulot ishlatilmagan va foydalanmagan bo'lmasligi kerak.
            O'zbekiston Respublikasi Vazirlar Mahkamasining 2003 yil 13
            fevraldagi 75-sonli qarori bilan tasdiqlangan O'zbekiston
            Respublikasi Chakana savdo qoidalariga 1-ilovaga muvofiq sifatli
            tovarlar qaytarib berilmaydi.
            <br />
            <br />
            Sifatsiz mahsulotni qaytarish va almashtirish
            <br />
            <br />
            - Xaridor, noto'g'ri sifatli mahsulotni qabul qilganda, agar
            kamchiliklar sotuvchi tomonidan belgilanmagan bo'lsa, sotuvchidan
            o'z xohishiga ko'ra sotib olinganidan keyin 24 soat ichida talab
            qilish huquqiga ega:
            <br />
            <br />
            - Tovarlarni qaytarish kunida xuddi shunday mahsulot rusumi (model,
            artikul) bo’lsa ,mahsulot almashtirishtiriladi, agar u omborda
            bo'lsa yoki 60 kun ichida bo'lmasa;
            <br />
            <br />
            - Sotib olish narxini qayta hisoblash bilan bir xil tovar (model,
            maqola) bilan almashtirish;
            <br />
            <br />
            - Tovarlarning kamchiliklarini darhol bepul bartaraf etish;
            <br />
            <br />
            - Tovarlarning kamchiliklarini bartaraf etish uchun xarajatlarni
            qoplash.
            <br />
            <br />
            Mahsulotlarni qaytarib berish tartibi O'zbekiston Respublikasidagi
            Chakana savdo qoidalarining talablariga (O'zbekiston Respublikasi
            Vazirlar Mahkamasining 2003 yil 13 fevraldagi 75-sonli qaroriga
            1-ilova), "Iste'molchilarning huquqlarini himoya qilish to'g'risida"
            gi O'zbekiston Respublikasining Qonuniga va O'zbekiston
            Respublikasining Fuqarolik Kodeksiga muvofiq amalga oshiriladi.
            Mahsulotlarni qaytarib berish to'g'risidagi arizada Xaridor
            tomonidan qaytarilgan mahsulotlar qaysi nuqson mavjudligini
            ko'rsatilishi kerak. Qayta sotib olish uchun buyurtma shakli
            sotuvchining rasmiy veb-saytida joylashgan:www.brandstore.uz.
            Nuqsonli mahsulotlarni almashtirish tartibi:
            <br />
            <br />
            - 7 kun ichida (zavoddagi nosozlik aniq belgilari bilan)
            <br />
            <br />
            - 20 kun ichida (agar kerak bo'lsa, qo'shimcha tekshirish)
            <br />
            <br />
            - 1 oy ichida (shu kabi tovar belgisi bo'lmagan taqdirda)
            <br />
            <br />
            - 2 oy ichida (uzoq hududlarga yetkazib berilganda)
            <br />
            <br />
            Mahsulotlarni qaytarish uchun xaridor :
            <br />
            <br />
            - Kontaktlar bo'limida ko'rsatilgan telefon orqali onlayn-do'konga
            qo'ng'iroq qilishi kerak;
            <br />
            <br />
            - Qaytarish uchun arizani to'ldirishi va chop etishi kerak;
            <br />
            <br />
            - Diqqat. Biz pulni qaytarib beramiz va qaytib kelishini qoplashimiz
            mumkin, faqat siz qo'llab-quvvatlash ko'rsatmalariga va
            maslahatlariga rioya qilsangiz. Pulni qaytarib olish xaridorning
            bank kartasiga (etkazib berishni hisobga olmagan holda faqat
            tovarlar miqdori), tovarlarni qabul qilgandan so'ng 5 bank kuni
            ichida amalga oshiriladi.
            <br />
            <br />
            Tovarlarni qaytarib berish ikki yo'l bilan amalga oshiriladi.
            <br />
            <br />
            1. Mustaqil qaytarish
            <br />
            <br />
            Xaridor tovarlarni mustaqil ravishda kompaniyamizning qaytish
            punktiga qaytarishi mumkin.
            <br />
            <br />
            Qaytish manzili: Toshkent shahri, Yakkasaroy tumani, st. Abdulloh
            Kahhara, 49A
            <br />
            <br />
            2. BrandStore kuryeri orqali qaytish BrandStore
            <br />
            <br />
            Xizmat Toshkent shahri aholisi uchun amal qiladi. Kuryer xizmatidan
            foydalanish uchun 20 000 so'mni tashkil etadi.
            <br />
            <br />
            Ekspertiza o'tkazish
            <br />
            <br />
            Agar siz va do'kon o'rtasida kamchiliklarning sabablari to'g'risida
            nizo yuzaga kelsa, do'kon mahsulotni tekshirish huquqiga ega.
            Ekspertiza do'kon hisobidan amalga oshiriladi. Siz uni amalga
            oshirishda ishtirok etish huquqiga egasiz. Buni amalga oshirish
            uchun sotuvchiga yozma ariza yuborishni tavsiya etamiz, bu
            tekshirish sizning huzuringizda amalga oshirilishi kerakligini
            bildiradi. Do'kon sizni tekshirish vaqtini xabardor qilgandan so'ng,
            siz buzilish sabablarini aniqlash uchun mahsulotni olib kelishingiz
            kerak.
            <br />
            <br />
            Agarda siz ekspertiza xulosasiga qo'shilmasangiz,
            tushunmovchiliklardan qochishingiz mumkin. Agar ekspertiza
            natijasida mahsulotning kamchiliklari do'kon yoki ishlab
            chiqaruvchining aybi bilan paydo bo'lmasa, siz do'konga ekspertiza
            xarajatlarini, shuningdek mahsulotni saqlash va tashish
            xarajatlarini qoplashingiz kerak bo'ladi. Agar ekspertiza
            natijalariga rozi bo'lmasangiz, siz sud tartibida xulosa chiqarishga
            haqlisiz.

            <div style={{display: 'flex',alignItems: 'center', justifyContent: 'flex-end', margin: '50px 0'}}>
               
               <a href="../static/doc_file.docx" style={{color:'#000'}} download="doc_file.docx">
               <strong style={{paddingRight: '20px'}}>
                Yuklab olish 
namuna qaytarish talabi
                </strong>
                 <button 
                    style={{
                       minWidth: '150px',
                       cursor:'pointer',
                       height: '40px',
                       fontSize: '16px',
                       outline: 'none',
                       backgroundColor: 'transparent',
                       border: '1px solid #000',
                       }}
                 >Yuklab olish</button>
               </a>
             </div>s
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
            <h3 className="h4">Возврат и Обмен Товара</h3>
            <br />
            <br />
            <strong>
            1. Товары надлежащего качества:

            </strong>
            <br />
            <br />
            1.1. Покупатель вправе в течение десяти дней со дня покупки обменять
            непродовольственный товар надлежащего качества на аналогичный у
            продавца, где он был приобретен, а в случае отсутствия такого товара
            в продаже — получить денежную компенсацию.
            <br />
            <br />
            1.2. Требования покупателя об обмене либо возврате товара подлежат
            удовлетворению в следующих случаях: - если товар не был в
            употреблении; - сохранены его товарный вид, потребительские
            свойства, пломбы, ярлыки; - документ, подтверждающий факт и условия
            покупки указанного товара (товарный или кассовый чек);
            <br />
            <br />
            1.3. Возврату не подлежат (не принимаются обратно) товары
            надлежащего качества, согласно Приложения 1 к Правилам розничной
            торговли Республики Узбекистан, утвержденное Постановлением Кабинета
            Министров Республики Узбекистан № 75 от 13 февраля 2003 года:
            <br />
            <br />
            1. Товары для профилактики и лечения заболеваний в домашних условиях
            (предметы санитарии и гигиены из металла, резины, текстиля и других
            материалов, изделия медицинского назначения и медицинская техника,
            средства гигиены полости рта, линзы очковые, предметы по уходу за
            детьми, лекарственные препараты).
            <br />
            <br />
            2. Предметы личной гигиены (зубные щетки, расчески, заколки, бигуди
            для волос, парики, шиньоны и другие аналогичные товары).
            <br />
            <br />
            3. Парфюмерно-косметические товары.
            <br />
            <br />
            4. Текстильные товары (хлопчатобумажные, льняные, шелковые,
            шерстяные и синтетические ткани, товары из нетканых материалов типа
            тканей — ленты, тесьма, кружево и другие); кабельная продукция
            (провода, шнуры, кабели); строительные и отделочные материалы
            (линолеум, пленка, ковровые покрытия и другие) и другие товары,
            отпускаемые на метраж.
            <br />
            <br />
            5. Швейные и трикотажные изделия (изделия швейные и трикотажные
            бельевые, чулочно-носочные и перчаточные изделия).
            <br />
            <br />
            6. Изделия и материалы, контактирующие с пищевыми продуктами, из
            полимерных материалов, в том числе для разового использования
            (посуда и принадлежности столовые и кухонные, емкости и упаковочные
            материалы для хранения и транспортировки пищевых продуктов).
            <br />
            <br />
            7. Товары бытовой химии, пестициды и агрохимикаты.
            <br />
            <br />
            8. Мебель (мебельные гарнитуры и комплекты).
            <br />
            <br />
            9. Изделия из драгоценных металлов, с драгоценными камнями, из
            драгоценных металлов со вставками из полудрагоценных и синтетических
            камней, ограненные драгоценные камни.
            <br />
            <br />
            10. Автомобили и мото-велотовары, прицепы и номерные агрегаты к ним;
            мобильные средства малой механизации сельскохозяйственных работ;
            прогулочные суда и иные плавсредства бытового назначения.
            <br />
            <br />
            11. Технически сложные товары бытового назначения, на которые
            установлены гарантийные сроки (станки металлорежущие и
            деревообрабатывающие бытовые; электробытовые машины и бытовые
            электроприборы; бытовая радиоэлектронная аппаратура; бытовая
            вычислительная и множительная техника; фото- и киноаппаратура;
            телефонные аппараты и факсимильная аппаратура; электромузыкальные
            инструменты; игрушки электронные).
            <br />
            <br />
            12. Животные и растения.
            <br />
            <br />
            1.4. Возврат товара осуществляется посредством «Служба доставки»
            Продавца, для этого необходимо: - позвонить в интернет-магазин по
            телефонам, указанным в разделе «Контакты»; - распечатать и заполнить
            «Заявление на возврат»; - приложить к заявлению на возврат товарный
            или кассовый чек заказа и копию паспорта
            <br />
            <br />
            <strong>

            2. Товары ненадлежащего качества:
            </strong>
            <br />
            <br />
            2.1. Потребитель, которому продан товар с недостатками если
            недостатки обнаружены в течение гарантийного срока либо срока
            годности товара имеет требовать: - безвозмездного устранения
            недостатков товара или возмещения расходов на исправление
            недостатков потребителем либо третьим лицом; - соразмерного
            уменьшения покупной цены; Требования потребителя рассматриваются при
            предъявлении им кассового или товарного чека, а по товарам, на
            которые установлены гарантийные сроки, — надлежаще оформленного
            технического паспорта или иного заменяющего его документа.
            <br />
            <br />
            2.2. Процедура возврата товара ненадлежащего качества осуществляется
            следующим образом: - Путем предоставления заявлении на возврат
            Товара, в котором должно быть указано, какой именно дефект содержит
            возвращаемый Покупателем товар; - После принятия заявления, Товар
            направляется на проверку в техническую службу по оказанию сервисных
            услуг, который уполномочен производить техническую проверку
            определенного вида Товара для определения возникновения причин
            недостатков Товара; - По итогам проверки уполномоченной технической
            службой по оказанию сервисных услуг составляется заключение о
            причинах недостатков Товара. - В случае если в период гарантийного
            срока недостатки Товара явились причиной заводского брака (дефекта),
            Товар подлежит замене, а в случае возможности технического
            устранения недостатков, Товар подлежит безвозмездному устранения
            недостатков.
            <br />
            <br />
            2.3. Порядок замены товара с недостатками: - В течении 7 дней (при
            явных признаках заводского брака) - В течении 20 дней (при
            необходимости дополнительной проверки) - В течении 1 месяца (при
            отсутствии товара аналогичной марки) - В течении 2 месяцев (при
            доставке в отдаленные территории).
            <br />
            <br />
            2.4. Порядок устранения недостатков товара: - В течении 20 дней
            (после полной проверки технической службой по оказанию сервисных
            услуг).
            <br />
            <br />
            2.5. После истечения гарантийного срока, претензии предъявляются
            производителю в течении срока службы.

            <div style={{display: 'flex',alignItems: 'center', justifyContent: 'flex-end', margin: '50px 0'}}>
               
               <a href="../static/doc_file.docx" style={{color:'#000'}} download="doc_file.docx">
               <strong style={{paddingRight: '20px'}}>
                Скачать образец заявления на возврат
                </strong>
                 <button 
                    style={{
                       minWidth: '150px',
                       cursor:'pointer',
                       height: '40px',
                       fontSize: '16px',
                       outline: 'none',
                       backgroundColor: 'transparent',
                       border: '1px solid #000',
                       }}
                 >Скачать</button>
               </a>
             </div>

            <br />
            <br />
            <br />
          </div>
        </>
      )}
    </>
  );
}
