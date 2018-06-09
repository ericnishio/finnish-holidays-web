import React from 'react'
import PropTypes from 'prop-types'

const FacebookShare = ({size = 'small', style}) =>
  <div
    className="fb-share-button"
    data-href="https://finnishholidays.com"
    data-layout="button_count"
    data-size={size}
    data-mobile-iframe="true"
    style={style}
  >
    <a
      target="_blank" // eslint-disable-line
      href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ffinnishholidays.com%2F&amp;src=sdkpreparse"
      className="fb-xfbml-parse-ignore"
    >
      Share
    </a>
  </div>

FacebookShare.propTypes = {
  size: PropTypes.string,
  style: PropTypes.object,
}

export default FacebookShare
