// src/components/ui/ListingCard.jsx
import { Box, Image, IconButton, Text, Tag } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import productImage from "../../assets/grayhoodie.png";
import { axiosPrivate } from "@/api/axios";
import { useNavigate } from "react-router-dom";

const addFavorite = async (token, username, listing_id) => {
    try {
        // call the backend
        await axiosPrivate.patch(
            "/addFav",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    username: username,
                    listing_id: listing_id,
                },
            }
        );
        console.log("Successfully added listing to favorites!");
    } catch (error) {
        console.log("Error adding listing to favorites", error);
    }
};

const removeFavorite = async (token, username, listing_id) => {
    try {
        // call the backend
        await axiosPrivate.patch(
            "/remFav",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    username: username,
                    listing_id: listing_id,
                },
            }
        );
        console.log("Successfully removed listing from favorites!");
    } catch (error) {
        console.log("Error removing listing from favorites", error);
    }
};

const getUserFavs = async (username) => {
    try {
        const response = await axiosPrivate.get("/users", {
            params: {
                username: username,
            },
        });
        //console.log("Successfully retrieved user!", response.data);
        const user = response.data;
        return user[0].favorites;
    } catch (error) {
        console.log("Unable to successfully retriever user favs:", error);
    }
};

function ListingCard({ id, name, price, location, photos, category }) {
    let navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");
    const displayedImage = photos ? photos[0] : productImage;

    useEffect(() => {
        getUserFavs(username).then((res) => {
            if (res.includes(id)) {
                setIsFavorite(true);
            }
        });
    }, []);

    const FavoriteStatus = () => {
        // changing colors of favorite / unfavorite button
        setIsFavorite(!isFavorite);

        // if we want to favorite it, we will favorite it
        if (!isFavorite) {
            addFavorite(token, username, id);
        }
        // otherwise, unfavorite it
        else {
            removeFavorite(token, username, id);
        }
    };

    const goToParticularListingPage = () => {
        console.log("clicked to go to listing detail page!")
        navigate(`/listing/${id}`);
    };

    return (
        <Box p={4} w="100%">
            <Box position="relative">
                <Image
                    src={displayedImage}
                    alt={name}
                    w="100%"
                    h="auto"
                    objectFit="cover"
                    onClick={goToParticularListingPage}
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
            <Text
                fontSize="lg"
                fontWeight="bold"
                mt={3}
                onClick={goToParticularListingPage}
            >
                {name}
            </Text>
            <Text fontSize="sm" onClick={goToParticularListingPage}>
                {`$${price} USD`}
            </Text>
            <Text fontSize="sm" onClick={goToParticularListingPage}>
                {location}
            </Text>
            <Tag
                onClick={goToParticularListingPage}
                size="sm"
                variant="solid"
                colorScheme="blue"
                mt={3}
            >
                {category}
            </Tag>
        </Box>
    );
}

export default ListingCard;
