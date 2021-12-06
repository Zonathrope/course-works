import React from 'react'

import styles from './Cart.module.css'

const MedicineInCart = ({ medicine, handleDeleteFromCart }) => {
  return (
  <div className={styles.medicine}>
    <div className={styles.info}>
      <div className={styles.name}>{medicine.name}</div>
      <div className={styles.amount}>amount: {medicine.user_amount}</div>
      <div className={styles.cost}>cost: {medicine.cost} for one, total: {+medicine.cost * +medicine.user_amount}</div>
    </div>
    <div className={styles.options}>
      <button onClick={() => handleDeleteFromCart(medicine.order_id)} className={styles.deleteBtn}>delete</button>
    </div>
  </div>)
}

export default MedicineInCart