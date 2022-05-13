import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { Artist } from "@prisma/client";
import GradientLayout from "../components/GradientLayout";
import { useMe } from "../lib/hooks"
import prisma from "../lib/prisma";

export default function Home({artists}) {
  const { user, isLoading } = useMe();
  return (
    <GradientLayout 
      image={isLoading ? "" : user?.avatar}
      title={isLoading ? "" : `${user?.firstName} ${user?.lastName}`} 
      subTitle={"Profile"} 
      description={isLoading ? "" : `${user?.playlistsCount} Playlists found for you!`} 
      color={"red"} 
      rounded
    >
      <Box paddingX='40px' color='white'>
        <Box marginBottom="40px">
          <Text fontSize='2xl' fontWeight='bold'>
            Top artists this month
          </Text>
          <Text fontSize='md'>Only visible to you</Text>
        </Box>
        <Flex>
          {
            artists.map((artist: Artist)=>(
              <Box paddingX='10px' key={artist.id} width='20%'>
                <Box borderRadius='4px' padding='15px' width='100%'>
                  <Image 
                    src='https://placekitten.com/300/300'
                    borderRadius='100%'
                  />
                  <Box mt='20px'>
                    <Text fontSize='large'>{artist.name}</Text>
                    <Text fontSize='x-small'>Artist</Text>
                  </Box>
                </Box>
              </Box>
            ))
          }
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps =async () => {
  const artists = await prisma.artist.findMany({})

  return {
    props: { artists }
  }
}
