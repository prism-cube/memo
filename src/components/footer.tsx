import { Box, Flex, Text, Link } from '@chakra-ui/react'

const Footer = () => {
  return (
    <footer>
      <Flex
        as="nav"
        align="center"
        justify="center"
        wrap="wrap"
        w="100%"
        px={4}
        py={2}
      >
        <Box>
          <Text fontSize="sm">
            © 2022{' '}
            <Link href="https://prism-cube.com" target="_blank">
              PrismCube
            </Link>
          </Text>
        </Box>
      </Flex>
    </footer>
  )
}

export default Footer
