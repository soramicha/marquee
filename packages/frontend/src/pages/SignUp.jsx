import { Heading, Flex, Box, Text, Center, Button, Input, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '@/api/axios';
import { useAuth } from '@/context/AuthContext';

function SignUp() {
    const [school, setSchool] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [error, setError] = useState("");
    const { auth, signup } = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
      if (auth?.access_token) {
          navigate('/home');
      }
    }, [auth, navigate]);

    const signUpUser = async (e) => {
        e.preventDefault();
        // Reset error state
        setError('');

        // Basic validation
        if (!school || !email || !password || !confirmedPassword) {
            setError('All fields are required.');
            return;
        }

        if (password !== confirmedPassword) {
            setError('Passwords do not match.');
            return;
        }

        /*const formData = {
          "username": email,
          "password": password,
        }*/

        try {
            await signup(email, password);
            //const response = await axios.post('http://localhost:8000/signup', formData);
            //console.log('User added to MongoDB successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('An error occurred while submitting the form.');
        }
    };
    
    return (
      <Box h={"100vh"} w={"100vw"} bg="#F3F3F3">
        <Flex justify="center" align="center" height="100%">
          <Box bg="white" borderWidth={0} w="450px" borderRadius={"15px"} p={"55px"}>
            <Flex flexDirection="column" justify="center" align="center" gap="">
              <Flex flexDirection="column" justify="center" align="center" textAlign={"center"}>
                <Heading size="md" fontWeight={600}>Create New Account</Heading>
                <Text mt="20px" whiteSpace={"nowrap"}>
                  Join your campus marketplace!
                </Text>
              </Flex>
                <form onSubmit={signUpUser} style={{ width: "100%" }}>
                  <FormControl isInvalid={!!error} isRequired>
                    <Flex flexDirection="column" justify="center" align="center">
                      <Input
                          borderWidth={0}
                          borderRadius={"10px"}
                          backgroundColor="#F3F3F3"
                          mt={8}
                          color="black"
                          placeholder="School"
                          value={school}
                          onChange={(e) => setSchool(e.target.value)}
                          type="text"
                      />
                      <Input
                          borderWidth={0}
                          borderRadius={"10px"}
                          color="black"
                          backgroundColor="#F3F3F3"
                          mt={4}
                          placeholder="Student Email (ex. john@college.edu)"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                      />
                      <Input
                          borderWidth={0}
                          borderRadius={"10px"}
                          color="black"
                          backgroundColor="#F3F3F3"
                          mt={4}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                      />
                      <Input
                          borderWidth={0}
                          borderRadius={"10px"}
                          color="black"
                          backgroundColor="#F3F3F3"
                          mt={4}
                          placeholder="Confirm Password"
                          value={confirmedPassword}
                          onChange={(e) => setConfirmedPassword(e.target.value)}
                          type="password"
                      />
                      {error && (
                        <Center>
                            <FormErrorMessage>{error}</FormErrorMessage>
                        </Center>
                      )}
                      <Button type="submit" borderWidth={0} mt={10} w="90%" borderRadius={10} backgroundColor="#2E55C4">
                          <Text color="white">Sign Up</Text>
                      </Button>
                    </Flex>
                  </FormControl>
                </form>
                <Text mt={2}>Already have an account?{" "}<Link to="/login" color="black">Login Now</Link></Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    );
}

export default SignUp;