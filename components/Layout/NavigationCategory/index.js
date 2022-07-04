import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "swiper/css";
import cls from "./navigationCategory.module.scss";

const NavigationCategory = ({categories}) => {
  const router = useRouter();
  const handleHeaderLink = (link = "/") => {
    router.push(link);
  };

  return (
    <>
      <div className={cls.wrapItems}>
        <div className="containerFluid">
          <div className={cls.innerNav}>
            {categories.slice(0, 9).map((item) => (
              <>
                <a
                  key={item.id}
                  onClick={() => handleHeaderLink(`/catalog/${item.slug}`)}
                >
                  {item.name}
                </a>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationCategory;
