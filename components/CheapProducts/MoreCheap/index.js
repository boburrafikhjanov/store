import React, { useState, useEffect } from "react";

import Image from "next/image";

import Link from "next/link";
import CartBtn from "../../Buttons/Cart";
import FavouriteBtn from "../../Buttons/Favourite";
import CompareBtn from "../../Buttons/Compare";
import ClampLines from "react-clamp-lines";

import { useTypeDispatch } from "../../../store/hooks/useDispatch";
import { useTypeSelector } from "../../../store/hooks/useSelector";

import cls from "../cheapProducts.module.scss";
const MoreProduct = () => {
  const [value, setValue] = useState(0);

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const { fetchHomeProducts } = useTypeDispatch();
  const { maxPriceMillion, maxPriceHalfMillion, maxPriceTwoHundredThousands } =
    useTypeSelector((state) => state.home);
  useEffect(() => {
    fetchHomeProducts("max_price_million");
  }, []);

  useEffect(() => {
    fetchHomeProducts("max_price_half_million");
  }, []);

  useEffect(() => {
    fetchHomeProducts("max_price_two_hundred_thousands");
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="containerFluid">
        <div className={cls.hotProducts}>
          <div className="cheapMore">
            <div className={cls.headerCheap}>
              <div className={cls.flexPart}>
                <div>
                  <div className={cls.icon}></div>
                </div>
                <div className={cls.tovarHeader}>
                  <div className={cls.tovar}>Товары</div>
                  <span>дешевле</span>
                </div>
              </div>
            </div>
            <div className="bloc-tabs">
              <button
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
              >
                200 000 сум
              </button>
              <button
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}
              >
                500 000 сум
              </button>
              <button
                className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(3)}
              >
                1 000 000 сум
              </button>
            </div>
          </div>
        </div>

        <div className={cls.cartsPartOne}>
          <div className="wrapCartMore">
            <div className={`${cls.wrapContainer} wrapContainer`}>
              <div className="content-tabs">
                <div
                  className={
                    toggleState === 1 ? "content  active-content" : "content"
                  }
                >
                  <p className="mobileTabs-one">
                    {maxPriceTwoHundredThousands.product_request &&
                      maxPriceTwoHundredThousands.product_request?.map(
                        (item) => (
                          <div key={item.id} className={cls.cartSales}>
                            <div className={cls.innerContainer}>
                              <div className={`${cls.imae} nextImage`}>
                                <div className={cls.feature}>
                                  <FavouriteBtn id={item.id} />
                                  <CompareBtn id={item.id} />
                                </div>
                                <Image
                                  layout="fill"
                                  loading="lazy"
                                  alt="image"
                                  src={item.images[0]?.url}
                                />
                              </div>
                              <Link
                                href={{
                                  pathname: "/productPage/[product]",
                                }}
                                as={`/productPage/${item.slug}`}
                              >
                                <a style={{ cursor: "pointer" }}>
                                  <p className={cls.categoryTitle}>
                                    {item.class.name}
                                  </p>
                                  <h4 className={cls.descriptionProduct}>
                                    <ClampLines
                                      text={item.name}
                                      id={item.id}
                                      lines={1}
                                      buttons={false}
                                      innerElement="h4"
                                    />
                                  </h4>
                                </a>
                              </Link>
                              <div className={cls.buyPart}>
                                <div>
                                  <span className={cls.installmentPlan}>
                                    {item.random_shop.monthly_price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    сум
                                  </span>
                                  <p className={cls.fixPrice}>
                                    {item.random_shop.price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    сум
                                  </p>
                                </div>
                                <div className={`${cls.btnOrder} btnPrimary`}>
                                  <CartBtn id={item.random_shop.item_shop_id} />
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                  </p>
                </div>

                <div
                  className={
                    toggleState === 2 ? "content  active-content" : "content"
                  }
                >
                  <p className="mobileTabs">
                    {maxPriceHalfMillion.product_request &&
                      maxPriceHalfMillion.product_request
                      
                        .map((item) => (
                          <div key={item.id} className={cls.cartSales}>
                            <div className={cls.innerContainer}>
                              <div className={`${cls.imae} nextImage`}>
                                <div className={cls.feature}>
                                  <FavouriteBtn id={item.id} />
                                  <CompareBtn id={item.id} />
                                </div>
                                <Image
                                  layout="fill"
                                  alt="image"
                                  src={item.images[0].url}
                                  loading="lazy"
                                />
                              </div>
                              <Link
                                href={{
                                  pathname: "/productPage/[product]",
                                }}
                                as={`/productPage/${item.slug}`}
                              >
                                <a style={{ cursor: "pointer" }}>
                                  <p className={cls.categoryTitle}>
                                    {item.class.name}
                                  </p>
                                  <h4 className={cls.descriptionProduct}>
                                    <ClampLines
                                      text={item.name}
                                      id={item.id}
                                      lines={2.5}
                                      buttons={false}
                                      innerElement="h4"
                                    />
                                  </h4>
                                </a>
                              </Link>
                              <div className={cls.buyPart}>
                                <div>
                                  <span className={cls.installmentPlan}>
                                    {item.random_shop.monthly_price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    сум
                                  </span>
                                  <p className={cls.fixPrice}>
                                    {item.random_shop.price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    сум
                                  </p>
                                </div>
                                <div className={`${cls.btnOrder} btnPrimary`}>
                                  <CartBtn id={item.random_shop.item_shop_id} />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                  </p>
                </div>

                <div
                  className={
                    toggleState === 3 ? "content  active-content" : "content"
                  }
                >
                  <p className="mobileTabs">
                    {maxPriceMillion.product_request &&
                      maxPriceMillion.product_request
                    
                        .map((item) => (
                          <div key={item.id} className={cls.cartSales}>
                            <div className={cls.innerContainer}>
                              <div className={`${cls.imae} nextImage`}>
                                <div className={cls.feature}>
                                  <FavouriteBtn id={item.id} />
                                  <CompareBtn id={item.id} />
                                </div>
                                <Image
                                  layout="fill"
                                  loading="lazy"
                                  alt="image"
                                  src={item.images[0].url}
                                />
                              </div>
                              <Link
                                href={{
                                  pathname: "/productPage/[product]",
                                }}
                                as={`/productPage/${item.slug}`}
                              >
                                <a style={{ cursor: "pointer" }}>
                                  <p className={cls.categoryTitle}>
                                    {item.class.name}
                                  </p>
                                  <h4 className={cls.descriptionProduct}>
                                    <ClampLines
                                      text={item.name}
                                      id={item.id}
                                      lines={2.5}
                                      buttons={false}
                                      innerElement="h4"
                                    />
                                  </h4>
                                </a>
                              </Link>
                              <div className={cls.buyPart}>
                                <div>
                                  <span className={cls.installmentPlan}>
                                    {item.random_shop.monthly_price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    сум
                                  </span>
                                  <p className={cls.fixPrice}>
                                    {item.random_shop.price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    сум
                                  </p>
                                </div>
                                <div className={`${cls.btnOrder} btnPrimary`}>
                                  <CartBtn id={item.random_shop.item_shop_id} />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreProduct;
