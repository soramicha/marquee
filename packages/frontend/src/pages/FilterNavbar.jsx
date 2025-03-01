"use client"
import { Box, Text, Flex, CheckboxGroup } from "@chakra-ui/react";

function FilterNavbar() {
  return <>
    <Box w="64" h="100vh" p="6" bg="gray.200">
      {/* Heading */}
      {/* Use Text to replace h2 */}
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Filters
      </Text>

      {/* Categories */}
      {/* There is something called Box that acts like a div you can use! 
          Refer to other pages like login and signup for reference!
      */}
      <Box mb="6">
        {/* Use Text to replace h3; you can resize with textStyle="sm" as an example.
            There are other options like md, 2xl, etc. */}
        <Text fontSize="md" fontWeight="semibold" mb="2">
          Categories
        </Text>

        {/* Chakra has styling for checkbox options: go to https://www.chakra-ui.com/docs/components/checkbox */}
        <CheckboxGroup>
          <Flex direction="column" gap="2">
            {[
              "Apparel",
              "Electronics",
              "Free Stuff",
              "Furniture",
              "Housing",
              "Pet Supplies",
              "Textbooks",
              "Vehicles",
            ].map(category =>
              <label key={category} className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-base">{category}</span>
              </label>
            )}
          </Flex>
        </CheckboxGroup>
      </Box>

      {/* Location */}
      <Box>
        {/* Replace with Text */}
        <Text fontSize="md" fontWeight="semibold" mb="2">
          Location
        </Text>

        {/* Same changes as earlier */}
        <CheckboxGroup>
          <Flex direction="column" gap="2">
            {["On Campus", "Off Campus"].map((location) => (
              <label key={location} className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-base">{location}</span>
              </label>
            ))}
          </Flex>
        </CheckboxGroup>
      </Box>
    </Box>
  </>
}

export default FilterNavbar;
