"use client"
import React, { useEffect, useState } from 'react'
import orderService from '../../src/api/services/orderService'
export default function Page() {

    const [order,setOrder] = useState();

    useEffect(()=>{
        const getOrder = async()=>{
            //either get the order id from the query param orderId and show the order details. if that isn't given show a text box to the user to enter the order id
            const order = orderService.getOrderById()
        }
    })

  return (
    <div>page</div>
  )
}
