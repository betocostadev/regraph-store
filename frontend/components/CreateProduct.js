import useForm from '../lib/hooks/useForm'

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: '',
    price: '',
    description: '',
    avatar: '',
  })

  return (
    <form>
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
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          value={inputs.description}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar">
        Avatar
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
          value={inputs.avatar}
          onChange={handleChange}
        />
      </label>
      <button type="button" onClick={resetForm}>
        Reseta
      </button>
      <button type="button" onClick={clearForm}>
        Zera a bosta
      </button>
    </form>
  )
}
