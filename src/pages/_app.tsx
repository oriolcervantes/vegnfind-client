import '../styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '../components/layout';
import { store } from '../redux/store';
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
