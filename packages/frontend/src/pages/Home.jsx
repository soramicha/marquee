// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import FilterNavbar from "./FilterNavbar";
import ListingCard from "../components/ui/ListingCard";
import { axiosPrivate } from "@/api/axios";

const getAllListings = async () => {
  try {
    const response = await axiosPrivate.get("/listing");
    console.log("Successfully retrieved listings!");
    return response.data
  } catch (error) {
    console.log("Unable to successfully retrieve all listings:", error);
  }
}

function Home() {
  // Filter state
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [filteredItems, setFilteredItems] = useState([])
  
  useEffect(() => {
    console.log("gathered all listings");
    getAllListings().then((res) => 
    {
      setAllListings(res.data)
      setFilteredItems(res.data)
    })
      
  }, []);
  

  // Filter the recommended items based on selected categories and locations.
  /*const filteredItems = recommendedItems.filter((item) => { 
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);
    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(item.location);
    console.log("matchesCategory:", matchesCategory, "item:", item, "item.category:", item.category)
    return matchesCategory && matchesLocation;
  });*/

  useEffect(() => {
    // If no filters are applied, reset to all listings
    if (selectedCategories.length === 0 && selectedLocations.length === 0) {
      console.log("get all listings again, no filters used", allListings);
      setFilteredItems(allListings);
    } else {
      console.log("selected locations", selectedLocations)
      console.log("selected categories", selectedCategories)

      const s = allListings.filter((item) => {
        console.log(item.category)
        return selectedLocations.map(loc => loc.includes(item.location)) &&
               selectedCategories.map(cat => cat.includes(item.category))
      });
      
      console.log(s)
    }
  }, [selectedCategories, selectedLocations, allListings]);


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
            {filteredItems && filteredItems.map((item) => (
                <Link key={item._id} to={`/listing/${item._id}`}>
                  <ListingCard
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    location={item.location}
                    categories ={item.category}
                  />
                </Link>
              ))
              }
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  );
}

export default Home;
