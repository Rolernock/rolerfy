import { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../slices/productSlice'
import ProductCarousel from '../../components/ProductCarousel'
import Spinner from '../../components/Spinner'
import Product from '../../components/Product'
import Paginate from '../../components/Paginate'

export default function () {
  const dispatch = useDispatch()
  const { pageNumber, keyword } = useParams()
  const {
    products: { products, page, pages }
  } = useSelector(state => state.products)
  useEffect(() => {
    dispatch(getAllProducts({ pageNumber, keyword }))
  }, [pageNumber, keyword])
  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-color text-white mb-4'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {!products ? (
        <Spinner />
      ) : (
        <>
          <Row>
            {products.map(product => (
              <Col key={product._id} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword} />
        </>
      )}
    </>
  )
}
