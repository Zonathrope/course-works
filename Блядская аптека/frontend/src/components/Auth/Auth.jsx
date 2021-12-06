import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

import styles from './Auth.module.css'
import PageWrapper from '../PageWrapper/PageWrapper'

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true)

  return (
    <PageWrapper>
      <div className={styles.mainDiv}>
        <div className={styles.auth}>
          {isRegister ? (
            <Login setIsRegister={setIsRegister} />
          ) : (
            <Register setIsRegister={setIsRegister} />
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

export default Auth
