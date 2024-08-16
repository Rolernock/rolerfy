import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../../slices/cartSlice'
import FormContainer from '../../components/FormContainer'
import CheckOutSteps from '../../components/CheckOutSteps'

export default function ShippingScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { shippingAddress, cartItems } = useSelector(state => state.cart)
  const initialState = {
    county: shippingAddress?.county || '',
    phoneNumber: shippingAddress?.phoneNumber || '',
    postalCode: shippingAddress?.postalCode || '',
    sub_county: shippingAddress?.sub_county || '',
    ward: shippingAddress?.ward || ''
  }
  const [formData, setFormData] = useState(initialState)
  const { county, phoneNumber, postalCode, sub_county, ward } = formData
  const handleChange = evt => {
    const { name, value } = evt.target
    setFormData(prevData => {
      return { ...prevData, [name]: value }
    })
  }
  const handleSubmit = evt => {
    evt.preventDefault()
    dispatch(saveShippingAddress(formData))
    navigate('/place-order')
  }
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart')
    }
  }, [cartItems])

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='county' className='my-3'>
          <Form.Label>County</Form.Label>
          <Form.Control
            type='text'
            name='county'
            placeholder='Enter County'
            value={county}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='phoneNumber'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type='number'
            name='phoneNumber'
            placeholder='E.g: 0711223344'
            value={phoneNumber}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='postalCode' className='my-3'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='number'
            name='postalCode'
            placeholder='Postal Code'
            value={postalCode}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='sub_county' className='my-3'>
          <Form.Label>Sub County</Form.Label>
          <Form.Control
            type='text'
            name='sub_county'
            placeholder='Sub_County'
            value={sub_county}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='ward' className='my-3'>
          <Form.Label>Ward</Form.Label>
          <Form.Control
            type='text'
            name='ward'
            placeholder='Ward'
            value={ward}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type='submit' className='btn-color mt-2'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}
