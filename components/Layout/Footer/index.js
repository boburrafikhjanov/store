import React from "react";

import cls from "./footer.module.scss";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import Script from "../../Chat/index";

import Image from "next/image";
import apple from "../../../public/apple2.png";
import play from "../../../public/play.png";

import {
  FooterLogoIcon,
  TelegramIcon,
  InstagramIcon,
  YoutubeIcon,
  FacebookIcon,
} from "../../svg";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <footer className={cls.footerBckgr}>
        <div className="containerFluid">
          <div className={cls.footerItems}>
            <div className={cls.aboutPart}>
              <div className={cls.logoBrand}>
                <FooterLogoIcon />
                <Script />
              </div>

              <div className={cls.aboutItems}>
                <span className={cls.nonBold}>+998</span>
                <span className={cls.boldNumber}>
                  <a
                    style={{ cursor: "pointer", fontWeight: "600" }}
                    href="tel:+998712059393"
                  >
                    71 205 93 93
                  </a>
                </span>
              </div>
              <div className={cls.workTime}>
                <span>{t("common:callCenter")}</span>
                <p>
                  {" "}
                  Eжедневно, 09:00 {t("common:to")} 21:00
                </p>
              </div>
              <div>
                <p className={cls.mailBrandstore}>info@brandstore.uz</p>
              </div>
              <div className={cls.adressBrandstore}>
                {/* <span>{t("common:footeradd")}</span> */}
              </div>

              <div className={cls.socialLogo}>
                <Link  href="https://t.me/+dZ5YjqNmZug1Yzdi">
                  <a>
                    <TelegramIcon />
                  </a>
                </Link>

                <Link  href="https://www.facebook.com/brandstoreuzofficial/">
                  <a>
                    <FacebookIcon />
                  </a>
                </Link>
                <Link href="https://www.youtube.com/channel/UCkfMxW123oZIoyhGpWPbokA/">
                  <a>
                    <YoutubeIcon />
                  </a>
                </Link>
                <Link href="https://www.instagram.com/brandstore.uz/">
                  <a>
                    <InstagramIcon />
                  </a>
                </Link>
              </div>
            </div>

            <div className={cls.categoryFooter}>
              <h3>{t("common:categoryFoo")}</h3>
              <Link href="/catalog/monobloki">
                <a>
                  <p>{t("common:footerMonoblock")}</p>
                </a>
              </Link>
              <Link href="/catalog/kompyutery">
                <a>
                  <p>{t("common:footerKomp")}</p>
                </a>
              </Link>

              <Link href="/catalog/videokarty">
                <a>
                  <p>{t("common:footerVide")}</p>
                </a>
              </Link>

              <Link href="/catalog/monitory">
                <a>
                  <p>{t("common:footerMonitor")}</p>
                </a>
              </Link>
              <Link href="/catalog/mfu-i-printery">
                <a>
                  <p>{t("common:footerMfu")}</p>
                </a>
              </Link>
              <Link href="/catalog/telefony">
                <a>
                  <p>{t("common:footerWifi")}</p>
                </a>
              </Link>
            </div>

            <div className={cls.categoryFooter}>
              <h3>{t("common:footerMagazin")}</h3>
              {/* <p>
              {t("common:news")}
              </p> */}
              <Link href="/about/policy">
                <a>
                  <p>{t("common:policy")}</p>
                </a>
              </Link>

              <Link href="/about">
                <a>
                  <p>{t("common:onas")}</p>
                </a>
              </Link>

              <Link href="/loyalty">
                <a>
                  <p>{t("common:pravila")}</p>
                </a>
              </Link>
              <Link href="/rules">
                <a>
                  <p>{t("common:pravilaUser")}</p>
                </a>
              </Link>
              <Link href="/contact">
                <a>
                  <p>{t("common:contact")}</p>
                </a>
              </Link>

              <Link href="/map">
                <a>
                  <p>{t("common:nashiMagazine")}</p>
                </a>
              </Link>
            </div>

            <div className={cls.categoryFooter}>
              <h3>{t("common:pokupateli")}</h3>

              <Link href="/installment">
                <a>
                  <p>{t("common:pokupRass")}</p>
                </a>
              </Link>
              <Link href="/payment">
                <a>
                  <p>{t("common:dostavkaOplata")}</p>
                </a>
              </Link>
              <Link href="/cashback">
                <a>
                  <p>{t("common:cashbeckPra")}</p>
                </a>
              </Link>
              <Link href="/returning">
                <a>
                  <p>{t("common:vozvratIObmen")}</p>
                </a>
              </Link>
              <Link href="/coupon">
                <a>
                  <p>{t("common:pravilaCupon")}</p>
                </a>
              </Link>
            </div>

            <div className={`${cls.deviceLogo} nextImage`}>
              <a href="https://apps.apple.com/us/app/brandstore/id1495161090?l=ru&ls=1">
                <Image width={200} src={apple} layout="fill" alt="adssaddas" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=brandstore.uz">
                <Image src={play} layout="fill" alt="dadadasda" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
