import { Box, Center, Flex, Text } from "@chakra-ui/layout"
import { ButtonGroup, IconButton, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from "@chakra-ui/react";
import { Song } from "@prisma/client";
import { useContext, useEffect, useRef, useState } from "react";
import ReactHowler from 'react-howler'
import { MdOutlinePauseCircleFilled, MdOutlinePlayCircleFilled, MdOutlineRepeat, MdPause, MdPlayArrow, MdShuffle, MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { formatTime } from "../lib/formatters";
import { storeContext } from "../pages/_app";
const Player = ({ activeSong, songs, soundRef }) => {

    const [ playing, setPlaying ] = useState(true);
    const [ index, setIndex ] = useState(
        songs.findIndex((k:Song)=>k.id===activeSong.id)
    );
    const [ seek, setSeek ] = useState(0.0);
    const [ repeat, setRepeat ] = useState(false);
    const [ isSeeking, setIsSeeking ] = useState(false);
    const [ shuffle, setShuffle ] = useState(false);
    const [ duration, setDuration ] = useState(0.0);

    const { setActiveSong } = useContext(storeContext);

    const repeatRef = useRef(repeat);

    useEffect(()=>{
        let timerId;
        if(playing && !isSeeking) {
            const f = () => {
                setSeek(soundRef.current.seek())
                timerId = requestAnimationFrame(f)
            }

            timerId = requestAnimationFrame(f)
            return () => cancelAnimationFrame(timerId)
        }

        cancelAnimationFrame(timerId)

    }, [playing, isSeeking])

    useEffect(()=>{
        setActiveSong(songs[index])
        console.log("INDEX", index)
    }, [index])

    useEffect(()=>{
        setPlaying(true)
    }, [activeSong])

    useEffect(()=>{
        repeatRef.current = repeat;
    }, [repeat])

    const prevSong = () => {
        setIndex((state)=>{
            return state ? state - 1 : songs.length-1
        })
    }
    const nextSong = () => {
        setIndex((state)=>{
            if(shuffle) {
                debugger
                const next = Math.floor(Math.random() * songs.length);
                if(next===state) {
                    return nextSong()
                }
                return next
            }else {
                return state===songs.length-1 ? 0 : index+1
            }
        })
        console.log("INDEx", index)
    }

    const onEnd = () => {
        if(repeatRef.current) {
            setSeek(0)
            soundRef.current.seek(0)
        }else{
            nextSong()
        }
    }

    const onLoad = () => {
        const songDuration = soundRef.current.duration()
        setDuration(songDuration)
    }

    const onSeek = (e) => {
        setSeek(parseFloat(e[0]))
        soundRef.current.seek(e[0])
    }
    return(
        <Box width='100%'>
            <Box>
                <ReactHowler 
                    onLoad={onLoad}
                    onEnd={onEnd}
                    playing={!isSeeking && playing}
                    src={activeSong?.url}
                    ref={soundRef}

                />
            </Box>
            <Box>
                <Center>
                    <ButtonGroup>
                        <IconButton 
                            outline='none' 
                            variant='link' 
                            icon={<MdShuffle />} 
                            aria-label='shuffle' 
                            fontSize='24px'
                            onClick={()=>setShuffle((prev)=>!prev)}
                            color={shuffle ? 'white':'gray.600'}
                        />
                        <IconButton 
                            outline='none' 
                            variant='link' 
                            icon={<MdSkipPrevious />} 
                            aria-label='previous' 
                            fontSize='24px'
                            onClick={prevSong}
                        />
                        {
                            playing
                            ?
                            <IconButton 
                                outline='none' 
                                variant='link'
                                color='white' 
                                icon={<MdOutlinePauseCircleFilled />} 
                                aria-label='pause' 
                                fontSize='50px'
                                onClick={()=>setPlaying(false)}
                            />
                            :
                            <IconButton 
                                outline='none' 
                                variant='link'
                                color='white' 
                                icon={<MdOutlinePlayCircleFilled />} 
                                aria-label='play' 
                                fontSize='50px'
                                onClick={()=>setPlaying(true)}
                            />
                        }
                        <IconButton 
                            outline='none' 
                            variant='link' 
                            icon={<MdSkipNext />} 
                            aria-label='next' 
                            fontSize='24px'
                            onClick={nextSong}
                        />
                        <IconButton 
                            outline='none' 
                            variant='link' 
                            icon={<MdOutlineRepeat />} 
                            aria-label='repeat' 
                            fontSize='24px'
                            onClick={()=>setRepeat((prev)=>!prev)}
                            color={repeat ? 'white':'gray.600'}
                        />
                    </ButtonGroup>
                </Center>
            </Box>
            <Box color='gray.600'>
                <Flex justify='center' align='center'>
                    <Box width='10%'>
                        <Text fontSize='xs'>{formatTime(seek)}</Text>
                    </Box>
                    <Box width='80%'>
                        <RangeSlider 
                            aria-label={['min', 'max']}
                            min={0}
                            max={duration ? Number(duration.toFixed(2)) : 0}
                            step={0.1}
                            id="player-range"
                            value={[seek]}
                            onChange={onSeek}
                            onChangeStart={()=>setIsSeeking(true)}
                            onChangeEnd={()=>setIsSeeking(false)}
                        >
                            <RangeSliderTrack bg='gray.800'>
                                <RangeSliderFilledTrack bg='gray.600' />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                        </RangeSlider>
                    </Box>
                    <Box width='10%' textAlign='right'>
                        <Text fontSize='xs'>{formatTime(duration)}</Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default Player;