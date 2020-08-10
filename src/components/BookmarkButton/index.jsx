import React from 'react'
import cn from 'classnames'
import VisuallyHidden from 'components/VisuallyHidden'
import './style.scss'

const BookmarkButton = ({ className, ...restProps }) => {
  return (
    <button className={cn('bookmark-button', className)} type="button" {...restProps}>
      <svg className="bookmark-button__icon" width="16" height="20" viewBox="0 0 16 20" aria-hidden="true" focusable="false">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-5-7 5V3a2 2 0 012-2h10a2 2 0 012 2v16z"/>
      </svg>
      <VisuallyHidden className="bookmark-button__text">Add / Delete bookmark</VisuallyHidden>
    </button>
  )
}

export default BookmarkButton
