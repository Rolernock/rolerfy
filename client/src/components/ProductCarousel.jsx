import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getTopProducts } from '../slices/productSlice'
import Spinner from './Spinner'

export default function ProductCarousel() {
  const dispatch = useDispatch()
  const { topProducts } = useSelector(state => state.products)
  useEffect(() => {
    dispatch(getTopProducts())
  }, [])
  return (
    <>
      {!topProducts ? (
        <Spinner />
      ) : (
        <Carousel pause='hover' className='nav-color mb-4 rounded'>
          {topProducts.map(product => (
            <Carousel.Item key={product._id}>
              <Link to={`/products/${product._id}`}>
                <Image src={product.image} alt={product.name} />
                <Carousel.Caption>
                  <h2>
                    {product.name} Ksh. {product.price}
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  )
}
