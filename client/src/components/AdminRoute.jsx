import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AdminRoute() {
  const { user } = useSelector(state => state.users)
  return <>{user && user.isAdmin ? <Outlet /> : <Navigate to='/login' />}</>
}
