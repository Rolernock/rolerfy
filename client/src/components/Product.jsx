import { Link } from 'react-router-dom'
import Rating from './Rating'
import { Card } from 'react-bootstrap'

export default function Product({ product }) {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link
        to={`/products/${product._id}`}
        className='text-decoration-none text-custom'
      >
        <Card.Img src={product.image} variant='top' />
        <Card.Body>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>

          <Card.Text as='div'>
            <Rating
              value={product.rating}
              text={`${product.reviews.length} reviews`}
            />
          </Card.Text>
          <Card.Text as='h3'>ksh. {product.price}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  )
}
