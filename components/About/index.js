import React from "react";
import Cookies from "universal-cookie";

import useTranslation from "next-translate/useTranslation";

import {
  ArrowRightIcon,
  FirstDeleveryIcon,
  ScndIcon,
  ThreIcon,
  UseIcon,
  ScndBottomIcon,
  OxirgiIcon,
} from "../svg";

import cls from "./about.module.scss";
const About = () => {
  const { t } = useTranslation();
  const cookies = new Cookies()
  return (
    <>
      <div className="containerFluid">
        <div className={cls.routeCart}>
          <div className={cls.nonActiveRouteBox}>
            <h3 className={cls.nonActiveRoute}>{t("common:main")}</h3>
            <div className={cls.show}>
              <ArrowRightIcon />
            </div>
            <div className={cls.hide}>/</div>
          </div>

          <h3 className={cls.activeRoute}>{t("common:onas")}</h3>
        </div>

        <div className={cls.wrapBig}>
          <div className={cls.img}>
            <p className={cls.titleRegular}>{t("common:titleabourt")}</p>
            
            {cookies.get("locale")=='uz' ? (
              <>
                     <img src="/uzzzz.png" />
              </>
            ): (
              <>
            <img src="/aboutBigImg.png" />
              
              </>
            )}

            <p className={cls.descr}>{t("common:title2")}</p>
            <p className={cls.stra}>{t("common:title3")}</p>

            <div className={cls.wrapIcon}>
              <div className={cls.nonClas}>
                <FirstDeleveryIcon />
                <p>{t("common:strategy")}</p>
              </div>
              <div className={cls.nonClas}>
                <ScndIcon />
                <p>{t("common:dostavkaUz")}</p>
              </div>
              <div className={cls.nonClas}>
                <ThreIcon />
                <p>{t("common:eskpert")}</p>
              </div>
            </div>
          </div>

          <div className={cls.secondPart}>
            <img src="/rightAbout.png" />
            <div className={cls.padding}>
              <h3>{t("common:nashaMissia")}</h3>
              <p>{t("common:missionTitle")}</p>
            </div>
          </div>
        </div>

        <div className={cls.bottomPart}>
          <h3>{t("common:ssenost")}</h3>
          <div className={cls.wrpaBottom}>
            <div className={cls.bottomPadding}>
              <UseIcon />
              <h3 className={cls.nomiYoq}> {t("common:otvestvennost")}</h3>
              <p>{t("common:otvestvennostTitle")}</p>
            </div>

            <div className={cls.bottomPadding}>
              <ScndBottomIcon />
              <h3 className={cls.nomiYoq}> {t("common:progressiv")}</h3>
              <p>
              {t("common:progressiveTitle")}
              </p>
            </div>

            <div className={cls.bottomPadding}>
              <OxirgiIcon />
              <h3 className={cls.nomiYoq}>              {t("common:invidualPodxod")}</h3>
              <p>
              {t("common:inividualTitle")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
