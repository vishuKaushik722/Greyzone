// define type
export const SWITCH_THEME = 'SWITCH_THEME';
export const NEW_NOTIFICATION = 'NEW_NOTIFICATION';
export const MENU_TILES = 'MENU_TILES';
export const SET_DARK_MODE = 'SET_DARK_MODE';
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CHANGE_LOGIN = 'CHANGE_LOGIN'
//define actions

export const switchTheme = BaseTheme => ({
  type: SWITCH_THEME,
  baseTheme: BaseTheme,
});

export const newNotification = newNotification => ({
  type: NEW_NOTIFICATION,
  newNotification: newNotification,
});

export const changeMenuTiles = count => ({
  type: MENU_TILES,
  payload: count,
});
export const setDarkMode = (darkMode) => {
  return {
    type: SET_DARK_MODE,
    payload: darkMode,
  };
};

//product list actions

export const setProductsListAction = (content) => {
  return {
    type: SET_PRODUCT_LIST,
    payload: content
  }
}

export const addToCart = (content) => {
  return {
    type: ADD_TO_CART,
    payload: content
  }
}

export const removeFromCart = () => {
  return {
    type: REMOVE_FROM_CART
  }
}

export const changeLoginStatus = (bool) => {
  return {
    type: CHANGE_LOGIN,
    payload: bool
  }
}