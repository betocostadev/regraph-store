import PropTypes from 'prop-types'
import Header from './Header'

export default function Page({ children }) {
  return <Header />
}

Page.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}
