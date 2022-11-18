import { ALL_PRODUCTS_META_QUERY } from './services/products'

// Apollo will first ask the read() for the items
// If read() returns false, Apollo will do a network request to fetch the items and build the cache
// It will then merge() and come back to the read()
export default function paginationField() {
  return {
    keyArgs: false, // tells Apollo that we will take care of this part of the cache
    read(existing = [], { args, cache }) {
      // console.log({ existing, args, cache })
      const { skip, first } = args
      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY })
      const count = data?._allProductsMeta?.count
      const page = skip / first + 1
      const pages = Math.ceil(count / first)
      // Filter to avoid undefined items
      const items = existing.slice(skip, skip + first).filter((item) => item)
      if (items.length && items.length !== first && page === pages) {
        // There are items and there aren't enough the items to satisfy how many we requested
        // And we are on the last page
        return items
      }
      if (items.length !== first) {
        // No items, fetch from network
        return false
      }

      if (items.length) {
        // There are items in the cache! Gonna send them to apollo
        return items
      }

      return false
    },
    merge(existing, incoming, { args }) {
      // Runs when the Apollo client comes back from the network with data
      // console.log(existing, incoming, { args })
      const { skip, first } = args
      const merged = existing ? existing.slice(0) : []
      for (let index = skip; index < skip + incoming.length; ++index) {
        merged[index] = incoming[index - skip]
      }
      return merged
    },
  }
}
