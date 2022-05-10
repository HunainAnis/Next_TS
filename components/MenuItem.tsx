import { LinkBox, LinkOverlay, ListIcon, ListItem } from "@chakra-ui/layout"
import Link from "next/link"

const MenuItem = ({ item }) => {
    return(
        <ListItem paddingX="20px">
            <LinkBox>
                <Link href={item.route} passHref>
                    <LinkOverlay>
                        <ListIcon as={item.icon} color="white" marginRight="20px" />
                        {item.name}
                    </LinkOverlay>
                </Link>
            </LinkBox>
        </ListItem>
    )
}

export default MenuItem;