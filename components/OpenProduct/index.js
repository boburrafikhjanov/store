/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";

import { useTypeDispatch } from "../../store/hooks/useDispatch";
import { useTypeSelector } from "../../store/hooks/useSelector";
import Favourite from "../Buttons/Favourite";
import AddCart from "../Buttons/Cart";
import CompareBtn from "../Buttons/Compare";
import { Swiper, SwiperSlide } from "swiper/react";
import { notifySuccess } from "../../helpers/NotifyBtn";
import SimilarProduct from "./SimilarProduct";
import Countdown from "react-countdown";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import ImageModal from "./ModalSlider";

import useTranslation from "next-translate/useTranslation";

import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
SwiperCore.use([FreeMode, Navigation, Thumbs]);
import { CashNewIcon, FireIcon, SearchIconNew } from "../svg";

import cls from "./openProduct.module.scss";
import MobileVersion from "./MobileVersion";

import ModalInstallment from "./ModalInstallment";

export default function OpenProduct({ data }, props) {
  const { fetchCart, fetchPaymentOptions, addToCart } = useTypeDispatch();
  const { t } = useTranslation();
  const { paymentOptions } = useTypeSelector((state) => state.checkout);

  const [imageModal, setImageModal] = useState(false);

  const [deviceWidth, setDeviceWidth] = useState(0);

  const [selectedNumber, setSelectedNumber] = useState(1);
  const [isInCart, setIsInCart] = useState(data.is_in_cart);

  useEffect(() => {
    if (!paymentOptions.length) fetchPaymentOptions();
    fetchCart();
  }, []);

  const [isOpenSlide, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!isOpenSlide);
  };
  useEffect(() => {
    document.body.classList.toggle("noScroll", isOpenSlide);
  }, [isOpenSlide]);

  useEffect(() => {
    // component did mount
    setDeviceWidth(window.innerWidth);
  }, []);

  // Modal
  const [modalIsOpen, setIsOpen] = React.useState(false);
  // Modal
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [value, setValue] = useState(undefined);
  const [staticEl, setStatic] = useState();

  const addToCartInstallment = (value) => {
    addToCart(data.random_shop.item_shop_id, selectedNumber, value);
    if (!isInCart) {
      setIsInCart(!isInCart);
      notifySuccess("Товар добавлен в корзину");
    }
  };
  useEffect(() => {
    setStatic(
      data.random_shop.partners.map((item) => ({
        partnerId: item.id,
        id: item.price_with_partners[item.price_with_partners.length - 1].id,
        total:
          item.price_with_partners[item.price_with_partners.length - 1].total,
        monthly_price:
          item.price_with_partners[item.price_with_partners.length - 1]
            .monthly_price,
        month:
          item.price_with_partners[item.price_with_partners.length - 1].month,
      }))
    );
  }, []);

  const dropdownChange = (partnerId, optionId) => {
    setStatic([
      ...staticEl.filter((item) => item.partnerId !== partnerId),
      {
        partnerId,
        id: data.random_shop.partners
          .find((item) => item.id === partnerId)
          .price_with_partners.find((el) => el.id === optionId).id,
        total: data.random_shop.partners
          .find((item) => item.id === partnerId)
          .price_with_partners.find((el) => el.id === optionId).total,
        monthly_price: data.random_shop.partners
          .find((item) => item.id === partnerId)
          .price_with_partners.find((el) => el.id === optionId).monthly_price,
        month: data.random_shop.partners
          .find((item) => item.id === partnerId)
          .price_with_partners.find((el) => el.id === optionId).month,
      },
    ]);
  };

  const toggleImageModal = () => {
    setImageModal((prev) => !prev);
  };

  const [galleryItem, setGalleryItem] = useState(0);

  const handleGalleryItem = (i) => {
    setGalleryItem(i);
  };

  const prepareModalImages = () => {
    let imgs = [];
    if (data.images.length) {
      data.images.forEach((item) => {
        // @ts-ignore
        imgs = [...imgs, item?.url];
      });
    }
    return imgs;
  };

  const handleModalHide = () => setIsOpen(false);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown

      return (
        <div className="deals_timer_content">
          {days ? (
            <>
              <p>{t("common:finishHot")}</p>
              <div className="wrapTimer" data-target-time="">
                <div className="unitDay">
                  <div id="deals_timer1_days" className="timerDays">
                    {days}
                  </div>
                  <span>{t("common:day")}</span>
                </div>

                <div className="unitDay">
                  <div id="deals_timer1_hr" className="timerHour">
                    {hours}
                  </div>
                  <span>{t("common:hours")}</span>
                </div>
                <div className="unitDay">
                  <div id="deals_timer1_min" className="timerMinute">
                    {minutes}
                  </div>
                  <span>{t("common:minutes")}</span>
                </div>
                <div className="unitDay">
                  <div id="deals_timer1_sec" className="timerSecond">
                    {seconds}
                  </div>
                  <span>{t("common:second")}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="wrapTimer" data-target-time="">
              <div className="unitDay">
                <div id="deals_timer1_hr" className="timerHour">
                  {hours}
                </div>
                <span>{t("common:hours")}</span>
              </div>
              <div className="unitDay">
                <div id="deals_timer1_min" className="timerMinute">
                  {minutes}
                </div>
                <span>{t("common:minutes")}</span>
              </div>
              <div className="unitDay">
                <div id="deals_timer1_sec" className="timerSecond">
                  {seconds}
                </div>
                <span>{t("common:second")}</span>
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  useEffect(() => {
    document.body.classList.remove("ReactModal__Overlay--after-open", modalIsOpen);
  }, [modalIsOpen]);

  useEffect(() => {
    const features = data.features;
  }, []);

  return (
    <>
      <div className="containerFluid">
        <div className={cls.routeLink}>
          <div className={cls.routeTitle}>
            <span className={cls.title}></span>
          </div>
          <div>{/* <ArrowRightIcon /> */}</div>
          <div className={cls.routeTitle}>
            <span className={cls.title}></span>
          </div>
          <div>{/* <ArrowRightIcon /> */}</div>
          <div className={cls.routeTitle}>
            <span className={cls.title}></span>
          </div>
        </div>

        <div className={cls.productImage}>
          <div className={cls.sliderProduct}>
            <Swiper
              direction={"vertical"}
              breakpoints={{
                0: {
                  direction: "horizontal",
                },
                576: {
                  direction: "horizontal",
                },
                767: {
                  direction: "vertical",
                },
                1024: {
                  direction: "vertical",
                },

                1366: {
                  direction: "vertical",
                },
              }}
              className="mySwiperThumbs"
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
            >
              {data.images &&
                data.images.map((item) => (
                  <div key={item.id}>
                    <SwiperSlide style={{ cursor: "pointer" }}>
                      <img src={item.types.home_default} />
                    </SwiperSlide>
                  </div>
                ))}
            </Swiper>

            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              className="mySwiperProduct"
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
            >
              {console.log(data.images,"image")}
              {data.images &&
                data.images.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="gallery-item" onClick={toggleImageModal}>
                      <img src={item.url} />
                      <SearchIconNew />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
            <ImageModal
              imgs={prepareModalImages()}
              initialPhoto={galleryItem}
              open={imageModal}
              toggleOpen={toggleImageModal}
            />

            {data.random_shop.discount ? (
              <div className={cls.iconPercents}></div>
            ) : null}
          </div>

          <div className={cls.aboutProduct}>
            <div>
              <div>
                <h2 className={cls.nameProduct}>{data?.name}</h2>
                {data.random_shop.discount ? (
                  <div className="deals_timer d-flex flex-column">
                    <div className="deals_timer_title_container">
                      <div className="deals_timer_title">
                        {/* {this.props.translate(
                             "indexpage.hotSubHeading"
                          )} */}
                      </div>
                      <div className="deals_timer_subtitle"></div>
                    </div>
                    <br />
                    <Countdown
                      date={
                        Date.now() + data.random_shop.discount
                          ? new Date(
                              data.random_shop.discount
                                ? data.random_shop.discount.until
                                : null
                            ).getTime()
                          : null
                      }
                      renderer={renderer}
                    />
                  </div>
                ) : null}
                <div className={cls.wrapPrice}>
                  <div className={cls.wrapDel}>
                    {!props.withInstallment &&
                    typeof data.random_shop == "object" ? (
                      <div className={cls.wrapDel}>
                        {data.random_shop.discount ? (
                          <>
                            <div className={cls.productPrice}>
                              {data.random_shop.discount.price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                              {t("common:currency")}
                            </div>
                          </>
                        ) : (
                          <>
                            {data.random_shop.price && (
                              <div className={cls.productPrice}>
                                {data.random_shop.price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                                {t("common:currency")}
                              </div>
                            )}
                          </>
                        )}
                        {data.random_shop.discount ? (
                          <del>
                            {data.random_shop.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                            &nbsp; {t("common:currency")}
                          </del>
                        ) : null}
                      </div>
                    ) : null}
                  </div>

                  <small className={cls.rasPrice}>
                    {data.random_shop.monthly_price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                    {t("common:currency")} <span>{t("common:mes")}</span>
                  </small>
                </div>

                <div className={cls.cashWrap}>
                  <div className={cls.titleCash}>
                    <CashNewIcon />
                    <div className={cls.cahsWrap}>
                      <span>Cashback</span>
                      <span className={cls.redCash}>
                        {data.random_shop.cashback
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                        {t("common:currency")}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "30px",
                      }}
                    >
                      <p>{t("common:warranty")}</p>
                      <p
                        style={{
                          fontWeight: "600",
                        }}
                      >
                        {data.random_shop.warranty_period}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cls.orderBtns}>
              <div className={cls.wrapBtns}>
                <AddCart
                  active={data.is_in_cart}
                  id={data.random_shop.item_shop_id}
                />

                <div className={cls.btnFeature}>
                  <Favourite active={data.favorite} id={data.id} />
                  <CompareBtn active={data.is_in_comparison} id={data.id} />
                </div>
              </div>

              {/* ----- Modal in mobile Version -----*/}
              <button className="modalSide" onClick={() => setIsOpen(true)}>
                {t("common:buyRass")}
              </button>
              {deviceWidth < 700 ? (
                <>
                  <div className={cls.mobileVersion}>
                    <MobileVersion
                      dropdownChange={dropdownChange}
                      staticEl={staticEl}
                      value={value}
                      {...props}
                      modalIsOpen={modalIsOpen}
                      hideModal={handleModalHide}
                      setStatic={setStatic}
                      setValue={setValue}
                      data={data.random_shop}
                      callback={addToCartInstallment}
                      isInCart={isInCart}
                      name={data.name}
                    />
                  </div>
                </>
              ) : null}

              {/* ----- Modal in mobile Version -----*/}

              <button className="modalButton" onClick={() => setIsOpen(true)}>
                {t("common:buyRass")}
              </button>

              <div className="modalPart">
                {deviceWidth > 700 ? (
                  <>
                    <ModalInstallment
                      dropdownChange={dropdownChange}
                      staticEl={staticEl}
                      value={value}
                      {...props}
                      modalIsOpen={modalIsOpen}
                      hideModal={handleModalHide}
                      setStatic={setStatic}
                      setValue={setValue}
                      data={data.random_shop}
                      callback={addToCartInstallment}
                      isInCart={isInCart}
                      name={data.name}
                    />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cls.opisaniyaProduct}>
        <div className="containerFluid">
          {data.description == null ? null : (
            <>
              <div className={cls.preview}>
                <h3>{t("common:opisaniy")}</h3>

                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.description,
                  }}
                ></div>
              </div>
            </>
          )}
        </div>

        <div className={cls.opisani}>
          <div className={cls.innerCon}>
            <div className={cls.headerCharacter}>
              <div className="containerFluid">
                <h3 className={cls.head}>{t("common:xarakter")}</h3>
              </div>
            </div>
            <div className="containerFluid">
              <div className="featuree">
                {data.features &&
                  data.features.map((item) => (
                    <div key={item.id} className={cls.featuresItem}>
                      <span>{item.name}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cls.similarProduct}>
        <SimilarProduct prodId={data.id} />
      </div>
    </>
  );
}
