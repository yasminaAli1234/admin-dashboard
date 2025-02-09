import React, { useEffect, useState } from 'react'
import Pending_seller from '../../components/DashBorad_screen/Pending_seller'
import Active_Product from '../../components/DashBorad_screen/Active_Prouduct'
import Card_dash from '../../components/DashBorad_screen/Card_dash'
import { useGet } from '../../Hooks/useGet'

const Dashboard = () => {
  const { refetch: refetchCartData, loading: loadingCartData, data: cartData } = useGet({
    url: `https://marfaa-alex.com/api/admin/users`,
});
const [data,setData] = useState([])
useEffect(() => {
  refetchCartData()
}, [refetchCartData])

useEffect(() => {
  if(cartData){
    setData(cartData)
  }
  console.log("data" , cartData)
}, [cartData])

  return (
    <div>
      <Card_dash/>
      <Pending_seller/>
      <Active_Product/>
    </div>
  )
}

export default Dashboard