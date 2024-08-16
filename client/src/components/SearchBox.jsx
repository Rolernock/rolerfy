import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

export default function SearchBox() {
  const navigate = useNavigate()
  const { keyword: urlKeyword } = useParams()
  const [keyword, setKeyword] = useState(urlKeyword || '')
  const handleSubmit = evt => {
    evt.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
      setKeyword('')
    } else {
      navigate('/')
    }
  }
  return (
    <Form onSubmit={handleSubmit} className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={evt => setKeyword(evt.target.value)}
        value={keyword}
        placeholder='Search Product...'
        className='mr-sm-2 ml-sm-5'
      />
      <Button type='submit' variant='outline-light' className='p-2 mx-2'>
        Search
      </Button>
    </Form>
  )
}
