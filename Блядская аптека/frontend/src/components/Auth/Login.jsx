import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useLogin } from '../../lib/query/auth.js'
import classnames from 'classnames'
import styles from './Auth.module.css'
import localStorage from '../../lib/localStorage/localStorage.js'
import { useNavigate } from 'react-router'

const Login = ({setIsRegister}) => {
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate()
  const { mutate: login, data, isSuccces, isError, error, } = useLogin()
  const handleSubmit = (values) => {
    login(values)
  }

  useEffect(() => {
    if(data?.error){
      setLoginError(data.error)
      return
    }
    if(data) {
      localStorage.setJWT(data.data)
    }
    if(localStorage.getJWT()){
      navigate('/')
    }
  },[data, isSuccces, isError, error])


  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={handleSubmit}
      >
        <Form className={classnames({
              [styles.form]: true,
              [styles.loginForm]: true
            })}>
          <div className={styles.header}>LOGIN</div>
          {loginError}
          <ErrorMessage name="email" component="div" />
          <Field type='email' required={true} placeholder="Email" name="email" />
          <ErrorMessage name="password" component="div" />
          <Field type='password' required={true} placeholder="Password" name="password" />
          <button className={styles.mainButton} type="submit">Submit</button>
          <div onClick={() => setIsRegister(false)} className={styles.link}>Don't have a account?</div>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
