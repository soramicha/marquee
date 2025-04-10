// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react";
import Navbar from "./Navbar";
import FilterNavbar from "./FilterNavbar";
import ListingCard from "../components/ui/ListingCard";
import { axiosPrivate } from "@/api/axios";

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

function Home() {
    // Filter state
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([]);
    const [selectedCondition, setSelectedCondition] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [allListings, setAllListings] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        console.log("gathered all listings");
        getAllListings().then((res) => {
            console.log(res.data);
            setAllListings(res.data);
            setFilteredItems(res.data);
        });
    }, []);

    useEffect(() => {
        // If no filters are applied, reset to all listings
        console.log("Picked price range: ", selectedPriceRange);
        const filteredListings = allListings.filter((item) => {
            return (
                (selectedLocations.length === 0 ||
                    selectedLocations.includes(item.location)) &&
                (selectedCategories.length === 0 ||
                    selectedCategories.includes(item.category)) &&
                (selectedCondition.length === 0 ||
                    selectedCondition.includes(item.condition)) &&
                // filter price ranges
                (selectedPriceRange.length === 0 ||
                    (selectedPriceRange.includes("Above $500") &&
                        item.price >= 500) ||
                    (selectedPriceRange.includes("$100 - $500") &&
                        item.price >= 100 &&
                        item.price <= 500) ||
                    (selectedPriceRange.includes("$25 - $50") &&
                        item.price >= 25 &&
                        item.price <= 50) ||
                    (selectedPriceRange.includes("$15 - $25") &&
                        item.price >= 15 &&
                        item.price <= 25) ||
                    (selectedPriceRange.includes("Below $15") &&
                        item.price <= 15))
            );
        });
        console.log("Filtered Listings:", filteredListings);
        setFilteredItems(filteredListings);
    }, [
        selectedPriceRange,
        selectedCondition,
        selectedCategories,
        selectedLocations,
        allListings,
    ]);

    return (
        <Box bg="gray.100" minH="100vh" minW="100vw">
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
                    setSelectedCondition={setSelectedCondition}
                    selectedCondition={selectedCondition}
                    setSelectedPriceRange={setSelectedPriceRange}
                    selectedPriceRange={selectedPriceRange}
                />
                {/* Listings Grid */}
                <Box flex="1" p={{ base: 4, md: 8 }}>
                    <Text fontSize="2xl" fontWeight="bold" mb={6}>
                        Recommended for You
                    </Text>
                    <SimpleGrid
                        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                        spacing={6}
                    >
                        {filteredItems &&
                            filteredItems.map((item) => (
                                <ListingCard
                                    key={item._id}
                                    id={item._id}
                                    name={item.name}
                                    price={item.price}
                                    location={item.location}
                                    category={item.category}
                                    photos={item.photos}
                                    condition={item.condition}
                                />
                            ))}
                    </SimpleGrid>
                </Box>
            </Flex>
        </Box>
    );
}

export default Home;
