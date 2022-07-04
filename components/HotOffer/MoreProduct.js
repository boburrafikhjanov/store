import React from "react";
import Link from "next/link";
import axios from "axios";
import url from "../../api/url";
import Countdown from "react-countdown";
import Cookies from "universal-cookie";
import cls from "./more.module.scss";

import FavouriteBtn from "../Buttons/Favourite";
import CompareBtn from "../Buttons/Compare";
import CartBtn from "../Buttons/Cart";

import Image from "next/image";

import ClampLines from "react-clamp-lines";

// Random component
const Completionist = () => <span>Предложение закончилось</span>;

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown

    return (
      <div className="deals_timer_content">
        {days ? (
          <div className="deals_timer_box clearfix" data-target-time="">
            <div className="deals_timer_unit_day">
              <div id="deals_timer1_days" className="deals_timer_days">
                {days}
              </div>
              <span> дней</span>
            </div>

            <div className="deals_timer_unit_day">
              <div id="deals_timer1_hr" className="deals_timer_hr">
                {hours}
              </div>
              <span> часов</span>
            </div>
            <div className="deals_timer_unit_day">
              <div id="deals_timer1_min" className="deals_timer_min">
                {minutes}
              </div>
              <span> минут</span>
            </div>
            <div className="deals_timer_unit_day">
              <div id="deals_timer1_sec" className="deals_timer_sec">
                {seconds}
              </div>
              <span> сек</span>
            </div>
          </div>
        ) : (
          <div className="deals_timer_box clearfix" data-target-time="">
            <div className="deals_timer_unit">
              <div id="deals_timer1_hr" className="deals_timer_hr">
                {hours}
              </div>
              <span> часов</span>
            </div>
            <div className="deals_timer_unit">
              <div id="deals_timer1_min" className="deals_timer_min">
                {minutes}
              </div>
              <span> минут</span>
            </div>
            <div className="deals_timer_unit">
              <div id="deals_timer1_sec" className="deals_timer_sec">
                {seconds}
              </div>
              <span> сек</span>
            </div>
          </div>
        )}
      </div>
    );
  }
};

const ProductLink = (props) => (
  <>
    <Link
      href={{
        pathname: `${getPath()}/productPage/[productCard]`,
      }}
      as={`${getPath()}/productPage/${props.slug}`}
    >
      <div className="product_content">
        {props.quantity ? (
          props.discount_price ? (
            <div className="product_price">
              <span>
                {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                {"indexpage.currency"}
              </span>
              {props.discount_price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
              {"indexpage.currency"}
            </div>
          ) : (
            <div className="product_price">
              {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
              {"indexpage.currency"}
            </div>
          )
        ) : (
          <div className="product_price">Нет в наличии</div>
        )}

        <div className="viewed_name">
          <a className="name">{props.id}</a>
        </div>

        {props.until ? (
          <div className="deals_timer">
            <div className="deals_timer_title_container">
              <div className="deals_timer_title">Осталось до конца:</div>
              <div className="deals_timer_subtitle"></div>
            </div>

            <Countdown
              date={
                Date.now() + props.until
                  ? new Date(props.until).getTime()
                  : null
              }
              daysInHours={true}
              renderer={renderer}
            />
          </div>
        ) : null}
      </div>
    </Link>
  </>
);

const ImageLink = (props) => (
  <>
    <img className="images" src={props.image} alt={props.slug} />
  </>
);

class MoreProduct extends React.Component {
  constructor(props) {
    const cookies = new Cookies();
    super(props);
    this.state = {
      products: [],
      totalProducts: null,
      first: 0,
      last: 10,
      meta: {
        currentPage: null,
        lastPage: null,
        perPage: 12,
      },
      isLoading: true,
      loading: true,
      sort_type: "view_count",
      numer: false,
      asc: null,
      sort_name: cookies.get("locale") === "ru" ? "Популярные" : "Популярные",
      send_filters: true,
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.brandID !== this.props.brandID) {
      this.getProducts();
    }

    if (prevProps.category_id !== this.props.category_id) {
      if (prevProps.category_id === null) {
        if (
          parseInt(localStorage.getItem("category_id")) ===
          this.props.category_id
        ) {
          this.setState(
            {
              meta: {
                currentPage: localStorage.getItem("current_page"),
              },
            },
            () => {
              this.getProducts();
            }
          );
        } else {
          this.setState(
            {
              meta: {
                currentPage: 1,
              },
            },
            () => {
              this.getProducts();
            }
          );
        }
      } else {
        this.setState(
          {
            meta: {
              currentPage: 1,
            },
            params: {
              value: {
                min: "",
                max: "",
              },
            },
            isLoading: true,
            selectedBrands: "",
            selectedFeatures: [],
            send_filters: false,
          },
          () => {
            this.getProducts();
          }
        );
      }
    }

    if (prevProps.option !== this.props.option) {
      let feature_value_ids = [];
      for (let i = 0; i < this.props.option.features.length; i++) {
        feature_value_ids = feature_value_ids.concat(
          this.props.option.features[i].selectedValues
        );
      }

      this.setState(
        {
          isLoading: true,
          selectedFeatures: feature_value_ids,
          params: this.props.option,
        },
        () => {
          this.getProducts();
        }
      );
    }
  }


  getProducts() {
    {
      axios
        .get(`${url}/api/products`, {
          params: {
            discount: this.props.discount,
            category_id: this.props.category_id,
            sort: this.state.sort_type,
            asc: this.state.asc,
            page: this.state.meta.currentPage,
            per_page: this.state.meta.perPage,
          },    
        })
        .then((response) => {
          this.setState({
            numer: true,
            isLoading: false,
            products: response.data.data,
            totalProducts: response.data.meta.total,
            meta: {
              currentPage: 1,
              lastPage: response.data.meta.last_page,
              perPage: response.data.meta.per_page,
            },
            loading: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  Pagination = (e) => {
    const meta = this.state.meta;
    meta.currentPage = e;
    localStorage.setItem("current_page", e);
    // localStorage.setItem("category_id", this.props.category_id);
    this.setState({ meta: meta });

    this.getProducts();
  };

  createPaging = () => {
    let paging = [];
    for (let i = 1; i <= this.state.meta.lastPage; i++) {
      if (this.state.meta.currentPage === i) {
        paging.push(
          <li key={i} onClick={() => this.Pagination(i)}>
            <a>{i}</a>
          </li>
        );
      } else {
        paging.push(
          <li key={i} onClick={() => this.Pagination(i)}>
            <a>{i}</a>
          </li>
        );
      }
    }
    return paging.slice(this.state.first, this.state.last);
  };

  IncrementPage = (e) => {
    e.preventDefault();
    const meta = this.state.meta;

    if (meta.currentPage < meta.lastPage) {
      meta.currentPage = meta.currentPage + 1;
      this.setState({
        meta: meta,
        first: this.state.first + 10,
        last: this.state.last + 10,
      });
    } else {
      this.setState({ meta: meta });
    }

    this.getProducts();
  };

  DecrementPage = (e) => {
    const meta = this.state.meta;

    e.preventDefault();
    if (meta.currentPage > 1) {
      meta.currentPage = meta.currentPage - 1;
      this.setState({
        meta: meta,
        first: this.state.first - 10,
        last: this.state.last - 10,
      });
    } else {
      this.setState({ meta: meta });
    }

    this.getProducts();
  };

  SortbyPriceMin = () => {
    setTimeout(() => {
      this.setState(
        {
          sort_type: "price",
          asc: 1,
          sort_name: "filter.up",
        },
        () => {
          this.getProducts();
        }
      );
    }, 100);
  };

  SortbyPriceMax = () => {
    setTimeout(() => {
      this.setState(
        {
          sort_type: "price",
          asc: 0,
          sort_name: "filter.down",
        },
        () => {
          this.getProducts();
        }
      );
    }, 100);
  };

  SortbyPricePopular = () => {
    setTimeout(() => {
      this.setState(
        {
          sort_type: "view_count",
          asc: 0,
          sort_name: "filter.popular1",
        },
        () => {
          this.getProducts();
        }
      );
    }, 100);
  };

  render() {
    const { products } = this.state;

    return (
      <>
        <div className="containerFluid">
          <div className="shop_content">
            <div className="shop_bar clearfix mb-4">
              <div className="shop_product_count">
                <div className="qizillma">
                  <div className="icooon"></div>
                  <div className="asd">
                    <span className="qizil">Горящие</span>
                    <span className="qizilamas">предложения</span>
                  </div>
                </div>
              </div>
              <div className="shop_sorting">
                <span>Сортировать по:</span>
                <ul>
                  <li>
                    <span className="sorting_text">
                      {this.state.sort_name}
                      <i className="fas fa-chevron-down"></i>
                    </span>
                    <ul>
                      <li
                        className="shop_sorting_button"
                        data-isotope-option='{ "sortBy": "view_count" }'
                        onClick={this.SortbyPricePopular}
                      >
                        Популярные
                      </li>
                      <li
                        className="shop_sorting_button"
                        data-isotope-option='{ "sortBy": "price" }'
                        onClick={this.SortbyPriceMin}
                      >
                        Цена по возрастанию
                      </li>
                      <li
                        className="shop_sorting_button"
                        data-isotope-option='{ "sortBy": "price" }'
                        onClick={this.SortbyPriceMax}
                      >
                        Цена по убыванию
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="hotProd">
              {products.length
                ? products.map((item) => {
                    const discount_price = item.random_shop.discount
                      ? item.random_shop.discount.price
                      : null;
                    return (
                      <>
                        <div key={item.id} className="cartSalesBorder">
                          <div className="innerContainerBorder">
                            <div className={`${cls.imae} nextImage`}>
                              <div className={cls.feature}>
                                <div className="hotbtn">
                                  <FavouriteBtn
                                    active={item.favorite}
                                    id={item.id}
                                  />
                                  <CompareBtn
                                    active={item.is_in_comparison}
                                    id={item.id}
                                  />
                                </div>
                                <div className="percentA">
                                  -{item?.random_shop.discount?.percent}%
                                </div>
                              </div>
                              <Link
                                href={{
                                  pathname: "/productPage/[product]",
                                }}
                                as={`/productPage/${item.slug}`}
                              >
                                <a>
                                  <div className="kd">
                                    <img
                                      layout="fill"
                                      alt="image"
                                      src={item.images[0].url}
                                    />
                                  </div>
                                </a>
                              </Link>
                            </div>
                            <Link
                              href={{
                                pathname: "/productPage/[product]",
                              }}
                              as={`/productPage/${item.slug}`}
                            >
                              <a>
                                <p className="hotcategoryTitle">
                                  {item.class.name}
                                </p>
                                <h4 className={cls.descriptionProduct}>
                                  <ClampLines
                                    text={item.name}
                                    id={item.id}
                                    lines={2.5}
                                    buttons={false}
                                    // ellipsis="..."
                                    // moreText="false"
                                    innerElement="h4"
                                  />
                                </h4>
                                <div className="count">
                                  {item.random_shop.discount ? (
                                    <>
                                      <div className="deals_timer_title">
                                        Предложение заканчивается через:
                                      </div>
                                      <Countdown
                                        date={
                                          Date.now() + item.random_shop.discount
                                            ? new Date(
                                                item.random_shop.discount
                                                  ? item.random_shop.discount
                                                      .until
                                                  : null
                                              ).getTime()
                                            : null
                                        }
                                        renderer={renderer}
                                      />
                                    </>
                                  ) : null}
                                </div>
                              </a>
                            </Link>

                            <div className="HotbuyPart">
                              <div>
                                {item.random_shop.quantity ? (
                                  discount_price ? (
                                    <div className="product_price">
                                      <div className="flexBu">
                                        <div className="Hotcolor">
                                          {discount_price
                                            .toString()
                                            .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              " "
                                            )}{" "}
                                          сум
                                       
                                        </div>

                                        <del>
                                          {item.random_shop.price
                                            .toString()
                                            .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              " "
                                            )}{" "}
                                 
                                          сум
                                        </del>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="product_price">
                                      {item.random_shop.price
                                        .toString()
                                        .replace(
                                          /\B(?=(\d{3})+(?!\d))/g,
                                          " "
                                        )}{" "}
                                     сум
                                    </div>
                                  )
                                ) : (
                                  <div className="product_price">
                                    Нет в наличии
                                  </div>
                                )}
                              </div>
                              <button className={`${"hotbtnOrder"} btnPrimary`}>
                                <CartBtn
                                  active={item.is_in_cart}
                                  id={item.random_shop.item_shop_id}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                : null}
            </div>
          </div>
          {this.state.meta.lastPage == 1 ? null : (
            <div className="listAnu">
              <div
                onClick={this.DecrementPage}
                className="page_prev d-flex flex-column align-items-center justify-content-center"
              >
                <i className="fas fa-chevron-left"></i>
              </div>
              <ul className="nolist">{this.createPaging()}</ul>
              <div
                onClick={this.IncrementPage}
                className="page_next d-flex flex-column align-items-center justify-content-center"
              >
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    Intl: state.Intl,
  };
}

export default MoreProduct;
