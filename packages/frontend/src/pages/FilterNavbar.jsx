"use client";
import { Box, Text, Flex, CheckboxGroup, Checkbox } from "@chakra-ui/react";

function FilterNavbar({
    selectedCategories,
    setSelectedCategories,
    selectedLocations,
    setSelectedLocations,
}) {
    const categories = [
        "Apparel",
        "Electronics",
        "Free Stuff",
        "Furniture",
        "Housing",
        "Pet Supplies",
        "Textbooks",
        "Vehicles",
    ];

    const locations = ["On Campus", "Off Campus"];

    return (
        <Box w="64" h="100vh" p="6" bg="gray.200">
            <Text fontSize="xl" fontWeight="bold" mb="4">
                Filters
            </Text>

            <Box mb="6" p="2">
                <Text fontSize="md" fontWeight="semibold" mb="2">
                    Categories
                </Text>
                <CheckboxGroup
                    value={selectedCategories}
                    onChange={(values) => setSelectedCategories([...values])}
                >
                    <Flex direction="column" gap="2">
                        {categories.map((category) => (
                            <Checkbox
                                key={category}
                                value={category}
                                borderColor="gray.600"
                            >
                                {/* sx={{
                  ".chakra-checkbox__control": {
                    display: "flex !important", // Force the checkbox to be visible
                    visibility: "visible !important",
                    opacity: "1 !important",
                  },
                }}> */}
                                {category}
                            </Checkbox>
                        ))}
                    </Flex>
                </CheckboxGroup>
            </Box>

            <Box p="2">
                <Text fontSize="md" fontWeight="semibold" mb="2">
                    Location
                </Text>
                <CheckboxGroup
                    value={selectedLocations}
                    onChange={(values) => setSelectedLocations([...values])}
                >
                    <Flex direction="column" gap="2">
                        {locations.map((loc) => (
                            <Checkbox
                                key={loc}
                                value={loc}
                                borderColor="gray.600"
                            >
                                {loc}
                            </Checkbox>
                        ))}
                    </Flex>
                </CheckboxGroup>
            </Box>
        </Box>
    );
}

export default FilterNavbar;
