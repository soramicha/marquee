// src/pages/Favorites.jsx
import React from "react";
import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import Navbar from "./Navbar";
import ListingCard from "../components/ui/ListingCard";

function Favorites() {
  // Since we're not using a favorites context, we'll use a dummy favorites array.
  // You can later update this to use data from your backend or local storage.
  const favorites = []; // Replace with dummy data if needed

  return (
    <Box bg="gray.100" minH="100vh">
      <Navbar />
      <Box pt="80px" px={{ base: 4, md: 8 }}>
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Favorites
        </Text>
        {favorites.length === 0 ? (
          <Text>No favorites yet. Click the heart icon on a listing to add it!</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {favorites.map((item) => (
              <ListingCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                location={item.location}
                tags={item.tags}
                imageSrc={item.imageSrc}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}

export default Favorites;
