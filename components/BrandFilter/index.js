/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { useTypeSelector } from "../../store/hooks/useSelector";
import { useTypeDispatch } from "../../store/hooks/useDispatch";
import useTranslation from "next-translate/useTranslation";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import cls from "./brand.module.scss";

const BrandFilter = () => {
  const home = useTypeSelector((state) => state.home);
  const { fetchBrands } = useTypeDispatch();
  const { brands } = home;
  const { t } = useTranslation();

  useEffect(() => {
    if (!brands.length) fetchBrands();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="containerFluid">
        <div className={cls.wrapTitle}>
          <div className={cls.flex}>
            <div className={cls.logoPart}></div>
            <div className={cls.titleLogo}>
              <span>{t("common:viberi")}</span>
              <p>{t("common:svoyBrend")}</p>
            </div>
          </div>
          <Link href="/moreBrands">
            <a>
              <button className={cls.fireBtn}>{t("common:seeMore")}</button>
            </a>
          </Link>
        </div>

        <div className={cls.desktopBrand}>
          {home.brands.length &&
            home.brands.slice(0, 12).map((item) => (
              <>
                <Link
                  href={{
                    pathname: "/brands/[brand]?brand_id",
                    query: { brand_name: item.name, id: item.id },
                  }}
                  as={`/brands/${item.name}?brand_id=${item.id}`}
                >
                  <a>
                    <div
                      key={item.id}
                      className={`${cls.brandsLogoDesktop} nextImage`}
                    >
                      <Image 
                        src={item?.image?.url} 
                        layout="fill" 
                        alt="photo" 
                        priority="true"
                        />
                    </div>
                  </a>
                </Link>
              </>
            ))}
        </div>
        <div className={cls.wrapBrands}>
          <Slider {...settings}>
            {home.brands.length &&
              home.brands.map((item) => (
                <>
                  <Link
                    href={{
                      pathname: "/brands/[brand]?brand_id",
                    }}
                    as={`/brands/${item.name}?brand_id=${item.id}`}
                  >
                    <a>
                      <div
                        key={item.id}
                        className={`${cls.brandsLogoDesktop} nextImage`}
                      >
                        <Image
                          src={item?.image?.url}
                          layout="fill"
                          alt="photo"
                        />
                      </div>
                    </a>
                  </Link>
                </>
              ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default BrandFilter;
