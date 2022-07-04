import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Navigation } from "swiper";

SwiperCore.use([Navigation]);
import cls from "./similarProduct.module.scss";
import { hotProductTwo } from "../../mockData/mockdateSale";
import Image from "next/image";

export default function SimilarProduct() {
  return (
    <>
      <div className="containerFluid">
        <div className={cls.similarContainer}>
          <div className={cls.carousel}>
            <Swiper
              navigation={true}
              slidesPerView={4}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1366: {
                  slidesPerView: 4,
                },
              }}
              className="mySwiper1sa"
            >
              <div className={cls.similarItem}>
                {hotProductTwo.map((item) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <div className={cls.wrapContainer}>
                        <>
                          <div className={cls.cartSales}>
                            <div className={cls.innerContainer}>
                              <div className="nextImage">
                                <Image
                                  layout="fill"
                                  alt="dasdasdsa"
                                  src={item?.link}
                                />
                              </div>
                              <p className={cls.categoryTitle}>{item.title}</p>
                              <h4 className={cls.descriptionProduct}>
                                {item.description}
                              </h4>
                              <div className={cls.buyPart}>
                                <div>
                                  <span className={cls.installmentPlan}>
                                    {item.priceRassrochka}
                                  </span>
                                  <p className={cls.fixPrice}>{item.price}</p>
                                </div>
                                <button className="btnPrimary">
                                  в Корзину
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
