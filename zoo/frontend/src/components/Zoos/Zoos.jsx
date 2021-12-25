import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-grid-system'
import { useGetAllZoos } from '../../query/zoos'
import Image from '../Image/Image'

import styles from './Zoos.module.css'

const Zoos = () => {
  const { data, isLoading } = useGetAllZoos()

  if (isLoading) {
    return <>loading...</>
  }
  return (
    <div className={styles.body}>
      <Row className={styles.container}>
        {data
          .sort((zoo1, zoo2) => zoo1.rating < zoo2.rating)
          .map((zoo) => (
            <Col key={zoo._id}  xl={3}>
            <Link to={`zoo/${zoo._id}`} >
              <div className={styles.card}>
                <div className={styles.imageBlock}>
                  <Image url={zoo.img} alt="zooimg" />
                </div>
                <div>{zoo.name}</div>
                <div className={styles.info}>
                  {zoo.location_id.country} {zoo.location_id.city}{' '}
                  {zoo.location_id.street}
                </div>
              </div>
            </Link>
            </Col>
          ))}
      </Row>
    </div>
  )
}

export default Zoos
