"use client"

import React from 'react'
import { Button } from './ui/button'
import { getAurinkoAuthUrl } from '@/lib/aurinko/aurinko'

const LinkAccount = () => {
  return (
    <div>
<Button  onClick={async()=>{
    const authUrl = await getAurinkoAuthUrl("Google")
window.location.href = authUrl


}} >Link Account</Button>


    </div>
  )
}

export default LinkAccount