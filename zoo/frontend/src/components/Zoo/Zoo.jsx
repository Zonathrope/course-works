import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { useParams, Link } from 'react-router-dom'
import { useGetZoo } from '../../query/zoos'
import { Formik, Form, Field } from 'formik'
import { useMakeOrder } from '../../query/zoos'
import Image from '../Image/Image'

import styles from './Zoo.module.css'

function generateRandomToken(length) {
  let result = ''
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const Zoo = () => {
  const params = useParams()
  const { data, isLoading } = useGetZoo(params.id)
  const { mutate: makeOrder } = useMakeOrder()

  const handleMakeOrder = (values, { setSubmitting, resetForm }) => {
    console.log(+values.ticket_amount || 1);
    makeOrder({
      ...values,
      ticket_amount: +values.ticket_amount || 1,
      order_number: generateRandomToken(7),
    })
    resetForm({
      ticket_amount: null,
      name: '',
      email: '',
      phone: '',
      zoo_id: params.id
    })
    setSubmitting(false)
  }

  if (isLoading) {
    return <>loading...</>
  }
  return (
    <Container>
      <Row>
        <Col xl={12}>
          <Link to={'/'}>
            <div className={styles.getBack}>Назад до списку</div>
          </Link>
          <div className={styles.header}>
            <div className={styles.leftBlock}>
              <div>{data.name}</div>
              {data.location_id.country} {data.location_id.city}{' '}
              {data.location_id.street}
            </div>
            <div className={styles.image}>
              <Image className={styles.image} url={data.img}></Image>
            </div>
          </div>
          {data?.zones &&
            data?.zones
              ?.filter((zone) => !!zone.zone)
              .map((zone) => (
                <div className={styles.zone}>
                  <div>
                    {zone.zone.world_part}, {zone.zone.type}
                  </div>
                  <Row className={styles.animals}>
                    {zone?.animals &&
                      zone?.animals
                        ?.filter((e) => !!e)
                        .map((el) => (
                          <Col className={styles.animal} xl={2.9}>
                            <div>Ім'я: {el?.name}</div>
                            <div>Вид: {el?.specie}</div>
                            <div>Років: {el?.year_old}</div>
                          </Col>
                        ))}
                  </Row>
                </div>
              ))}
          <div className={styles.bron}>
            <div className={styles.headerBook}>Забронювати білет</div>
            {
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  phone: '',
                  zoo_id: params.id
                }}
                onSubmit={handleMakeOrder}
              >
                <Form className={styles.form}>
                  <Field
                    className={styles.field}
                    required={true}
                    name={'name'}
                    placeholder={"Ім'я"}
                  />
                  <Field
                    className={styles.field}
                    required={true}
                    type={'email'}
                    name={'email'}
                    placeholder={'Пошта'}
                  />
                  <Field
                    className={styles.field}
                    name={'phone'}
                    placeholder={'Телефон'}
                  />
                  <Field
                    className={styles.field}
                    type='number'
                    name={'ticket_amount'}
                    placeholder={'Кількість квитків (1 за замовчюванням)'}
                  />
                  <button className={styles.btn} type="submit">
                    Забронювати
                  </button>
                </Form>
              </Formik>
            }
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Zoo
