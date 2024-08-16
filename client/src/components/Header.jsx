import {
  Navbar,
  Nav,
  Badge,
  NavDropdown,
  Container,
  Image,
  Dropdown
} from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../slices/userSlice'
import { clearCart, clearShippingAddress } from '../slices/cartSlice'
import SearchBox from './SearchBox'
export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.users)
  const logOutHandler = async () => {
    await dispatch(logOut())
    await dispatch(clearCart())
    dispatch(clearShippingAddress())
    navigate('/login')
  }
  return (
    <header>
      <Navbar variant='dark' expand='md' className='nav-color'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            <Image src='/rolerfy.svg' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto text-light'>
              <SearchBox />
              <Nav.Link as={Link} to='/cart'>
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                    {cartItems.length}
                  </Badge>
                )}
              </Nav.Link>
              {user ? (
                <NavDropdown title={user.name} id='regular-user'>
                  <Dropdown.Item as={Link} to='/profile'>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  {user && user.isAdmin && (
                    <Dropdown title='Admin' id='admin-user'>
                      <Dropdown.Item as={Link} to='/admin/productlist'>
                        Products
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to='/admin/userlist'>
                        Users
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to='/admin/orderlist'>
                        Orders
                      </Dropdown.Item>
                      <Dropdown.Divider />
                    </Dropdown>
                  )}
                  <Dropdown.Item as={Link} onClick={logOutHandler}>
                    Log Out
                  </Dropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <FaUser /> Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
