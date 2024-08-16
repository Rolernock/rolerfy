import { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import Spinner from '../../../components/Spinner'
import { getAllOrders } from '../../../slices/orderSlice'
import { useSelector, useDispatch } from 'react-redux'
import OrderListItem from './OrderListItem'

export default function OrderListScreen() {
  const dispatch = useDispatch()
  const { orders } = useSelector(state => state.orders)
  useEffect(() => {
    dispatch(getAllOrders())
  }, [orders])

  return (
    <>
      <h1>Orders</h1>
      {!orders ? (
        <Spinner />
      ) : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <OrderListItem order={order} />
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
