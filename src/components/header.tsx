import { Box, Flex, Text } from '@chakra-ui/react'

const Header = () => {
  return (
    <header>
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
          <Text fontSize="lg" fontWeight="bold">
            Browser Notepad
          </Text>
        </Box>
      </Flex>
    </header>
  )
}

export default Header
