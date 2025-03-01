import { Center, Box, Text, Button, Input, Textarea } from "@chakra-ui/react"
import Navbar from "./Navbar";
import { useState } from "react"

function SendMessage() {
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const submitForm = () => {
        // push into database
        console.log("Body is:", body, "Subject is:", subject)
    }

    return <>
        <Box h="100vh" w="100vw" bg="white" overflow="scroll">
            <Navbar/>
            <Center>
            <Box width="80%" minW="80%">
            <Text fontSize="sm" mt={40}>Subject</Text>
                <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    borderWidth={1}
                    borderRadius="10px"
                    color="#989898"
                    backgroundColor="white"
                    mt={1}
                    width="100%"
                    type="text"
                    required
                />
            <Text fontSize="sm" mt={5}>Receiver</Text>
            <Input
                disabled
                borderWidth={1}
                borderRadius="10px"
                color="#black"
                backgroundColor="white"
                mt={1}
                width="100%"
                type="text"
                value="replace with the person email"
            />

            <Text fontSize="sm" mt={5}>Body</Text>
            <Textarea
                alue={body}
                onChange={(e) => setBody(e.target.value)}
                borderWidth={1}
                borderRadius="10px"
                color="#989898"
                backgroundColor="white"
                mt={1}
                width="100%"
                height="250px"
                type="text"
                required
            />

            <Button mb={10} type="submit" mt={5} color="white" bg="#2E55C4" onClick={submitForm}>Send Email</Button>
            </Box>
            </Center>
        </Box>
    
    </>
}

export default SendMessage;