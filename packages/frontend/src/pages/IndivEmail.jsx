import { Center, Box, Text, Flex, Button, Textarea } from '@chakra-ui/react';
import { useState } from "react";
import Navbar from './Navbar';

// TODO: make as a popup instead of a whole page(?)
function IndivEmail() {
    {/* once again, the respective information would be passed through the props */}
    const subject = "Hi There!"
    const sender = "s@gmail.com"
    const body = "I wanted to ask how you're doing!"
    const receiver = "me@gmail.com"
    const timestamp = "2/28/2025"
    const [show, setShow] = useState(true)
    const [reply_id, setReplyId] = useState(0)
    const [replyText, setReplyText] = useState("")

    const replyEmail = () => {
        console.log("Respond to email!")
        setShow(!show)
    }

    const sendReply = () => {
        console.log("Sending reply!")

        const replyBody = document.getElementById("reply-form")
        if (replyBody.value.trim() === "") {
            alert("Unable to send reply! Please write a message first!")
        }
        else {
            // create element
            const replyText = document.createElement("p")
            // give it a reply id
            replyText.id = reply_id
            setReplyId(reply_id + 1)
            replyText.textContent = replyBody.value

            // style it
            replyText.style.borderColor = "#D9D9D9";
            replyText.style.marginTop = "10px";
            replyText.style.borderRadius = "10px";
            replyText.style.padding = "5px 20px 5px 20px";
            replyText.style.display = "inline-block";
            replyText.style.width = "100%";
            replyText.style.minWidth = "80%"
            replyText.style.borderWidth = "2px";

            // append it
            const div = document.getElementById("replies")
            div.appendChild(replyText)

            // change necessary statuses
            setShow(!show)
            setReplyText("")
        }
    }

    return <>
        <Box h="100vh" w="100vw" bg="white" overflow="scroll">
        <Navbar/>
            <Center>
            <Box width="80%" minW="80%">
                <Box padding={5} mt={40} borderRadius={10} borderWidth={2}>
                    <Text>Subject: {subject}</Text>
                    <Text mt={5}>Sender: {sender}</Text>
                    <Text mt={5}>Receiver: {receiver}</Text>
                    <Text mt={5}>Timestamp: {timestamp}</Text>
                    <Text mt={20}>{body}</Text>
                </Box>
                {/* insert reply elements here */}
                <Flex direction="column" id="replies">
                </Flex>
                {!show && (
                    <Textarea
                        id="reply-form"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your reply..."
                        borderRadius="md"
                        mt={3}
                        size="md"
                    />
                )}
                { show ? <Button onClick={replyEmail} mb={10} type="submit" mt={5} color="white" bg="#2E55C4">Reply</Button> : <Button onClick={sendReply} mb={10} type="submit" mt={5} color="white" bg="#2E55C4">Send</Button>}
            </Box>
            </Center>

        </Box>
    </>
}

export default IndivEmail;