import { ApolloProvider } from '@apollo/client'
import Router from 'next/router'
import Page from '../components/Page'
import NProgress from 'nprogress'
// Default nprogress
// import 'nprogress/nprogress.css'
import '../components/styles/nprogress.css'
import withData from '../lib/withData'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

// The _app.js is a special case in next js to control something higher than in pages
function Regraph({ Component, pageProps, apollo }) {
  // console.log(apollo)
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  )
}

// Tell next.js to fetch all of the queries in the children components
Regraph.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  pageProps.query = ctx.query
  return { pageProps }
}

// Inject the Apollo client into the App
export default withData(Regraph)
