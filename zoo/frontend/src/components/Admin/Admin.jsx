import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import classnames from 'classnames'
import Modal from '../Modal/Modal'
import { Container, Row, Col } from 'react-grid-system'
import {
  useGetAllZoos,
  useGetZoo,
  useCreateZoo,
  useAddZoneToZoo,
  useAddAnimal,
  useDeleteAnimal,
  useDeleteZone,
  useDeleteZoo
} from '../../query/zoos'

import styles from './Admin.module.css'

const AdminPage = () => {
  const { data: zoosList, isLoading } = useGetAllZoos()
  const [currentZoo, setCurrentZoo] = useState('')
  const { data: zooData, isLoading: isZooLoading } = useGetZoo(currentZoo)
  const { mutate: addZoneToZoo } = useAddZoneToZoo()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutate: createZoo } = useCreateZoo()
  const { mutate: addAnimal } = useAddAnimal()
  const { mutate: deleteAnimal } = useDeleteAnimal()
  const { mutate: deleteZone } = useDeleteZone()
  const { mutate: deleteZoo } = useDeleteZoo()
  const handleCreateZoo = (values) => {
    createZoo(values, {
      onSuccess: () => {
        setIsModalOpen(false)
      }
    })
  }

  const handleDeleteZoo = () => {
    deleteZoo(currentZoo)
    setCurrentZoo('')
  }

  const handleCreateZone = (values, { resetForm }) => {
    addZoneToZoo({ ...values, zoo_id: currentZoo })
    resetForm({
      world_part: '',
      type: ''
    })
  }

  const handleDeleteZone = (id) => {
    deleteZone(id)
  }

  const handleAddAnimal = (values, zone_id, resetForm) => {
    addAnimal({
      ...values,
      zone_id,
      zoo_id: currentZoo
    })
    resetForm({
      name: '',
      specie: '',
      year_old: ''
    })
  }

  const handleDeleteAnimal = (id) => {
    deleteAnimal(id)
  }

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <Container>
      <Row>
        <Modal active={isModalOpen} setActive={setIsModalOpen}>
          <div className={styles.ModalContainer}>
            <Formik
              onSubmit={handleCreateZoo}
              initialValues={{
                img: '',
                name: '',
                country: '',
                city: '',
                street: ''
              }}
            >
              <Form className={styles.form}>
                <Field
                  className={styles.field}
                  name={'img'}
                  placeholder={'???????????? ???? ????????????????????'}
                />
                <Field
                  className={styles.field}
                  required={true}
                  name={'name'}
                  placeholder={'?????????? ????????????????'}
                />
                <Field
                  className={styles.field}
                  required={true}
                  name={'country'}
                  placeholder={'????????????'}
                />
                <Field
                  className={styles.field}
                  name={'city'}
                  placeholder={'??????????'}
                />
                <Field
                  className={styles.field}
                  required={true}
                  name={'street'}
                  placeholder={'????????????'}
                />
                <button className={styles.btn} type="submit">
                  ????????????????
                </button>
              </Form>
            </Formik>
          </div>
        </Modal>
        <Col className={styles.container} xl={12}>
          <div className={styles.leftBlock}>
            {zoosList.map((el) => (
              <div
                onClick={() => setCurrentZoo(el._id)}
                className={classnames(styles.li, {
                  [styles.active]: el._id === currentZoo
                })}
              >
                {el.name}
              </div>
            ))}
            <div className={styles.li} onClick={() => setIsModalOpen(true)}>
              ???????????????? ??????????????
            </div>
          </div>
          <div className={styles.rightBlock}>
            {isZooLoading ? (
              <>Loading...</>
            ) : (
              <div className={styles.zooData}>
                {currentZoo && (
                  <>
                    {zooData?.zones &&
                      zooData?.zones
                        .filter((zone) => !!zone.zone)
                        .map((zone) => (
                          <div className={styles.zone}>
                            <div className={styles.zone_header}>
                              {zone?.zone?.world_part}, {zone?.zone?.type}
                              <div
                                onClick={() => handleDeleteZone(zone.zone._id)}
                                className={styles.deleteBtn}
                              >
                                ????????????????
                              </div>
                            </div>
                            <Row className={styles.animals}>
                              {zone?.animals
                                .filter((el) => !!el)
                                .map((el) => (
                                  <div className={styles.animal}>
                                    <div className={styles.row}>
                                      ????'??: {el?.name}
                                    </div>
                                    <div className={styles.row}>
                                      ??????: {el?.specie}
                                    </div>
                                    <div className={styles.row}>
                                      ??????????: {el?.year_old}
                                    </div>
                                    <div
                                      onClick={() => handleDeleteAnimal(el._id)}
                                      className={styles.deleteBtn}
                                    >
                                      ????????????????
                                    </div>
                                  </div>
                                ))}
                              <Formik
                                initialValues={{
                                  name: '',
                                  specie: '',
                                  year_old: ''
                                }}
                                onSubmit={(values, { resetForm }) =>
                                  handleAddAnimal(
                                    values,
                                    zone.zone._id,
                                    resetForm
                                  )
                                }
                              >
                                <Form className={styles.smallForm}>
                                  <Field
                                    className={styles.smallField}
                                    required={true}
                                    name={'name'}
                                    placeholder={`????'??`}
                                  />
                                  <Field
                                    className={styles.smallField}
                                    required={true}
                                    name={'specie'}
                                    placeholder={`??????`}
                                  />
                                  <Field
                                    className={styles.smallField}
                                    required={true}
                                    name={'year_old'}
                                    placeholder={`??????????`}
                                  />
                                  <button
                                    className={styles.smallBtn}
                                    type="submit"
                                  >
                                    ????????????
                                  </button>
                                </Form>
                              </Formik>
                            </Row>
                          </div>
                        ))}
                    <div className={styles.zone}>
                      <Formik
                        initialValues={{
                          world_part: '',
                          type: ''
                        }}
                        onSubmit={handleCreateZone}
                      >
                        <Form>
                          <Field
                            className={styles.field}
                            required={true}
                            name={'world_part'}
                            placeholder={'?????????????? ??????????'}
                          />
                          <Field
                            className={styles.field}
                            required={true}
                            name={'type'}
                            placeholder={'??????'}
                          />
                          <button
                            type="submit"
                            className={classnames(
                              styles.zone_header,
                              styles.createBtn,
                              styles.smallBtn
                            )}
                          >
                            ???????????????? ???????? ?? ????????????????
                          </button>
                        </Form>
                      </Formik>
                    </div>
                    <div onClick={handleDeleteZoo} className={styles.deleteZoo}>
                      ???????????????? ??????????????
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminPage
