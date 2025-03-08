import { Center, Box, Text, Button, Select, Input, InputGroup, InputRightElement, Flex, useToast } from '@chakra-ui/react';
import { useState } from "react";
import { Search } from 'lucide-react';
import FileUpload from '@/components/ui/FileUpload';
import Navbar from './Navbar';
import { useAuth } from '@/context/AuthContext';
import { axiosPrivate } from '@/api/axios';
import { storage } from '@/config/firebase-config';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

function CreateListing() {
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [condition, setCondition] = useState('');
    const [location, setLocation] = useState('');
    const [tags, setTags] = useState('');
    const { initializeFirebaseAuth } = useAuth();
    const toast = useToast();

    const conditions = ["Brand New", "Like New", "Gently Used", "Fair Condition", "Needs Repair"];
    // TODO: upload media to firebase, get public links, then post to listings api
    const uploadMedia = async (files, listingId) => {
        const mediaInfo = [];

        for (const file of files) {
            // making unique filenames to prevent collisions
            const fileExtension = file.name.split('.').pop();
            const fileName = `${uuidv4()}.${fileExtension}`;
            const isVideo = file.type.startsWith('video/');

            //TODO: find a way to associate a file with its respective listing..
            // TODO: maybe send raw text to /listing, verify that there is media in the frontend,
            // TODO: and have it return listing id then upload file to firebase then edit listing photo/video links?
            // TODO: if we do this then unrequire photos in mongodb model
            const storageRef = ref(storage, `listings/${listingId}/${fileName}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot);

            mediaInfo.push({
                url: downloadURL,
                type: isVideo ? 'video' : 'image',
                fileName: fileName,
                contentType: file.type,
                size: file.size,
            });
        }
        console.log(mediaInfo);
        return mediaInfo;
    };

    const uploadMediaToFirebase = async (listingId, photos, videos) => {
        const files = [...photos, ...videos];

        try {

            return await uploadMedia(files, listingId);
        } catch (error) {
            // If error is related to authentication
            if (error.code === 'storage/unauthorized') {
                // Get new token and try again
                await initializeFirebaseAuth();
                
                // Retry upload
                return await uploadMedia(files);
            }
            throw error;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const listing = {
            name: itemName,
            price: price,
            category: category,
            description, description,
            location, location,
            condition: condition,
            tags: tags,
        }

        try {
            // send non-media first, then get listingId, then insert media url in db
            // not really optimal.. but idk what else to do
            if (photos.length == 0) {
                toast({
                    title: 'At least one photo is required.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                });
                throw new Error("At least one photo is required.")
            }

            const response = await axiosPrivate.post("/listing", listing);
            if (response.status === 201) {
                const listingId = response.data._id;
                const mediaLinks = await uploadMediaToFirebase(listingId, photos, videos);
                
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box h="100vh" w="100vw" bg="white" overflow="scroll">
            <Navbar/>
            <Center>
                <Box mt={150} w={{ base: "90%", md: "80%", lg: "60%" }}>
                    <form onSubmit={handleSubmit}>
                        <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center">
                            <Text fontWeight="bold" fontSize="2xl">Create New Listing</Text>
                            <Button type="submit" mt={{ base: 4, md: 0 }} color="white" bg="#2E55C4">Post Listing</Button>
                        </Flex>
                        <Flex mt={10} direction={{ base: "column", md: "row" }}>
                            <Box flex="1">
                                <Text fontSize="sm">Item Name</Text>
                                <Input
                                    borderWidth={1}
                                    borderRadius="10px"
                                    color="#989898"
                                    backgroundColor="white"
                                    mt={1}
                                    width="100%"
                                    type="text"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                    required
                                />

                                <Text fontSize="sm" mt={5}>Category</Text>
                                <Input
                                    borderWidth={1}
                                    borderRadius="10px"
                                    color="#989898"
                                    backgroundColor="white"
                                    mt={1}
                                    width="100%"
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                />

                                <Text fontSize="sm" mt={5}>Description</Text>
                                <Input
                                    borderWidth={1}
                                    borderRadius="10px"
                                    color="#989898"
                                    backgroundColor="white"
                                    mt={1}
                                    width="100%"
                                    height="250px"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />

                                <Flex direction={{ base: "column", md: "row" }} mt={5}>
                                    <Box flex="1">
                                        <Text fontSize="sm">Price</Text>
                                        <Input
                                            borderWidth={1}
                                            borderRadius="10px"
                                            color="#989898"
                                            backgroundColor="white"
                                            mt={1}
                                            width="100%"
                                            type="text"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            required
                                        />
                                    </Box>
                                    <Box flex="1" mt={{ base: 5, md: 0 }} ml={{ md: 5 }}>
                                        <Text fontSize="sm">Condition</Text>
                                        <Select 
                                            borderWidth={1}
                                            borderRadius="10px" 
                                            color="#989898"
                                            backgroundColor="white"
                                            mt={1}
                                            width="100%"
                                            value={condition}
                                            onChange={(e) => setCondition(e.target.value)}
                                            required
                                        >
                                            {conditions.map((condition, index) => (
                                                <option key={index} value={condition}>{condition}</option>
                                            ))}    
                                        </Select>
                                    </Box>
                                </Flex>

                                <Text fontSize="sm" mt={5}>Location</Text>
                                <Input
                                    borderWidth={1}
                                    borderRadius="10px"
                                    color="#989898"
                                    backgroundColor="white"
                                    mt={1}
                                    width="100%"
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                            </Box>
                            <Box flex="1" mt={{ base: 10, md: 0 }} ml={{ md: 10 }}>
                                <FileUpload label="Photos" accept=".jpg, .png, .jpeg" onChange={setPhotos} />
                                <FileUpload label="Videos" accept="video/*" onChange={setVideos} />
                                <Text fontSize="sm">Tags</Text>
                                <InputGroup width="100%">
                                    <InputRightElement pointerEvents="none" mt={1}>
                                        <Search color="#989898" />
                                    </InputRightElement>
                                    <Input
                                        mb={10}
                                        borderWidth={1}
                                        borderRadius="10px"
                                        color="#989898"
                                        backgroundColor="white"
                                        mt={1}
                                        width="100%"
                                        type="text"
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                        required
                                    />
                                </InputGroup>
                            </Box>
                        </Flex>
                    </form>
                </Box>
            </Center>
        </Box>
    );
}

export default CreateListing;