import {
  Box,
  Container,
  Grid,
  Flex,
  Text,
  Heading,
  Avatar,
  Stack,
  SimpleGrid,
  Stat,
  StatNumber,
  StatLabel,
  useColorModeValue
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ListingCard from "../components/ui/ListingCard";
import { axiosPrivate } from "@/api/axios";

function Profile() {
  const { auth } = useAuth();
  const [listings, setListings] = useState([]);
  const bg = useColorModeValue("gray.100", "gray.700");
  
  useEffect(() => {
    async function fetchListings() {
      if (auth.username) {
        try {
          const response = await axiosPrivate.get(`/listing/user`, {
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
            }
            // params: {
            //   username: auth.username
            // }
          });
          setListings(response.data.data);
        } catch (error) {
          console.error(error);
        }   
      }
    }
    fetchListings();
  }, [auth]);

  console.log(listings);
  return (
    <Box minH="100vh" minW="100vw" bg="gray.50">
      <Navbar />
      <Container maxW="container.xl" pt="150px">
        <Grid templateColumns={{ base: "1fr", md: "450px 1fr" }} gap={8}>
          {/* Left Column */}
          <Stack spacing={4}>
            {/* Profile Header */}
            <Flex align="center">
              <Avatar
                size="lg"
                mr={4}
                bg="gray.300"
              />
              <Box>
                <Heading size="md">
                  {auth.username}{" "}
                  <Text as="span" aria-label="edit">
                    ✏️
                  </Text>
                </Heading>
                <Text color="gray.600">{auth.username}</Text>
              </Box>
            </Flex>

            {/* Bio Section */}
            <Box p={4} bg={bg} borderRadius="md">
              <Text>Your bio goes here.</Text>
            </Box>

            {/* Stats Section */}
            <SimpleGrid columns={2} spacing={4} p={4} bg={bg} borderRadius="md">
              <Stat textAlign="center">
                <StatNumber>0</StatNumber>
                <StatLabel>Listings</StatLabel>
              </Stat>
              <Stat textAlign="center">
                <StatNumber>0</StatNumber>
                <StatLabel>Page Views</StatLabel>
              </Stat>
              <Stat textAlign="center">
                <StatNumber>0</StatNumber>
                <StatLabel>Pendings</StatLabel>
              </Stat>
              <Stat textAlign="center">
                <StatNumber>0</StatNumber>
                <StatLabel>Reviews</StatLabel>
              </Stat>
            </SimpleGrid>
          </Stack>

          {/* Right Column */}
          <Box>
            <Heading size="md" mb={4}>My Listings</Heading>
            {listings.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {listings.map((listing) => (
                  <ListingCard
                    key={listing._id}
                    id={listing._id}
                    name={listing.name}
                    category={listing.category}
                    price={`${listing.price.toFixed(2)}`}
                    location={listing.location}
                    tags={listing.tags}
                    imageSrc={listing.photos?.[0]}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <Text>No listings found.</Text>
            )}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export default Profile;