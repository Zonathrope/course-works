import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useLogin } from '../../lib/query/auth.js'
import classnames from 'classnames'
import styles from './Auth.module.css'
import localStorage from '../../lib/localStorage/localStorage.js'

const Login = ({setIsRegister}) => {
  const [loginError, setLoginError] = useState('')
  const { mutate: login, data, isSuccces, isError, error, } = useLogin()
  const handleSubmit = (values) => {
    login(values)
  }

  useEffect(() => {
    console.log(data?.error);
    if(data?.error){
      setLoginError(data.error)
      return
    }
    if(data) {
      console.log(data.data);
      localStorage.setJWT(data.data)
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
          <Field type='password' required={true} placeholder="Password confirmation" name="password" />
          <button className={styles.mainButton} type="submit">Submit</button>
          <div onClick={() => setIsRegister(false)} className={styles.link}>Don't have a account?</div>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
