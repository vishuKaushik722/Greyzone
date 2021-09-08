import {SWITCH_THEME, NEW_NOTIFICATION, MENU_TILES, SET_DARK_MODE, ADD_TO_CART, CHANGE_LOGIN, REMOVE_FROM_CART} from './actions';
import { SET_PRODUCT_LIST } from './actions';

const initialState = {
  productList: [],
  cartList: [],
  loggedIn: false
}

export const reducer = (state = {}, action) => {
  // initialState
  let newState = {};
  switch (action.type) {
    case SWITCH_THEME:
      newState = {
        ...state,
        theme: {
          // ...state,       //not required
          ...action.baseTheme,
        },
      };
      return newState;

    case NEW_NOTIFICATION:
      newState = {
        ...state,
        newNotification: {
          ...action.newNotification,
        },
      };
      return newState;

      case SET_DARK_MODE:
        return {
          ...state,
          darkMode: action.payload
        }
  
    default:
      return state;
  }
};

export const setProductListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_LIST: return {
      ...state,
      productList: action.payload
    }
    case ADD_TO_CART: return {
      ...state,
      cartList: [...state.cartList, ...action.payload]
    }
    case REMOVE_FROM_CART: return {
      ...state,
      cartList: []
    }
    case CHANGE_LOGIN: return {
      ...state,
      loggedIn: action.payload
    }
    default: return state
  }
}
