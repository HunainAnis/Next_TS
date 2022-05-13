import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { artistsData } from "./songsData";

const prisma = new PrismaClient();

const run =async () => {
    await Promise.all(artistsData.map(async (artist) => {
        return prisma.artist.upsert({
            where: { name: artist.name },
            update: {},
            create: {
                name: artist.name,
                songs: {
                    create: artist.songs.map(song => ({
                        name: song.name,
                        duration: song.duration,
                        url: song.url,
                    }))
                }
            }
        })
    }))

    const salt = bcrypt.genSaltSync();
    const user = await prisma.user.upsert({
        where: { email: "user@gmail.com"},
        update: {},
        create: {
            email: "user@gmail.com",
            password: bcrypt.hashSync("password", salt),
            firstName: "Hunain",
            lastName: "Anis",
            avatar: "https://tinted-gym-f99.notion.site/image/https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Fbgiv0ssz3xpotz9%2Fpeep.png%3Fdl%3D0?table=block&id=33f9771b-0e6f-4a72-832c-69ed2d41f290&spaceId=511cd811-5561-4a61-b550-c4086b4afafb&width=2000&userId=&cache=v2"
        }
    })

    const songs = await prisma.song.findMany({})
    await Promise.all(new Array(10).fill(1).map(async (_, i) => {
        return prisma.playlist.create({
            data: {
                name: `Playlist ${i+1}`,
                user: {
                    connect: { id: user.id}
                },
                songs: {
                    connect: songs.map((song)=> ({
                        id: song.id
                    }))
                }
            }
        })
    }))
}

run()
.then()
.catch(e => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect()
})