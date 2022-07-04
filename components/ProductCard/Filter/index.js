/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import "react-accessible-accordion/dist/fancy-example.css";
import { useRouter } from "next/router";
import { useTypeSelector } from "../../../store/hooks/useSelector";
import { useTypeDispatch } from "../../../store/hooks/useDispatch";

import useTranslation from "next-translate/useTranslation";


import Cookies from "universal-cookie";
import {
  checkSelectedFeatureValue,
  stringToArrayParser,
  toggleArrayElement,
} from "../../../helpers/arrayOperations";
import {
  Checkbox,
  Slider,
  OutlinedInput,
  FormControl,
  InputLabel,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import PriceRefactor from "../../Refactor/PriceRefactor";

import BtnClearFilter from "./BtnClearFilter";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

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
const useStyles = makeStyles({
  root: {
    padding: "5px 9px 5px 9px",
  },
});
const Filter = ({ type = "category" }) => {
  const cookies = new Cookies();
  const locale = cookies.get("locale");

  const { filters } = useTypeSelector((state) => state.filters);
  const { params } = useTypeSelector((state) => state.category);
  const { fetchCategoryFilteredProducts, clearFilteredProducts, fetchFilters } =
    useTypeDispatch();
  const { query, push } = useRouter();

  const classes = useStyles();

  const [a, setA] = useState(false);
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
  }, [query.slug, query.brand, locale]);

  useEffect(() => {
    setDeviceWidth(window.innerWidth);
    parseParamsToState();
  }, []);

  useEffect(() => {
    setPriceRange([
      filters.price?.min ? filters.price?.min : 0,
      filters.price?.max ? filters.price?.max : 100_000_000,
    ]);
  }, [filters.price, locale]);

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

  const handleShow = () => {
    setA(true);
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

  ( query.brand, "aqwe")

  const handleCheckboxChangeBrand = (e) => {
    let newFeatureValues = feature_value_ids;
    let newBrand_id = brand_id;
    let productParams = {
      ...params,
      page: 1,
    };
    const brand = query.brand;
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

  const renderBrandBoxes = () => (
    <Accordion allowZeroExpanded>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            <h4>
              {cookies.get("locale") === "uz" ? <>Brendlar:</> : <>Бренды:</>}
            </h4>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div className="check-items">
            {filters.brands && filters.brands.length
              ? filters.brands.map((item, i) => (
                  <>
                    <div className="checkBox">
                      <Checkbox
                        checked={
                          type === "brand"
                            ? true
                            : brand_ids.includes(`${item.id}`)
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
                    </div>
                  </>
                ))
              : null}
          </div>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );

  const handleFilterMobile = () => {
    if (deviceWidth < 768) {
      setFilterOpen((prevState) => !prevState);
    }
  };

  const handlePriceFocus = () => {
    setPriceFocused(true);
  };
  return (
    <>
      <aside className="filter-category">
        <h4
          onClick={handleFilterMobile}
          className="d-flex justify-content-between align-items-center"
        ></h4>

        <form autoComplete="off">
          <Slider
            sx={{
              "& .MuiSlider-root": {
                color: "red",
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

          <div className="from-to-slider">
            <FormControl variant="outlined">
              <InputLabel>
                {cookies.get("locale") === "uz" ? <>dan </> : <>от</>}
              </InputLabel>
              <OutlinedInput
                id="from"
                label="от"
                onFocus={handlePriceFocus}
                value={priceFocused ? priceRange[0] : ""}
                endAdornment={
                  priceFocused ? (
                    <span>
                      {" "}
                      {cookies.get("locale") === "ru" ? <>сум</> : <>som</>}
                    </span>
                  ) : null
                }
              />
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel>
                {cookies.get("locale") === "uz" ? <>gacha </> : <>до</>}
              </InputLabel>
              <OutlinedInput
                label="до"
                onFocus={handlePriceFocus}
                value={priceFocused ? priceRange[1] : ""}
                endAdornment={
                  priceFocused ? (
                    <span>
                      {cookies.get("locale") === "ru" ? <>сум</> : <>som</>}
                    </span>
                  ) : null
                }
              />
            </FormControl>
          </div>

          <div className="filter-checkbox">
            <h4></h4>
            <div className="asd">{renderBrandBoxes()}</div>

            {renderFeatureBoxes(filters.features)}
          </div>
        </form>

        <BtnClearFilter />
      </aside>
    </>
  );
};

export default Filter;
