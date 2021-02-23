// import _ from 'lodash'

export const lsSetCart = (data: string) => localStorage.setItem('cart', data)

export const lsGetCart = () => localStorage.getItem('cart')
