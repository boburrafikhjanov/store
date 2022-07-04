import React from "react";
import { useRouter } from "next/router";

import useTranslation from "next-translate/useTranslation";

import cls from "./filter.module.scss";

const BtnClearFilter = () => {
  const { push, query, reload } = useRouter();
  const {t} = useTranslation()

  const handleDiscard = () => {
    const slug = query.slug;
    const page = 1,
      newBrands = "",
      newFeatureValues = "";
    reload();
  };
  return (
    <>
      <button className={cls.btnClear}>
        <a
          href={`/catalog/${query.slug}`}
          onClick={handleDiscard}
          className="btn silver w-100 text-left"
        >
          {t("common:sbrosiFilter")}
        </a>
      </button>
    </>
  );
};

export default BtnClearFilter;
