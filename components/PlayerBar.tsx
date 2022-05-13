import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Tooltip } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { storeContext } from "../pages/_app";
import Player from "./Player";

const PlayerBar = () => {
    const { activeSong, activeSongs } = useContext(storeContext);
    const [ volume, setVolume ] = useState(0.1)
    const soundRef = useRef(null)

    const onVolumeChange = (e) => {
        setVolume(parseFloat(e[0]))
        soundRef?.current?.volume(e[0])
    }

    useEffect(()=>{
        soundRef?.current?.volume(volume)
    }, [activeSong])

    return(
        <Box height='100%' width='100vw' padding='10px' bg='gray.900' color='white'>
            <Flex align='center'>
                {
                    activeSong
                    ?
                    <Box padding='10px' width='30%'>
                        <Flex align='center'>
                            <Box marginEnd='20px'>
                                <Image 
                                    src={`https://picsum.photos/400?random=${activeSong.id}`} 
                                    boxSize={"60px"}
                                />
                            </Box>
                            <Box>
                                <Text fontSize='medium' fontWeight='bold'>{activeSong.name}</Text>
                                <Text fontSize='x-small'>{activeSong.Artist.name}</Text>
                            </Box>
                        </Flex>
                    </Box>
                    : null
                }
                <Box width='40%' textAlign='center'>
                    {
                        activeSong
                        ?
                        <Player 
                            songs={activeSongs} 
                            activeSong={activeSong} 
                            soundRef={soundRef}
                        />
                        : null
                    }
                </Box>
                <Flex width='30%' justify={"end"} >
                    {
                        activeSong
                        ?
                        <Box width='30%'>
                            <RangeSlider 
                                aria-label={['min', 'max']}
                                min={0}
                                max={1}
                                step={0.01}
                                id="player-volume"
                                value={[volume]}
                                onChange={onVolumeChange}
                            >
                                <RangeSliderTrack bg='gray.800'>
                                    <RangeSliderFilledTrack bg='gray.600' />
                                </RangeSliderTrack>
                                <Tooltip
                                    hasArrow
                                    bg='gray.900'
                                    color='white'
                                    placement='bottom'
                                    isOpen={true}
                                    label={`${Math.round(volume*100)}%`}
                                >
                                    <RangeSliderThumb index={0} />
                                </Tooltip>
                            </RangeSlider>
                        </Box>
                        :
                        null
                    }
                </Flex>
            </Flex>
        </Box>
    )
}

export default PlayerBar;