import useForm from '../lib/hooks/useForm'
import Form from './styles/Form'

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: '',
    price: '',
    description: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset disabled={false} aria-busy={false}>
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
