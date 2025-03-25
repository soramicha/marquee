// src/pages/Navbar.jsx
import {
    Box,
    Flex,
    Text,
    Spacer,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Image,
    Button,
} from "@chakra-ui/react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Adjust path as needed
import { useEffect, useState } from 'react'
import profileImage from '@/assets/cat.png';  // If image is in src/assets
import { axiosPrivate } from "@/api/axios";

const getAllEmails = async (token) => {
    try {
        const response = await axiosPrivate.get("/email", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(
            "Emails retreived from MongoDB successfully:",
        );
        return response.data;
    } catch (error) {
        console.error("Error retreiving emails:", error);
    }
};

const getAllUsers = async (userIds) => {
    try {
        const response = await axiosPrivate.get("/findUsers", {
            params: {
                ids: userIds
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error retrieving users:", error);
        return [];
    }
};

const countUnreadMessages = (emails, userMap, auth, location, currentEmailId) => {
    return emails.reduce((count, email) => {
        const user = userMap[email.receiver_id];
        
        if (user.username === auth?.username) {
            // skip counting if we're currently viewing this email
            if (location.pathname === `/email/${currentEmailId}` && email._id === currentEmailId) {
                return count;
            }
            // increment count when email is unread
            return email.isReadReceiver ? count : count + 1;
        }
        return count;
    }, 0);
};

const fetchMessageCount = async (auth, token, location, id) => {
    if (!auth?.username) return 0;

    const emails = await getAllEmails(token);
    const uniqueUserIds = [...new Set(emails.map(email => email.receiver_id))];
    const users = await getAllUsers(uniqueUserIds);
    const userMap = users.reduce((acc, user) => {
        acc[user._id] = user;
        return acc;
    }, {});
    
    return countUnreadMessages(emails, userMap, auth, location, id);
};

function Navbar() {
    const { auth, logout } = useAuth();
    const token = localStorage.getItem("authToken");
    const [ numMessages, setNumMessages ] = useState(0);
    const location = useLocation();
    let { id } = useParams();

    useEffect(() => {
        fetchMessageCount(auth, token, location, id)
            .then(count => setNumMessages(count))
            .catch(error => console.error('Error fetching message count:', error));
    }, [auth?.username, token, location.pathname, id]);

    return (
        <Box
            bg="#2E55C4"
            px={10}
            py={4}
            w="100%"
            color="white"
            position="fixed"
            top={0}
            left={0}
            zIndex={1000}
        >
            <Flex align="center" maxW="1200px" mx="auto">
                {/* Centered Title */}
                <Text
                    fontSize="xl"
                    fontWeight="bold"
                    position="absolute"
                    left="50%"
                    transform="translateX(-50%)"
                >
                    MARQUEE
                </Text>

                {/* Navigation Links */}
                <Flex ml={10} gap={6}>
                    <Link to="/home">
                        <Text
                            fontSize="md"
                            color="white"
                            _hover={{ textDecoration: "underline" }}
                        >
                            Home
                        </Text>
                    </Link>
                    <Link to="/email">
                    <Flex justify={"space-evenly"}>
                        <Text
                            fontSize="md"
                            color="white"
                            _hover={{ textDecoration: "underline" }}
                        >
                            Messages
                        </Text>
                        { auth?.username && numMessages != 0 ? <Text ml={2} bg="orange" borderRadius={10} paddingLeft={2} paddingRight={2}>{numMessages}</Text> : <></>}
                        </Flex> 
                    </Link>
                </Flex>

                <Spacer />

                {/* Right Side: Favorites Icon, Create Listing, and Avatar/Sign In */}
                <Flex align="center" gap={4}>
                    <Link to="/favorites">
                        <IconButton
                            aria-label="Favorites"
                            icon={<FaHeart />}
                            bg="transparent"
                            color="white"
                            _hover={{ color: "gray.300", bg: "transparent" }}
                        />
                    </Link>
                    <Link to="/listing/create">
                        <Text
                            fontSize="md"
                            color="white"
                            _hover={{ textDecoration: "underline" }}
                        >
                            Create Listing
                        </Text>
                    </Link>

                    {auth?.username ? (
                        <Menu>
                            <MenuButton
                                as={Button}
                                bg="transparent"
                                _hover={{ bg: "transparent" }}
                                _active={{ bg: "transparent" }}
                                p={0}
                            >
                                <Image
                                    src={profileImage}
                                    boxSize="50px"
                                    borderRadius="full"
                                    fit="cover"
                                    alt="Profile"
                                />
                            </MenuButton>
                            <MenuList color="black">
                                <MenuItem as={Link} to="/profile">
                                    My Profile
                                </MenuItem>
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <Link to="/login">
                            <Text
                                fontSize="md"
                                color="white"
                                _hover={{ textDecoration: "underline" }}
                            >
                                Sign In
                            </Text>
                        </Link>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
}

export default Navbar;
