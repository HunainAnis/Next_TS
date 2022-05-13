import { Box, Flex, Text } from "@chakra-ui/layout";
import { IconButton, Image, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { Song } from "@prisma/client";
import { formatDate, formatTime } from "../lib/formatters";
import { useStoreActions } from "easy-peasy";
import { useContext } from "react";
import { storeContext } from "../pages/_app";
const SongsTable = ({ songs }) => {
    const { setActiveSong, setActiveSongs } = useContext(storeContext);
  
    const handlePlay = (activeSong?) => {
      setActiveSong(activeSong || songs[0])
      setActiveSongs(songs)
    }

    return(
        <Box bg='transparent' color='white'>
            <Box padding='10px' marginBottom='20px'>
                <Box marginBottom='20px'>
                    <IconButton 
                        aria-label="play"
                        icon={<BsFillPlayFill fontSize='20px' />}
                        colorScheme='green'
                        size='lg'
                        isRound
                        onClick={()=>handlePlay()}
                    />
                </Box>
                <Table variant='unstyled'>
                    <Thead borderBottom='1px solid' borderColor='rgba(255, 255, 255, 0.2)'>
                        <Tr textAlign='right'>
                            <Th>#</Th>
                            <Th>TITLE</Th>
                            <Th>DATE ADDED</Th>
                            <Th><AiOutlineClockCircle /></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            songs.map((song: any) => (
                                <Tr
                                    sx={{
                                        transition: 'all 0.3s',
                                        "&:hover":{
                                            bg:'rgba(255, 255, 255, 0.1)'
                                        },
                                    }}
                                    key={song.id}
                                    cursor={'pointer'}
                                    onClick={()=>handlePlay(song)}
                                >
                                    <Td>{song.id}</Td>
                                    <Td>
                                        {
                                            <Flex align='center'>
                                                <Box marginEnd='20px'>
                                                    <Image 
                                                        src={`https://picsum.photos/400?random=${song.id}`}
                                                        boxSize='40px'
                                                    />
                                                </Box>
                                                <Box>
                                                    <Text fontSize='md' fontWeight='bold'>{song.name}</Text>
                                                    <Text fontSize='x-small'>{song.Artist.name}</Text>
                                                </Box>
                                            </Flex>
                                        }
                                    </Td>
                                    <Td>{formatDate(song.createdAt)}</Td>
                                    <Td>{ formatTime(song.duration)}</Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </Box>
        </Box>
    )
}

export default SongsTable;