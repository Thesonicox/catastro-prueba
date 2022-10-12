import { ApolloProvider } from '@apollo/client'
import client from './api/apollo_client'
import 'antd/dist/antd.css';
import LayoutComponent from '../src/components/Layout/LayoutComponent'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={ client }>
      <LayoutComponent>
        <Component {...pageProps}/>
      </LayoutComponent>
    </ApolloProvider>
  ) 
}

export default MyApp