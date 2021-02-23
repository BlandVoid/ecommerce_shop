import { Reducer } from 'redux'
import {
  CART_ADD,
  CartState,
  CART_CLEAR,
  CART_REMOVE,
  CartActionTypes,
} from './types'

const initialState: CartState = {
  data: [],
}

const cartReducers: Reducer<CartState, CartActionTypes> = (
  state = initialState,
  action: CartActionTypes
) => {
  switch (action.type) {
    case CART_ADD:
      return { ...state, data: [...action.payload.data] }
    case CART_REMOVE:
      return { ...state, data: [...action.payload.data] }
    case CART_CLEAR:
      return { ...state, data: [...action.payload.data] }
    default:
      return state
  }
}
export default cartReducers
