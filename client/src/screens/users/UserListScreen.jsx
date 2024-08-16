import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaTrash, FaTimes, FaEdit, FaCheck } from 'react-icons/fa'
import { Table } from 'react-bootstrap'
import { getAllusers } from '../../slices/userSlice'
import Spinner from '../../components/Spinner'
import UserListScreenItem from './UserListScreenItem'

export default function UserListScreen() {
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.users)
  useEffect(() => {
    dispatch(getAllusers())
  }, [dispatch])
  return (
    <>
      <h1>Users</h1>
      {!users ? (
        <Spinner />
      ) : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <UserListScreenItem user={user} />
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
