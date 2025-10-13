import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
     <div style={{ maxWidth: '800px', margin: '50px auto', padding: '0 1rem' }}>
      <PricingTable />
    </div>
  )
}

export default page