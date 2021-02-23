import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import _ from 'lodash'

import { RootState } from '..'
import { lsGetCart, lsSetCart } from '../../utils/lsHelper'

import { CartActionTypes, CART_ADD } from './types'

export const cartAddAction = (product: {
  [key: string]: string
}): ThunkAction<void, RootState, {}, CartActionTypes> => (
  dispatch: ThunkDispatch<RootState, {}, CartActionTypes>,
  getState: () => RootState
) => {
  const { cart } = getState()
  //create data for cart reducer
  const data = [...cart.data, { ...product }]
  //dispatch cart reducer
  dispatch({ type: CART_ADD, payload: { data } })
  //set local storage
  lsSetCart(JSON.stringify(data))
}

export const cartRemoveAction = (product: {
  [key: string]: string
}): ThunkAction<void, RootState, {}, CartActionTypes> => (
  dispatch: ThunkDispatch<RootState, {}, CartActionTypes>,
  getState: () => RootState
) => {
  //get cart state
  const { cart } = getState()

  //clear cart state removed from cart
  const filteredCart = _.filter(
    cart.data,
    (item) => item.product_id !== product.product_id
  )

  //dispatch cart reducer
  dispatch({ type: CART_ADD, payload: { data: filteredCart } })
  //set local storage
  lsSetCart(JSON.stringify(filteredCart))
}

export const initCartSetup = (): ThunkAction<
  void,
  RootState,
  {},
  CartActionTypes
> => (dispatch: ThunkDispatch<RootState, {}, CartActionTypes>) => {
  //get cart items from local storage
  const lsCartItems = lsGetCart()
  //if product doesn't exist in cart return action
  if (!lsCartItems) return
  //parse all data from local storage
  const data = JSON.parse(lsCartItems)
  //dispatch cart add action if product exist in local storage
  dispatch({ type: CART_ADD, payload: { data } })
}
