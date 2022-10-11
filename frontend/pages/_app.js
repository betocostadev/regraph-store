import NProgress from 'nprogress'
import Router from 'next/router'
import Page from '../components/Page'

// Default nprogress
// import 'nprogress/nprogress.css'

import '../components/styles/nprogress.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

// The _app.js is a special case in next js to control something higher than in pages
export default function Regraph({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  )
}
