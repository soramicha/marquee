// src/pages/ListingDetail.jsx
//import React, { useState } from "react";
import {
    Box,
    Flex,
    Image,
    Text,
    Button,
    IconButton,
    Avatar,
    SimpleGrid,
    Tag,
    TagLabel,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosPrivate } from "@/api/axios";
import Navbar from "./Navbar";
import ListingCard from "../components/ui/ListingCard";

const getListingDetail = async (listing_id) => {
    try {
        const response = await axiosPrivate.get("/listing", {
            params: {
                id: listing_id,
            },
        });
        console.log("Successfully retrieved listing!", response.data);
        return response.data;
    } catch (error) {
        console.log("Unable to get listings:", error);
    }
};


const getUserInfo = async (username) => {
    try {
        const response = await axiosPrivate.get("/users", {
            params: {
                username: username,
            },
        });
        console.log("Successfully retrieved user!", response.data);
        const user = response.data;
        return user[0];
    } catch (error) {
        console.log("Unable to successfully retriever user info:", error);
    }
};

const getAllListings = async () => {
    try {
        const response = await axiosPrivate.get("/listing");
        console.log(response.data);
        console.log("Successfully retrieved listings!");
        return response.data;
    } catch (error) {
        console.log("Unable to successfully retrieve all listings:", error);
    }
};

function ListingDetail() {
    // retrieve id from url
    const { id } = useParams();
    const [interested, setInterested] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [productData, setProductData] = useState({})
    const [sellerUsername, setSellerUsername] = useState("");
    const username = localStorage.getItem('username');
    const [similarListings, setSimilarListings] = useState([])

    useEffect(() => {
        // get listing info
        getListingDetail(id).then(res => {
            console.log("retrived listing info!", res.data[0])
            setProductData(res.data[0])
            setSelectedImage(res.data[0].photos[0])

            getAllListings().then(listing => {
                console.log("category", res.data[0].category, "LISTING DATA", listing.data);
                const similar = listing.data.filter((item) => {
                    return (res.data[0].category.includes(item.category) && (id != item._id))
                })
                console.log('SIMILAR:', similar)
                setSimilarListings(similar)
            });
        })

        // get user info
        getUserInfo(username).then(res => {
            console.log(res.favorites, " is the user info!")
            setSellerUsername(res.username)
            if (res.favorites.includes(id)) {
                setIsFavorite(true)
            }
        })
    }, [])

    /*const similarListings = [
        { id: 1, name: "Gray Hoodie", price: "$15", location: "Yosemite Hall", category: "Clothing" },
        { id: 2, name: "Blue Sweater", price: "$25", location: "Cerro Vista", category: "Clothing" },
        { id: 3, name: "Black Jacket", price: "$30", location: "Sierra Madre", category: "Clothing" },
    ];*/

    return (
        <Box bg="gray.100" minH="100vh">
            <Navbar />
            <Box
                mt={20}
                w="100%"
                pt={{ base: "60px", md: "125px" }}
                pb={{ base: "60px", md: "100px" }}
                px={{ base: "20px", md: "100px" }}
            >
                <Flex
                    direction={{ base: "column", md: "row" }}
                    align="flex-start"
                    gap={8}
                >
                    {/* LEFT: Thumbnails */}
                    <Box
                        display="flex"
                        flexDirection={{ base: "row", md: "column" }}
                        gap={4}
                        alignItems={{ base: "center", md: "flex-start" }}
                    >
                        {productData.photos?.map((img, idx) => (
                            <Image
                                key={idx}
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                boxSize="90px"
                                objectFit="cover"
                                borderRadius="md"
                                cursor="pointer"
                                onClick={() => setSelectedImage(img)}
                                _hover={{ borderColor: "#2E55C4" }}
                            />
                        ))}
                        {productData.videos?.map((img, idx) => (
                            <Image
                                key={idx}
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                boxSize="90px"
                                objectFit="cover"
                                borderRadius="md"
                                cursor="pointer"
                                onClick={() => setSelectedImage(img)}
                                _hover={{ borderColor: "#2E55C4" }}
                            />
                        ))}
                    </Box>

                    {/* CENTER: Main image */}
                    <Box flex="1" display="flex" justifyContent="center">
                        <Box position="relative">
                            <Image
                                src={selectedImage}
                                alt={productData.name}
                                maxH="700px"
                                objectFit="cover"
                                borderRadius="md"
                            />
                            <IconButton
                                icon={<FaHeart />}
                                aria-label="favorite"
                                onClick={() => setIsFavorite(!isFavorite)}
                                color={isFavorite ? "#2E55C4" : "black"}
                                position="absolute"
                                top="2"
                                right="2"
                                bg="white"
                                _hover={{ bg: "gray.200" }}
                                fontSize="20px"
                            />
                        </Box>
                    </Box>

                    {/* RIGHT: Product details */}
                    <Box
                        flex="1"
                        bg="white"
                        p={6}
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                    >
                        <Box>
                            <Text fontSize="3xl" fontWeight="bold">
                                {productData.name}
                            </Text>
                            <Text fontSize="2xl" fontWeight="semibold" mt={2}>
                                ${productData.price?.toFixed(2)}
                            </Text>
                            <Text mt={6} fontSize="lg" color="gray.700">
                                {productData.description}
                            </Text>
                            <Box mt={6} fontSize="lg">
                                <Text>
                                    <strong>Condition:</strong>{" "}
                                    {productData.condition}
                                </Text>
                                <Text>
                                    <strong>Location:</strong>{" "}
                                    {productData.location}
                                </Text>
                            </Box>
                            {/* Tags */}
                            {/*<Wrap mt={6}>
                                {productData.tags?.map((tag) => (
                                    <WrapItem key={tag}>
                                        <Tag
                                            size="md"
                                            variant="solid"
                                            colorScheme="blue"
                                        >
                                            <TagLabel>{tag}</TagLabel>
                                        </Tag>
                                    </WrapItem>
                                ))}
                            </Wrap>*/}
                            <Tag size="md" mt={5} variant="solid" colorScheme="blue"><TagLabel>{productData.category}</TagLabel></Tag>
                            <Flex align="center" mt={6}>
                                <Avatar
                                    name={sellerUsername}
                                    size="md"
                                    mr={3}
                                />
                                <Text fontSize="lg">
                                    {sellerUsername}
                                </Text>
                            </Flex>
                        </Box>
                        <Box mt={8}>
                            <Button
                                fontSize="lg"
                                px={8}
                                py={6}
                                bg={interested ? "orange.400" : "#2E55C4"}
                                color="white"
                                onClick={() => setInterested(!interested)}
                                _hover={{ opacity: 0.8 }}
                            >
                                {interested
                                    ? sellerUsername
                                    : "I'm Interested"}
                            </Button>
                        </Box>
                    </Box>
                </Flex>
                {/* Similar Listings */}
                <Box mt={12}>
                {similarListings && similarListings.length > 0 && (
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>
                        Similar Listings
                    </Text>
                    )}
                    <SimpleGrid
                        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                        spacing={6}
                    >
                        {similarListings.map(item => (
                            <ListingCard
                                key={item._id}
                                id={item._id}
                                name={item.name}
                                price={item.price}
                                location={item.location}
                                category={item.category}
                                photos={item.photos}
                            />
                        ))}
                    </SimpleGrid>
                </Box>
            </Box>
        </Box>
    );
}

export default ListingDetail;
