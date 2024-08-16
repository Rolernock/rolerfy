import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function OrderItems({ order }) {
  return (
    <>
      <td>{order._id}</td>
      <td>{order.createdAt.substring(0, 10)}</td>
      <td>Ksh. {order.totalPrice}</td>
      <td>
        {order.isPaid ? (
          order.paidAt.substring(0, 10)
        ) : (
          <FaTimes style={{ color: 'red' }} />
        )}
      </td>
      <td>
        {order.isDelivered ? (
          order.deliveredAt.substring(0, 10)
        ) : (
          <FaTimes style={{ color: 'red' }} />
        )}
      </td>
      <td>
        <Button
          as={Link}
          className='btn-sm btn-color'
          to={`/order/${order._id}`}
        >
          Details
        </Button>
      </td>
    </>
  )
}
