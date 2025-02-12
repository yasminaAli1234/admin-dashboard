import React, { useEffect, useState } from 'react'
import Pending_seller from '../../components/DashBorad_screen/Pending_seller'
import Active_Product from '../../components/DashBorad_screen/Active_Prouduct'
import Card_dash from '../../components/DashBorad_screen/Card_dash'
import { useGet } from '../../Hooks/useGet'
import Loading from '../../components/Loading'

const Dashboard = () => {
  const { refetch: refetchData, loading: loadingData, data: Data } = useGet({
    url: `https://marfaa-alex.com/api/admin/homepage`,
});
const [data,setData] = useState([])
const [dataActive,setDataActive]= useState([])
const [dataPending,setDataPending]= useState([])
useEffect(() => {
  refetchData()
}, [refetchData])

useEffect(() => {
  if(Data){
    setData(Data)
    setDataActive(data.activeProducts)
    setDataPending(data.pendingSellers);
  }
  console.log("data" , Data)
}, [Data])
if(loadingData){
  return <Loading/>
}
  return (
    <div>
      <Card_dash data={data}/>
      <Pending_seller data={dataPending}/>
      <Active_Product data={dataActive}/>
    </div>
  )
}

export default Dashboard