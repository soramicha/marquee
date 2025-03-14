// src/pages/Favorites.jsx
import { useEffect, useState } from "react";
import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import Navbar from "./Navbar";
import ListingCard from "../components/ui/ListingCard";
import { axiosPrivate } from "@/api/axios";

const getUserFavs = async (username) => {
    try {
        const response = await axiosPrivate.get("/users", {
            params: {
                username: username,
            },
        });
        console.log("Successfully retrieved user!", response.data);
        const user = response.data;
        return user[0].favorites;
    } catch (error) {
        console.log("Unable to successfully retriever user favs:", error);
    }
};

const getListings = async (listing_id) => {
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

function Favorites() {
    // Since we're not using a favorites context, we'll use a dummy favorites array.
    // You can later update this to use data from your backend or local storage.
    // const favorites = []; // Replace with dummy data if needed
    const [favorites, setFavorites] = useState([]);

    const username = localStorage.getItem("username");
    console.log(username, "this is username");
    const token = localStorage.getItem("authToken");
    console.log(token, "this is token");

    useEffect(() => {
        // fetch listing data for each favorite ID
        getUserFavs(username).then((res) => {
            Promise.all(
                res.map((id) => getListings(id).then((item) => item.data[0]))
            ).then((favoriteListings) => setFavorites(favoriteListings));
        });
    }, []);

    return (
        <Box bg="gray.100" minH="100vh">
            <Navbar />
            <Box pt="80px" px={{ base: 4, md: 8 }}>
                <Text fontSize="2xl" fontWeight="bold" mb={6}>
                    Favorites
                </Text>
                {!favorites ? (
                    <Text>
                        No favorites yet. Click the heart icon on a listing to
                        add it!
                    </Text>
                ) : (
                    <SimpleGrid
                        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                        spacing={6}
                    >
                        {favorites.map((item) => (
                            <ListingCard
                                key={item._id}
                                id={item._id}
                                name={item.name}
                                price={item.price}
                                location={item.location}
                                tags={item.tags}
                                imageSrc={item.imageSrc}
                                favorited="true"
                            />
                        ))}
                    </SimpleGrid>
                )}
            </Box>
        </Box>
    );
}

export default Favorites;
