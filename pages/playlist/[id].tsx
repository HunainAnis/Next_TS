import { Playlist as playlistInterface, Song } from "@prisma/client"
import { useStoreActions } from "easy-peasy"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { FC } from "react"
import GradientLayout from "../../components/GradientLayout"
import SongsTable from "../../components/SongsTable"
import { validateToken } from "../../lib/auth"
import prisma from "../../lib/prisma"

const getBgColor = (id: string|number) => {
    const colors = [
        "red",
        "yellow",
        "green",
        "blue",
        "orange",
        "purple",
        "gray",
        "teal",
        "purple",
        "cyan",
        "pink",
    ]

    return colors[id] || colors[Math.floor(Math.random() * colors.length)]
}

interface PlaylistProps {
    playlist: playlistInterface | any
}

const Playlist: FC<PlaylistProps>  = (props) => {
    return (
        <GradientLayout 
            image={`https://picsum.photos/400?random=${props.playlist.id}`} 
            title={props.playlist.name} 
            subTitle={"The Playlist"} 
            description={`${props.playlist.songs.length} songs`} 
            color={getBgColor(props.playlist.id)}            
        >
            <SongsTable songs={props.playlist.songs}/>
        </GradientLayout>
    )
}

export const getServerSideProps = async ({ query, req }: GetServerSidePropsContext) => {

    let user: { id: any }

    try {
        user = validateToken(req.cookies.TRAX_ACCESS_TOKEN)
    } catch (error) {
        return {
            redirect:{
                permanent:false,
                destination:"/signin"
            }
        }
    }
    
    const playlist = await prisma.playlist.findFirst({
        where:{
            id: Number(query.id),
            userId: user.id
        },
        include:{
            songs:{
                include:{
                    Artist:{
                        select:{
                            name: true,
                            id: true
                        }
                    }
                }
            }
        }
    })
    return {
        props: { playlist }
    }
}

export default Playlist