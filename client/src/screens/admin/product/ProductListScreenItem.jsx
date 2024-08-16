import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteProduct, getAllProducts } from '../../../slices/productSlice'
import ConfirmationModal from '../../../components/ConfirmationModal'

export default function ProductListScreenItem({ product }) {
  const dispatch = useDispatch()
  const { pageNumber, keyword } = useParams()
  const [showModal, setShowModal] = useState(false)
  const [productIdToDelete, setProductIdToDelete] = useState(null)
  const handleShowModal = id => {
    setProductIdToDelete(id)
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
    setProductIdToDelete(null)
  }

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteProduct(productIdToDelete))
      dispatch(getAllProducts({ pageNumber, keyword }))
    } finally {
      handleCloseModal()
    }
  }

  return (
    <>
      <td>{product._id}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.category}</td>
      <td>
        <Button
          as={Link}
          variant='light'
          className='btn-sm mx-2'
          to={`/admin/product/${product._id}/edit`}
        >
          <FaEdit />
        </Button>
        <Button
          variant='danger'
          className='btn-sm'
          onClick={() => handleShowModal(product._id)}
        >
          <FaTrash style={{ color: 'white' }} />
        </Button>
      </td>
      <ConfirmationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmDelete}
      />
    </>
  )
}
