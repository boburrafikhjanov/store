import React from "react";
import Link from "next/link";

import cls from "./list.module.scss";

const List = ({ child,descr }) => {
  return (
    <>
      <div className={cls.wrapCarts}>
        {child.map((item) => (
          <>
            <Link
              key={`key-${item.id}`}
              href={{
                pathname: `/catalog/[catalog]`,
              }}
              as={`/catalog/${item.slug}`}
            >
              <a>
                <div className={cls.anyOne}>
                  <p>{item.name}</p>
                  <div className={cls.absolteasd}>
                    <img src={item?.preview} />
                  </div>
                </div>
              </a>
            </Link>
          </>
        ))}
       
      </div>
      <div className={cls.seo}>
              <div className={cls.chiziq}></div>
              <div className={cls.seoSeo}   dangerouslySetInnerHTML={{__html: descr.description}}>

              </div>
        </div>
    </>
  );
};

export default List;
