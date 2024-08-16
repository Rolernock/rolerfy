import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { updateProfileByAdmin, getUserById } from '../../../slices/userSlice'
import FormContainer from '../../../components/FormContainer'
import Spinner from '../../../components/Spinner'

export default function UserEditScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userId } = useParams()
  const { profile } = useSelector(state => state.users)
  const intitialState = {
    name: '',
    email: '',
    isAdmin: '',
    password: ''
  }
  const [formData, setFormData] = useState(intitialState)
  const { name, email, isAdmin, password } = formData
  const handleChange = evt => {
    const { name, value, type, checked } = evt.target
    setFormData(prevData => {
      return { ...prevData, [name]: type === 'checkbox' ? checked : value }
    })
  }
  useEffect(() => {
    dispatch(getUserById(userId))
  }, [userId])
  useEffect(() => {
    setFormData({
      _id: profile?._id || '',
      name: profile?.name || '',
      email: profile?.email || '',
      isAdmin: profile?.isAdmin || false
    })
  }, [profile])

  const handleSubmit = evt => {
    evt.preventDefault()
    if (!password) {
      delete formData.password
    }
    dispatch(updateProfileByAdmin({ userId, formData }))
    navigate('/admin/userlist')
  }
  return (
    <>
      <Button as={Link} to='/admin/userlist' className='btn-color my-3'>
        Back
      </Button>
      {!profile ? (
        <Spinner />
      ) : (
        <>
          <FormContainer>
            <h1>Edit User</h1>
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
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  name='name'
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
              <Form.Group controlId='isAdmin' className='my-2'>
                <Form.Check
                  type='checkbox'
                  label='Is Admin'
                  name='isAdmin'
                  checked={isAdmin}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button type='submit' className='btn-color my-2'>
                Update
              </Button>
            </Form>
          </FormContainer>
        </>
      )}
    </>
  )
}
