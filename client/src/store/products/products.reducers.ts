import { Reducer } from 'redux'
import {
  PRODUCTS_CLEAR,
  PRODUCTS_SUCCESS,
  PRODUCTS_FAIL,
  ProductsState,
  PRODUCTS_REQUEST,
  ProductsActionTypes,
} from './types'

const initialState: ProductsState = {
  isLoading: false,
  data: [],
  error: null,
}
const productsReducers: Reducer<ProductsState, ProductsActionTypes> = (
  state = initialState,
  action: ProductsActionTypes
) => {
  switch (action.type) {
    case PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        data: [...state.data, ...action.payload.data],
        error: action.payload.error,
      }
    case PRODUCTS_FAIL:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        data: [...state.data, ...action.payload.data],
        error: action.payload.error,
      }
    case PRODUCTS_CLEAR:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        data: [...action.payload.data],
        error: action.payload.error,
      }
    case PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        data: [...action.payload.data],
        error: action.payload.error,
      }
    default:
      return state
  }
}
export default productsReducers
