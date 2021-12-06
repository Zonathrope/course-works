import React, { useEffect } from 'react'
import PageWrapper from '../PageWrapper/PageWrapper'
import MedicineInCart from './MedicineInCart'
import { useGetUserCart, useDeleteItemFromCart, useClearCart } from '../../lib/query/medicine'
import localStorage from '../../lib/localStorage/localStorage'
import { useNavigate } from 'react-router-dom'

import styles from './Cart.module.css'

const Cart = () => {
  const { data, isLoading } = useGetUserCart(localStorage.getJWT())
  const navigate = useNavigate()
  const {mutate: deleteFromCart} = useDeleteItemFromCart()
  const {mutate: makeOrder} = useClearCart()
  const handleDeleteFromCart = (id) => {
    deleteFromCart(id)
  }
  const handlemakeOrder = () => {
    makeOrder({jwt: localStorage.getJWT()})
  }
  useEffect(() => {
    if(!localStorage.getJWT()){
      navigate('/')
    }
  },[])
  return (
    <PageWrapper>
      {data?.length === 0 && 'Your Cart is empty'}
      {!isLoading &&
        data.map((el) => (
          <MedicineInCart
            handleDeleteFromCart={handleDeleteFromCart}
            medicine={el}
          />
        ))}
        {data?.length !== 0 && <div className={styles.options}>
          <button className={styles.makeOrderBtn} onClick={handlemakeOrder}>
            make order
          </button>
        </div>}
    </PageWrapper>
  )
}

export default Cart
