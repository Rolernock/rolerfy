import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import Spinner from '../../../components/Spinner'
import {
  getProductById,
  updateProduct,
  uploadProductImage
} from '../../../slices/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../../components/FormContainer'

export default function ProductEditScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { productId } = useParams()
  const { product } = useSelector(state => state.products)
  const initialState = {
    name: '',
    price: 0,
    image: '',
    category: '',
    countInStock: '',
    description: ''
  }
  const [formData, setFormData] = useState(initialState)
  const { name, price, image, category, countInStock, description } = formData
  useEffect(() => {
    if (!product || product._id !== productId) {
      dispatch(getProductById(productId))
    } else {
      setFormData({
        _id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        countInStock: product.countInStock,
        description: product.description
      })
    }
  }, [productId, dispatch, product])
  const handleChange = evt => {
    const { name, value } = evt.target
    setFormData(prevData => {
      return { ...prevData, [name]: value }
    })
  }
  const uploadFileHandler = async evt => {
    const imageData = new FormData()
    imageData.append('image', evt.target.files[0])
    const res = await dispatch(uploadProductImage(imageData)).unwrap()
    setFormData(prevData => {
      return { ...prevData, image: res.image }
    })
  }
  const handleSubmit = evt => {
    evt.preventDefault()
    console.log(formData)
    dispatch(updateProduct({ formData, productId }))
    navigate('/admin/productlist')
  }
  return (
    <>
      <Button as={Link} to='/admin/productlist' className='btn-color my-3'>
        Go Back
      </Button>
      <FormContainer>
        <h1>Edit Product</h1>
        {!product ? (
          <Spinner />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Enter Name'
                value={name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='price' className='my-2'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                name='price'
                placeholder='Enter Price'
                value={price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image Url'
                value={image}
                name='image'
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='imageUpload' className='my-2'>
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type='file' onChange={uploadFileHandler} />
            </Form.Group>

            <Form.Group controlId='countInStock' className='my-2'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                name='countInStock'
                placeholder='Enter Count In Stock'
                value={countInStock}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='category' className='my-2'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                name='category'
                placeholder='Enter Category'
                value={category}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Enter Description'
                value={description}
                name='description'
                onChange={handleChange}
              />
            </Form.Group>
            <Button type='submit' className='my-2 btn-color'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}
