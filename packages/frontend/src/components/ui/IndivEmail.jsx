import { useState } from "react"
import {Box, Flex, Center, Text} from "@chakra-ui/react";

function IndivEmail() {
    // this is temporary in order to put dummy data, we will pass these info in as props instead of using useState
    const [subject_header, setSubjectHeader] = useState("Hi there!! dsfsfdfdfdfdfdfdfdfdfsdfdsfsfsfsfdsfdsfdsfdsdsfsfdfdfdfdfdfdfdfdfsdfdsfsfsfsfdsfdsfdsfdsdsfsfdfdfdfdfdfdfdfdfsdfdsfsfsfsfdsfdsfdsfdsdsfsfdfdfdfdfdfdfdfdfsdfdsfsfsfsfdsfdsfdsfds")
    const [sender_email, setSenderEmail] = useState("s@gmail.com")
    const [timestamp, setTimestamp] = useState("2-27-2025")

    return <>
        <Box h="100vh" w="100vw" bg="white" overflow="scroll">
            <Center>
                <Box mt={5} width="90%" height="50px" borderWidth={2} borderRadius={10}>
                    <Flex mt={2.5} direction="row" justify="space-between" gap={30} paddingRight={5} paddingLeft={5}>
                        <Text maxW={"40%"} isTruncated>{subject_header}</Text>
                        <Text>{sender_email}</Text>
                        <Text>{timestamp}</Text>
                    </Flex>
                </Box>
                </Center>
        </Box>
    </>
}

export default IndivEmail;