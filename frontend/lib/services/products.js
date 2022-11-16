import gql from 'graphql-tag'

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      description
      price
      photo {
        image {
          id
          publicUrlTransformed
        }
      }
    }
  }
`

export const ALL_PRODUCTS_META_QUERY = gql`
  query ALL_PRODUCTS_META_QUERY {
    _allProductsMeta {
      count
    }
  }
`
