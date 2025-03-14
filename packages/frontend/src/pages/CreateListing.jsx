import {
    Center,
    Box,
    Text,
    Button,
    Select,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Flex,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Search } from "lucide-react";
import FileUpload from "@/components/ui/FileUpload";
import Navbar from "./Navbar";
import { useAuth } from "@/context/AuthContext";
import { axiosPrivate } from "@/api/axios";
import { storage } from "@/config/firebase-config";
import {
    uploadBytes,
    ref,
    getDownloadURL,
    listAll,
    deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function CreateListing() {
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [itemName, setItemName] = useState("");
    // Replace the free-text category with a dropdown selection.
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [condition, setCondition] = useState("Brand New");
    // Remove the old "location" state and add new states for location type, residence area, and building.
    const [locationType, setLocationType] = useState(""); // "On Campus" or "Off Campus"
    const [residenceArea, setResidenceArea] = useState("");
    const [specificBuilding, setSpecificBuilding] = useState("");
    const [tags, setTags] = useState("");
    const { auth, initializeFirebaseAuth } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const conditions = [
        "Brand New",
        "Like New",
        "Gently Used",
        "Fair Condition",
        "Needs Repair",
    ];
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Category options for dropdown
    const categoryOptions = [
        "Apparel",
        "Electronics",
        "Free Stuff",
        "Furniture",
        "Housing",
        "Pet Supplies",
        "Textbooks",
        "Vehicles",
    ];

    // On-campus residence areas and their buildings
    const residenceAreasData = {
        "Yakʔitʸutʸu Halls": [
            "Tsɨtkawayu (Redwood Hall)",
            "Elewexe (Black Bear Hall)",
            "Tumił Sloʔow (Rattlesnake Hall)",
            "Tiłhini (Eagle Hall)",
            "Tsʰɨtqawɨ (Bobcat Hall)",
            "Nipumuʔ (Hummingbird Hall)",
            "Chekwaka (Tule Elk Hall)",
        ],
        "South Mountain Halls": [
            "Santa Lucia Hall",
            "Trinity Hall",
            "Muir Hall",
            "Sequoia Hall",
        ],
        "North Mountain Halls": [
            "Fremont Hall",
            "Tenaya Hall",
            "Shasta Hall",
            "Whitney Hall",
            "Palomar Hall",
        ],
        "Sierra Madre Halls": [
            "Buena Vista",
            "Diablo",
            "Estrella",
            "Huasna",
            "Islay",
            "Santa Ynez",
            "Cuesta",
        ],
        "Cerro Vista Apartments": [
            "Building A",
            "Building B",
            "Building C",
            "Building D",
            "Building E",
            "Building F",
            "Building G",
            "Building H",
            "Building I",
            "Building J",
            "Building K",
            "Building L",
            "Building M",
        ],
        "Poly Canyon Village (PCV) Apartments": [
            "Aliso",
            "Bristlecone",
            "Ceanothus",
            "Manzanita",
            "Oak",
            "Pinion",
            "Sage",
            "Torrey",
            "Willow",
        ],
    };

    const uploadMediaToFirebase = async (files, listingId) => {
        const photosURL = [];
        const videosURL = [];

        for (const file of files) {
            const fileExtension = file.name.split(".").pop();
            const fileName = `${uuidv4()}.${fileExtension}`;
            const isVideo = file.type.startsWith("video/");

            const storageRef = ref(
                storage,
                `/listings/${listingId}/${fileName}`
            );

            const metadata = {
                customMetadata: {
                    userId: auth.firebaseUID,
                },
            };

            const snapshot = await uploadBytes(storageRef, file, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);

            isVideo ? videosURL.push(downloadURL) : photosURL.push(downloadURL);
        }

        return { photosURL, videosURL };
    };

    const uploadMedia = async (listingId, photos, videos) => {
        if (!listingId || !photos.length) {
            throw new Error("Missing required parameters");
        }

        const files = [...photos, ...videos];

        // upload media to firebase and insert photo/video url into mongodb
        try {
            const { photosURL, videosURL } = await uploadMediaToFirebase(
                files,
                listingId
            );

            // update listing with media URLs
            const response = await axiosPrivate.patch(
                `/listing`,
                {
                    photos: photosURL,
                    videos: videosURL,
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth.access_token}`,
                    },
                    params: {
                        id: listingId,
                    },
                }
            );

            // return updated mongoDB object (currently unused)
            return response.data;
        } catch (error) {
            if (error.code === "storage/unauthenticated") {
                await initializeFirebaseAuth(auth.access_token);
                return await uploadMediaToFirebase(files, listingId);
            }
            throw error;
        }
    };

    const cleanupOnFailure = async (listingId) => {
        try {
            // delete MongoDB listing
            await axiosPrivate.delete("/listing", {
                headers: {
                    Authorization: `Bearer ${auth.access_token}`,
                },
                params: {
                    id: listingId,
                },
            });

            // delete Firebase storage files
            const storageRef = ref(storage, `listings/${listingId}`);
            const items = await listAll(storageRef);
            await Promise.all(items.items.map((item) => deleteObject(item)));
        } catch (error) {
            // log cleanup failure but don't throw - we're already handling an error
            console.error("Failed to cleanup resources:", error);
        }
    };

    const checkMinimumMediaCount = () => {
        if (photos.length === 0) {
            toast({
                title: "At least one photo is required.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            throw new Error("At least one photo is required.");
        }
    };

    const handleSubmit = async (e) => {
        // PROCESS:
        // Post the listing to MongoDB (without the photos/videos),
        // then use the returned listingId to store media files in Firebase.
        // After media upload, update the MongoDB listing with media URLs.
        // In case of failure, failsafes delete from Firebase and MongoDB.
        e.preventDefault();
        setIsSubmitting(true);
        let listingId;

        try {
            checkMinimumMediaCount();

            // Construct final location string based on dropdown selections.
            const finalLocation =
                locationType === "On Campus"
                    ? `${residenceArea} - ${specificBuilding}`
                    : "Off Campus";

            const listing = {
                name: itemName,
                price: price,
                category: category,
                description: description,
                location: finalLocation,
                condition: condition,
                tags: tags,
            };

            // Create listing in MongoDB
            const response = await axiosPrivate.post("/listing", listing, {
                headers: {
                    Authorization: `Bearer ${auth.access_token}`,
                },
            });

            // Upload media and update listing
            listingId = response.data._id;
            await uploadMedia(listingId, photos, videos);

            toast({
                title: "Listing created successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            navigate(`/listing/${listingId}`);
        } catch (error) {
            console.error("Failed to create listing:", error);

            if (listingId) {
                await cleanupOnFailure(listingId);
            }

            toast({
                title: "Failed to create listing",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box h="100vh" w="100vw" bg="white" overflow="scroll">
            <Navbar />
            <Center>
                <Box mt={150} w={{ base: "90%", md: "80%", lg: "60%" }}>
                    <form onSubmit={handleSubmit}>
                        <Flex
                            direction={{ base: "column", md: "row" }}
                            justify="space-between"
                            align="center"
                        >
                            <Text fontWeight="bold" fontSize="2xl">
                                Create New Listing
                            </Text>
                            <Button
                                type="submit"
                                mt={{ base: 4, md: 0 }}
                                color="white"
                                bg="#2E55C4"
                                isLoading={isSubmitting}
                                loadingText="Creating listing..."
                                disabled={isSubmitting}
                            >
                                Post Listing
                            </Button>
                        </Flex>
                        <Flex mt={10} direction={{ base: "column", md: "row" }}>
                            <Box flex="1">
                                <Text fontSize="sm">Item Name</Text>
                                <Input
                                    borderWidth={1}
                                    borderRadius="10px"
                                    color="#989898"
                                    backgroundColor="white"
                                    mt={1}
                                    width="100%"
                                    type="text"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                    required
                                />

                                <Text fontSize="sm" mt={5}>
                                    Category
                                </Text>
                                {/* Replaced text input with a dropdown for Category */}
                                <Select
                                    borderWidth={1}
                                    borderRadius="10px"
                                    color="#989898"
                                    backgroundColor="white"
                                    mt={1}
                                    width="100%"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    {categoryOptions.map((cat, index) => (
                                        <option key={index} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </Select>

                                <Text fontSize="sm" mt={5}>
                                    Description
                                </Text>
                                <Input
                                    borderWidth={1}
                                    borderRadius="10px"
                                    color="#989898"
                                    backgroundColor="white"
                                    mt={1}
                                    width="100%"
                                    height="250px"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />

                                <Flex
                                    direction={{ base: "column", md: "row" }}
                                    mt={5}
                                >
                                    <Box flex="1">
                                        <Text fontSize="sm">Price</Text>
                                        <InputGroup mt={1} width="100%">
                                            <InputLeftElement pointerEvents="none" children="$" />
                                            <Input
                                                borderWidth={1}
                                                borderRadius="10px"
                                                color="#989898"
                                                backgroundColor="white"
                                                type="number"
                                                step="0.01"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                onBlur={(e) => {
                                                    const num = parseFloat(e.target.value);
                                                    if (!isNaN(num)) {
                                                        setPrice(num.toFixed(2));
                                                    }
                                                }}
                                                required
                                            />
                                        </InputGroup>
                                    </Box>
                                    <Box
                                        flex="1"
                                        mt={{ base: 5, md: 0 }}
                                        ml={{ md: 5 }}
                                    >
                                        <Text fontSize="sm">Condition</Text>
                                        <Select
                                            borderWidth={1}
                                            borderRadius="10px"
                                            color="#989898"
                                            backgroundColor="white"
                                            mt={1}
                                            width="100%"
                                            value={condition}
                                            onChange={(e) =>
                                                setCondition(e.target.value)
                                            }
                                            required
                                        >
                                            {conditions.map((condition, index) => (
                                                <option key={index} value={condition}>
                                                    {condition}
                                                </option>
                                            ))}
                                        </Select>
                                    </Box>
                                </Flex>

                                {/* Updated Location Section */}
                                <Text fontSize="sm" mt={5}>
                                    Location
                                </Text>
                                <Select
                                    borderWidth={1}
                                    borderRadius="10px"
                                    color="#989898"
                                    backgroundColor="white"
                                    mt={1}
                                    width="100%"
                                    value={locationType}
                                    onChange={(e) => {
                                        setLocationType(e.target.value);
                                        // Reset residence area and building if location type changes
                                        setResidenceArea("");
                                        setSpecificBuilding("");
                                    }}
                                    required
                                >
                                    <option value="" disabled>
                                        Select location type
                                    </option>
                                    <option value="On Campus">On Campus</option>
                                    <option value="Off Campus">Off Campus</option>
                                </Select>
                                {locationType === "On Campus" && (
                                    <>
                                        <Text fontSize="sm" mt={5}>
                                            Residence Area
                                        </Text>
                                        <Select
                                            borderWidth={1}
                                            borderRadius="10px"
                                            color="#989898"
                                            backgroundColor="white"
                                            mt={1}
                                            width="100%"
                                            value={residenceArea}
                                            onChange={(e) => {
                                                setResidenceArea(e.target.value);
                                                setSpecificBuilding("");
                                            }}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select a residence area
                                            </option>
                                            {Object.keys(residenceAreasData).map((area, index) => (
                                                <option key={index} value={area}>
                                                    {area}
                                                </option>
                                            ))}
                                        </Select>
                                        {residenceArea && (
                                            <>
                                                <Text fontSize="sm" mt={5}>
                                                    Building
                                                </Text>
                                                <Select
                                                    borderWidth={1}
                                                    borderRadius="10px"
                                                    color="#989898"
                                                    backgroundColor="white"
                                                    mt={1}
                                                    width="100%"
                                                    value={specificBuilding}
                                                    onChange={(e) =>
                                                        setSpecificBuilding(e.target.value)
                                                    }
                                                    required
                                                >
                                                    <option value="" disabled>
                                                        Select a building
                                                    </option>
                                                    {residenceAreasData[residenceArea].map((building, index) => (
                                                        <option key={index} value={building}>
                                                            {building}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </>
                                        )}
                                    </>
                                )}
                            </Box>
                            <Box
                                flex="1"
                                mt={{ base: 10, md: 0 }}
                                ml={{ md: 10 }}
                            >
                                <FileUpload
                                    label="Photos"
                                    accept=".jpg, .png, .jpeg"
                                    onChange={setPhotos}
                                />
                                <FileUpload
                                    label="Videos"
                                    accept="video/*"
                                    onChange={setVideos}
                                />
                            </Box>
                        </Flex>
                    </form>
                </Box>
            </Center>
        </Box>
    );
}

export default CreateListing;
