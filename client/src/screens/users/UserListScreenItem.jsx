import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteUser, getAllusers } from '../../slices/userSlice'
import DeleteUserModal from '../../components/DeleteUserModal'
import { useState } from 'react'

export default function UserListScreenItem({ user }) {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)
  const deleteHandler = async id => {
    await dispatch(deleteUser(id))
    dispatch(getAllusers())
    handleCloseModal()
  }
  return (
    <>
      <td>{user._id}</td>
      <td>{user.name}</td>
      <td>
        <Link className='text-custom' to={`mailto:${user.email}`}>
          {user.email}
        </Link>
      </td>
      <td>
        {user.isAdmin ? (
          <FaCheck style={{ color: 'green' }} />
        ) : (
          <FaTimes style={{ color: 'red' }} />
        )}
      </td>
      <td>
        <Link className='px-2' to={`/admin/user/${user._id}`}>
          <Button className='btn-sm btn-color'>
            <FaEdit />
          </Button>
        </Link>
        <Button variant='danger' className='btn-sm' onClick={handleShowModal}>
          <FaTrash type={{ color: 'white ' }} />
        </Button>
      </td>
      <DeleteUserModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={() => deleteHandler(user._id)}
      />
    </>
  )
}
