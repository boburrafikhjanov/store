import React from "react";
import { Default } from "./DefaultCrumb";

const BreadCrumb = (props) => {
  const loopThrough = (crumbs, url) => {
    let arr = [{ breadcrumb: crumbs.name, href: `${url}/${crumbs.slug}` }];
    if (crumbs.parent) {
      let parent = crumbs.parent;
      arr = [
        { breadcrumb: parent.name, href: `${url}/${parent.slug}` },
        ...arr,
      ];
      loopThrough(parent, url);
    } else {
      return arr;
    }
  };

  const parseCrumbs = (crumbs, url) => {
    if (crumbs && crumbs.id) {
      let parsedCrumbs = loopThrough(crumbs, url);
      return <Default parsedCrumbs={parsedCrumbs} />;
    } else {
      return <Default />;
    }
  };
  return <>{parseCrumbs(props.catalogCrumbs, "/catalog")}</>;
};

export default BreadCrumb;
