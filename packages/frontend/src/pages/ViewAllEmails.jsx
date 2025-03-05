import IndivEmailComponent from "@/components/ui/IndivEmailComponent";
import Navbar from "./Navbar";
import { Box, Button, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function ViewAllEmails() {
    return <>
        <Navbar/>
        <Box h={"100vh"} w={"100vw"} mt={20} overflow="scroll">
                <Flex justify="flex-end">
                    <Link to="/email/create">
                    <Button mt={10} mr={20} bg="#2E55C4" color="white">Create Email</Button>
                    </Link>
                </Flex>
            {/* retrieve all emails current user has */}
            <IndivEmailComponent subject="a subject" timestamp="the time" sender_email="sender email" readStatus="true"/>
            <IndivEmailComponent subject="a subject" timestamp="the time" sender_email="sender email" readStatus="true"/>

        </Box>
    </>
}

export default ViewAllEmails;