import {
    Heading,
    Box,
    Text,
    Button,
    Input,
    Flex,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { auth, login } = useAuth();
    let navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const logUser = async () => {
        setIsLoading(true);
        if (!email || !password) {
            toast({
                title: "Invalid email/password",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
        try {
            await login(email, password);
            navigate("/home");
        } catch (error) {
            toast({
                title: "Login failed",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (auth?.access_token) {
            navigate("/home");
        }
    }, [auth, navigate]);

    return (
        <Box h={"100vh"} w={"100vw"} bg="#F3F3F3" overflow="scroll">
            <Flex justify="center" alignItems="center" height="100%">
                <Box
                    bg="white"
                    borderWidth={0}
                    h="450px"
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
                                Welcome Back
                            </Heading>
                            <Text mt="20px" whiteSpace={"nowrap"}>
                                Buy, sell, and trade with students on your
                                campus.
                            </Text>
                            <Text>Sign in to start connecting!</Text>
                        </Flex>
                        <Flex
                            w="100%"
                            textAlign="left"
                            flexDirection="column"
                            justify="center"
                            align="center"
                        >
                            <Input
                                mt={5}
                                borderWidth={0}
                                borderRadius={"10px"}
                                backgroundColor="#F3F3F3"
                                placeholder="Username@yourschool.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                data-testid="email-input"
                            />
                            <Input
                                borderWidth={0}
                                borderRadius={"10px"}
                                backgroundColor="#F3F3F3"
                                mt={4}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                data-testid="password-input"
                            />
                            <Box
                                fontWeight={400}
                                w="100%"
                                alignSelf={"left"}
                                mt={"10px"}
                            >
                                <Link to="/" color="black">
                                    Forgot Password?
                                </Link>
                            </Box>
                        </Flex>
                        <Button
                            onClick={logUser}
                            borderWidth={0}
                            mt={7}
                            w="100%"
                            borderRadius={10}
                            backgroundColor="#2E55C4"
                            isLoading={isLoading}
                            loadingText="Signing In"
                            data-testid="sign-in-button"
                        >
                            <Text color="white">Sign In</Text>
                        </Button>
                        <Text fontWeight={400} textStyle="sm" mt={"10px"}>
                            Don&#39;t have an account?{" "}
                            <Link to="/signup" color="black">
                                Sign Up Now
                            </Link>
                        </Text>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}

export default Login;
