import { useMutation, useQuery } from '@apollo/client'
import {
  SINGLE_PRODUCT_QUERY,
  UPDATE_PRODUCT_MUTATION,
} from '../lib/services/product'
import Router from 'next/router'
import useForm from '../lib/hooks/useForm'
import Form from './styles/Form'
import DisplayError from './DisplayError'

export default function UpdateProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  })

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION)

  const { inputs, handleChange, clearForm, resetForm } = useForm(
    data?.Product || {
      name: '',
      description: '',
      price: '',
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await updateProduct({
        variables: {
          id,
          data: {
            name: inputs.name,
            price: inputs.price,
            description: inputs.description,
          },
        },
      })

      Router.push({
        pathname: `/product/${res.data.updateProduct.id}`,
      })
    } catch (error) {
      console.log(error)
    }
  }

  if (loading || updateLoading) return <p>Loading...</p>
  if (error || updateError) return <DisplayError error={error} />

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error || updateError} />

      <fieldset
        disabled={loading || updateLoading}
        aria-busy={loading || updateLoading}
      >
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

        <button type="submit">Edit product</button>

        <button type="button" onClick={resetForm}>
          Reset
        </button>
      </fieldset>
    </Form>
  )
}
