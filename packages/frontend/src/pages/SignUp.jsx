import { Box, Link, Text, Center, Button, Input } from '@chakra-ui/react'
import { useState } from "react"

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const StoreSignUp = () => {
        // store sign up info
        console.log(name, email, password, confirmedPassword)
    }

    return <div style={{ backgroundColor:"#F3F3F3", display: "flex", justifyContent:"center", alignItems:"center", width: "100vw", height: "100vh"}}>
        <Box maxH="90vh" overflowY="auto" borderWidth={0} h="500px" bg="white" borderRadius={"15px"} alignItems="center" w="450px" p={3}>
        <Center>
        <Text mt={5} textStyle="3xl" color="black">Create New Account</Text>
        </Center>
        <Center>
          <Text color="black" align="center" mt={1}>
            Join your campus marketplace!
          </Text>
          </Center>
          <Center>
          <Input
            borderWidth={0}
            borderRadius={"10px"}
            width={"90%"}
            backgroundColor="#F3F3F3"
            mt={8}
            color="#989898"
            placeholder="School"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
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
            placeholder="Student Email (ex. john@college.edu)"
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
          <Center>
          <Input
          borderWidth={0}
            borderRadius={"10px"}
            width={"90%"}
            color="#989898"
            backgroundColor="#F3F3F3"
            mt={4}
            placeholder="Confirm Password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            type="text"
          ></Input>
          </Center>
          <Center>
          <Button onClick={StoreSignUp} borderWidth={0} mt={10} w="90%" borderRadius={10} backgroundColor="#2E55C4">
            <Text color="white">Sign Up</Text>
          </Button>
          </Center>
          <Center>
            <Text mt={2} color="#596334">Already have an account?{" "}<Link href="/" color="black">Login Now</Link></Text>
            </Center>
        </Box>
    </div>
}

export default SignUp;