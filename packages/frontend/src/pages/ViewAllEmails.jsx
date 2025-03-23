import IndivEmailComponent from "@/components/ui/IndivEmailComponent";
import Navbar from "./Navbar";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosPrivate } from "@/api/axios";
//import { useAuth } from "@/context/AuthContext";

const getAllEmails = async (token) => {
    try {
        //const token = localStorage.getItem("authToken")
        const response = await axiosPrivate.get("/email", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(
            "Emails retreived from MongoDB successfully:",
            //response.data
        );
        return response.data;
    } catch (error) {
        console.error("Error retreiving emails:", error);
    }
};

const findUserbyId = async (id) => {
    try {
        const response = await axiosPrivate.get("/findUser", {
            params: {
                id: id,
            },
        })
        console.log(
            "User retreived by id from MongoDB successfully:",
            response.data.username
        );
        return response.data;
    } catch (error) {
        console.error("Error retreiving user by id:", error);
    }
}

function ViewAllEmails() {
    //const { auth } = useAuth();
    //const token = auth?.access_token
    // temporary solution
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username")
    console.log("VIEW ALL EMAIL from user ACCOUNT: ", username)
    const [AllEmails, setAllEmails] = useState([]);
    const [senders, setSenders] = useState({})

    // runs once when page loads
    useEffect(() => {
        // retreive emails from database
        getAllEmails(token).then((emails) => {
            if (emails) {
                const sortedEmails = emails.sort((a, b) => {
                    let dateA = a.createdAt
                        ? new Date(a.createdAt)
                        : new Date(0);
                    let dateB = b.createdAt
                        ? new Date(b.createdAt)
                        : new Date(0);
                    return dateB - dateA;
                });
                setAllEmails(sortedEmails);

                Promise.all(
                    sortedEmails.map((email) => 
                        findUserbyId(email.sender_id).then(user => [email.sender_id, user.username])
                    )
                ).then((senderEntries) => {
                    const senderMap = Object.fromEntries(senderEntries);
                    setSenders(senderMap);
                    console.log("Senders: ", senderMap)
                })
            }
        });
    }, []);

    return (
        <>
            <Navbar />
            <Box h={"100vh"} w={"100vw"} mt={20} overflow="scroll">
                <Flex justify="flex-end">
                    <Link to="/email/create">
                        <Button mt={10} mr={20} bg="#2E55C4" color="white">
                            Create Email
                        </Button>
                    </Link>
                </Flex>
                {/* retrieve all emails current user has */}
                {AllEmails.map((email) => (
                    <Link key={email._id} to={`/email/${email._id}`}>
                        <IndivEmailComponent
                            subject={email.emailSubject}
                            timestamp={email.createdAt}
                            sender_id={email.sender_id}
                            readStatus={senders[email.sender_id] === username ? email.isReadSender : email.isReadReceiver}
                        />
                    </Link>
                ))}
            </Box>
        </>
    );
}

export default ViewAllEmails;
