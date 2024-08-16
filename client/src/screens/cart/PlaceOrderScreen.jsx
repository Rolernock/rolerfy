import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import CheckOutSteps from '../../components/CheckOutSteps'
import Message from '../../components/Message'
import Spinner from '../../components/Spinner'
import { placeOrder } from '../../slices/orderSlice'
import { clearCart } from '../../slices/cartSlice'

export default function PlaceOrderScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { shippingAddress } = useSelector(state => state.cart)
  const cart = useSelector(state => state.cart)
  const { county, postalCode, sub_county, ward, phoneNumber } = shippingAddress
  useEffect(() => {
    if (!county || !postalCode || !sub_county || !ward || !phoneNumber) {
      navigate('/shipping')
    }
  }, [shippingAddress])
  const placeOrderHandler = async () => {
    const cartContent = {
      orderItems: cart.cartItems,
      shippingAddress,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice
    }
    const { _id } = await dispatch(placeOrder(cartContent)).unwrap()
    dispatch(clearCart())
    navigate(`/order/${_id}`)
  }
  return (
    <>
      <CheckOutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong> {postalCode} {county}, {ward} Ward
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method: </h2>
              MPESA
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} &times; Ksh. {item.price} = Ksh.{' '}
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items: </Col>
                  <Col>Ksh. {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>Ksh. {cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>Ksh. {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total: </Col>
                  <Col>Ksh. {cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-color'
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
