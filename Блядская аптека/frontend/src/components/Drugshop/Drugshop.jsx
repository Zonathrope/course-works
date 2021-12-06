import React from 'react'
import { useParams } from 'react-router'
import { useGetAllMedicines, useGetDrugshopInfo } from '../../lib/query/medicine'
import PageWrapper from '../PageWrapper/PageWrapper'
import Medicine from '../Search/components/Medicine'

import styles from './Drugshop.module.css'

const Drugshop = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetAllMedicines(id)
  const { data: drugShop, isLoading: isDrugShopLoading } = useGetDrugshopInfo(id)
  return (
    <PageWrapper>
      <div className={styles.drugshopInfo}>
        {!isDrugShopLoading &&
          <div>
            {drugShop.name}
            <div className={styles.Address}>{drugShop.city} {drugShop.street} {drugShop.building}</div>
          </div>}
      </div>
      <div className={styles.list}>
        {!isLoading && data.map((el) => <Medicine medicine={el}></Medicine>)}
      </div>
    </PageWrapper>
  )
}

export default Drugshop
