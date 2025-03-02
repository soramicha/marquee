// src/pages/Home.jsx
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import FilterNavbar from "./FilterNavbar";
import ListingCard from "../components/ui/ListingCard";

function Home() {
  // Example recommended items with category, location, and tags
  const recommendedItems = [
    {
      id: 1,
      name: "Vintage T-Shirt",
      price: "$10.00",
      location: "On Campus",
      category: "Apparel",
      tags: ["Apparel", "Vintage"],
    },
    {
      id: 2,
      name: "iPhone Charger",
      price: "$5.00",
      location: "Off Campus",
      category: "Electronics",
      tags: ["Electronics"],
    },
    {
      id: 3,
      name: "Couch",
      price: "$50.00",
      location: "Off Campus",
      category: "Furniture",
      tags: ["Furniture", "Home"],
    },
    {
      id: 4,
      name: "Free Old Textbook",
      price: "$0.00",
      location: "On Campus",
      category: "Textbooks",
      tags: ["Textbooks"],
    },
    {
      id: 5,
      name: "Pet Toys",
      price: "$8.00",
      location: "On Campus",
      category: "Pet Supplies",
      tags: ["Pet Supplies", "Toys"],
    },
    {
      id: 6,
      name: "Used Bike",
      price: "$100.00",
      location: "Off Campus",
      category: "Vehicles",
      tags: ["Vehicles"],
    },
  ];

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  // Filter the recommended items based on selected categories and locations.
  const filteredItems = recommendedItems.filter((item) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);
    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(item.location);
    return matchesCategory && matchesLocation;
  });

  return (
    <Box bg="gray.100" minH="100vh">
      {/* Top Navbar */}
      <Navbar />

      {/* Main content area with filters and listings */}
      <Flex pt="80px" w="100%" h="100%">
        {/* Filter Sidebar */}
        <FilterNavbar
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
        />

        {/* Listings Grid */}
        <Box flex="1" p={{ base: 4, md: 8 }}>
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Recommended for You
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {filteredItems.map((item) => (
              <Link key={item.id} to={`/listing/${item.id}`}>
                <ListingCard
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  location={item.location}
                  tags={item.tags}
                />
              </Link>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  );
}

export default Home;
