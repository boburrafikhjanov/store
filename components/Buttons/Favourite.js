import React, { useState } from "react";
import { HeartIcon } from "../svg";

import { notifySuccess, notifyError } from "../../helpers/NotifyBtn";
import { useTypeDispatch } from "../../store/hooks/useDispatch";
import useTranslation from "next-translate/useTranslation";

const FavouriteBtn = ({ id, active }) => {
  const {t} = useTranslation()
  const { toggleFavourite } = useTypeDispatch();
  const [isActive, setActive] = useState(active);

  const handleFavouriteClick = (id) => {
    fbq('track', 'ADD_TO_WISHLIST')
    if (isActive) {
      notifyError(t("common:removeFavo"));
    } else {
      notifySuccess(t("common:addFavorite"));
    }
    toggleFavourite(id);
    setActive((prevState) => !prevState);
  };

  return (
    <>
      <button
        style={{ cursor: "pointer" }}
        className={`favoriteBtn ${isActive ? "activeFav" : ""}`}
        onClick={() => handleFavouriteClick(id)}
      >
        <HeartIcon />
      </button>
    </>
  );
};

export default FavouriteBtn;
