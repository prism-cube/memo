import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors = {
  gray: {
    100: '#adadb8',
    200: '#848494',
    300: '#53535f',
    400: '#3b3b44',
    500: '#323239',
    600: '#26262c',
    700: '#1f1f23',
    800: '#18181b',
    900: '#0e0e10',
  },
}

const styles = {
  global: (props: any) => ({
    body: {
      bg: mode('#fafafa', 'gray.900')(props),
    },
  }),
}

const theme = extendTheme({
  config,
  colors,
  styles,
})

export default theme
