import { Box, Flex } from "@chakra-ui/layout";
import { Button, Input } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { auth } from "../lib/mutations";

const AuthForm: FC<{mode: "signin"|"signup"}> = ({ mode }) => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const user = await auth(mode, { email, password})
        setIsLoading(false);
        router.push("/")
    }

    return(
        <Box height="100vh" width="100vw" bg="black" color='white'>
            <Flex justify='center' align='center' height='100px' borderBottom='1px solid white'>
                <Image 
                    src='/logo2.svg'
                    width={120}
                    height={60}
                />
            </Flex>
            <Flex justify='center' align='center' height='calc(100vh - 100px)'>
                <Box padding='50px' bg='gray.900' borderRadius='6px'>
                    <form onSubmit={handleSubmit}>
                        <Input 
                            placeholder='Email'
                            type='text'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <Input 
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <Button 
                            type="submit" 
                            bg='green.500' 
                            isLoading={isLoading} 
                            sx={{
                                '&:hover':{
                                    bg:'green.400'
                                }
                            }}
                        >
                            {mode==='signup' ? "Sign Up":"Sign In"}
                        </Button>
                    </form>
                </Box>
            </Flex>
        </Box>
    )
}

export default AuthForm;