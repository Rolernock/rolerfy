import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../../components/Rating'
import { addToCart } from '../../slices/cartSlice'
import {
  getProductById,
  reviewProduct,
  deleteReview
} from '../../slices/productSlice'
import Message from '../../components/Message'
import { toast } from 'react-toastify'

export default function ProductItem({
  product: {
    _id,
    image,
    name,
    reviews,
    rating,
    price,
    description,
    countInStock
  }
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.users)
  const initialState = { comment: '', reviewRating: 0 }
  const [formData, setFormData] = useState(initialState)
  const { comment, reviewRating } = formData
  const handleChange = evt => {
    const { name, value } = evt.target
    setFormData(prevData => {
      return { ...prevData, [name]: value }
    })
  }
  const [qty, setQty] = useState(1)
  const product = {
    _id,
    image,
    name,
    rating,
    price,
    description,
    countInStock,
    qty
  }
  const reviewData = {
    rating: Number(reviewRating),
    comment
  }
  const addToCartHandler = () => {
    dispatch(addToCart(product))
    navigate('/cart')
  }
  const deleteReviewHandler = async (productId, reviewId) => {
    await dispatch(deleteReview({ productId, reviewId }))
    dispatch(getProductById(_id))
  }
  const handleSubmit = async evt => {
    evt.preventDefault()
    if (reviewRating === 0) {
      return toast.error('Please select a review')
    }
    await dispatch(reviewProduct({ reviewData, _id }))
    setFormData(initialState)
    dispatch(getProductById(_id))
  }
  return (
    <>
      <Link className='btn btn-color my-3' to='/'>
        {' '}
        Go Back
      </Link>
      <>
        <Row>
          <Col md={5}>
            <Card>
              <Image src={image} alt={image} fluid />
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <h2>{name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={rating} text={`${reviews.length} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>Price: Ksh. {price}</ListGroup.Item>
                <ListGroup.Item>Description: {description}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>Ksh. {price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={evt => setQty(evt.target.value)}
                        >
                          {[...Array(Number(countInStock)).keys()].map(
                            index => (
                              <option key={index + 1} value={index + 1}>
                                {index + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-color'
                    type='button'
                    disabled={countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row className='review'>
          <Col md={6}>
            <h2>Reviews</h2>
            {reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup>
              {reviews &&
                reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <Row>
                      <Col md={10}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.comment}</p>
                      </Col>
                      <Col md={2}>
                        {((user && review.user === user._id) ||
                          (user && user.isAdmin)) && (
                          <Button
                            variant='danger'
                            onClick={() => deleteReviewHandler(_id, review._id)}
                            className='btn-sm'
                          >
                            Delete
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              <ListGroup.Item>
                <h2>Write a Customer Review</h2>
                {!user ? (
                  <Message>
                    Please <Link to='/login'>sign in</Link> to write a review
                  </Message>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='rating' className='my-2'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        name='reviewRating'
                        value={reviewRating}
                        onChange={handleChange}
                      >
                        <option value=''>Select</option>
                        <option value='1'>Poor</option>
                        <option value='2'>Fair</option>
                        <option value='3'>Good</option>
                        <option value='4'>Very Good</option>
                        <option value='5'>Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment' className='my-2'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows='3'
                        name='comment'
                        value={comment}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Button type='submit' className='nav-color'>
                      Submit
                    </Button>
                  </Form>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </>
    </>
  )
}
