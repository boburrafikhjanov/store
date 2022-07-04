/* eslint-disable @next/next/link-passhref */
import * as React from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import useTranslation from "next-translate/useTranslation";
import Select from "react-select";

import { flags } from "../../../utils/flags";
import cls from "./language.module.scss";

const customStyles = {
  control: (base) => ({
    ...base,
    height: 35,
    minHeight: 35,
    border: 0,
    boxShadow: "none",
  }),
  placeholder: (base) => ({
    ...base,
    marginBottom: 0,
  }),
};

const Language = () => {
  const cookies = new Cookies();
  const router = useRouter();
  const { t } = useTranslation();

  const { asPath, locales, itemlocale, push } = router;

  const LocaleChange = ({ value }) => {
    cookies.set("locale", value);

    // cookies.set('locale', value, { expires: new Date(Date.now()+5)});
    push(asPath, undefined, { locale: value });
    setTimeout(()=>{
      window.location.reload(false);

    }, 1000)
  };

  return (
    <>
      <div className={cls.background}>
        <div className="containerFluid">
          <div className={cls.flex}>
            <div>
              {t("common:touchin")}{" "}
              <a
                style={{ cursor: "pointer", fontWeight: "600" }}
                href="tel:+998712059393"
              >
                +998 71 205 93 93 ({t("common:dan")} 9:00 {t("common:to")} 21:00   {t("common:bezvxod")})
              </a>
            </div>
            <Select
              styles={customStyles}
              value={itemlocale}
              placeholder={cookies.get("locale") == "uz" ? flags.uz : flags.ru}
              onChange={LocaleChange}
              components={{ IndicatorSeparator: null }}
              options={locales.map((item) => ({
                value: item,
                label: flags[item],
              }))}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Language;
