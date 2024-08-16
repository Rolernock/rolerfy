import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../slices/productSlice'
import Spinner from '../../components/Spinner'
import ProductItem from './ProductItem'
import { useDispatch, useSelector } from 'react-redux'

export default function ProductScreen() {
  const dispatch = useDispatch()
  const { product } = useSelector(state => state.products)
  const { id } = useParams()
  useEffect(() => {
    dispatch(getProductById(id))
  }, [id])

  return <>{!product ? <Spinner /> : <ProductItem product={product} />}</>
}
