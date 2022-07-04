/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import PriceRefactor from "../Refactor/PriceRefactor";
import { useTypeDispatch } from "../../store/hooks/useDispatch";
import { useTypeSelector } from "../../store/hooks/useSelector";
import ClickAwayListener from "react-click-away-listener";

import { useRouter } from "next/router";
import { SearchIcon } from "../svg";

import useDebounce from "./use-debounce";

import useTranslation from "next-translate/useTranslation";

const Search = () => {
  const [searchHidden, setSearchHidden] = useState(true);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  
  const debouncedSearchTerm = useDebounce(search, 500);


  const { getSearchResults, clearSearchResults } = useTypeDispatch();
  const { searchProducts, searchLoading } = useTypeSelector(
    (state) => state.search
  );
  const router = useRouter();

  const handleClickAway = () => {
    setSearchHidden(true);
  };

  useEffect(() => {
    if (router.pathname) setSearch("");
  }, [router]);

  const searchSubmit = (e) => {
    e.preventDefault();
    if (search && search.length) {
      router.push(`/search?param=${search}`);
      setSearchHidden(true);
    }
  };

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setSearchHidden(true);
        getSearchResults(debouncedSearchTerm).then((results) => {
          setSearchHidden(false);
          searchProducts
        });
      } else {
        searchProducts
        setSearchHidden(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  // const handleSearchChange = (e) => {
  //   if (searchHidden) {
  //     setSearchHidden(false);
  //   }
  //   setSearch(e.target.value);
  //   clearSearchResults();

  //   setTimeout(() => {
  //     getSearchResults(e.target.value);
  //   }, 250);
  // };

  const shouldSearchHide = () => {
    if (searchHidden) {
      return true;
    } else if (searchLoading) {
      return false;
    } else if (!searchProducts?.length) {
      return true;
    }
  };

  const handleSearchClear = () => {
    setSearch("");
    setSearchHidden(true);
  };

  return (
    <div className="wrapSearch">
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className="headerSearch">
          <div className="headerSearchContent">
            <div className="headerSearchFormContainer">
              <form
                autoComplete="off"
                onSubmit={searchSubmit}
                className="headerSearchForm"
              >
                <ul
                  className={`searchDropdown ${
                    shouldSearchHide() ? "hidden" : ""
                  }`}
                >
                  {searchProducts?.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={{
                          pathname: "/productPage/[product]",
                        }}
                        as={`/productPage/${item.slug}`}
                      >
                        <a onClick={handleClickAway} className={""}>
                          <img src={item.image} className="searchImg" />
                          <span className="text-truncate">{item.name}</span>
                        </a>
                      </Link>
                      <div className="priceCart">
                        <strong>
                          <PriceRefactor price={item?.random_shop?.price} />
                        </strong>
                        <div className="btn"></div>
                      </div>
                    </li>
                  ))}
                </ul>
                <input
                  autoComplete="off"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  name="search"
                  value={search}
                  required={true}
                  className="headerSearchInput"
                  placeholder={t("common:search")}
                />

                {search.length ? (
                  <div
                    onClick={handleSearchClear}
                    className="searchClear"
                  ></div>
                ) : null}

                <button type="submit" className="headerSearchButton">
                  <SearchIcon />
                </button>
              </form>
            </div>
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default Search;
