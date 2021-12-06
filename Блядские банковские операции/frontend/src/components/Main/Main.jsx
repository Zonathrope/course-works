import React, { useState } from 'react'
import localStorage from '../../lib/localStorage/localStorage'
import {
  useGetUserCards,
  useCreateNewCard,
  useDeleteCard
} from '../../lib/query/user'
import CardModal from '../CardModal/CardModal'

import styles from './Main.module.css'

const Main = ({ user, refetch }) => {
  const { data, isLoading, isError } = useGetUserCards(localStorage.getJWT())
  const { mutate: createCard } = useCreateNewCard()
  const { mutate: deleteCard } = useDeleteCard()
  const [choosenCard, setChoosenCard] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateNewCard = () => {
    const jwt = localStorage.getJWT()
    createCard({
      jwt
    })
  }
  const handleDeleteCard = (id) => {
    deleteCard({
      id
    })
  }

  const handleLogOut = () => {
    localStorage.clear()
    refetch()
  }

  const handleOpenOptions = (el) => {
    setChoosenCard(el)
    setIsModalOpen(true)
  }

  if (isLoading) {
    return <>Fetching...</>
  }
  if (isError) {
    return <>Someting went wrong, try to reload the page</>
  }
  return (
    <>
    <div className={styles.userInfo}>
      <div>{user.fname} {user.lname}</div>
      <div>{user.email}</div>
      <button onClick={handleLogOut} className={styles.logoutBTN}>log out</button>
    </div>
    <CardModal active={isModalOpen} setActive={setIsModalOpen} card={choosenCard}/>
      <div className={styles.mainWindow}>
      <div className={styles.cards}>
        {data.data.map((el) => (
          <div key={el._id} className={styles.card}>
            <div className={styles.info}>
              <div>Number: {el.number}</div>
              <div>cvv: {el.cvv}</div>
              <div>expires: {el.expires.slice(5, 7)}/{el.expires.slice(2, 4)}</div>
              <div>money: {el.moneyAmount}</div>
            </div>
            <div className={styles.options}>
              <button onClick={() => handleOpenOptions(el)} className={styles.optionBtn}>options</button>
              <button
                onClick={() => handleDeleteCard(el._id)}
                className={styles.optionBtn}
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.mainButton} onClick={handleCreateNewCard}>
        Add new card
      </button>
    </div></>
  )
}

export default Main
