import React from "react";

import Link from "next/link";
import Image from "next/image";
import banner from "../../public/asusBanner.jpg";
import bannerUz from '../../public/asusBannerUz.jpg'

import { collection } from "../../mockData/collection";
import Cookies from "universal-cookie";

import useTranslation from "next-translate/useTranslation";

import cls from "./collection.module.scss";

export default function Collection() {
  const cookies = new Cookies();
  const { t } = useTranslation();
  return (
    <>
      <div className={cls.backgroundColor}>
        <div className="containerFluid">
          <div className={cls.containerFlex}>
            <div className={cls.collectionTitle}>
              <div className={cls.iconBack}></div>
              <div className={cls.forYouTxt}>
                <div className={cls.first}>{t("common:podborki")}</div>
                <div className={cls.second}>{t("common:dlyaVas")}</div>
              </div>
            </div>
          </div>

          <div className={cls.wrapCarts}>
            {collection.map((item) => (
              <>
                <div key={item.id} className={cls.backgroundImg}>
                  <Link href={item.href}>
                    <a>
                      <div className={`${cls.img} nextImage`}>
                       {cookies.get("locale") == "ru" ?(
                          <Image  loading="lazy" layout="fill" src={item.link} alt="asd" />
                       ) : (
                        <Image  loading="lazy" layout="fill" src={item.linkUz} alt="asd" />
                       )}
                      </div>
                    </a>
                  </Link>
                </div>
              </>
            ))}
          </div>
          <div className={`${cls.banner} nextImage`}>
            <Link href={"/brands/ASUS?brand_id=22"}>
              <a>
              {cookies.get("locale") == "ru" ?(
                     <Image  loading="lazy" layout="fill" alt="sdasdasd" src={banner} />
                       ) : (
                        <Image  loading="lazy" layout="fill" alt="sdasdasd" src={bannerUz} />
                       )}
               
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
