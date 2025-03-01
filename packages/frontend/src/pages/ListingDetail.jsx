// ListingDetail.jsx
import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  IconButton,
  Avatar
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

import grayHoodie from "../assets/grayhoodie.png";
import alt1 from "../assets/alt1.webp";
import alt2 from "../assets/alt2.webp";
import alt3 from "../assets/alt3.webp";


import Navbar from "./Navbar";
import ListingCard from "@/components/ui/ListingCard";

function ListingDetail() {
  // Example data
  const productData = {
    title: "Oversized Gray Hoodie",
    price: 20.0,
    description:
      "Super comfy and perfect for those cold lecture halls or lazy days. I’ve loved this hoodie, but I just don’t wear it enough anymore. Still in great condition—no stains or holes! Just trying to clear out my closet. Let me know if you’re interested!",
    condition: "Used",
    location: "Poly Canyon Village",
    sellerName: "Samantha Smith",
    sellerEmail: "samantha@calpoly.edu",
    mainImage: grayHoodie,
    otherImages: [grayHoodie, alt1, alt2, alt3]  };

  const similarListings = [
    { id: 1, name: "Gray Hoodie", price: "$15", location: "Yosemite Hall" },
    { id: 2, name: "Blue Sweater", price: "$25", location: "Cerro Vista" },
    { id: 3, name: "Black Jacket", price: "$30", location: "Sierra Madre" }
  ];

  // State for "I'm Interested" button & favorite icon
  const [interested, setInterested] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Main image display
  const [selectedImage, setSelectedImage] = useState(productData.mainImage);

  return (
    <Box bg="gray.100" minH="100vh">
      {/* Full-width Navbar (fixed at top) */}
      <Navbar />

      {/*
        Outer container:
        - px={{ base: "20px", md: "100px" }} → 100px left/right margin on md+ screens
        - pt/pb for top/bottom spacing
      */}
      <Box
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
          {/* LEFT: Thumbnails (vertical on md, horizontal on mobile) */}
          <Box
            display="flex"
            flexDirection={{ base: "row", md: "column" }}
            gap={4}
            alignItems={{ base: "center", md: "flex-start" }}
          >
            {productData.otherImages.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                boxSize="90px" /* bigger thumbnails */
                objectFit="cover"
                borderRadius="md"
                border="1px solid #ccc"
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
                alt={productData.title}
                maxH="700px" /* bigger main image */
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
            borderRadius="md"
            p={6}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box>
              <Text fontSize="3xl" fontWeight="bold">
                {productData.title}
              </Text>
              <Text fontSize="2xl" fontWeight="semibold" mt={2}>
                ${productData.price.toFixed(2)}
              </Text>

              <Text mt={6} fontSize="lg" color="gray.700">
                {productData.description}
              </Text>

              <Box mt={6} fontSize="lg">
                <Text>
                  <strong>Condition:</strong> {productData.condition}
                </Text>
                <Text>
                  <strong>Location:</strong> {productData.location}
                </Text>
              </Box>

              <Flex align="center" mt={6}>
                <Avatar name={productData.sellerName} size="md" mr={3} />
                <Text fontSize="lg">{productData.sellerName}</Text>
              </Flex>
            </Box>

            {/* I'm Interested button */}
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
                {interested ? productData.sellerEmail : "I'm Interested"}
              </Button>
            </Box>
          </Box>
        </Flex>

        {/* SIMILAR LISTINGS */}
        <Box mt={12}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Similar Listings
          </Text>
          <Flex wrap="wrap" gap={6}>
            {similarListings.map((item) => (
              <ListingCard
                key={item.id}
                name={item.name}
                price={item.price}
                location={item.location}
                // If you want them all to be hoodie:
                // imageSrc={grayHoodie}
              />
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default ListingDetail;
