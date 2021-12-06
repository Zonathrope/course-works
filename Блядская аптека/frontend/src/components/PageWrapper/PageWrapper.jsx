import React, { useEffect } from 'react'
import localStorage from '../../lib/localStorage/localStorage'
import { useGetUser } from '../../lib/query/user'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShoppingBasket,
  faUserCircle,
  faSearch
} from '@fortawesome/free-solid-svg-icons'

import styles from './PageWrapper.module.css'

const PageWrapper = ({ children }) => {
  const {
    data: userData,
    isLoading,
    isError,
  } = useGetUser(localStorage.getJWT() || '1')
  useEffect(() => {
    if (isError) {
      localStorage.clear()
    }
  }, [userData])

  if (isLoading) {
    return <>Fetching...</>
  }
  return (
    <div>
      <div className={styles.header}>
        {userData ? (
          <div className={styles.headerIcons}>
            <div className={styles.icon}>
              <Link to="/">
                <FontAwesomeIcon icon={faSearch} />
              </Link>
            </div>
            <div className={styles.icon}>
              <Link to="/cart">
                <FontAwesomeIcon icon={faShoppingBasket} />
              </Link>
            </div>
            <div className={styles.icon}>
              <Link to="/cabinet">
                <FontAwesomeIcon icon={faUserCircle} />
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.headerIcons}>
          <div className={styles.icon}>
              <Link to="/">
                <FontAwesomeIcon icon={faSearch} />
              </Link>
            </div>
            <div className={styles.icon}>
              <Link to="/auth">
                <FontAwesomeIcon icon={faUserCircle} />
              </Link>
            </div>
            </div>
        )}
      </div>
      {children}
    </div>
  )
}

export default PageWrapper
