import React from "react";

const PriceRefactor = ({ price = 0, currency = true }) => {
  const formatPrice = (priceF) => {
    priceF = priceF.toString();

    switch (priceF.length) {
      case 4:
        priceF = priceF.slice(0, 1) + " " + priceF.slice(1, 4);
        break;
      case 5:
        priceF = priceF.slice(0, 2) + " " + priceF.slice(2, 5);
        break;
      case 6:
        priceF = priceF.slice(0, 3) + " " + priceF.slice(3, 6);
        break;
      case 7:
        priceF =
          priceF.slice(0, 1) +
          " " +
          priceF.slice(1, 4) +
          " " +
          priceF.slice(4, 7);
        break;
      case 8:
        priceF =
          priceF.slice(0, 2) +
          " " +
          priceF.slice(2, 5) +
          " " +
          priceF.slice(5, 8);
        break;
      case 9:
        priceF =
          priceF.slice(0, 3) +
          " " +
          priceF.slice(3, 6) +
          " " +
          priceF.slice(6, 9);
        break;
    }

    return (
      <span>
        {priceF}
        {currency ? " сум" : ""}
      </span>
    );
  };

  return <React.Fragment>{formatPrice(price)}</React.Fragment>;
};

export default PriceRefactor;
