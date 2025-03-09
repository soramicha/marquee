import IndivEmailComponent from "@/components/ui/IndivEmailComponent";
import Navbar from "./Navbar";
import { Box, Button, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useEffect, useState } from 'react'
import { useAuth } from "@/context/AuthContext";

const getAllEmails = async (token) => {
    try {
        //const token = localStorage.getItem("authToken")
        const response = await axios.get('http://localhost:8000/email',
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Emails retreived from MongoDB successfully:', response.data);
        return response.data
    } catch (error) {
        console.error('Error retreiving emails:', error);
    }
}

function ViewAllEmails() {
    const { auth } = useAuth();
    //const token = auth?.access_token
    // temporary solution
    const token = localStorage.getItem("authToken")
    const [AllEmails, setAllEmails] = useState([])

    // runs once when page loads
    useEffect (() => {
        // retreive emails from database
        getAllEmails(token).then(emails => {
            if (emails) {
                setAllEmails(emails)
            }
        })
    }, [])

    return <>
        <Navbar/>
        <Box h={"100vh"} w={"100vw"} mt={20} overflow="scroll">
                <Flex justify="flex-end">
                    <Link to="/email/create">
                    <Button mt={10} mr={20} bg="#2E55C4" color="white">Create Email</Button>
                    </Link>
                </Flex>
            {/* retrieve all emails current user has */}
            {AllEmails.map(email => <Link key={email._id} to={`/email/${email._id}`}><IndivEmailComponent subject={email.emailSubject} timestamp={email.createdAt} sender_email={email.sender_id} readStatus={email.isRead}/></Link>)}
        </Box>
    </>
}

export default ViewAllEmails;