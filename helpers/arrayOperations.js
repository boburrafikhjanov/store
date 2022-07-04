export const isElementInArray = (arr, id) => {
  let isInArray = arr.findIndex((el) => el.id === id || el.item_shop_id === id);
  return isInArray > -1;
};

export const stringToArrayParser = (query) => {
  if (query) {
    let str = query.toString();
    if (str && str.length) {
      if (str.includes(",")) return str.split(",");
      else return [str];
    } else return [];
  } else return [];
};

export const checkSelectedFeatureValue = (values, feature_value_ids) => {
  return values.some((item) => feature_value_ids.indexOf(`${item.id}`) >= 0);
};

export const toggleArrayElement = (arr, value) => {
  if (arr.includes(value)) return arr.filter((i) => i != value);
  else return [...arr, value];
};

export const getAsString = (value) => {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
};
