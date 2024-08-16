import { useEffect, useState } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts, createProduct } from '../../../slices/productSlice'
import Spinner from '../../../components/Spinner'
import Paginate from '../../../components/Paginate'
import ProductListScreenItem from './ProductListScreenItem'
import ProductCreationConfirmation from '../../../components/ProductCreationConfirmation'

export default function ProductListScreen() {
  const dispatch = useDispatch()
  const { pageNumber, keyword } = useParams()
  const { products, pages, page } = useSelector(
    state => state.products.products
  )
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)
  useEffect(() => {
    dispatch(getAllProducts({ pageNumber, keyword }))
  }, [getAllProducts, pageNumber])
  const createProductHandler = async () => {
    await dispatch(createProduct())
    dispatch(getAllProducts({ pageNumber, keyword }))
    handleCloseModal()
  }
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='btn-sm m-3 btn-color' onClick={handleShowModal}>
            <FaTimes /> Create Product
          </Button>
        </Col>
      </Row>
      {!products ? (
        <Spinner />
      ) : (
        <>
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <ProductListScreenItem product={product} />
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} />
          <ProductCreationConfirmation
            show={showModal}
            handleClose={handleCloseModal}
            handleConfirm={createProductHandler}
          />
        </>
      )}
    </>
  )
}
