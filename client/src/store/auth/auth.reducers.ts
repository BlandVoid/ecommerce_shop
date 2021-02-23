import { Reducer } from "redux"
import {
  AUTH_CLEAR,
  AUTH_SUCCESS,
  AuthState,
  AUTH_REQUEST,
  AUTH_FAIL,
  AuthActionTypes,
} from "./types"

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  data: {},
  error: null,
}

const authReducers: Reducer<AuthState, AuthActionTypes> = (
  state = initialState,
  action: AuthActionTypes
) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        isAuthenticated: action.payload.isAuthenticated,
        data: { ...state.data, ...action.payload.data },
        error: action.payload.error,
      }
    case AUTH_FAIL:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        isAuthenticated: action.payload.isAuthenticated,
        data: { ...state.data, ...action.payload.data },
        error: action.payload.error,
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        isAuthenticated: action.payload.isAuthenticated,
        data: { ...state.data, ...action.payload.data },
        error: action.payload.error,
      }
    case AUTH_CLEAR:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        isAuthenticated: action.payload.isAuthenticated,
        data: action.payload.data,
        error: action.payload.error,
      }

    default:
      return state
  }
}
export default authReducers
