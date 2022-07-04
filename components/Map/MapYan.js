import React from "react";
import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  Clusterer,
} from "react-yandex-maps";
const mapState = {
  center: [41.293139, 69.263216],
  zoom: 12,
};
import { PlacemarkIcon } from "../svg";
import Cookies from "universal-cookie";

export default function MapYan() {
  const cookie = new Cookies();
  const locale = cookie.get("locale");
  const balloonContent = (address,sergeli) =>
    locale === "uz"
      ? `
  <div style="display:flex; flex-direction: column;">
    <div style="color: red; font-weight: 700; font-size: 18px;">Brandstore.uz</div>
    <div style="color: #979797">Kompyuter do'koni elektronika do'koni</div>
    <div style="display:flex; justify-content: space-between; padding-bottom: 10px;"><span>Har kuni</span><div>10:00-22:00</div></div>
    <div style="border-top: 1px solid #e8e8e8;border-bottom: 1px solid #e8e8e8; padding: 10px 0px 10px; display:flex; flex-direction: column;">
      <span>
        <i class="fa fa-phone" aria-hidden="true"></i> +998 71 205 93 93</span><span><i class="fa fa-globe"></i> <a href="https://brandstore.uz/">https://brandstore.uz/</a>
      </span>
    </div>
    <div style="padding-top: 10px;">${address.uz}</div>
  </div>`
      : `
  <div style="display:flex; flex-direction: column;">
    <div style="color: red; font-weight: 700; font-size: 18px;">Brandstore.uz</div>
    <div style="color: #979797">Компьютерный магазин, магазин электроники, сетевое оборудование</div>
    <div style="display:flex; justify-content: space-between; padding-bottom: 10px;"> ${address?.eje?.length > 1 ? address.eje : ''}</div>
    <div style="display:flex; justify-content: space-between; padding-bottom: 10px;">    ${address?.sergeli?.length > 1 ? address.sergeli : ''}</div>

    
    <div style="border-top: 1px solid #e8e8e8;border-bottom: 1px solid #e8e8e8; padding: 10px 0px 10px; display:flex; flex-direction: column;">
      <span>
        <i class="fa fa-phone" aria-hidden="true"></i> +998 71 205 93 93</span><span><i class="fa fa-globe"></i> <a href="https://brandstore.uz/">https://brandstore.uz/</a>
      </span>
    </div>
    <div style="padding-top: 10px;">${address.ru}</div>

  </div>`;
  return (
    <>
      <div>
        <YMaps>
          <Map
            width="1000px"
            height="650px"
            defaultState={mapState}
            options={{ controls: ["trafficButton", "viaPointButton"] }}
            instanceRef={(ref) => {
              if (ref) {
                ref.events.add("click", (e) => {
                  ref.balloon.close();
                });
              }
            }}
          >
            <GeolocationControl />
            <Clusterer>
              <Placemark
                modules={["geoObject.addon.balloon"]}
                geometry={[41.29315, 69.26294]}
                instanceRef={(e) => console.log(e)}
                options={{
                  iconLayout: "default#image",
                  iconImageSize: [30, 40],
                  iconImageHref:
                    "/static/assets/template/avtech/images/132as.png",
                  iconImageOffset: [-3, -42],
                }}
                properties={{
                  balloonContent: balloonContent({
                    ru: "Узбекистан, Ташкент, улица Шота Руставели, 20",
                    uz: "O'zbekiston, Toshkent, Shota Rustaveli ko'chasi, 20",
                    eje: "Ежедневно 10:00 - 22:00"
                  }),
                }}
              />

              {/* <Placemark
                modules={["geoObject.addon.balloon"]}
                geometry={[41.287108, 69.18721]}
                instanceRef={(e) => console.log(e)}
                options={{
                  iconLayout: "default#image",
                  iconImageSize: [30, 40],
                  iconImageHref:
                    "/static/assets/template/avtech/images/132as.png",
                  iconImageOffset: [-3, -42],
                }}
                properties={{
                  balloonContent: balloonContent({
                    ru: "г. Ташкент, Учтепинский район, массив Чиланзар, квартал Г9А, 1",
                    uz: "Toshkent sh, Uchtepa tumani,Chilonzor massiv, mavze-G9A, 1",
                  }),
                }}
              /> */}

              <Placemark
                modules={["geoObject.addon.balloon"]}
                geometry={[40.99749791130213, 71.64591619669712]}
                instanceRef={(e) => console.log(e)}
                options={{
                  iconLayout: "default#image",
                  iconImageSize: [30, 40],
                  iconImageHref:
                    "/static/assets/template/avtech/images/132as.png",
                  iconImageOffset: [-3, -42],
                }}
                properties={{
                  balloonContent: balloonContent({
                    ru: "г. Наманган, улица Алишер Навойи, 69",
                    uz: "Namangan shahar, Alisher Navoiy ko’chasi, 69 uy",
                    eje: "Ежедневно 10:00 - 22:00"
                  }),
                }}
              />

              <Placemark
                modules={["geoObject.addon.balloon"]}
                geometry={[41.278064, 69.177464]}
                instanceRef={(e) => console.log(e)}
                options={{
                  iconLayout: "default#image",
                  iconImageSize: [30, 40],
                  iconImageHref:
                    "/static/assets/template/avtech/images/132as.png",
                  iconImageOffset: [-3, -42],
                }}
                properties={{
                  balloonContent: balloonContent({
                    ru: "г.Ташкент, Учтепинский район, ул. Лутфи, 57",
                    uz: "Toshkent sh, Uchtepa tumani, Lutfiy ko’chasi, 57",
                    eje: "Ежедневно 10:00 - 22:00"
                  }),
                }}
              />

              <Placemark
                modules={["geoObject.addon.balloon"]}
                geometry={[41.239081, 69.328577]}
                instanceRef={(e) => console.log(e)}
                options={{
                  iconLayout: "default#image",
                  iconImageSize: [30, 40],
                  iconImageHref:
                    "/static/assets/template/avtech/images/132as.png",
                  iconImageOffset: [-3, -42],
                }}
                properties={{
                  balloonContent: balloonContent({
                    ru: "г.Ташкент, Ташкентская кольцевая автомобильная дорога, 17",
                    uz: "17 Toshkent Xalqa Avtomobil Yo'li,Toshkent",
                    eje: "Ежедневно 10:00 - 22:00"
                  }),
                }}
              />

              <Placemark
                modules={["geoObject.addon.balloon"]}
                geometry={[41.355243, 69.333869]}
                instanceRef={(e) => console.log(e)}
                options={{
                  iconLayout: "default#image",
                  iconImageSize: [30, 40],
                  iconImageHref:
                    "/static/assets/template/avtech/images/132as.png",
                  iconImageOffset: [-3, -42],
                }}
                properties={{
                  balloonContent: balloonContent({
                    ru: "Ташкент, ул. Богишамол, 260А",
                    uz: "Toshkent sh, Bog'ishamol ko'chasi, 260A",
                    eje: "Ежедневно 10:00 - 22:00"
                  }),
                }}
              />

<Placemark
                modules={["geoObject.addon.balloon"]}
                geometry={[41.225089,69.220484]}
                instanceRef={(e) => console.log(e)}
                options={{
                  iconLayout: "default#image",
                  iconImageSize: [30, 40],
                  iconImageHref:
                    "/static/assets/template/avtech/images/132as.png",
                  iconImageOffset: [-3, -42],
                }}
                properties={{
                  balloonContent: balloonContent({
                    ru: "Ташкент, Сергелийский район, массив Сергели-VIIIА, 3 дом",
                    uz: "Toshkent sh, Sergeli tumani, Sergeli-VIIIA massivi, 3-uy",
                    sergeli: "Понедельник - Суббота 10:00 - 20:00"
                  }),
                }}
              />
       
            </Clusterer>
          </Map>
        </YMaps>
      </div>
    </>
  );
}
