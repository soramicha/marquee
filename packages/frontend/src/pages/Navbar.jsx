import { Box, Text, Flex, Spacer, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Box
      bg="#2E55C4"
      px={10}
      py={4}
      w="100%"
      color="white"
      position="fixed"
      top={0}
      left={0}
      zIndex={1000}
    >
      <Flex align="center" maxW="1200px" mx="auto">
        {/* MARQUEE */}
        <Text
          fontSize="xl"
          fontWeight="bold"
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
        >
          MARQUEE
        </Text>

        {/* Nav Bar */}
        <Flex ml={10} gap={6}>
          <Link to="/">
            <Text fontSize="md" color="white" _hover={{ textDecoration: "underline" }}>
              Home
            </Text>
          </Link>
          <Link to="/messages">
            <Text fontSize="md" color="white" _hover={{ textDecoration: "underline" }}>
              Messages
            </Text>
          </Link>
        </Flex>

        <Spacer />

        {/* Create Listing */}
        <Flex align="center" gap={4}>
          <Link to="/">
            <Text fontSize="md" color="white" _hover={{ textDecoration: "underline" }}>
              Create Listing
            </Text>
          </Link>
        
        <Image src="cat.png"
        boxSize="50px"
        borderRadius="full"
        fit="cover"
        alt="Cat"></Image>

        </Flex>
        
      </Flex>
    </Box>
  );
}

export default Navbar;
