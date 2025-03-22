import { Center, Box, Text, Flex, Button, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import ReplyEmail from "@/components/ui/ReplyEmail";
import { axiosPrivate } from "@/api/axios";

const getIndivEmail = async (id, token) => {
    try {
        const response = await axiosPrivate.get("/email", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                id: id,
            },
        });
        console.log(
            "Email retreived from MongoDB successfully:",
            //response.data
        );
        return response.data;
    } catch (error) {
        console.error("Error retreiving emails:", error);
    }
};

const getUsersById = async (id, token) => {
    try {
        const response = await axiosPrivate.get("/findUser", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                id: id,
            },
        });
        console.log("User retreived from MongoDB successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error retreiving user by id:", error);
    }
};

const updateReadStatus = async (id, user, token) => {
    try {
        const res = await axiosPrivate.patch(
            "/email",
            { isRead: true },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    id: id,
                    user: user,
                },
            }
        );
        console.log(
            "Email read status updated from MongoDB successfully:",
            res
        );
    } catch (error) {
        console.error("Error updating read status of email", error);
    }
};

const addReply = async (id, username, message, token) => {
    try {
        const response = await axiosPrivate.post(
            "/email/reply",
            { sender_username: username, message: message },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    id: id,
                },
            }
        );
        console.log("Reply added to email into MongoDB successfully:");
        return response.data;
    } catch (error) {
        console.error("Error adding reply to email:", error);
    }
};

// TODO: make as a popup instead of a whole page(?)
function IndivEmail() {
    // temporary solution
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username")
    const [subject, setSubject] = useState("");
    const [sender, setSender] = useState("");
    const [body, setBody] = useState("");
    const [receiver, setReceiver] = useState("");
    const [timestamp, setTimestamp] = useState("");
    const [show, setShow] = useState(true);
    const [replyText, setReplyText] = useState("");
    const [AllReplies, setAllReplies] = useState([]);

    let { id } = useParams();

    // retrieve individual email information
    useEffect(() => {
        // retreive email from database
        getIndivEmail(id, token).then((email) => {
            setSubject(email[0].emailSubject);
            setTimestamp(email[0].createdAt);
            setBody(email[0].emailContent);

            // get users by id
            getUsersById(email[0].sender_id, token).then((e) => {
                setSender(e.username);

                // update the isRead status of the email!
                // check if we're sender or receiver
                console.log("sender username:", e.username)
                if (e.username == username) {
                    console.log("we are the sender")
                    updateReadStatus(email[0]._id, "isReadSender", token);
                }
                else {
                    console.log("we are the receiver")
                    updateReadStatus(email[0]._id, "isReadReceiver", token);
                }
            });

            getUsersById(email[0].receiver_id, token).then((e) => {
                setReceiver(e.username);
            });

            setAllReplies(email[0].replies);
        });
    }, []);

    const replyEmail = () => {
        console.log("Respond to email!");
        setShow(!show);
    };

    const sendReply = () => {
        console.log("Sending reply!");

        const replyBody = document.getElementById("reply-form");
        if (replyBody.value.trim() === "") {
            alert("Unable to send reply! Please write a message first!");
        } else {
            // call backend
            addReply(id, sender, replyBody.value, token).then((allReplies) => {
                setAllReplies(allReplies);
            });

            // change necessary statuses
            setShow(!show);
            setReplyText("");
        }
    };

    return (
        <>
            <Box h="100vh" w="100vw" bg="white" overflow="scroll">
                <Navbar />
                <Center>
                    <Box width="80%" minW="80%">
                        <Box
                            padding={5}
                            mt={40}
                            borderRadius={10}
                            borderWidth={2}
                        >
                            <Text>Subject: {subject}</Text>
                            <Text mt={5}>Sender: {sender}</Text>
                            <Text mt={5}>Receiver: {receiver}</Text>
                            <Text mt={5}>Timestamp: {timestamp}</Text>
                            <Text mt={20}>{body}</Text>
                        </Box>
                        {/* insert reply elements here */}
                        <Flex direction="column" id="replies">
                            {AllReplies.map((reply) => (
                                <ReplyEmail
                                    key={reply._id}
                                    username={reply.sender_username}
                                    message={reply.message}
                                />
                            ))}
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
                        {show ? (
                            <Button
                                onClick={replyEmail}
                                mb={10}
                                type="submit"
                                mt={5}
                                color="white"
                                bg="#2E55C4"
                            >
                                Reply
                            </Button>
                        ) : (
                            <Button
                                onClick={sendReply}
                                mb={10}
                                type="submit"
                                mt={5}
                                color="white"
                                bg="#2E55C4"
                            >
                                Send
                            </Button>
                        )}
                    </Box>
                </Center>
            </Box>
        </>
    );
}

export default IndivEmail;
