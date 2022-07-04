import React from "react";
import {
  TelegramIcon,
  InstagramIcon,
  FacebookIcon,
  ArrowRightIconTwo,
} from "../../svg";
import cls from "./newsDetail.module.scss";
import moment from "moment";

const NewsDetail = ({ data }) => {
  console.log(data, "Data");
  return (
    <div className="containerFluid">
      <div className={cls.breadCrumb}>
        <div className={cls.wrap}>
          <p className={cls.main}>главная</p>
          <ArrowRightIconTwo />
          <p className={cls.main}>блог</p>
          <div className={cls.strelka}>
            <ArrowRightIconTwo />
            <p className={cls.red}>{data.title}</p>
          </div>
        </div>
        <div className={cls.socials}>
          <div className={cls.wrapDate}>
         
          </div>
          <div className={cls.non}>
            <div style={{ width: "120px" }}></div>
            <p>
              {moment(data.created_at).locale("uz-latn").format("DD.MM.yyyy")}
            </p>
          </div>
        </div>
      </div>

      <div className={cls.startAny}>
      <p className={cls.redA}>{data.title}</p>
        <div
          className={cls.one}
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
      </div>
    </div>
  );
};

export default NewsDetail;
