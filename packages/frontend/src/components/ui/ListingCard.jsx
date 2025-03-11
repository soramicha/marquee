// src/components/ui/ListingCard.jsx
import {
    Box,
    Image,
    IconButton,
    Text,
    Wrap,
    WrapItem,
    Tag,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import productImage from "../../assets/grayhoodie.png";
import { axiosPrivate } from "@/api/axios";

const addFavorite = async (token, username, listing_id) => {
  try {
    // call the backend
    await axiosPrivate.patch("/addFav", {}, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        username: username,
        listing_id: listing_id
      }
    })
    console.log("Successfully added listing to favorites!")
  }
  catch (error) {
    console.log("Error adding listing to favorites.")
  }
}

const removeFavorite = async (token, username, listing_id) => {
  try {
    // call the backend
    await axiosPrivate.patch("/remFav", {}, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        username: username,
        listing_id: listing_id
      }
    })
    console.log("Successfully removed listing from favorites!")
  }
  catch (error) {
    console.log("Error removing listing from favorites.")
  }
}

function ListingCard({ id, name, price, location, imageSrc, tags, favorited }) {
  // Local state to toggle heart color (dummy functionality)
  const [isFavorite, setIsFavorite] = useState(favorited === "true" ? true : false);
  const token = localStorage.getItem('authToken')
  const username = localStorage.getItem('username')
  console.log(username, "this is username")
  console.log(token, "this is token")
  const displayedImage = imageSrc || productImage;

  const FavoriteStatus = () => {
    // changing colors of favorite / unfavorite button
    setIsFavorite(!isFavorite)

    // if we want to favorite it, we will favorite it
    if (!isFavorite) {
        addFavorite(token, username, id)
    }
    // otherwise, unfavorite it
    else {
      removeFavorite(token, username, id)
    }
  }

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
          onClick={FavoriteStatus}
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
