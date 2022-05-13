import { Box, Flex, Text } from "@chakra-ui/layout"
import { Image, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react"
import { FC } from "react"

interface GradientLayout {
    image: string;
    title: string;
    subTitle: string;
    description: string;
    color: string;
    rounded?: boolean;
}

const GradientLayout: FC<GradientLayout> = ({
    children,
    image,
    title,
    subTitle,
    description,
    color,
    rounded
}) => {
    return(
        <Box 
            height='100%' 
            bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0, 0, 0, 0.95) 75%)`} 
            overflowY='auto' 
        >
            <Flex padding='40px' align='end'>
                <Box paddingEnd={"20px"}>
                    {
                        image.length < 1
                        ?
                        <SkeletonCircle size='160' />
                        :
                        <Image 
                            src={image}
                            boxSize='160px'
                            borderRadius={rounded?'full':0}
                            boxShadow={"2xl"}
                        />
                    }
                </Box>
                <Box color='white' lineHeight='35px'>
                    <Text fontSize='x-small' fontWeight='bold'>{subTitle}</Text>
                    {
                        title.length < 1
                        ?
                        <Skeleton width="80px" height="40px" mb='2'  />
                        :
                        <Text fontSize='xxx-large' fontWeight='extrabold'>{title}</Text>
                    }
                    {
                        description.length < 1
                        ?
                        <Skeleton width="70px" height="10px" />
                        :
                        <Text fontSize='x-small' fontWeight='bold'>{description}</Text>
                    }
                </Box>
            </Flex>
            <Box paddingY={"50px"}>{children}</Box>
        </Box>
    )
}

export  default GradientLayout