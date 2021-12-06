import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

import styles from './Auth.module.css'

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true)

  return (
    <div className={styles.mainDiv}>
      <div className={styles.auth}>
        {isRegister ? (
          <Login setIsRegister={setIsRegister} />
        ) : (
          <Register setIsRegister={setIsRegister} />
        )}
      </div>
    </div>
  )
}

export default Auth
