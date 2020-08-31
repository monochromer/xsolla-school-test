import React from 'react'
import cn from 'classnames'
import './style.scss'

const Placeholder = ({ type = 'default', children }) => {
  return (
    <div
      className={cn(
        'placeholder',
        {
          [`placeholder_type_${type}`]: type
        }
      )}
    >{children}</div>
  )
}

export default Placeholder
