import React, { useState, useEffect } from "react";
import { NewIcon, ArrowRightIconTwo } from "../../svg";

import cls from "./morenews.module.scss";
import axios from "axios";
import url from "../../url";
import Link from "next/link";
const MoreNews = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/api/posts`, {
        params: {
          page: null,
          per_page: 50,
        },
      })
      .then((res) => {
        setPost(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="containerFluid">
        <div className={cls.icon}>
          <NewIcon />
          <div className={cls.iconInner}>
            <p>BRANDSTORE</p>
            <span>блог</span>
          </div>
        </div>

        <div className={cls.wrapCart}>
          {post.length &&
            post.map((item) => (
              <div key={item.id} className={cls.cartItem}>
                <Link
                  href={{
                    pathname: `/news/[newss]`,
                  }}
                  as={`/news/${item.slug}`}
                >
                  <a>
                    <img src={item.image.types.post_image_default} />
                    <p>{item.title}</p>
                    <button>Читать далее</button> <ArrowRightIconTwo />
                  </a>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MoreNews;
