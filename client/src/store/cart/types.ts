export const CART_ADD = "CART_ADD"
export const CART_REMOVE = "CART_REMOVE"
export const CART_CLEAR = "CART_CLEAR"

interface cartData {
  [key: string]: string
}

export interface CartState {
  data: cartData[]
}

interface CartAddAction {
  type: typeof CART_ADD
  payload: CartState
}

interface CartRemoveAction {
  type: typeof CART_REMOVE
  payload: CartState
}

interface CartClearAction {
  type: typeof CART_CLEAR
  payload: CartState
}

export type CartActionTypes = CartAddAction | CartRemoveAction | CartClearAction
