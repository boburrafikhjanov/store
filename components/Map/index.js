import React from "react";
import cls from "./map.module.scss";
import { map } from "../../mockData/map";
import { ArrowRightIcon } from "../svg";

import useTranslation from "next-translate/useTranslation";
import Cookies from "universal-cookie";
import MapYan from "./MapYan";

const Map = () => {
  const { t } = useTranslation();
  const cookie = new Cookies();
  return (
    <>
      <div className="containerFluid">
        <div className={cls.router}>
          <div className={cls.main}>{t("common:main")}</div>
          <ArrowRightIcon />
          <div className={cls.ourmagazine}>{t("common:nashiMagazine")}</div>
        </div>
        <div className={cls.wrapMap}>
          <div className={cls.sidebar}>
            {map?.map((item) => (
              <>
                <div className={cls.cart}>
                  <div>
                    <span className={cls.bold}>{item?.title}</span>
                    <span className={cls.regular}>
                      {cookie.get("locale") == "uz" ? (
                        <>{item?.adressUz}</>
                      ) : (
                        <>{item?.adress}</>
                      )}
                    </span>
                  </div>
                  <small>
                    {cookie.get("locale") == "uz" ? (
                      <>{item?.streetUz}</>
                    ) : (
                      <>{item?.street}</>
                    )}
                  </small>
                  <div className={cls.workTime}>
                    <div className={cls.flex}>
                      <p className={cls.width}>
                        {cookie.get("locale") == "uz" ? (
                          <>{item?.dayUz}</>
                        ) : (
                          <>{item?.day}</>
                        )}
                      </p>
                      <p className={cls.nerobota}>{item?.clock}</p>
                    </div>
                    <div className={cls.flex}>
                      <p className={cls.widthA}>
                      {cookie.get("locale") == "uz" ? (<>
                        {item?.dayWeekendUz}
                      </>): (<>
                        {item?.dayWeekend}
                      </>)}
                        
                        </p>
                      <p className={cls.nerobota}>{item?.clockTwo}</p>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className={cls.mapWrap}>
            <div className={cls.mapPart}> 
              <MapYan/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
