import React, { useState, useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";

import cls from "./mobileFilter.module.scss";
import { ExitIconly, FilterIcon } from "../../svg";

import BtnClearFilter from "../Filter/BtnClearFilter";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

import "react-accessible-accordion/dist/fancy-example.css";
import { useRouter } from "next/router";
import { useTypeSelector } from "../../../store/hooks/useSelector";
import { useTypeDispatch } from "../../../store/hooks/useDispatch";
import {
  checkSelectedFeatureValue,
  stringToArrayParser,
  toggleArrayElement,
} from "../../../helpers/arrayOperations";
import {
  Checkbox,
  FormControlLabel,
  Slider,
  OutlinedInput,
  FormControl,
  InputLabel,
  Tooltip,
} from "@material-ui/core";
import PriceRefactor from "../../Refactor/PriceRefactor";

function valuetext(value) {
  return `${value} sums`;
}

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={<PriceRefactor price={value} />}
    >
      {children}
    </Tooltip>
  );
}

const MobileFilter = ({ type = "category" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const { filters } = useTypeSelector((state) => state.filters);
  const { params } = useTypeSelector((state) => state.category);
  const { fetchCategoryFilteredProducts, clearFilteredProducts, fetchFilters } =
    useTypeDispatch();
  const { query, push } = useRouter();

  const [deviceWidth, setDeviceWidth] = useState(0);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [priceFocused, setPriceFocused] = useState(false);
  const [feature_value_ids, setFeatureValueIds] = useState([]);
  const [brand_ids, setBrandIds] = useState([]);
  const [brand_id, setBrandId] = useState();

  const [priceRange, setPriceRange] = useState([
    filters.price?.min ? filters.price?.min : 0,
    filters.price?.max ? filters.price?.max : 100_000_000,
  ]);

  let optionParamsCategory = {
    brand_ids: brand_ids,
    feature_value_ids: feature_value_ids,
    category_id: params.category_id,
    min_price: priceRange[0],
    max_price: priceRange[1],
  };

  let optionParamsBrand = {
    brand_id: brand_id,
    feature_value_ids: feature_value_ids,
    min_price: priceRange[0],
    max_price: priceRange[1],
  };

  useEffect(() => {
    setFeatureValueIds([]);
    setBrandIds([]);
    setPriceFocused(false);
    setPriceRange([0, 100_000_000]);
  }, [query.slug, query.brand]);

  useEffect(() => {
    setDeviceWidth(window.innerWidth);
    parseParamsToState();
  }, []);

  useEffect(() => {
    setPriceRange([
      filters.price?.min ? filters.price?.min : 0,
      filters.price?.max ? filters.price?.max : 100_000_000,
    ]);
  }, [filters.price]);

  const parseParamsToState = () => {
    const brand_ids = stringToArrayParser(query.brand_ids);
    const feature_value_ids = stringToArrayParser(query.feature_value_ids);
    setBrandIds([...brand_ids]);
    setBrandId(query.brand_id);
    setFeatureValueIds([...feature_value_ids]);
  };

  const handleSlideChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const onSliderChangeComplete = () => {
    clearFilteredProducts({});
    fetchCategoryFilteredProducts({
      ...params,
      min_price: priceRange[0],
      max_price: priceRange[1],
      page: 1,
    });
  };

  const handleCheckboxChangeCategory = (e) => {
    let newFeatureValues = feature_value_ids;
    let newBrands = brand_ids;
    let productParams = {
      ...params,
      page: 1,
    };
    const slug = query.slug;
    const page = 1;

    if (e.target.name === "feature_value_ids") {
      newFeatureValues = toggleArrayElement(feature_value_ids, e.target.value);
      fetchFilters({
        ...optionParamsCategory,
        feature_value_ids: newFeatureValues,
      });
      fetchCategoryFilteredProducts({
        ...productParams,
        feature_value_ids: newFeatureValues,
      });
      setFeatureValueIds([...newFeatureValues]);
    } else if (e.target.name === "brand_ids") {
      newBrands = toggleArrayElement(brand_ids, e.target.value);
      fetchFilters({ ...optionParamsCategory, brand_ids: newBrands });
      fetchCategoryFilteredProducts({ ...productParams, brand_ids: newBrands });
      setBrandIds([...newBrands]);
    }
    push(
      {
        pathname: `/catalog/[slug]`,
        query: {
          slug,
          page,
          brand_ids: newBrands,
          feature_value_ids: newFeatureValues,
        },
      },
      `/catalog/${slug}?page=${page}&feature_value_ids=${newFeatureValues}&brand_ids=${newBrands}`,
      { shallow: true, scroll: true }
    );
  };

  const handleCheckboxChangeBrand = (e) => {
    let newFeatureValues = feature_value_ids;
    let newBrand_id = brand_id;
    let productParams = {
      ...params,
      page: 1,
    };
    const brands = query.brand;
    const page = 1;

    if (e.target.name === "feature_value_ids") {
      newFeatureValues = toggleArrayElement(feature_value_ids, e.target.value);
      fetchFilters({
        ...optionParamsBrand,
        feature_value_ids: newFeatureValues,
      });
      fetchCategoryFilteredProducts({
        ...productParams,
        feature_value_ids: newFeatureValues,
      });
      setFeatureValueIds([...newFeatureValues]);

      push(
        {
          pathname: `/brands/[brand]`,
          query: {
            brand,
            page,
            brand_id: newBrand_id,
            feature_value_ids: newFeatureValues,
          },
        },
        `/brands/${brand}?brand_id=${newBrand_id}?page=${page}&feature_value_ids=${newFeatureValues}`,
        { shallow: true, scroll: true }
      );
    }
  };

  const renderFeatureValues = (items, similar) =>
    items && items.length
      ? items.map((check, i) => (
          <>
            <div
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
              className="checkBox"
            >
              <Checkbox
                checked={feature_value_ids.includes(`${check.id}`)}
                onChange={
                  type === "category"
                    ? handleCheckboxChangeCategory
                    : handleCheckboxChangeBrand
                }
                name="feature_value_ids"
                color="primary"
                value={check.id}
                disabled={similar ? false : check.disabled === 1}
              />
              <label className="checkboxItem">{check.value}</label>
            </div>
          </>
        ))
      : null;

  const renderFeatureBoxes = (checks) =>
    checks && checks.length
      ? checks.map((item, i) => (
          <div key={i}>
            <Accordion allowZeroExpanded>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <h4>{item.name}:</h4>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="check-items">
                    {renderFeatureValues(
                      item.values,
                      checkSelectedFeatureValue(item.values, feature_value_ids)
                    )}
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </div>
        ))
      : null;

  const renderBrandBoxes = () =>
    filters.brands && filters.brands.length
      ? filters.brands.map((item, i) => (
          <>
            <Checkbox
              checked={
                type === "brand" ? true : brand_ids.includes(`${item.id}`)
              }
              onChange={
                type === "category"
                  ? handleCheckboxChangeCategory
                  : handleCheckboxChangeBrand
              }
              name="brand_ids"
              color="primary"
              value={item.id}
            />
            <label>{item.name}</label>
          </>
        ))
      : null;

  const handlePriceFocus = () => {
    setPriceFocused(true);
  };

  return (
    <>
      <div className="main">
        <AnimatePresence>
          {isOpen && (
            <motion.aside
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              exit={{ width: 0 }}
              className={isOpen === true ? "scroll" : ""}
            >
              <div className={cls.navContainer}>
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { x: 0, opacity: 0 },
                    visible: {
                      x: 0,
                      opacity: 1,
                      transition: { duration: 0.5 },
                    },
                  }}
                  whileHover={{
                    scale: [1, 1.1, 1],
                    transition: { duration: 0.4 },
                  }}
                >
                  <div className="wrapFilter">
                    <div className="filterContainer">
                      <div className="wrapHeader">
                        <span>Фильтр</span>
                        <div className="exitIcon">
                          <button className="exitIconone" onClick={handleClose}>
                            <ExitIconly />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.p>
                <div className="containerSlide">
                  <div className="itemFilter">
                    <div className="dropDown">
                      <div style={{padding: "15px 0"}}><strong>Цена</strong> UZS</div>
                      <form autoComplete="off">
                        <Slider
                          sx={{
                            "& .MuiSlider-root": {
                              backgroundColor: "red",
                            },
                          }}
                          ValueLabelComponent={ValueLabelComponent}
                          value={priceRange}
                          min={filters.price?.min}
                          max={filters.price?.max}
                          onChange={handleSlideChange}
                          onFocus={handlePriceFocus}
                          onChangeCommitted={onSliderChangeComplete}
                          valueLabelDisplay="auto"
                          aria-labelledby="range-slider"
                          getAriaValueText={valuetext}
                        />

                        <div className="from-to-slidera">
                          <FormControl variant="outlined">
                            <InputLabel>от</InputLabel>
                            <OutlinedInput
                              id="from"
                              label="от"
                              onFocus={handlePriceFocus}
                              value={priceFocused ? priceRange[0] : ""}
                              endAdornment={
                                priceFocused ? <span>сум</span> : null
                              }
                            />
                          </FormControl>
                          <FormControl variant="outlined">
                            <InputLabel>до</InputLabel>
                            <OutlinedInput
                              label="до"
                              onFocus={handlePriceFocus}
                              value={priceFocused ? priceRange[1] : ""}
                              endAdornment={
                                priceFocused ? <span>сум</span> : null
                              }
                            />
                          </FormControl>
                        </div>

                        <div className="filter-checkboxa">
                          {filters.brands?.length ? (
                            <>
                              <h4 className="mobileBrand">Бренды:</h4>
                              {renderBrandBoxes()}
                            </>
                          ) : null}
                          {renderFeatureBoxes(filters.features)}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="moreAndClear">
                <div className="buttom">
                  <button className="clearBtn">Сбросить фильтр</button>
                  <button className="moreBtn" onClick={handleClose}>Показать все</button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
        <div className={cls.btnOpen}>
          <button
            className="btnMObile"
            onClick={handleOpen}
            style={{ display: `${isOpen ? `none` : `block`}` }}
          >
            <FilterIcon />
            Фильтр
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileFilter;
