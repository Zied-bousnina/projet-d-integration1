import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'
// add bootstrap css
import {QueryClientProvider, QueryClient} from 'react-query'

// import { Provider } from 'react-redux'
// import { store } from '../redux/store';


// create client
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  return(
    // <Provider store={store}>

    <QueryClientProvider client={queryClient}>
    <SessionProvider session={pageProps.session}>

<Component {...pageProps} />
</SessionProvider>
    </QueryClientProvider>
    // </Provider>


    )
}

export default MyApp
