import { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  Icon,
  IconButton,
  Textarea,
} from '@chakra-ui/react'
import { BiSave, BiTrash } from 'react-icons/bi'
import { MdAdd } from 'react-icons/md'
import { useLiveQuery } from 'dexie-react-hooks'
import Header from './components/header'
import Footer from './components/footer'
import Information from './components/information'
import { db } from './libs/dexie'
import { Memo } from './types'
import usePageTracking from './hooks/useTracking'

function App() {
  usePageTracking()

  const memos = useLiveQuery(() => db.memos.reverse().sortBy('updatedAt')) || []

  const [memo, setMemo] = useState<Memo>()
  let isSetMemo = false

  useEffect(() => {
    if (!isSetMemo && memos.length > 0) {
      setMemo(memos[0])
      isSetMemo = true
    }
  }, [memos])

  const changeMemo = async (id: number) => {
    const m = await db.memos.get(id)
    setMemo(m)
  }

  const addMemo = async () => {
    await db.memos.add({
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  const saveMemo = async (id: number | undefined) => {
    if (!id) return
    await db.memos.update(id, {
      content: memo?.content,
      updatedAt: new Date(),
    })
  }

  const deleteMemo = async (id: number | undefined) => {
    if (!id) return
    db.memos.delete(id)
    const ms = await db.memos.reverse().sortBy('updatedAt')
    if (ms.length > 0) {
      setMemo(ms[0])
    } else {
      addMemo()
      isSetMemo = false
    }
  }

  const setContent = async (value: string) => {
    setMemo({ ...memo!, content: value })
  }

  return (
    <>
      <Header />
      <main>
        <Box px={4}>
          <HStack h="calc(100vh - 80px)">
            <VStack
              w="320px"
              h="100%"
              display={{ base: 'none', md: 'block' }}
              overflow="auto"
              pr={1}
            >
              <Flex justify="space-between" w="100%">
                <HStack>
                  <IconButton
                    variant="outline"
                    colorScheme="gray"
                    aria-label="Add memo"
                    icon={<Icon as={MdAdd} w={6} h={6} color="gray.100" />}
                    onClick={addMemo}
                  />
                </HStack>
                <HStack>
                  <IconButton
                    variant="outline"
                    colorScheme="gray"
                    aria-label="Delete memo"
                    icon={<Icon as={BiTrash} w={6} h={6} color="gray.100" />}
                    onClick={() => deleteMemo(memo?.id)}
                  />
                </HStack>
              </Flex>
              {memos.map((m) => (
                <VStack
                  key={m.id}
                  p={2}
                  alignItems="flex-start"
                  borderRadius="lg"
                  bgImage={
                    m.id == memo?.id!
                      ? 'linear-gradient(150deg, rgba(221, 151, 18, 0.8) 10%, rgba(202, 163, 15, 0.8) 90%)'
                      : ''
                  }
                  _hover={m.id == memo?.id ? {} : { bg: 'gray.700' }}
                  cursor={m.id == memo?.id ? 'default' : 'pointer'}
                  onClick={() => changeMemo(m.id!)}
                >
                  <Text
                    fontWeight="bold"
                    w="100%"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {m.content.trim().split(/\n/)[0]}
                  </Text>
                  <Text color={m.id == memo?.id ? 'gray.50' : 'gray.100'}>
                    {m.updatedAt.toLocaleDateString()}
                  </Text>
                </VStack>
              ))}
            </VStack>
            <VStack h="100%" w="100%">
              <Flex justify="space-between" w="100%">
                <IconButton visibility="hidden" aria-label="Dummy" />
                <HStack>
                  <Text color="gray.100">
                    {memo?.updatedAt.toLocaleString()}
                  </Text>
                  <IconButton
                    variant="outline"
                    colorScheme="gray"
                    aria-label="Save memo"
                    icon={<Icon as={BiSave} w={6} h={6} color="gray.100" />}
                    onClick={() => saveMemo(memo?.id)}
                  />
                </HStack>
                <Information />
              </Flex>
              <Textarea
                h="100%"
                value={memo?.content}
                onChange={(e) => setContent(e.target.value)}
              />
            </VStack>
          </HStack>
        </Box>
      </main>
      <Footer />
    </>
  )
}

export default App
