import { useMutation, useQuery } from '@apollo/client'
import {
  SINGLE_PRODUCT_QUERY,
  UPDATE_PRODUCT_MUTATION,
} from '../lib/services/product'

export default function UpdateProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  })

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    variables: { id },
  })

  if (loading && updateLoading) return <p>Loading...</p>
  if (error && updateError) return <DisplayError error={error} />

  const { Product } = data
  console.log(Product)

  return (
    <div>
      <p>UpdateProduct - {id}</p>
    </div>
  )
}
