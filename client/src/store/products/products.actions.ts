import axios from 'axios'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { RootState } from '..'

import { showToast } from '../../utils/showToast'
import {
  ProductsActionTypes,
  PRODUCTS_FAIL,
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
} from './types'

export const productsAction = (): ThunkAction<
  Promise<void>,
  RootState,
  {},
  ProductsActionTypes
> => async (dispatch: ThunkDispatch<RootState, {}, ProductsActionTypes>) => {
  try {
    dispatch({
      type: PRODUCTS_REQUEST,
      payload: { isLoading: true, data: [], error: null },
    })
    //
    const { data } = await axios.get(`/api/v1/product`)

    dispatch({
      type: PRODUCTS_SUCCESS,
      payload: { isLoading: false, data, error: null },
    })
    //
  } catch (error) {
    dispatch({
      type: PRODUCTS_FAIL,
      payload: { isLoading: false, data: [], error: error.response.data },
    })
    showToast(error.response.data.message)
  }
}
