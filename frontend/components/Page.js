import PropTypes, { any } from 'prop-types'
import Header from './Header'

export default function Page({ children }) {
  return <Header />
}

Page.propTypes = {
  children: any,
}
