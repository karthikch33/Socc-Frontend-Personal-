import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = (props) => {
    const {title} = props;
  return (
    <Helmet>
    {/* <meta charSet="utf-8" /> */}
    <link rel="icon" type="image/png" href="https://res.cloudinary.com/ddkdeeue3/image/upload/v1727499284/jm97kywmlw1o3vjbgmux.jpg" />
    <title>{title}</title>
</Helmet>
  )
}

export default Meta