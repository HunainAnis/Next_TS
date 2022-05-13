import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { StoreProvider } from 'easy-peasy'
import { createContext, useState } from 'react'
import 'reset-css'
import PlayerLayout from '../components/PlayerLayout'
import { store } from '../lib/store'

const theme = extendTheme({
  colors: {
    gray: {
      100: '#F5f5f5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    }
  },
  components: {
    Button: {
      variants: {
        link: {
          ":focus": {
            outline: "none",
            boxShadow: "none",
          }
        }
      }
    }
  }
})
export const storeContext = createContext(null);
function MyApp({ Component, pageProps }) {
  const [ activeSongs, setActiveSongs ] = useState([])
  const [ activeSong, setActiveSong ] = useState(null)
  return (
    <ChakraProvider theme={theme}>
      <storeContext.Provider value={{activeSong, setActiveSong, activeSongs, setActiveSongs}}>
        {
          Component.authPage
          ?
          <Component {...pageProps} />
          :
          <PlayerLayout>
            <Component {...pageProps} />
          </PlayerLayout>
        }
      </storeContext.Provider>
    </ChakraProvider>
  )
}

export default MyApp
