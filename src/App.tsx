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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'
import { BiSave, BiTrash } from 'react-icons/bi'
import { MdAdd, MdInfoOutline } from 'react-icons/md'
import { useLiveQuery } from 'dexie-react-hooks'
import Header from './components/header'
import { db } from './libs/dexie'
import { Memo } from './types'

function App() {
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
    }
  }

  const setContent = async (value: string) => {
    setMemo({ ...memo!, content: value })
  }

  const [isOpen, setIsOpen] = useState<Boolean>(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <>
      <Header />
      <main>
        <Box px={4} py={2}>
          <HStack h="calc(100vh - 64px)">
            <VStack
              w="320px"
              h="100%"
              display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
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
                  bg={m.id == memo?.id! ? 'yellow.500' : ''}
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
                <IconButton
                  visibility="hidden"
                  aria-label="Popover dummy"
                  icon={<Icon as={MdInfoOutline} w={6} h={6} />}
                />
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
                <Popover>
                  <PopoverTrigger>
                    <IconButton
                      variant="outline"
                      colorScheme="gray"
                      aria-label="Popover"
                      icon={
                        <Icon as={MdInfoOutline} w={6} h={6} color="gray.100" />
                      }
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Browser Notepadについて</PopoverHeader>
                    <PopoverBody>
                      <UnorderedList>
                        <ListItem>ブラウザで動作するオンラインメモ帳</ListItem>
                        <ListItem>複数メモ対応(PCのみ)</ListItem>
                        <ListItem>データはブラウザ(IndexedDB)に保存</ListItem>
                        <ListItem>送信機能なし</ListItem>
                      </UnorderedList>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
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
    </>
  )
}

export default App
