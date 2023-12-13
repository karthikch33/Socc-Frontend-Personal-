import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = (props) => {
    const {title} = props;
  return (
    <Helmet>
    {/* <meta charSet="utf-8" /> */}
    <link rel="icon" type="image/png" href="https://media.licdn.com/dms/image/D4E03AQH8PEP16-aAbA/profile-displayphoto-shrink_400_400/0/1663862227248?e=1707350400&v=beta&t=4Ae96Qem5yl0LRJvX4OHpN1C1a5H3EIcHHtL2Ny33Jo" />
    <title>{title}</title>
</Helmet>
  )
}

export default Meta