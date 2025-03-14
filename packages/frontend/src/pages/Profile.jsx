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
  useColorModeValue,
  VStack,
  HStack,
  Divider
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ListingCard from "../components/ui/ListingCard";
import { axiosPrivate } from "@/api/axios";

// Sample reviews data (replace with your real data or API call)
const reviewsData = [
    {
        reviewerName: "John Doe",
        date: "March 1, 2025",
        rating: 5,
        comment: "Great user to do business with!",
    },
    {
        reviewerName: "Jane Smith",
        date: "March 3, 2025",
        rating: 4,
        comment: "Friendly and quick responses, recommended!",
    },
    {
        reviewerName: "Alice Brown",
        date: "March 5, 2025",
        rating: 5,
        comment: "Excellent communication and fast shipping!",
    },
    {
        reviewerName: "Bob Martin",
        date: "March 7, 2025",
        rating: 5,
        comment: "Item was exactly as described.",
    },
    {
        reviewerName: "Chris Green",
        date: "March 9, 2025",
        rating: 4,
        comment: "Overall good experience.",
    },
];

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

    // Compute the average rating from reviewsData
    const averageRating = reviewsData.length
        ? (
              reviewsData.reduce((sum, r) => sum + r.rating, 0) /
              reviewsData.length
          ).toFixed(1)
        : 0;

    // Renders a row of star icons for a given numeric rating (integer only)
    // If you want to handle half-stars, you'll need a custom icon or approach.
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <StarIcon
                    key={i}
                    color={i <= rating ? "#2E55C4" : "gray"}
                    boxSize={4}
                    style={{ marginRight: "2px" }}
                />
            );
        }
        return <div style={{ display: "flex" }}>{stars}</div>;
    };

  return (
    <Box minH="100vh" minW="100vw" bg="gray.50">
      <Navbar />
      <Container maxW="container.xl" pt="150px">
        <Grid templateColumns={{ base: "1fr", md: "450px 1fr" }} gap={8}>
          {/* Left Column */}
          <Stack spacing={4}>
            {/* Profile Header and Bio sections remain the same */}
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
                <StatNumber>{auth?.listings || 0}</StatNumber>
                <StatLabel>Listings</StatLabel>
              </Stat>
              <Stat textAlign="center">
                <StatNumber>{auth?.pageViews || 0}</StatNumber>
                <StatLabel>Page Views</StatLabel>
              </Stat>
              <Stat textAlign="center">
                <StatNumber>{auth?.pendings || 0}</StatNumber>
                <StatLabel>Pendings</StatLabel>
              </Stat>
              <Stat textAlign="center">
                <StatNumber>{reviewsData.length}</StatNumber>
                <StatLabel>Reviews</StatLabel>
              </Stat>
            </SimpleGrid>

            {/* Reviews Section */}
            <Box p={4} bg={bg} borderRadius="md">
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md" color="blue.600">Reviews</Heading>
                {reviewsData.length > 0 && (
                  <HStack spacing={2}>
                    <Text fontWeight="bold">{averageRating} / 5</Text>
                    <Flex>{renderStars(Math.round(averageRating))}</Flex>
                  </HStack>
                )}
              </Flex>

              <VStack spacing={3} align="stretch">
                {reviewsData.length === 0 ? (
                  <Text color="gray.500">No reviews yet.</Text>
                ) : (
                  reviewsData.map((review, idx) => (
                    <Box key={idx} p={3} bg="white" borderRadius="md" shadow="sm">
                      <Flex justify="space-between" mb={2}>
                        <Text fontWeight="bold">{review.reviewerName}</Text>
                        <Text color="gray.500" fontSize="sm">{review.date}</Text>
                      </Flex>
                      <Flex mb={2}>{renderStars(review.rating)}</Flex>
                      <Text>{review.comment}</Text>
                    </Box>
                  ))
                )}
              </VStack>
            </Box>
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
                    photos={listing.photos}
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
