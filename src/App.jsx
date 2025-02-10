import React from 'react'
import './App.css'
import './index.css'
import SignUp from './Pages/SignUp'
import { Route, Router, Routes } from 'react-router-dom'
import Dashboard from './Pages/DashBorad/Dashboard'
import User from './Pages/User/User'
import Order from './Pages/Order/Order'
import Product from './Pages/Product/Product'
import Home from './Pages/Home/Home'
import Add_category from './Pages/Category/Add_category'
import Update_category from './Pages/Category/Update_category'
import Category from './Pages/Category/Category'
import Page_selection_category from './Pages/Category/Page_selection_category'
import ShareCategory from './Pages/Category/Share_category'
import Landing from './Pages/Landing/Landing'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Show_info_user from './Pages/User/paged_user/Show_info_user'
import { DataProvider } from './Context/data'
import MainLayout from './layouts/Mainlayouts'
import SimpleLayout from './layouts/Simplelayout'
import { ContextProvider } from './Context/Auth'
import Login from './Pages/Authentication/Login'
import Settings from './Pages/Settings'
import UpdateUser from './Pages/User/paged_user/UpdateUser'

const App = () => {
  return (
    <ContextProvider><DataProvider>


  
       
          <Routes>
  {/* Authentication Routes */}


  {/* Admin Routes */}
  <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
  <Route path="/" element={<SimpleLayout><Login /></SimpleLayout>} />
  {/* User Routes */}
  <Route path="/user" element={<MainLayout><User /></MainLayout>} />
  <Route path="/update_user/:id" element={<MainLayout><UpdateUser /></MainLayout>} />

  <Route path ="/user/info" element={<MainLayout><Show_info_user/></MainLayout>}></Route>
  {/* Product Routes */}
  <Route path="/product" element={<MainLayout><Product /></MainLayout>} />
  <Route path="/product/add" element={<SimpleLayout><Add_category /></SimpleLayout>} />
  {/* Order Routes */}
  <Route path="/order" element={<MainLayout><Order /></MainLayout>} />
  <Route path="/landing" element={<SimpleLayout><Landing /></SimpleLayout>} />
  <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
  {/* Category Routes */}
  <Route path="/category" element={<MainLayout><Category /></MainLayout>} />

  <Route path="/category/update" element={<MainLayout><Update_category /></MainLayout>} /> {/* Include a parameter for the specific category */}
  
  {/* Selection and Sharing Routes */}
  <Route path="/page_selection/:type/:data" element={<SimpleLayout><Page_selection_category /></SimpleLayout>} />
  <Route path="/share_category" element={<SimpleLayout><ShareCategory /></SimpleLayout>} />
</Routes>
        


</DataProvider></ContextProvider>

  )
}



export default App