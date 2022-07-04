import React from "react";

import Link from "next/link";

import { ArrowRightIcon } from "../svg";

import cls from "./brandstoreCategory.module.scss";

export default function BrandstoreCategory({ child }) {
  return (
    <>
      <div className="containerFluid">
        <div className={cls.headerTitle}>
          <h3 className={cls.fromWhere}>главная</h3>
          <ArrowRightIcon />
          <h3 className={cls.toWhere}>Ноутбуки</h3>
        </div>

        <div className={cls.wrapCarts}>
          {child.singleCategory.childs.map((item) => (
            <>
              <div key={item.id} className={cls.itemCart}>
                <Link href={`/catalog/${child.slug}`}>
                  <a>
                    <div className={cls.itemcartWrapper}>
                      <p className={cls.titleCart}>{item.name}</p>
                      <div className={cls.absolute}>
                        <div className="nextImage">
                          <img
                            src={item.img.url}
                            layout="fill"
                            alt="photo2"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
