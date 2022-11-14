import { useState, useEffect } from 'react'

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial)
  const initialValues = Object.values(initial).join('')

  useEffect(() => {
    // updated the form inputs if it receives server data
    setInputs(initial)
  }, [initialValues])

  function handleChange(e) {
    let { value, name, type } = e.target

    // Handle numbers
    if (type === 'number' && value) value = parseFloat(value)
    // Handle file upload
    if (type === 'file') [value] = e.target.files

    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  function clearForm() {
    const blankState = Object.entries(inputs).map(([key, value]) => [key, ''])

    setInputs(Object.fromEntries(blankState))
  }

  function resetForm() {
    setInputs(initial)
  }

  return { inputs, handleChange, clearForm, resetForm }
}
