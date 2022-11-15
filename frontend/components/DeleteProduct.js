import { useMutation } from '@apollo/client'
import { DELETE_PRODUCT_MUTATION } from '../lib/services/product'

export default function DeleteProduct({ id, children }) {
  const update = (cache, payload) => {
    cache.evict(cache.identify(payload.data.deleteProduct))
  }
  // Instead of being lazy and refreshing, we will remove the product from the allProducts cache,
  // when it is deleted from the DB. GraphQL will run the update function passed below
  const [deleteProduct, { data, error, loading }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    { variables: { id: id }, update }
  )

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteConfirmation = () =>
    confirm('Are you sure you want to delete this product?')
      ? handleDeleteProduct()
      : undefined

  if (loading) return <p>Loading</p>
  if (error) alert(error)

  // We are using hard delete here, we will not only change the status of the item in the DB
  return (
    <button type="button" disabled={loading} onClick={handleDeleteConfirmation}>
      {children}
    </button>
  )
}
