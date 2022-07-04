import React from "react";
import cls from "./popularCategory.module.scss";
import Link from "next/link";
import { popularCategory } from "../../mockData/popularVersion";
import Cookies from "universal-cookie";
const MobileVersion = () => {
  const cookies = new Cookies();

  return (
    <>
      <div className={cls.wrapCardsA}>
        {popularCategory.map((item) => (
          <Link href={item.href} key={item.id}>
            <a className={cls.wrapCard}>
              <div className={cls.innerCardContainer}>
                  <img src={item.img}/>
                <p className={cls.titleCard}>
                  {cookies.get("locale") == "uz" ? (
                    <>{item.uzTitle}</>
                  ) : (
                    <>{item.title}</>
                  )}
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default MobileVersion;
