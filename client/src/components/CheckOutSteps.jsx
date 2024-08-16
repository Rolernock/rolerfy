import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function CheckOutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <Nav.Link as={Link} to='/login' className='verification-steps'>
            Sign In
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <Nav.Link as={Link} to='/shipping' className='verification-steps'>
            Shipping
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <Nav.Link as={Link} to='place-order' className='verification-steps'>
            Place Order
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}
