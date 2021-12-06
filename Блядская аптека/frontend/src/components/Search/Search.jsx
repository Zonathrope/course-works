import React, { useEffect, useState } from 'react'
import PageWrapper from '../PageWrapper/PageWrapper'
import {
  useAddMedicineToCart,
  useGetAllMedicinesByName,
  useGetDrugShopsByName
} from '../../lib/query/medicine.js'
import Medicine from './components/Medicine'

import styles from './Search.module.css'
import localStorage from '../../lib/localStorage/localStorage'
import Drugshop from './components/Drugshop'

const Search = () => {
  const [searchType, setSearchType] = useState('medicine')
  const [medicinesInput, setMedicinesInput] = useState('')
  const [drugshopInput, setDugshopInput] = useState('')
  const [drugsophs, setDrugshops] = useState([])
  const [medicines, setMedicines] = useState([])
  const {
    data: medicinesData,
    isLoading
  } = useGetAllMedicinesByName(medicinesInput)
  const {
    data: drugshopsData,
    isLoading: isDrugShopsLoading
  } = useGetDrugShopsByName(drugshopInput)
  const { mutate: addToCart } = useAddMedicineToCart()
  useEffect(() => {
    if(!isLoading){
      setMedicines(medicinesData)
    }
  }, [medicinesData, isLoading,])

  useEffect(() => {
    if(!isDrugShopsLoading){
      setDrugshops(drugshopsData)
    }
  }, [drugshopsData, isDrugShopsLoading])

  const handleMedicineInput = (e) => {
    setMedicinesInput(e.target.value)
  }

  const handleDrughopInput = (e) => {
    setDugshopInput(e.target.value)
  }
  const handleSwap = () => {
    setSearchType((prev) => {
      return prev === 'medicine' ? 'drugshop' : 'medicine'
    })
  }

  const handleAddToCart = (ID, amount) => {
    addToCart({
      jwtToken: localStorage.getJWT(),
      medicineID: ID,
      amount: amount
    })
  }

  return (
    <PageWrapper>
      <div className={styles.container}>
        <div className={styles.search}>
          {searchType === 'medicine' ? (
            <input
              className={styles.input}
              placeholder={'medicine'}
              onChange={handleMedicineInput}
            />
          ) : (
            <input
              className={styles.input}
              placeholder={'drugshop'}
              onChange={handleDrughopInput}
            />
          )}
          <button className={styles.button} onClick={handleSwap}>
            Swap search
          </button>
        </div>
        <div className={styles.list}>
          {
            searchType === 'medicine'
            ?
            medicines && medicines.map((el) => (
              <Medicine handleAddToCart={handleAddToCart} key={el.medicine_id} medicine={el}/>
            ))
             : drugsophs && drugsophs.map(el => (
              <Drugshop key={el.id} drugshop={el} />
             ))
          }
        </div>
      </div>
    </PageWrapper>
  )
}

export default Search
