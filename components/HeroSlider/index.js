/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, { Navigation, Pagination } from "swiper";
import cls from "./heroSlider.module.scss";

import Cookies from "universal-cookie";

export default function HeroSlider({ deviceWidth, banners }) {
  const cookies = new Cookies();

  const handleUrl = (url) => {
    router.push(url);
  };

  SwiperCore.use([Navigation, Pagination]);
  return (
    <>
      <div className="containerFluid">
        <div className={cls.wrapSlider}>
          <div className={cls.sliderContainer}>
            <Swiper loop={true} navigation={true} className="mySwiper" pagination={true}>
              {banners.map((banner, i) => (
                <figure
                  key={i}
                  className={`home-banner-figure ${
                    banner.url && banner.url.length ? "c-pointer" : ""
                  }`}
                  onClick={() =>
                    banner.url && banner.url.length
                      ? handleUrl(banner.url)
                      : null
                  }
                >
                  <SwiperSlide>
                    <div className={cls.sliderImage}>
                      <Link href={banner.url}>
                        <a>
                          <img
                            src={
                              deviceWidth <= 576
                                ? banner.image.url
                                : banner.background.url
                            }
                            // alt={`brandstore Banner ${banner.id}`}
                          />
                        </a>
                      </Link>
                    </div>
                  </SwiperSlide>

                  <figcaption></figcaption>
                </figure>
              ))}
            </Swiper>
          </div>
          <div className={cls.hotNews}>
            <Link href="/agent">
              <a>
                {cookies.get("locale") == "uz" ? (
                  <>
                    <img
                      style={{ cursor: "pointer" }}
                      src="/rightBannerUz.png"
                      alt="title"
                    />
                  </>
                ) : (
                  <>
                    <img
                      style={{ cursor: "pointer" }}
                      src="/rightBanner.png"
                      alt="title"
                    />
                  </>
                )}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
