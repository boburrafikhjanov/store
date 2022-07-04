import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import Link from "next/link";

import { useTypeSelector } from "../../../store/hooks/useSelector";
import { useTypeDispatch } from "../../../store/hooks/useDispatch";
import Select from 'react-select'

import { useRouter } from "next/router";
import Cookies from "universal-cookie";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

import { flags } from "../../../utils/flags";

import {
  ExitIconOne,
  BurgerIcon,
  LogoIcon,
  UserIcon,
  HeartIcon,
  CompareIcon,
} from "../../svg";
const itemVariants = {};
import cls from "../Header/header.module.scss";

import useTranslation from "next-translate/useTranslation";

const customStyles = {
  control: (base) => ({
    ...base,
    height: 35,
    minHeight: 35,
    border: 0,
    boxShadow: "none",
  }),
};

const MobileMenu = ({ til }) => {
  const cookies = new Cookies();
  const [open, cycleOpen] = useCycle(false, true);
  const { categories } = useTypeSelector((state) => state.category);
  const { favouriteProducts } = useTypeSelector((state) => state.favourite);

  useEffect(() => {
    document.body.classList.toggle("noScroll", open);
  }, [open]);

  const { asPath, locales, itemlocale, push } = useRouter();

  const LocaleChange = ({ value }) => {
    push(asPath, undefined, { locale: value });
    cookies.set("locale", value);
    til(true);
  };

  const renderCategory = () => (
    <>
      {categories.map((category, i) => (
        <div key={i}>
          {category.childs?.length ? (
            <Accordion allowZeroExpanded>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <h4>{category.name}</h4>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="check-items">
                    {category.childs.map((child, idx) => (
                      <div className="fontParent" key={`${i}-${idx}`}>
                        <Link href={`/catalog/${child.slug}`}>
                          <a onClick={cycleOpen} className="font">
                            {child.name}
                          </a>
                        </Link>
                      </div>
                    ))}
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          ) : (
            <div key={i}>
              <Link href={`/catalog/${category.slug}`}>
                <a>
                  <div primary={category.name} />
                </a>
              </Link>
            </div>
          )}
        </div>
      ))}
    </>
  );


  return (
    <>
      <main className="menuMobile">
        {/* <AnimatePresence> */}
        {open && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: "100%",
            }}
            exit={{
              width: 0,
            }}
          >
            <div className="headerBolie">
              <Link href="/profile">
                <a onClick={cycleOpen}>
                  <UserIcon />
                </a>
              </Link>
              <Link href="/favourites">
                <a onClick={cycleOpen}>
                  <div className="authPart">
                    <span className="countCart">
                      {favouriteProducts.length ? favouriteProducts.length : 0}
                    </span>
                    <HeartIcon />
                  </div>
                </a>
              </Link>
              <Link href="/compare">
                <a onClick={cycleOpen}>
                  <div className={cls.authPart}>
                    <CompareIcon />
                  </div>
                </a>
              </Link>
              <div className="swithcer">
              <Select
                styles={customStyles}
                value={itemlocale}
                placeholder={
                  cookies.get("locale") == "uz" ? flags.uz : flags.ru
                }
                onChange={LocaleChange}
                components={{ IndicatorSeparator: null }}
                options={locales.map((item) => ({
                  value: item,
                  label: flags[item],
                }))}
              />
              </div>
            </div>
            <motion.div
              className="container"
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="scroll">{renderCategory()}</div>
            </motion.div>
            {/* <div className="fixed">fdfsfs</div> */}
          </motion.aside>
        )}
        {/* </AnimatePresence> */}
        <div className="btnContainer">
          <button onClick={cycleOpen}>
            {open ? <ExitIconOne /> : <BurgerIcon />}
          </button>
        </div>
      </main>
    </>
  );
};

export default MobileMenu;
