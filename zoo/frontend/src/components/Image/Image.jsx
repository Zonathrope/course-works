import React from 'react'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

import styles from './Image.module.css'

const Image = ({ url, alt = 'img', className }) => {
  return (
    <>
      {url ? (
        <img
          className={classnames(styles.img, className)}
          src={url}
          alt={alt}
        />
      ) : (
        <FontAwesomeIcon className={styles.icon} icon={faImage} />
      )}
    </>
  )
}

export default Image
