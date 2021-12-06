import React, { useState } from 'react'
import Modal from '../Modal/Modal'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { Formik, Form, Field } from 'formik'

import styles from './CardModal.module.css'
import { useCreateOperation, useSendMoney } from '../../lib/query/operation'
import localStorage from '../../lib/localStorage/localStorage'

const { Handle } = Slider

const CardModal = ({ active, setActive, card }) => {
  const { mutate: createOperation } = useCreateOperation()
  const {mutate: sendMoney} = useSendMoney()
  const [monthValueDeposit, setMonthValueDeposit] = useState(0)
  const [monthValueCredit, setMonthValueCredit] = useState(0)

  const handleCreateOperation = (values) => {
    createOperation({
      cardID: card._id,
      type: values.type,
      moneyAmount: values.amount,
      monthes: values.type === 'deposit' ? monthValueDeposit : monthValueCredit
    })
    setActive(false)
  }

  const handleCredit = (props) => {
    const { value, dragging, index, ...restProps } = props
    setMonthValueCredit(value)
    return <Handle value={value} {...restProps} />
  }

  const handleDeposit = (props) => {
    const { value, dragging, index, ...restProps } = props
    setMonthValueDeposit(value)
    return <Handle value={value} {...restProps} />
  }

  const handleSendMoney = (values, {setSubmitting, resetForm}) => {
    sendMoney({
      to: values.number,
      amount: values.amount,
      from: card.number,
      jwtToken: localStorage.getJWT()
    })
    resetForm({
      number: '',
      amount: ''
    })
    setSubmitting(false)
    setActive(false)
  }
  return (
    <Modal active={active} setActive={setActive}>
      <div className={styles.modal}>
        {card.credit ? (
          <div className={styles.card}>
            <p>Credit:</p>
            <div>Taken from bank:{card.credit.amount}</div>
            <div>Month payment: {(+card.credit.month_payment).toFixed(0)}</div>
            <div>
              Expiration date: {card.credit.expiration_date.slice(0, 10)}
            </div>
          </div>
        ) : (
          <div className={styles.card}>
            <p className={styles.optionName}>credit</p>
            <Formik
              initialValues={{
                type: 'credit',
                amount: ''
              }}
              onSubmit={handleCreateOperation}
            >
              <Form>
                <Field
                  className={styles.input}
                  type="input"
                  required={true}
                  placeholder="Amount"
                  name="amount"
                />
                <div className={styles.slider}>
                  <Slider
                    min={1}
                    max={12}
                    defaultValue={1}
                    handle={handleCredit}
                  />
                  {monthValueCredit}{' '}
                  {monthValueCredit > 1 ? 'monthes' : 'month'}
                </div>
                <button className={styles.mainButton} type="submit">
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
        )}
        {card.deposit ? (
          <div className={styles.card}>
            <p>Deposit:</p>
            <div>Placed in bank:{card.deposit.amount}</div>
            <div>Month payment: {(+card.deposit.month_payment).toFixed(0)}</div>
            <div>
              Expiration date: {card.deposit.expiration_date.slice(0, 10)}
            </div>
          </div>
        ) : (
          <div className={styles.card}>
            <p className={styles.optionName}>deposit</p>
            <Formik
              initialValues={{
                type: 'deposit',
                amount: ''
              }}
              onSubmit={handleCreateOperation}
            >
              <Form>
                <Field
                  className={styles.input}
                  type="input"
                  required={true}
                  placeholder="Amount"
                  name="amount"
                />
                <div className={styles.slider}>
                  <Slider
                    min={1}
                    max={12}
                    defaultValue={1}
                    handle={handleDeposit}
                  />
                  {monthValueDeposit}{' '}
                  {monthValueDeposit > 1 ? 'monthes' : 'month'}
                </div>
                <button className={styles.mainButton} type="submit">
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
        )}
        <div className={styles.card}>
          <Formik
            initialValues={{
              number: '',
              amount: ''
            }}
            onSubmit={handleSendMoney}
          >
            <Form>
              <Field
                className={styles.input}
                type="input"
                required={true}
                placeholder="Card number"
                name="number"
              />
              <Field
                className={styles.input}
                type="input"
                required={true}
                placeholder="Amount"
                name="amount"
              />
              <button className={styles.mainButton} type="submit">
                Send money
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </Modal>
  )
}

export default CardModal
