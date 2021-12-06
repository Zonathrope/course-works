import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import classnames from 'classnames'
import { useRegister } from '../../lib/query/auth.js'
import localStorage from '../../lib/localStorage/localStorage.js'

import styles from './Auth.module.css'

const Register = ({ setIsRegister }) => {
  const { mutate: register, data, isSuccess} = useRegister()
  const handleSubmit = (values) => {
    console.log(values);
    register({
      lname: values.lastName,
      fname: values.firstName,
      ...values
    })
  }

  useEffect(() => {
    if(data){
      localStorage.setJWT(data.token)
    }
  },[isSuccess, data])

  return (
    <>
      <div className={styles.container}>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          onSubmit={handleSubmit}
        >
          <Form
            className={classnames({
              [styles.form]: true,
            })}
          >
            <div className={styles.header}>REGISTER</div>
            <Field required={true} placeholder="First name" name="firstName" />
            <ErrorMessage name="firstName" component="div" />
            <Field required={true} placeholder="Last name" name="lastName" />
            <ErrorMessage name="lastName" component="div" />
            <Field required={true} placeholder="Email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field
              type="password"
              required={true}
              placeholder="Password"
              name="password"
            />
            <ErrorMessage name="password" component="div" />
            <Field
              type="password"
              required={true}
              placeholder="Password confirmation"
              name="confirmPassword"
            />
            <ErrorMessage name="confirmPassword" component="div" />
            <button className={styles.mainButton} type="submit">Submit</button>
            <div onClick={() => setIsRegister(true)} className={styles.link}>
              Already registered?
            </div>
          </Form>
        </Formik>
      </div>
    </>
  )
}

export default Register
