import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { updateUserProfile } from '../../slices/userSlice'
import { getMyOrders } from '../../slices/orderSlice'
import OrderItems from './OrderItems'
import { toast } from 'react-toastify'

export default function ProfileScreen() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.users)
  const { orders } = useSelector(state => state.orders)
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const [formData, setFormData] = useState(initialState)
  const { name, email, password, confirmPassword } = formData
  const handleChange = evt => {
    const { name, value } = evt.target
    setFormData(prevData => {
      return { ...prevData, [name]: value }
    })
  }
  useEffect(() => {
    setFormData({ ...formData, name: user?.name, email: user?.email })
    dispatch(getMyOrders())
  }, [user])
  const handleSubmit = evt => {
    evt.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ _id: user._id, name, email, password }))
    }
  }
  return (
    <>
      <Row>
        <Col md={3}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                name='name'
                value={name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='email' className='my-2'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='ENter email'
                name='email'
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='password' className='my-2'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                name='password'
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='my-2'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type='submit' className='my-2 btn-color'>
              Update
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {!orders ? (
            <>
              <Button as={Link} to='/' className='mt-2 btn-color'>
                Back Home
              </Button>
              <p className='mt-5'>
                There are no orders associated with your account. Please return
                to the order menu to place a new order or review existing ones.
              </p>
            </>
          ) : (
            <Table striped hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <OrderItems order={order} />
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  )
}
