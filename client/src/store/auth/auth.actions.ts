import axios from "axios"
import _ from "lodash"
import { push } from "connected-react-router"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { RootState } from ".."

import { showToast } from "../../utils/showToast"
import {
  AUTH_REQUEST,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AuthActionTypes,
  AUTH_CLEAR,
} from "./types"

export const registerAction = (
  username: string,
  password: string,
  email: string,
  confirm_password: string,
  refParam: string
): ThunkAction<Promise<void>, RootState, {}, AuthActionTypes> => async (
  dispatch: ThunkDispatch<RootState, {}, AuthActionTypes>
) => {
  try {
    dispatch({
      type: AUTH_REQUEST,
      payload: {
        isLoading: true,
        isAuthenticated: false,
        data: {},
        error: null,
      },
    })
    //
    const { data } = await axios.post(`/api/v1/auth/register`, {
      username,
      password,
      email,
      confirm_password,
    })

    dispatch({
      type: AUTH_SUCCESS,
      payload: { isLoading: false, isAuthenticated: true, data, error: null },
    })
    // push user after successful registration
    dispatch<any>(push(refParam))
    //
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
      payload: {
        isLoading: false,
        isAuthenticated: false,
        data: {},
        error: error.response.data.message,
      },
    })
    showToast(error.response.data.message)
  }
}

export const loginAction = (
  username: string,
  password: string,
  refParam: string
): ThunkAction<Promise<void>, RootState, {}, AuthActionTypes> => async (
  dispatch: ThunkDispatch<RootState, {}, AuthActionTypes>
) => {
  try {
    dispatch({
      type: AUTH_REQUEST,
      payload: {
        isLoading: true,
        isAuthenticated: false,
        data: {},
        error: null,
      },
    })
    //
    const { data } = await axios.post(`/api/v1/auth/login`, {
      username,
      password,
    })

    dispatch({
      type: AUTH_SUCCESS,
      payload: { isLoading: false, isAuthenticated: true, data, error: null },
    })
    // redirect user to homepage after successful login
    dispatch<any>(push(refParam))
    //
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
      payload: {
        isLoading: false,
        isAuthenticated: false,
        data: {},
        error: error.response.data.message,
      },
    })
    showToast(error.response.data.message)
  }
}

export const initialAction = (): ThunkAction<
  Promise<void>,
  RootState,
  {},
  AuthActionTypes
> => async (dispatch: ThunkDispatch<RootState, {}, AuthActionTypes>) => {
  try {
    dispatch({
      type: AUTH_REQUEST,
      payload: {
        isLoading: true,
        isAuthenticated: false,
        data: {},
        error: null,
      },
    })
    //
    const { data } = await axios.get(`/api/v1/auth`)

    //if user is not authenticate dispatch auth success with user is not authenticated
    if (_.isEmpty(data)) {
      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          isLoading: false,
          isAuthenticated: false,
          data: {},
          error: null,
        },
      })
      //return action
      return
    }

    //if user is authenticate dispatch auth success with user is authenticated
    dispatch({
      type: AUTH_SUCCESS,
      payload: { isLoading: false, isAuthenticated: true, data, error: null },
    })
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
      payload: {
        isLoading: false,
        isAuthenticated: false,
        data: {},
        error: error.response.data.message,
      },
    })
  }
}

export const authUpdateAction = (
  {
    first_name,
    last_name,
    email,
  }: {
    [key: string]: string
  },
  onClose: () => void
): ThunkAction<Promise<void>, RootState, {}, AuthActionTypes> => async (
  dispatch: ThunkDispatch<RootState, {}, AuthActionTypes>
) => {
  try {
    dispatch({
      type: AUTH_REQUEST,
      payload: {
        isLoading: true,
        isAuthenticated: true,
        data: {},
        error: null,
      },
    })
    //
    const { data } = await axios.put(`/api/v1/auth`, {
      first_name,
      last_name,
      email,
    })
    //dispatch user update success
    dispatch({
      type: AUTH_SUCCESS,
      payload: { isLoading: false, isAuthenticated: true, data, error: null },
    })
    //close modal
    onClose()
    //show success msg
    showToast("Update successful", "success")
    //
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
      payload: {
        isLoading: false,
        isAuthenticated: true,
        data: {},
        error: error.response.data.message,
      },
    })
    showToast(error.response.data.message)
  }
}

export const logoutAction = (): ThunkAction<
  Promise<void>,
  RootState,
  {},
  AuthActionTypes
> => async (dispatch: ThunkDispatch<RootState, {}, AuthActionTypes>) => {
  //send logout request to api --> this will clear the cookie
  await axios.delete("/api/v1/auth/logout")
  //dispatch auth clear
  dispatch({
    type: AUTH_CLEAR,
    payload: {
      isLoading: false,
      isAuthenticated: false,
      data: {},
      error: null,
    },
  })
  //
  // redirect user to homepage after successful logout
  dispatch<any>(push("/"))
}
