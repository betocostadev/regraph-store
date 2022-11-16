import Head from 'next/head'
import Link from 'next/link'
import PaginationStyles from './styles/PaginationStyles'
import DisplayError from './DisplayError'
import { ALL_PRODUCTS_META_QUERY } from '../lib/services/products'
import { useQuery } from '@apollo/client'
import { perPage } from '../config'

export default function Pagination({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_META_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <DisplayError error={error} />

  const { count } = data._allProductsMeta
  const pageCount = Math.ceil(count / perPage)

  return (
    <PaginationStyles>
      <Head>
        <title>Regraph Store - Page {page} of ___</title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  )
}
