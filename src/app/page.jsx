

import React from 'react'
import Home from './HomePage/page'
import { Navbar } from '@/components/homepage/Navbar'
import FooterNavbar from '@/components/homepage/FooterNav'
import Header from '@/components/homepage/Header'

const HomePage = () => {
  return (
    <div className=''>
      <div className="block xl:hidden">

      <Header></Header>
      </div>
      <div className="xl:block hidden">

      <Navbar></Navbar>
      </div>
      <Home></Home>
      <FooterNavbar></FooterNavbar>

    </div>
  )
}

export default HomePage
