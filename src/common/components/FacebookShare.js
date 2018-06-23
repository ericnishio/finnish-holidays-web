import React, {Component} from 'react'
import PropTypes from 'prop-types'

class FacebookShare extends Component {
  static propTypes = {
    size: PropTypes.string,
    style: PropTypes.object,
  }

  static defaultProps = {
    size: 'small',
  }

  componentDidMount() {
    // eslint-disable-next-line
    FB.XFBML.parse() // ensure Facebook buttons appear on page
  }

  render() {
    const {size, style} = this.props

    return (
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
    )
  }
}

export default FacebookShare
