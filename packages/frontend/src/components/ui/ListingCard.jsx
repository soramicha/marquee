// src/components/ui/ListingCard.jsx
import { Box, Image, IconButton, Text, Wrap, WrapItem, Tag } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import productImage from "../../assets/grayhoodie.png";

function ListingCard({ id, name, price, location, imageSrc, tags }) {
  // Local state to toggle heart color (dummy functionality)
  const [isFavorite, setIsFavorite] = useState(false);
  
// EXAMPLE DATA
//   {
//     "status": true,
//     "name": "sony tv",
//     "price": 1.99,
//     "category": "Electronics",
//     "description": "2024 120 inch 16k tv. hard offer. no lowballs",
//     "photos": [],
//     "videos": [],
//     "tags": [
//         "laptop",
//         "apple",
//         "macbook",
//         "computer"
//     ],
//     "location": "Engineering Building Room 205",
//     "condition": "Like New",
//     "user": "67c5d8c64355adebe8910e76",
//     "_id": "67cb2fc6a56a8f08c1ba06d0",
//     "createdAt": "2025-03-07T17:41:26.025Z",
//     "updatedAt": "2025-03-07T17:41:26.025Z",
//     "__v": 0
// }

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
      {tags && tags.length > 0 && (
        <Wrap spacing={2} mt={2}>
          {tags.map((tag) => (
            <WrapItem key={tag}>
              <Tag size="sm" variant="solid" colorScheme="blue">
                {tag}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </Box>
  );
}

export default ListingCard;
