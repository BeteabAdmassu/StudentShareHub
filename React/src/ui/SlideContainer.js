import React from 'react'
import Homeviews from './Homeviews'
import Typography from '@mui/material/Typography'

export default function SlideContainer(props) {
  return (
  <>
          <Typography variant="h6" sx={{ textAlign: "left", fontWeight: 700, color:'#2b6cb0'}}>
           {props.title}
          </Typography>
          <Homeviews />
  </>
  )
}
