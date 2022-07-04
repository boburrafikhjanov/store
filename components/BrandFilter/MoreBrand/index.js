import React, { useEffect , useState } from "react";

import axios from "axios";
import Image from 'next/image'
import url from "../../../api/url";

import Link from "next/link";
import cls from "../brand.module.scss";

const moreBrands = () => {
  const [brandsAll, setBrandsAll]= useState([])

  useEffect(()=>{
    GetBrand()
  },[])

  const GetBrand = () => {
    axios.get(`${url}/api/home?type=brand_all`, {

    }).then((res)=>{
      setBrandsAll(res.data.data)
    })
  };

  return (
    <>
      <div style={{ marginBottom: "50px" }} className="containerFluid">
        <div className={cls.wrapTitle}>
          <div className={cls.flex}>
            <div className={cls.logoPart}>{/*<BriliantIcon />*/}</div>
            <div className={cls.titleLogo}>
              <span>выбери</span>
              <p>свой бренд</p>
            </div>
          </div>
        </div>
        <div className={cls.desktopBrand}>
          {brandsAll?.brands?.length &&
            brandsAll?.brands.map((item) => (
              <>
                <Link
                  href={{
                    pathname: "/brands/[brand]?brand_id",
                    query: { brand_name: item.name, id: item.id },
                  }}
                  as={`/brands/${item.name}?brand_id=${item.id}`}
                >
                  <a>
                    <div
                      key={item.id}
                      className={`${cls.brandsLogoDesktop} nextImage`}
                    >
                      <Image src={item.image.url} layout="fill" alt="photo" />
                    </div>
                  </a>
                </Link>
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default moreBrands;
