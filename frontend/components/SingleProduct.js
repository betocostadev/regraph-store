import { useQuery } from '@apollo/client'
import { SINGLE_PRODUCT_QUERY } from '../lib/services/product'
import DisplayError from './DisplayError'
import Head from 'next/head'
import styled from 'styled-components'

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  grid-gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  })
  // console.log({ data, loading, error })

  if (loading) return <p>Loading...</p>
  if (error) return <DisplayError error={error} />

  const { Product } = data

  return (
    <ProductStyles>
      <Head>
        <meta name="description" content={Product.description} />
        <title>Regraph | {Product.name}</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.altText}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </ProductStyles>
  )
}
