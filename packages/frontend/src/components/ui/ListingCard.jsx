// src/components/ui/ListingCard.jsx
import { Box, Image, IconButton, Text, Wrap, WrapItem, Tag } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import productImage from "../../assets/grayhoodie.png";

function ListingCard({ id, name, price, location, imageSrc, categories }) {
  // Local state to toggle heart color (dummy functionality)
  const [isFavorite, setIsFavorite] = useState(false);

  const displayedImage = imageSrc || productImage;

  return (
    <Box p={4} w="100%">
      <Box position="relative">
        <Image
          src={displayedImage}
          alt={name}
          w="100%"
          h="auto"
          objectFit="cover"
        />
        <IconButton
          icon={<FaHeart />}
          onClick={() => setIsFavorite(!isFavorite)}
          color={isFavorite ? "#2E55C4" : "black"}
          position="absolute"
          top="2"
          right="2"
          bg="white"
          fontSize="20px"
          _hover={{ bg: "gray.200" }}
          aria-label="favorite"
        />
      </Box>
      <Text fontSize="lg" fontWeight="bold" mt={3}>
        {name}
      </Text>
      <Text fontSize="sm">{price}</Text>
      <Text fontSize="sm">{location}</Text>
      {/* {tags && tags.length > 0 && (
        <Wrap spacing={2} mt={2}>
          {tags.map((tag) => (
            <WrapItem key={tag}>
              <Tag size="sm" variant="solid" colorScheme="blue">
                {tag}
              </Tag> */}
      {/*{categories && categories.length > 0 && (
        <Wrap spacing={2} mt={2}>
          {categories.map((category) => (
            <WrapItem key={category}>
              <Tag size="sm" variant="solid" colorScheme="blue">
                {category} 
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
        
      )}*/}
      <Tag size="sm" variant="solid" colorScheme="blue">{categories}</Tag>
    </Box>
  );
}

export default ListingCard;
