export const PRODUCTS_REQUEST = 'PRODUCT_REQUEST'
export const PRODUCTS_FAIL = 'PRODUCT_FAIL'
export const PRODUCTS_CLEAR = 'PRODUCT_CLEAR'
export const PRODUCTS_SUCCESS = 'PRODUCT_SUCCESS'

export interface ProductsState {
  isLoading: boolean
  data: []
  error: null | string
}

interface ProductsRequestAction {
  type: typeof PRODUCTS_REQUEST
  payload: ProductsState
}
interface ProductsFailAction {
  type: typeof PRODUCTS_FAIL
  payload: ProductsState
}
interface ProductsClearAction {
  type: typeof PRODUCTS_CLEAR
  payload: ProductsState
}
interface ProductsSuccessAction {
  type: typeof PRODUCTS_SUCCESS
  payload: ProductsState
}

export type ProductsActionTypes =
  | ProductsRequestAction
  | ProductsFailAction
  | ProductsClearAction
  | ProductsSuccessAction
