import { Center, Box, Text, Button, Input, Textarea } from "@chakra-ui/react"
import Navbar from "./Navbar";
import { useState, useRef } from "react"
import emailjs from "@emailjs/browser";
import axios from "axios";

function SendEmail() {
    // create a ref hook
    const form = useRef();

    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [receiver, setReceiver] = useState("itsess7@gmail.com");
    const [sender, setSender] = useState("schang7jcu@gmail.com");

    const submitForm = async (e) => {
        e.preventDefault();

        const formData = {
          "emailSubject": subject,
          "emailContent": body,
          "receiver_email": receiver
        }

        // call backend
        /*try {
          const response = await axios.post('/email', formData);
          console.log('Email added to MongoDB successfully:', response.data);
        } catch (error) {
          console.error('Error adding email:', error);
        }*/

        // emailjs
        console.log(form.current)
        console.log(receiver)
        console.log(sender)
        if (subject === "" || body === "" || sender === "" || receiver === "") {
            alert("Unable to submit. Please fill out all parts of the form.");
          } else {
            emailjs
                // service_id, 
              .sendForm("307_marquee", "307_message_template", form.current, "DJvHoVWDs8dtvq1j4")
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
    }

    return <>
        <Box h="100vh" w="100vw" bg="white" overflow="scroll">
            <Navbar/>
            <Center>
            <Box width="80%" minW="80%">
            <form ref={form} onSubmit={submitForm}>
            <Text fontSize="sm" mt={40}>Subject</Text>
                <Input
                    name="subject"
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
            <Text fontSize="sm" mt={5}>Sender</Text>
            <Input
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
            <Text fontSize="sm" mt={5}>Receiver</Text>
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

            <Text fontSize="sm" mt={5}>Body</Text>
            <Textarea
                name="body"
                value={body}
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

            <Button mb={10} type="submit" mt={5} color="white" bg="#2E55C4">Send Email</Button>
            </form>
            </Box>
            </Center>
        </Box>
    
    </>
}

export default SendEmail;