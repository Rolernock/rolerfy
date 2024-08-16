import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { login } from '../../slices/userSlice'
import FormContainer from '../../components/FormContainer'

export default function LoginScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.users)
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const redirect = queryParams.get('redirect') || '/'
  const initialState = { email: '', password: '' }
  const [formData, setFormData] = useState(initialState)
  const { email, password } = formData
  const handleChange = evt => {
    const { name, value } = evt.target
    setFormData(prevData => {
      return { ...prevData, [name]: value }
    })
  }
  useEffect(() => {
    if (user) {
      navigate(redirect)
    }
  }, [user, redirect, navigate])
  const handleSubmit = evt => {
    evt.preventDefault()
    dispatch(login(formData))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            name='email'
            value={email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            name='password'
            value={password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type='submit' className='mt-2 btn-color'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          <Link className='text-custom' to='/forgot-password'>
            Forgot Password?
          </Link>
        </Col>
      </Row>
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link
            className='text-custom'
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
