import { Center, Box, Text, Button, Input, InputGroup, InputRightElement, Flex } from '@chakra-ui/react'
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '@/context/AuthContext';
import { Search } from 'lucide-react';

function EditListing() {
    return <>
        <Box h={"100vh"} w={"100vw"} bg="white">
        <Center>
        <Box mt={150}>
            <Flex direction="row">
        <Text fontWeight="bold" fontSize="2xl">Edit Listing</Text>
        <Button ml={650} color="white" bg="#F2674A">Delete Post</Button>
        <Button ml={5} color="white" bg="#2E55C4">Save Listing</Button>
        </Flex>
        <Flex mt={10} direction="row">
        <Box>
        <Text fontSize="sm">Input Field</Text>
        <Input
            borderWidth={1}
            borderRadius={"10px"}
            color="#989898"
            backgroundColor="white"
            mt={1}
            width="500px"
            type="text"
                    />

    <Text fontSize="sm" mt={5}>Category</Text>
        <Input
            borderWidth={1}
            borderRadius={"10px"}
            color="#989898"
            backgroundColor="white"
            width="500px"
            mt={1}
            type="text"
                    />

    <Text fontSize="sm" mt={5}>Description</Text>
        <Input
            borderWidth={1}
            borderRadius={"10px"}
            color="#989898"
            backgroundColor="white"
            width="500px"
            mt={1}
            type="text"
                    />
    <Flex direction="row">
        <Box>
    <Text fontSize="sm" mt={5}>Price</Text>
        <Input
            borderWidth={1}
            borderRadius={"10px"}
            color="#989898"
            width="240.5px"
            backgroundColor="white"
            mt={1}
            type="text"
                    />
    </Box>
    <Box ml={5}>
    <Text fontSize="sm" mt={5}>Condition</Text>
        <Input
            borderWidth={1}
            borderRadius={"10px"}
            width="240.5px"
            color="#989898"
            backgroundColor="white"
            mt={1}
            type="text"
                    />
                    </Box>
    </Flex>
    <Text fontSize="sm" mt={5}>Location</Text>
        <Input
            borderWidth={1}
            width="500px"
            borderRadius={"10px"}
            color="#989898"
            backgroundColor="white"
            mt={1}
            type="text"
                    />

    </Box>
    <Box ml={10}>
        <Text fontSize="sm">Photos</Text>
        <Input borderWidth={0} mt={3} type="file"></Input>
        <Text fontSize="sm" mt={5}>Videos</Text>
            <Input borderWidth={0} mt={3} type="file"></Input>

        <Text fontSize="sm" mt={5}>Tags</Text>
        <InputGroup width="500px">
            <InputRightElement pointerEvents="none" mt={1}>
                <Search color="#989898" />
            </InputRightElement>
            <Input
                width="500px"
                borderWidth={1}
                borderRadius={"10px"}
                color="#989898"
                backgroundColor="white"
                mt={1}
                type="text"
                        />
                </InputGroup>

        </Box>
        </Flex>
        </Box>

        </Center>
        </Box>
    </>
}

export default EditListing;