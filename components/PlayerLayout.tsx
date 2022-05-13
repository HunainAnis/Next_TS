import { Box } from "@chakra-ui/layout";
import PlayerBar from "./PlayerBar";
import Sidebar from "./Sidebar";

const PlayerLayout = ({children}) => {
    return(
        <Box width="100vw" height="100vh">
            <Box position="absolute" top="0" width="250px" left="0">
                <Sidebar />
            </Box>
            <Box marginStart="250px" marginBottom="100px">
                <Box height="calc(100vh - 100px)">
                    {children}
                </Box>
            </Box>
            <Box position="absolute" bottom="0" height="100px" width="100vw" left="0" bg="gray">
                <PlayerBar />
            </Box>
        </Box>
    )
}

export default PlayerLayout;