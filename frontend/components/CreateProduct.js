import { useMutation } from '@apollo/client'
import Router from 'next/router'
import useForm from '../lib/hooks/useForm'
import Form from './styles/Form'
import DisplayError from './DisplayError'
import { CREATE_PRODUCT_MUTATION } from '../lib/services/product'
import { ALL_PRODUCTS_QUERY } from '../lib/services/products'

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: '',
    price: '',
    description: '',
  })

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      // referetch all the products to update the products page
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await createProduct()
    clearForm()
    Router.push({
      pathname: `/product/${res.data.createProduct.id}`,
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />

      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Product image
          <input
            required
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">+ Add Product</button>

        <button type="button" onClick={resetForm}>
          Reset
        </button>
      </fieldset>
      {/* <button type="button" onClick={clearForm}>
        Zera a bosta
      </button> */}
    </Form>
  )
}
