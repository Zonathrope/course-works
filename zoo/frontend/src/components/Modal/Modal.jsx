import React from 'react'
import styles from './Modal.module.css'

const classnames = require('classnames/bind')

const cx = classnames.bind(styles)


const Modal = ({
  active,
  setActive,
  children,
  withBorderRadius
}) => {
  const hideModal = React.useCallback(() => {
    setActive(false)
  }, [setActive])

  return (
    <div className={cx({ modal: true, active })} onClick={hideModal}>
      <div
        className={cx({ modalContent: true, active, withBorderRadius })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cx({ modalBody: true, withBorderRadius })}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
