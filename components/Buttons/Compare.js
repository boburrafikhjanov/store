import React, { useState } from "react";

import { useTypeDispatch } from "../../store/hooks/useDispatch";
import { notifySuccess, notifyError } from "../../helpers/NotifyBtn";

import { CompareIcon } from "../svg";
import useTranslation from "next-translate/useTranslation";

const CompareBtn = ({ id, active }) => {
  const {t} = useTranslation()
  const { toggleCompare } = useTypeDispatch();
  const [isCompareActive, setCompareActive] = useState(active);
  
  const handleCompareClick = (id) => {
    if (isCompareActive) {
      notifyError(t("common:removeComp"));
    } else {
      notifySuccess("Продукт добавлен в Сравнение");
    }
    toggleCompare(id);
    setCompareActive((prevState) => !prevState);
  };
  return (
    <>
      <button
        style={{ cursor: "pointer" }}
        className={`compareBtn ${isCompareActive ? "activeCompare" : ""}`}
        onClick={() => handleCompareClick(id)}
      >
        <CompareIcon />
      </button>
    </>
  );
};

export default CompareBtn;
