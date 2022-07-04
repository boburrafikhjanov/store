/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useContext, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "react-modal";
import Cookies from "universal-cookie";

import Mui from "../MuiMenu";

import Search from "../../Search";

import { useTypeSelector } from "../../../store/hooks/useSelector";
import { useTypeDispatch } from "../../../store/hooks/useDispatch";
import NavigationCategory from "../NavigationCategory/index";

import {
  LogoIcon,
  BurgerIconA,
  UserIcon,
  CompareIcon,
  ArrowRightIcon,
  HeartIcon,
  CartIcon,
  ExitIconOne,
  IconRow,
} from "../../svg";

import useTranslation from "next-translate/useTranslation";
import cls from "./header.module.scss";

export default function Header() {
  const { t } = useTranslation();

  const cookies = new Cookies();
  const locale = cookies.get("locale") == "ru" && "uz";

  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const { fetchCategories } = useTypeDispatch();
  const [deviceWidth, setDeviceWidth] = useState(0);
  const { fetchFavourites, fetchCart } = useTypeDispatch();
  const { favouriteProducts } = useTypeSelector((state) => state.favourite);

  const { cart } = useTypeSelector((state) => state.cart);
  const { categories } = useTypeSelector((state) => state.category);

  const handleHeaderLink = (link = "/") => {
    router.push(link);
  };

  useEffect(() => {
    fetchCategories();
  }, [locale]);

  useEffect(() => {
    if (!cart || !cart.total) fetchCart();
  }, []);

  useEffect(() => {
    fetchFavourites();
  }, []);

  useEffect(() => {
    setDeviceWidth(window.innerWidth);
  }, []);

  const handleModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const listContent = categories.map((list) => ({
    id: list.id,
    childs: list.childs,
    name: list.name,
    slug: list.slug,
  }));

  const [contentList, setContentList] = useState(listContent[0]); // 3
  const [contentListChild, setContentListChild] = useState(null); // 3

  const [delayHandler, setDelayHandler] = useState(null);

  const onHoverList = (item, event) => {
    if (event?.target.localName !== "li") return;
    setContentListChild([]);
    setDelayHandler(
      setTimeout(() => {
        const lists = document.querySelectorAll("#lists li");

        lists.forEach((li) => {
          li.classList.remove("menu_label_opened");
        });
        event.target.classList.add("menu_label_opened");
        setContentList(item);
      }, 200)
    );
  };

  const onHoverListChild = (child, event) => {
    if (event?.target.localName !== "li") return;

    setDelayHandler(
      setTimeout(() => {
        console.log("Start");
        setContentListChild(child?.childs);
      }, 200)
    );
  };

  const clearTimeAny = () => {
    clearTimeout(delayHandler);
  };

  const renderBtn = () => (
    <>
      <div className={cls.categoryBtn}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleModal}
        >
          {modalIsOpen ? <ExitIconOne /> : <BurgerIconA />}
          <span className={cls.nameBtn}>{t("common:category")}</span>
        </button>
      </div>
    </>
  );

  const renderCategoriesTest = () =>
    categories.map((item, i) => (
      <div key={i} className="text_label">
        <li
          className="menu_label"
          onClick={() => {
            handleHeaderLink(`/catalog/${item.slug}`);
            handleModal();
          }}
          onMouseEnter={(e) => {
            onHoverList(item, e);
          }}
          onMouseLeave={clearTimeAny}
        >
          {item.name}
        </li>
      </div>
    ));

  const renderContent = () => {
    return (
      <div className="sub_list">
        <div className="row h-100" style={{ height: "650px" }}>
          <div className="col-md-6">
            <div
              className="sub_label"
              onClick={() => handleHeaderLink(`/catalog/${contentList.slug}`)}
            >
              <h3>{contentList?.name} </h3>
              {contentList && <ArrowRightIcon />}
            </div>

            <ul className="menu_list"></ul>
            {contentList?.childs?.map((child, i) => (
              <Link
                key={i}
                href={{
                  pathname: `/catalog/[catalog]`,
                }}
                as={`/catalog/${child.slug}`}
              >
                <a onClick={handleModal} className="text_label">
                  <li
                    onMouseEnter={(e) => {
                      onHoverListChild(child, e);
                    }}
                    onMouseLeave={clearTimeAny}
                    className="menu_label"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <span>{child.name}</span>
                    {child?.childs.length > 0 ? (
                      <div style={{ marginLeft: "20px" }}>
                        <ArrowRightIcon />
                      </div>
                    ) : null}
                  </li>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderContentChild = () => {
    return (
      <div className="sub_list">
        <div className="row h-100" style={{ height: "650px" }}>
          <div className="col-md-6">
            <div
              className="sub_label"
              onClick={() =>
                handleHeaderLink(`/catalog/${contentListChild?.slug}`)
              }
            >
              {/* <h3>{contentList?.name} </h3>
              {contentList && <ArrowRightIcon />} */}
            </div>

            <ul className="menu_list"></ul>
            {contentListChild?.map((child, i) => (
              <Link
                key={i}
                href={{
                  pathname: `/catalog/[catalog]`,
                }}
                as={`/catalog/${child.slug}`}
              >
                <a onClick={handleModal} className="text_label">
                  <li className="menu_label" style={{ minWidth: "150px" }}>
                    <span>{child.name}</span>
                  </li>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <nav>
        <div className="containerFluid">
          <div className={cls.wrapNavbar}>
            <div className={cls.logo}>
              <Link href={"/"}>
                <a>
                  <LogoIcon />
                </a>
              </Link>
            </div>
            <div className={cls.hideDesk}>{renderBtn()}</div>
            <div className={cls.mobile}>
              <Mui />
            </div>

            <div className="burgerWrap">
              <Search />
            </div>
            <div className={cls.authFlex}>
              <Link href="/profile">
                <a>
                  <div className={cls.authPart}>
                    <UserIcon />
                    <span>
                      {cookies.get("access_token")
                        ? t("common:kabinet")
                        : t("common:auth")}
                    </span>
                  </div>
                </a>
              </Link>

              <Link href="/favourites">
                <a>
                  <div className={cls.authPart}>
                    <span className={cls.countCart}>
                      {favouriteProducts.length ? favouriteProducts.length : 0}
                    </span>
                    <HeartIcon />
                    <span>{t("common:favourite")}</span>
                  </div>
                </a>
              </Link>

              <Link href="/compare">
                <a>
                  <div className={cls.authPart}>
                    <CompareIcon />
                    <span>{t("common:compare")}</span>
                  </div>
                </a>
              </Link>
              <Link href="/cart">
                <a style={{ width: "100%" }}>
                  <div className={cls.authPart}>
                    <span className={cls.countCart}>
                      {cart?.total_count ? cart?.total_count : 0}
                    </span>
                    <CartIcon />
                    <span>{t("common:cart")}</span>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <NavigationCategory categories={categories} />
      <div className={cls.hideModal}>
        <Modal isOpen={modalIsOpen}>
          <div className={cls.modalStart}>
            <div className="list">
              <div className="menu_list">
                <div
                  id="lists"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "350px",
                  }}
                >
                  {renderCategoriesTest()}
                </div>
                <div>{renderContent()}</div>
                {renderContentChild()}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
