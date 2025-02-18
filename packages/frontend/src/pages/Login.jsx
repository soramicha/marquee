import { Box, Link, Text, Center, Button, Input } from '@chakra-ui/react'
import { useState } from "react"

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logUser = () => {
        // login user
        console.log(email, password)
    }

    return <div style={{ backgroundColor:"#F3F3F3", display: "flex", justifyContent:"center", alignItems:"center", width: "100vw", height: "100vh"}}>
        <Box maxH="90vh" overflowY="auto" borderWidth={0} h="450px" bg="white" borderRadius={"15px"} alignItems="center" w="450px" p={3}>
        <Center>
            <Text mt={10} textStyle="3xl" color="black">Welcome Back</Text>
        </Center>
        <Center>
        <Text pt={6} textStyle="sm" color="black" display="flex" justifyContent="center" alignItems="center" mt={1}>
          Buy, sell, and trade with students on your campus.
          </Text>
        </Center>
        <Center>
        <Text textStyle="sm" color="black" display="flex" justifyContent="center" alignItems="center" mt={1}>
          Sign in to start connecting!
          </Text>
        </Center>
        <Center>
          <Input
          mt={5}
          borderWidth={0}
            borderRadius={"10px"}
            width={"90%"}
            color="#989898"
            backgroundColor="#F3F3F3"
            placeholder="Username@yourschool.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          ></Input>
          </Center>
          <Center>
          <Input
          borderWidth={0}
            borderRadius={"10px"}
            width={"90%"}
            color="#989898"
            backgroundColor="#F3F3F3"
            mt={4}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
          ></Input>
          </Center>
          <Link href="/" color="black" mt={3} ml={5}><Text textStyle="sm">Forgot Password?</Text></Link>
          <Center>
          <Button onClick={logUser} borderWidth={0} mt={7} w="90%" borderRadius={10} backgroundColor="#2E55C4">
            <Text color="white">Sign In</Text>
          </Button>
          </Center>
          <Center>
            <Text textStyle="sm" mt={2} color="#596334">Don&#39;t have an account?{" "}<Link href="/" color="black">Sign Up Now</Link></Text>
            </Center>
        </Box>
    </div>
}

export default Login;