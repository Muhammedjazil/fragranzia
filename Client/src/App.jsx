
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import { Product } from './pages/user/Productpage'
import { Addproduct } from './pages/admin/add-product'
import { Users } from './pages/admin/users'
// import { User } from './pages/admin/user'
// import { Updateproduct } from './pages/admin/updateproduct'
import { ProductDetails } from './pages/admin/product-details'
import { Category } from './pages/admin/category'
// import { Category1 } from './pages/admin/category1'



import { Products } from './pages/user/Productpage'
import { Productpage2 } from './pages/user/Productpage2'
import { Producttable } from './pages/admin/producttable'
// import { Payment } from './pages/user/payment'
// import { Paymentsuccess } from './pages/user/paymentsuccess'
// import { Paymentfailour } from './paymentfailour'
import { Cart } from './pages/user/Cart'
import { About } from './pages/user/About'
import { Profile } from './pages/user/Profile'
import { Profilesave } from './pages/user/profilesave'
import { Lastaddress } from './pages/user/Lastaddress'
import { Address } from './pages/user/address'
import './App.css'
import { Signup } from './pages/user/Signup'
import { Signin } from './pages/user/signin'
// import perfumeeImage from "../../assets/perfumee.png";
// import perfume3Image from "../../assets/perfume3.png"
import { Home } from './pages/user/Home'
import { Wishlist } from './pages/user/wishlist'
import { Order } from './pages/admin/Order'
import { Payment } from './pages/user/Payment'
import AdminProtectedRoute from './components/protected-route/AdminProtectedRoute'
import LoginProtectedRoute from './components/protected-route/LoginProtectedRoute'
// import { Paymentsuccess } from './pages/user/Paymentsuccess'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dashboard } from './pages/admin/Dashboard'
import AdminLayout from "./components/Layout/Adminlayout";
import UserLayout from "./components/Layout/Userlayout"
function App() {
 const [search, setSearch] = useState("");

  return (
    <>

      {/* <Users/> */}
      {/* <Route
  path="/Product"
  element={
    <AdminLayout>   adminlayoutil corresponding aayittulla jsx kodkuka
      <Producttable />
    </AdminLayout>
  }
/> */}
      {/* <User/> */}
      <Routes>
        <Route element={<AdminProtectedRoute />}>  {/* Admin protected routes */}
          <Route path='/Product' element={<Producttable />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/addproduct' element={<Addproduct />} />
          <Route path='/Categories' element={<Category />} />
          <Route path='/Customer' element={<Users />} />
          <Route path='/order' element={<Order />} />
        </Route>


        {/* <Addproduct/> */}
        {/* <Updateproduct/> */}
        {/* <ProductDetails/> */}
        {/* <Category/> */}
        {/* <Category1/> */}


        {/*  */}
        {/* <Home/> */}
        {/* <Products/> */}

        {/* Public routes */}



      
       
        <Route path='/signup' element={<Signup />} />
        <Route path='/Signin' element={<Signin />} />

        {/* Login protected user routes */}
        {/* User routes */}
<Route element={<LoginProtectedRoute />}>
 
<Route
  path="/"
  element={
    <UserLayout
      search={search}
      setSearch={setSearch}
    >
      <Home search={search} />
    </UserLayout>
  }
/>
    <Route path="/products" element={<Products />} />
    <Route path="/productpage2/:id" element={<Productpage2 />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/about" element={<About />} />
    <Route path="/profilesave" element={<Profilesave />} />
    <Route path="/last" element={<Lastaddress />} />
    <Route path="/gifting" element={<Wishlist />} />
    <Route path="/payment" element={<Payment />} />
  </Route>
      </Routes>

      {/* Toast notifications */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
      />
      {/* <Product/> */}

      {/* <Productpage2/> */}
      {/* <Signin/> */}
      {/* <Payment/> */}
      {/* <Paymentsuccess/> */}
      {/* <Paymentfailour/> */}
      {/* <Cart/> */}
      {/* <About/> */}
      {/* <Profile/> */}
      {/* <Profilesave/> */}

      {/* <Address/> */}
      {/* <Lastaddress/> */}
    </>
  )
}

export default App
