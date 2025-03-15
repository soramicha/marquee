import {
    Heading,
    Flex,
    Box,
    Text,
    Button,
    Input,
    FormControl,
    useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SignUp() {
    const [school, setSchool] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const { auth, signup } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    let navigate = useNavigate();

    useEffect(() => {
        if (auth?.access_token) {
            navigate("/home");
        }
    }, [auth, navigate]);

    const signUpUser = async (e) => {
        e.preventDefault();

        if (!school || !email || !password || !confirmedPassword) {
            toast({
                title: "Missing fields",
                description: "Please fill in all required fields",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        if (password !== confirmedPassword) {
            toast({
                title: "Password mismatch",
                description: "Passwords do not match",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);
        try {
            console.log("CALLING SIGN UP BACKEND")
            await signup(email, password);
            navigate("/home");
        } catch (error) {
            toast({
                title: "Sign up failed",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box h={"100vh"} w={"100vw"} bg="#F3F3F3">
            <Flex justify="center" align="center" height="100%">
                <Box
                    bg="white"
                    borderWidth={0}
                    w="450px"
                    borderRadius={"15px"}
                    p={"55px"}
                >
                    <Flex
                        flexDirection="column"
                        justify="center"
                        align="center"
                        gap=""
                    >
                        <Flex
                            flexDirection="column"
                            justify="center"
                            align="center"
                            textAlign={"center"}
                        >
                            <Heading size="md" fontWeight={600}>
                                Create New Account
                            </Heading>
                            <Text mt="20px" whiteSpace={"nowrap"}>
                                Join your campus marketplace!
                            </Text>
                        </Flex>
                        <form onSubmit={signUpUser} style={{ width: "100%" }}>
                            <FormControl isRequired>
                                <Flex
                                    flexDirection="column"
                                    justify="center"
                                    align="center"
                                >
                                    <Input
                                        borderWidth={0}
                                        borderRadius={"10px"}
                                        backgroundColor="#F3F3F3"
                                        mt={8}
                                        placeholder="School"
                                        value={school}
                                        onChange={(e) =>
                                            setSchool(e.target.value)
                                        }
                                        type="text"
                                    />
                                    <Input
                                        borderWidth={0}
                                        borderRadius={"10px"}
                                        backgroundColor="#F3F3F3"
                                        mt={4}
                                        placeholder="Student Email (ex. john@college.edu)"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        type="email"
                                    />
                                    <Input
                                        borderWidth={0}
                                        borderRadius={"10px"}
                                        backgroundColor="#F3F3F3"
                                        mt={4}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        type="password"
                                    />
                                    <Input
                                        borderWidth={0}
                                        borderRadius={"10px"}
                                        backgroundColor="#F3F3F3"
                                        mt={4}
                                        placeholder="Confirm Password"
                                        value={confirmedPassword}
                                        onChange={(e) =>
                                            setConfirmedPassword(e.target.value)
                                        }
                                        type="password"
                                    />
                                    <Button
                                        type="submit"
                                        borderWidth={0}
                                        mt={10}
                                        w="90%"
                                        borderRadius={10}
                                        backgroundColor="#2E55C4"
                                        isLoading={isLoading}
                                        loadingText="Creating Account"
                                    >
                                        <Text color="white">Sign Up</Text>
                                    </Button>
                                </Flex>
                            </FormControl>
                        </form>
                        <Text mt={2}>
                            Already have an account?{" "}
                            <Link to="/login" color="black">
                                Login Now
                            </Link>
                        </Text>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}

export default SignUp;
