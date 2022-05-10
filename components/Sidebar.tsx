import { Box, Divider, LinkBox, LinkOverlay, List, ListIcon, ListItem } from "@chakra-ui/layout";
import Image from "next/image";
import Link from "next/link";
import { MdFavorite, MdHome, MdLibraryMusic, MdPlaylistAdd, MdSearch } from 'react-icons/md'
import MenuItem from "./MenuItem";
const navItems = [
    {
        name:"Home",
        icon: MdHome,
        route: "/"
    },
    {
        name:"Search",
        icon: MdSearch,
        route: "/search"
    },
    {
        name:"Your Library",
        icon: MdLibraryMusic,
        route: "/library"
    },
]

const musicMenu = [
    {
        name:"Create Playlist",
        icon: MdPlaylistAdd,
        route: "/"
    },
    {
        name:"Favorites",
        icon: MdFavorite,
        route: "/"
    }
]

const playlists = new Array(30).fill(1).map((_, i) => `Playlist ${i+1}`)

const Sidebar = () => {
    return(
        <Box width="100%" height="calc(100vh - 100px)" bg="black" paddingX="5px" color="gray">
            <Box paddingY="20px" height="100%">
                <Box width="120px" paddingX="20px" marginBottom="20px">
                    <Image src="/logo2.svg" width={120} height={60} />
                </Box>
                <Box marginBottom="20px">
                    <List spacing={2}>
                        {
                            navItems.map((item, i)=>(
                                <MenuItem item={item} key={i} />
                            ))
                        }
                    </List>
                </Box>
                <Box marginBottom="20px">
                    <List spacing={2}>
                        {
                            musicMenu.map((item, i)=>(
                                <MenuItem item={item} key={i} />
                            ))
                        }
                    </List>
                </Box>
                <Divider color="gray.800" />
                <Box height="66%" overflowY="auto" paddingY="20px">
                    <List spacing={2}>
                        {
                            playlists.map((item) => (
                                <ListItem key={item} paddingX="20px">
                                    <LinkBox>
                                        <Link href="/" passHref>
                                            <LinkOverlay>
                                                {item}
                                            </LinkOverlay>
                                        </Link>
                                    </LinkBox>
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
            </Box>
        </Box>
    )
}

export default Sidebar;