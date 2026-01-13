

import React from 'react'
import Home from './HomePage/page'
import { Navbar } from '@/components/homepage/Navbar'
import FooterNavbar from '@/components/homepage/FooterNav'

const HomePage = () => {
  return (
    <div className=''>
      <Navbar></Navbar>
      <Home></Home>
      <FooterNavbar></FooterNavbar>

    </div>
  )
}

export default HomePage
