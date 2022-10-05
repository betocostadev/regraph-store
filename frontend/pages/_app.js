import Page from '../components/Page'

// The _app.js is a special case in next js to control something higher than in pages
export default function Regraph({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  )
}
