import React, { useState } from 'react'
import localStorage from '../../../lib/localStorage/localStorage'

import styles from '../Search.module.css'
const regexp =
  /^(?!(?:^[-+]?[0.]+(?:[Ee]|$)))(?!(?:^-))(?:(?:[+-]?)(?=[0123456789.])(?:(?:(?:[0123456789]+)(?:(?:[.])(?:[0123456789]*))?|(?:(?:[.])(?:[0123456789]+))))(?:(?:[Ee])(?:(?:[+-]?)(?:[0123456789]+))|))$/

const Medicine = ({ handleAddToCart, medicine }) => {
  const [input, setInput] = useState('')

  const handleChangeAmount = (e) => {
    const value = e.target.value
    if (
      (value.match(regexp) && +value <= medicine.amount) ||
      e.target.value === ''
    ) {
      setInput(e.target.value)
    }
  }

  return (
    <div key={medicine.medicine_id} className={styles.medicine}>
      <div className={styles.medicineInfo}>
        <div className={styles.medicine_name}>
          name: {medicine.medicine_name}
        </div>
        <div className={styles.cost}>cost: {medicine.cost}</div>
        <div className={styles.amount}>amount in stock: {medicine.amount}</div>
      </div>
      {localStorage.getJWT() && (
        <div className={styles.action}>
          <input
            className={styles.choosenAmount}
            disabled={medicine.amount === 0}
            type="text"
            value={input}
            onChange={handleChangeAmount}
          />
          <button
            className={styles.addBtn}
            disabled={medicine.amount === 0}
            onClick={() => {
              handleAddToCart(medicine.medicine_id, input)
              setInput('')
            }}
          >
            add
          </button>
        </div>
      )}
    </div>
  )
}

export default Medicine
