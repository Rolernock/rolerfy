import { FaTimes, FaTrash } from 'react-icons/fa'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { deleteOrder } from '../../../slices/orderSlice'
import { getAllOrders } from '../../../slices/orderSlice'
import { useDispatch } from 'react-redux'
import DeleteOrderModal from '../../../components/DeleteOrderModal'
import { useState } from 'react'

export default function ({ order }) {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const handleShow = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  const handleDeleteOrder = async orderId => {
    await dispatch(deleteOrder(orderId))
    dispatch(getAllOrders())
  }

  return (
    <>
      <td>{order._id}</td>
      <td>{order.user && order.user.name}</td>
      <td>{order.createdAt.substring(0, 10)}</td>
      <td>{order.totalPrice}</td>
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
          to={`/order/${order._id}`}
          className='btn-sm btn-color mx-2'
        >
          Details
        </Button>
        <Button variant='danger' onClick={handleShow} className='btn-sm'>
          <FaTrash style={{ color: 'white' }} />
        </Button>
      </td>
      <DeleteOrderModal
        show={showModal}
        handleClose={handleClose}
        handleConfirm={() => handleDeleteOrder(order._id)}
      />
    </>
  )
}
