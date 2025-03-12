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
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Adjust path as needed

function Navbar() {
    const { auth, logout } = useAuth();

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
                        <Text
                            fontSize="md"
                            color="white"
                            _hover={{ textDecoration: "underline" }}
                        >
                            Messages
                        </Text>
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
                                    src="cat.png"
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
