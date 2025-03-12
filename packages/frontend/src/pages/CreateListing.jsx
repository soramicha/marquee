import { Center, Box, Text, Button, Select, Input, InputGroup, InputRightElement, Flex, useToast } from '@chakra-ui/react';
import { useState } from "react";
import { Search } from 'lucide-react';
import FileUpload from '@/components/ui/FileUpload';
import Navbar from './Navbar';
import { useAuth } from '@/context/AuthContext';
import { axiosPrivate } from '@/api/axios';
import { storage } from '@/config/firebase-config';
import { uploadBytes, ref, getDownloadURL, listAll } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

function CreateListing() {
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [condition, setCondition] = useState('Brand New');
    const [location, setLocation] = useState('');
    const [tags, setTags] = useState('');
    const { auth, initializeFirebaseAuth } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const conditions = ["Brand New", "Like New", "Gently Used", "Fair Condition", "Needs Repair"];
    const [isSubmitting, setIsSubmitting] = useState(false);

    const uploadMediaToFirebase = async (files, listingId) => {
        const photosURL = [];
        const videosURL = [];
    
        for (const file of files) {
            const fileExtension = file.name.split('.').pop();
            const fileName = `${uuidv4()}.${fileExtension}`;
            const isVideo = file.type.startsWith('video/');
            
            const storageRef = ref(storage, `/listings/${listingId}/${fileName}`);
            
            const metadata = {
                customMetadata: {
                    userId: auth.firebaseUID
                }
            };
    
            const snapshot = await uploadBytes(storageRef, file, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            isVideo 
                ? videosURL.push(downloadURL)
                : photosURL.push(downloadURL);
        }
    
        return { photosURL, videosURL };
    };

    const uploadMedia = async (listingId, photos, videos) => {
        if (!listingId || !photos.length) {
            throw new Error('Missing required parameters');
        }

        const files = [...photos, ...videos];

        // upload media to firebase and insert photo/video url into mongodb     
        try {
            const { photosURL, videosURL } = await uploadMediaToFirebase(files, listingId);
            
            // update listing with media URLs
            const response = await axiosPrivate.patch(`/listing`, {
                photos: photosURL,
                videos: videosURL
            }, {
                headers: {
                    Authorization: `Bearer ${auth.access_token}`
                },
                params: {
                    id: listingId,
                }
            });

            // return updated mongoDB object(currently unused)
            return response.data;
        } catch (error) {
            if (error.code === 'storage/unauthenticated') {
                await initializeFirebaseAuth(auth.access_token);
                return await uploadMediaToFirebase(files, listingId);
            }
            throw error;
        }
    }

    const cleanupOnFailure = async (listingId) => {
        try {
            // delete MongoDB listing
            await axiosPrivate.delete("/listing", {
                headers: {
                    Authorization: `Bearer ${auth.access_token}`
                },
                params: {
                    id: listingId
                }
            });
            
            // delete Firebase storage files
            const storageRef = ref(storage, `listings/${listingId}`);
            const items = await listAll(storageRef);
            await Promise.all(items.items.map(item => deleteObject(item)));
        } catch (error) {
            // log cleanup failure but don't throw - we're already handling an error
            console.error('Failed to cleanup resources:', error);
        }
    };

    const handleSubmit = async (e) => {
        // PROCESS: 
        // initiate post process by posting the listing to mongodb without the photos/videos.
        // the response will return the listingId, then we'll use that listingId to properly store the media files in Firebase
        // we then get the media URLs from firebase and update the mongodb listing with the media
        // if at any point of this fails, there are failsafes to delete from firebase and mongodb
        e.preventDefault();
        setIsSubmitting(true);
        let listingId;
        
        try {
            checkMinimumMediaCount();
    
            const listing = {
                name: itemName,
                price: price,
                category: category,
                description: description,
                location: location,
                condition: condition,
                tags: tags,
            };
    
            // Create listing in MongoDB
            const response = await axiosPrivate.post("/listing", listing, {
                headers: {
                    Authorization: `Bearer ${auth.access_token}`
                }
            });
    
            // Upload media and update listing
            listingId = response.data._id;
            await uploadMedia(listingId, photos, videos);
            
            toast({
                title: 'Listing created successfully',
                status: 'success',
                duration: 5000,
                isClosable: true
            });

            navigate(`/listing/${listingId}`);
        } catch (error) {
            console.error('Failed to create listing:', error);
            
            if (listingId) {
                await cleanupOnFailure(listingId);
            }
    
            toast({
                title: 'Failed to create listing',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const checkMinimumMediaCount = () => {
        if (photos.length == 0) {
            toast({
                title: 'At least one photo is required.',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
            throw new Error("At least one photo is required.")
        }
    };

    return (
        <Box h="100vh" w="100vw" bg="white" overflow="scroll">
            <Navbar />
            <Center>
                <Box mt={150} w={{ base: "90%", md: "80%", lg: "60%" }}>
                    <form onSubmit={handleSubmit}>
                        <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center">
                            <Text fontWeight="bold" fontSize="2xl">Create New Listing</Text>
                            <Button 
                                type="submit"
                                mt={{ base: 4, md: 0 }}
                                color="white"
                                bg="#2E55C4"
                                isLoading={isSubmitting}
                                loadingText="Creating listing..."
                                disabled={isSubmitting}
                            >
                                Post Listing
                            </Button>                        
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
                                    onChange={(e) =>
                                        setItemName(e.target.value)
                                    }
                                    required
                                />

                                <Text fontSize="sm" mt={5}>
                                    Category
                                </Text>
                                <Input
                                    borderWidth={1}
                                    borderRadius="10px"
                                    color="#989898"
                                    backgroundColor="white"
                                    mt={1}
                                    width="100%"
                                    type="text"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    required
                                />

                                <Text fontSize="sm" mt={5}>
                                    Description
                                </Text>
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
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    required
                                />

                                <Flex
                                    direction={{ base: "column", md: "row" }}
                                    mt={5}
                                >
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
                                            onChange={(e) =>
                                                setPrice(e.target.value)
                                            }
                                            required
                                        />
                                    </Box>
                                    <Box
                                        flex="1"
                                        mt={{ base: 5, md: 0 }}
                                        ml={{ md: 5 }}
                                    >
                                        <Text fontSize="sm">Condition</Text>
                                        <Select
                                            borderWidth={1}
                                            borderRadius="10px"
                                            color="#989898"
                                            backgroundColor="white"
                                            mt={1}
                                            width="100%"
                                            value={condition}
                                            onChange={(e) =>
                                                setCondition(e.target.value)
                                            }
                                            required
                                        >
                                            {conditions.map(
                                                (condition, index) => (
                                                    <option
                                                        key={index}
                                                        value={condition}
                                                    >
                                                        {condition}
                                                    </option>
                                                )
                                            )}
                                        </Select>
                                    </Box>
                                </Flex>

                                <Text fontSize="sm" mt={5}>
                                    Location
                                </Text>
                                <Input
                                    borderWidth={1}
                                    borderRadius="10px"
                                    color="#989898"
                                    backgroundColor="white"
                                    mt={1}
                                    width="100%"
                                    type="text"
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                    required
                                />
                            </Box>
                            <Box
                                flex="1"
                                mt={{ base: 10, md: 0 }}
                                ml={{ md: 10 }}
                            >
                                <FileUpload
                                    label="Photos"
                                    accept=".jpg, .png, .jpeg"
                                    onChange={setPhotos}
                                />
                                <FileUpload
                                    label="Videos"
                                    accept="video/*"
                                    onChange={setVideos}
                                />
                                <Text fontSize="sm" mt={5}>
                                    Tags
                                </Text>
                                <InputGroup width="100%">
                                    <InputRightElement
                                        pointerEvents="none"
                                        mt={1}
                                    >
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
                                        onChange={(e) =>
                                            setTags(e.target.value)
                                        }
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
