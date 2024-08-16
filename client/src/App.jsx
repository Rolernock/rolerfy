import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/home/HomeScreen'
import ProductScreen from './screens/product/ProductScreen'
import CartScreen from './screens/cart/CartScreen'
import PageNotFound from './screens/routing/PageNotFound'
import LoginScreen from './screens/auth/LoginScreen'
import ForgotPasswordScreen from './screens/routing/ForgotPasswordScreen'
import ResetPasswordScreen from './screens/routing/ResetPasswordScreen'
import RegisterScreen from './screens/auth/RegisterScreen'
import ShippingScreen from './screens/shipping/ShippingScreen'
import PlaceOrderScreen from './screens/cart/PlaceOrderScreen'
import OrderScreen from './screens/order/OrderScreen'
import AdminRoute from './components/AdminRoute'
import OrderListScreen from './screens/admin/order/OrderListScreen'
import ProductListScreen from './screens/admin/product/ProductListScreen'
import ProductEditScreen from './screens/admin/product/ProductEditScreen'
import ProfileScreen from './screens/profile/ProfileScreen'
import UserListScreen from './screens/users/UserListScreen'
import UserEditScreen from './screens/admin/user/UserEditScreen'

function App() {
  return (
    <Routes>
      <Route index element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route
        path='/search/:keyword/page/:pageNumber'
        element={<HomeScreen />}
      />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
      <Route path='register' element={<RegisterScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />
      <Route path='/shipping' element={<ShippingScreen />} />
      <Route path='/order/:orderId' element={<OrderScreen />} />
      <Route path='/place-order' element={<PlaceOrderScreen />} />
      <Route path='products/:id' element={<ProductScreen />} />
      <Route path='/reset-password/:token' element={<ResetPasswordScreen />} />
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route
          path='/admin/productlist/page/:pageNumber'
          element={<ProductListScreen />}
        />
        <Route
          path='/admin/product/:productId/edit'
          element={<ProductEditScreen />}
        />
        <Route path='/admin/userlist' element={<UserListScreen />} />
      </Route>
      <Route path='/admin/user/:userId' element={<UserEditScreen />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default App
