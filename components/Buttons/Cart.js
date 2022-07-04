import React, { useState } from "react";
import Link from "next/link";

import { isElementInArray } from "../../helpers/arrayOperations";
import {
  notifySuccess,
  notifyWarn,
  notifyError,
} from "../../helpers/NotifyBtn";
import { useTypeDispatch } from "../../store/hooks/useDispatch";
import { useTypeSelector } from "../../store/hooks/useSelector";

import useTranslation from "next-translate/useTranslation";

const CartBtn = ({ id, active }) => {
  const { t } = useTranslation();
  const { addToCart } = useTypeDispatch();
  const { cart } = useTypeSelector((state) => state.cart);

  const [inCart, setInCart] = useState(active);

  const handleAddAction = () => {
    fbq("track", "ADD_TO_CART");
    fbq("track", "INITIATE_CHECKOUT");
    if (cart?.items && isElementInArray(cart?.items, +id)) {
      notifyWarn(t("common:ujeVkazonu"));
    } else {
      if (id) {
        notifySuccess(t("common:addCart"));
        addToCart(id, 1);
        setInCart(!inCart);
      } else notifyError("Id is missing!");
    }
  };

  return (
    <>
      {inCart ? (
        <>
          <Link href="/cart">
            <a  className="asd">
              <button
                className="orderBtn"
                style={{
                  cursor: "pointer",
                  padding: "0 10px",
                  backgroundColor: "#43a044",
                }}
              >
                {t("common:oformit")}
              </button>
            </a>
          </Link>
        </>
      ) : (
        <>
          <button
            className="orderBtn2"
            style={{ cursor: "pointer", padding: "0 10px" }}
            onClick={handleAddAction}
          >
            {t("common:buyBtn")}
          </button>
        </>
      )}
    </>
  );
};

export default CartBtn;
