export const AUTH_REQUEST = "AUTH_REQUEST"
export const AUTH_FAIL = "AUTH_FAIL"
export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_CLEAR = "AUTH_CLEAR"

export interface AuthState {
  isLoading: boolean
  isAuthenticated: boolean
  data: { [key: string]: string }
  error: null | string
}

interface AuthRequestAction {
  type: typeof AUTH_REQUEST
  payload: AuthState
}
interface AuthFailAction {
  type: typeof AUTH_FAIL
  payload: AuthState
}
interface AuthSuccessAction {
  type: typeof AUTH_SUCCESS
  payload: AuthState
}
interface AuthClearAction {
  type: typeof AUTH_CLEAR
  payload: AuthState
}

export type AuthActionTypes =
  | AuthRequestAction
  | AuthFailAction
  | AuthSuccessAction
  | AuthClearAction
