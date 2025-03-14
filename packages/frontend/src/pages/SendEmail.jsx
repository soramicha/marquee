import { Center, Box, Text, Button, Input, Textarea } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
//import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";

function SendEmail() {
    // create a ref hook
    const form = useRef(null);
    let navigate = useNavigate();
    //const { auth } = useAuth();
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    // TODO: hard code receiver to seller
    const [receiver, setReceiver] = useState("sophia@calpoly.edu");
    //const [sender, setSender] = auth?.username;
    // temporary solution
    const [sender, setSender] = useState(localStorage.getItem("username"));

    const submitForm = async (e) => {
        e.preventDefault();

        const formData = {
            emailSubject: subject,
            emailContent: body,
            receiver_email: receiver,
        };

        //const token = auth?.access_token;
        // temporary solution
        const token = localStorage.getItem("authToken");
        // call backend
        try {
            const response = await axiosPrivate.post("/email", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Email added to MongoDB successfully:", response.data);
        } catch (error) {
            console.error("Error adding email:", error);
        }

        // uncomment later; currently it's commented bc you can only send limited # of messages using emailjs
        // emailjs
        if (subject === "" || body === "" || sender === "" || receiver === "") {
            alert("Unable to submit. Please fill out all parts of the form.");
        } else {
            emailjs
                // service_id,
                .sendForm(
                    "307_marquee",
                    "307_message_template",
                    form.current,
                    "DJvHoVWDs8dtvq1j4"
                )
                .then(
                    () => {
                        alert("Email successfully sent");
                    },
                    (error) => {
                        alert("Email failed to send. " + error.text);
                    }
                );

            setSubject("");
            setBody("");
        }

        // navigate back to the emails page
        navigate("/email");
    };

    return (
        <>
            <Box h="100vh" w="100vw" bg="white" overflow="scroll">
                <Navbar />
                <Center>
                    <Box width="80%" minW="80%">
                        <form ref={form} onSubmit={submitForm}>
                            <Text fontSize="sm" mt={40}>
                                Subject
                            </Text>
                            <Input
                                name="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                borderWidth={1}
                                borderRadius="10px"
                                backgroundColor="white"
                                mt={1}
                                width="100%"
                                type="text"
                                required
                            />
                            <Text fontSize="sm" mt={5}>
                                Sender: {sender}
                            </Text>
                            <Input
                                hidden
                                name="user_send"
                                onChange={(e) => setSender(e.target.value)}
                                required
                                borderWidth={1}
                                borderRadius="10px"
                                color="#black"
                                backgroundColor="white"
                                mt={1}
                                width="100%"
                                type="text"
                                value={sender}
                            />
                            <Text fontSize="sm" mt={5}>
                                Receiver
                            </Text>
                            <Input
                                name="user_receive"
                                onChange={(e) => setReceiver(e.target.value)}
                                required
                                borderWidth={1}
                                borderRadius="10px"
                                color="#black"
                                backgroundColor="white"
                                mt={1}
                                width="100%"
                                type="text"
                                value={receiver}
                            />

                            <Text fontSize="sm" mt={5}>
                                Body
                            </Text>
                            <Textarea
                                name="body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                borderWidth={1}
                                borderRadius="10px"
                                backgroundColor="white"
                                mt={1}
                                width="100%"
                                height="250px"
                                type="text"
                                required
                            />

                            <Button
                                mb={10}
                                type="submit"
                                mt={5}
                                color="white"
                                bg="#2E55C4"
                            >
                                Send Email
                            </Button>
                            <Link to="/email">
                                <Button
                                    mb={10}
                                    ml={5}
                                    mt={5}
                                    color="white"
                                    bg="#F2674A"
                                >
                                    Cancel
                                </Button>
                            </Link>
                        </form>
                    </Box>
                </Center>
            </Box>
        </>
    );
}

export default SendEmail;
