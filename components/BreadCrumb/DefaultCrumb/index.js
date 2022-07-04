import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import { useTypeDispatch } from "../../../store/hooks/useDispatch";
import { useTypeSelector } from "../../../store/hooks/useSelector";

import cls from "../breadCrumb.module.scss";
import { ArrowRightIcon } from "../../svg";

import Cookies from "universal-cookie";

const convertBreadcrumb = (string, router) => {
  if (string.includes("?")) return string.split("?")[0];

  return string
    .replace(/-/g, " ")
    .replace("catalog", "Каталог")
    .replace("about", "О нас")
    .replace("contact", "Контакты");
};

export const Default = (props) => {
  const cookies = new Cookies()
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);
  const { categories } = useTypeSelector((state) => state.category);
  const { fetchCategories } = useTypeDispatch();
  useEffect(() => {
    if (!categories?.childs?.length) fetchCategories();
  }, []);
  useEffect(() => {
    if (router) {
      let linkPath = router.asPath.split("/");
      linkPath.shift();
      let pathArray = [];

      if (linkPath[0] === "catalog" && categories?.childs?.length) {
        pathArray = parentChecker();
      } else {
        linkPath = linkPath.filter((link) => link !== "brand");
        pathArray = linkPath.map((path, i) => {
          return {
            breadcrumb: path,
            href: "/" + linkPath.slice(0, i + 1).join("/"),
          };
        });
      }
      setBreadcrumbs([...pathArray]);
    }
  }, [router, categories]);

  const parentChecker = () => {
    if (router.pathname.includes("catalog") && categories.length) {
      const slug = router.query.slug;
      let category = [];

      categories.forEach((item) => {
        if (item.slug === slug)
          category = [{ href: `/catalog/${item.slug}`, breadcrumb: item.name }];
        else
          item.childs.forEach((child) => {
            if (child.slug === slug)
              category = [
                { href: `/catalog/${item.slug}`, breadcrumb: item.name },
                { href: `/catalog/${child.slug}`, breadcrumb: child.name },
              ];
          });
      });
      return category;
    }
  };

  if (!breadcrumbs) {
    return null;
  }


  console.log(props.parsedCrumbs," prop")

  return (
    <>
      <div className="containerFluid">
        <div className={cls.wrapRoute}>
          <div className={cls.routeLink}>
            <div>
              <Link href="/">
                <a>
                  <h3 className={cls.nonactiveTitle}>
                  {/* ГЛАВНАЯ */}
                  {cookies.get("locale") === "uz" ? (
                    <>
                    Asosiy
                    
                    </>
                  ): (
                    <>
                    ГЛАВНАЯ
                    </>
                  )}
                  </h3>
                </a>
              </Link>
            </div>

            {props.parsedCrumbs && props.parsedCrumbs.length
              ? props.parsedCrumbs.map((breadcrumbs, i) => {
                  return (
                    <div key={`${breadcrumbs.href}${i}`}>
                      <Link href={breadcrumbs.href}>
                        <a className={cls.breadCrumb}>
                          {convertBreadcrumb(breadcrumbs.breadcrumb, router)}

                          {i + 1 === breadcrumbs.length ? null : <>&nbsp;</>}
                        </a>
                      </Link>
                    </div>
                  );
                })
              : breadcrumbs.map((breadcrumbs, i) => {
                  return (
                    <div key={`${breadcrumbs.href}${i}`}>
                      <Link href={breadcrumbs.href}>
                        <a className={cls.breadCrumb}>
                          <span>/</span>
                          <ArrowRightIcon />
                          {convertBreadcrumb(breadcrumbs.breadcrumb, router)}
                          {i + 1 === breadcrumbs.length ? null : <> &nbsp; </>}
                        </a>
                      </Link>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};
