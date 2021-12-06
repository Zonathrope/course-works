import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../Search.module.css'

const Drugshop = ({ drugshop }) => {
 return (
  <div className={styles.medicine}>
    <div className={styles.drugshopInfo}>
      <div className={styles.name}>name: {drugshop.name}</div>
      <div className={styles.Address}>{drugshop.city} {drugshop.street} {drugshop.building}</div>
    </div>
    <div className={styles.options}>
      <Link to={`/drugshop/${drugshop.id}`}>to drugshop</Link>
    </div>
  </div>
 )
}

export default Drugshop