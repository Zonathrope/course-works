import React, { useEffect } from 'react'
import PageWrapper from '../PageWrapper/PageWrapper'
import localStorage from '../../lib/localStorage/localStorage'
import { useGetUser } from '../../lib/query/user'
import { useUpdateUser } from '../../lib/query/user'
import {Formik, Form, Field} from 'formik'
import { useNavigate } from 'react-router-dom'

import styles from './Cabinet.module.css'

const Cabinet = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useGetUser(localStorage.getJWT())
  const { mutate } = useUpdateUser()

  const handleSubmit = (values) => {
    const id = data.id
    mutate({
      ...values,
      id}
    )
  }
  useEffect(() => {
    if(!localStorage.getJWT()){
      navigate('/')
    }
  },[])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

 return (<PageWrapper>
   {!isLoading ? (<Formik
    initialValues={{
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      phoneNumber: data.phoneNumber
    }}
    onSubmit={handleSubmit}
   >
     <Form className={styles.form}>
      <Field className={styles.input} name='fname'></Field>
      <Field className={styles.input} name='lname'></Field>
      <Field className={styles.input} name='email'></Field>
      <Field className={styles.input} name='phoneNumber'></Field>
      <button className={styles.btn} type='submit'>slave</button>
      <button className={styles.logout} onClick={handleLogout} type='button'>logout</button>
     </Form>
   </Formik>) : <>Fetching...</>}
 </PageWrapper>)
}

export default Cabinet