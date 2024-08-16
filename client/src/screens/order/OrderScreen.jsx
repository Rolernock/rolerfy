import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Message from '../../components/Message'
import Spinner from '../../components/Spinner'
import {
  payItems,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid
} from '../../slices/orderSlice'

export default function OrderScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { order } = useSelector(state => state.orders)
  const { user } = useSelector(state => state.users)
  const { orderId } = useParams()
  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId))
    }
  }, [orderId])

  const deliverOrderHandler = async () => {
    await dispatch(updateOrderToDelivered(orderId))
    dispatch(getOrderById(orderId))
  }

  const paidOrderHandler = async () => {
    await dispatch(updateOrderToPaid(orderId))
    dispatch(getOrderById(orderId))
  }

  const payOrderHandler = () => {
    const formData = {
      phoneNumber: order.shippingAddress.phoneNumber,
      Amount: order.totalPrice
    }
    dispatch(payItems(formData))
    navigate('/')
  }
  return (
    <>
      {!order ? (
        <Spinner />
      ) : (
        <>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong>
                    {order.user.name}
                  </p>
                  <p>
                    <strong>Email: {order.user.email}</strong>
                  </p>
                  <p>
                    <strong>Address: </strong>{' '}
                    {order.shippingAddress.postalCode}{' '}
                    {order.shippingAddress.county}, {order.shippingAddress.ward}{' '}
                    Ward
                  </p>
                  {order.isDelivered ? (
                    <Message variant='success'>
                      Delivered on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not Delivered</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: MPESA</strong>
                  </p>
                  {order.isPaid ? (
                    <Message variant='success'>Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant='danger'>Not Paid</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.map((item, index) => (
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
                          <Link
                            className='text-custom'
                            to={`/products/${item._id}`}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} &times; Ksh. {item.price} = Ksh.{' '}
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
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
                      <Col>Items</Col>
                      <Col>Ksh. {order.itemsPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>Ksh. {order.shippingPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Tax</Col>
                      <Col>Ksh. {order.taxPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Total</Col>
                      <Col>Ksh. {order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      <Button className='btn-color' onClick={payOrderHandler}>
                        PayOrder
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
                <Card className='m-2'>
                  {user && user.isAdmin && !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        className='btn-color'
                        onClick={deliverOrderHandler}
                      >
                        Mark As Delivered
                      </Button>
                    </ListGroup.Item>
                  )}
                  {user && user.isAdmin && !order.isPaid && (
                    <ListGroup.Item className='mt-2'>
                      <Button className='btn-color' onClick={paidOrderHandler}>
                        Mark As Paid
                      </Button>
                    </ListGroup.Item>
                  )}
                </Card>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}
