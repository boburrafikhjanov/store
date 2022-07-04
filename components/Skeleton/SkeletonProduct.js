import React, { FC } from "react";
import { Skeleton } from "@material-ui/lab";

const SkeletonProductCard = ({ count, type = "section" }) => {
  const responsiveClass = `${
    type === "catalog"
      ? "col-lg-3 col-lg-3 col-md-6 col-sm-6 "
      : "col-lg-2-5 col-lg-3 col-md-4 col-sm-6 p-10"
  }`;

  const productSkeletonRenderer = () => {
    let skeletons = [];
    for (let i = 0; i < count; i++) {
      skeletons = [
        ...skeletons,
        <div key={`skeleton-product ${i}`} style={{padding: '10px'}} className={responsiveClass}>
            <Skeleton
              className="mb-2"
              variant="rect"
              width="100%"
              height={200}
            />
            <Skeleton />
            <Skeleton className="mb-2" />
            <Skeleton width="60%" />
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <Skeleton
                className="mt-2"
                height={70}
                width="30%"
                style={{ borderRadius: 0 }}
              />
              <Skeleton
                className="mt-2"
                height={70}
                width="50%"
                style={{ borderRadius: 0 }}
              />
            </div>
        </div>,
      ];
    }
    return skeletons;
  };

  return <>{productSkeletonRenderer()}</>;
};

export default SkeletonProductCard;
