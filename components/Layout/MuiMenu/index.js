import React, { useState } from "react";
import {

  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Drawer,
  Typography,
} from "@material-ui/core";

import Link from "next/link";
import Select from "react-select";

import { useTypeSelector } from "../../../store/hooks/useSelector";
import { useTypeDispatch } from "../../../store/hooks/useDispatch";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import useTranslation from "next-translate/useTranslation";

import {
  BurgerIcon,
  UserIcon,
  HeartIcon,
  CompareIcon,
  DropDwnIcon,
  ExitIconly
} from "../../svg";

import { flags } from "../../../utils/flags";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  menuSliderContainer: {
    width: 350,
    height: "100%",
  },
  listItem: {},
  accordion: {
    border: "none",
    boxShadow: "none",
    width: "100%",
  },
  listItem: {
    padding: 0,
  },
  accordionSummary: {
    minHeight: 35,
    transition: "all 250ms ease",
    "&:hover, &:focus": {
      // backgroundColor: '#F9CC00',
     
    },
  },
  accordionDetail: {
    padding: "16px",
    flexDirection: "column",
    gap: "15px",
    fontWeight: "600",
    backgroundColor: "#f5f5f5",
  },
  buttonA:{
    padding: "0px"
  },
  typography: {},
  heading: {
    padding: "0 16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "16px 0 30px 0",
  },
  itemText: {
    fontSize: "0.95rem",
    paddingLeft: 15,
    margin: "10px 0",
    fontWeight: "bold",
  },
}));

const customStyles = {
  control: (base) => ({
    ...base,
    height: 35,
    minHeight: 35,
    border: 0,
    boxShadow: "none",
  }),
};


export default function Mui() {
  const cookies = new Cookies();
  const { t } = useTranslation();

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { categories } = useTypeSelector((state) => state.category);
  const { favouriteProducts } = useTypeSelector((state) => state.favourite);

  const toggleSlider = () => {
    setOpen(!open);
  };

  const { asPath, locales, itemlocale, push } = useRouter();
  const LocaleChange = ({ value }) => {
    cookies.set("locale", value);
    // cookies.set('locale', value, { expires: new Date(Date.now()+5)});
    push(asPath, undefined, { locale: value });
  };
  const sideList = () => (
    <Box className={classes.menuSliderContainer} component="div">
      <Divider />
      <List className="pb-0">
        <h4 className={classes.heading}>
          <div className="headerBolie">
            <Link href="/profile">
              <a onClick={toggleSlider}>
                <UserIcon />
              </a>
            </Link>
            <Link href="/favourites">
              <a onClick={toggleSlider}>
                <div className="authPart">
                  <span className="countCart">
                    {favouriteProducts.length ? favouriteProducts.length : 0}
                  </span>
                  <HeartIcon />
                </div>
              </a>
            </Link>
            <Link href="/compare">
              <a onClick={toggleSlider}>
                <div className="authPartPart">
                  <CompareIcon />
                </div>
              </a>
            </Link>
            <div className="swithcer">
              <Select
                styles={customStyles}
                value={itemlocale}
                placeholder={
                  cookies.get("locale") == "uz" ? flags.uz : flags.ru
                }
                onChange={LocaleChange}
                components={{ IndicatorSeparator: null }}
                options={locales.map((item) => ({
                  value: item,
                  label: flags[item],
                }))}
              />
            </div>
            <div onClick={toggleSlider}>
            <ExitIconly/>
            </div>
            

          </div>

          <div onClick={() => onMenuOpen(anchor)}>{/* <GrClose /> */}</div>
        </h4>
        {categories.map((category, i) => (
          <ListItem
            className={classes.listItem}
            // button -> when true it will add background
            key={i}
          >
            {category.childs?.length ? (
              <Accordion className={classes.accordion}>
                <AccordionSummary
                  className={classes.accordionSummary}
                  expandIcon={<DropDwnIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p className="font">{category.name}</p>
                </AccordionSummary>
                <AccordionDetails  className={classes.accordionDetail}>
                  <div onClick={toggleSlider}>
                    <Link href={`/catalog/${category.slug}`}>
                      <a>Показать все</a>
                    </Link>
                  </div>
                  {category.childs.map((child, idx) => (
                    <div style={{padding: "10px 0"}} onClick={toggleSlider} key={`${i}-${idx}`}>
                      <Link href={`/catalog/${child.slug}`}>
                        <a>{child.name}</a>
                      </Link>
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            ) : (
              <div key={i}>
                <Link href={`/catalog/${category.slug}`}>
                  <a>
                    <ListItemText primary={category.name} />
                  </a>
                </Link>
              </div>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    Typography,
    (
      <>
        {/* <CssBaseline /> */}

        <Box component="nav">
          <IconButton className={classes.buttonA} onClick={toggleSlider}>
            {/* <Menu /> */}
            <BurgerIcon />
          </IconButton>

          <Drawer open={open} onClose={toggleSlider}>
            {sideList()}
          </Drawer>
        </Box>
      </>
    )
  );
}
