import {
  Icon,
  IconButton,
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
import { MdInfoOutline } from 'react-icons/md'

const Information = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          variant="outline"
          colorScheme="gray"
          aria-label="Popover"
          icon={<Icon as={MdInfoOutline} w={6} h={6} color="gray.100" />}
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
  )
}

export default Information
