import UpdateProduct from '../components/UpdateProduct'

export default function UpdatePage({ query }) {
  if (!query?.id)
    return <p>The product you are trying to update was not found.</p>

  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  )
}
