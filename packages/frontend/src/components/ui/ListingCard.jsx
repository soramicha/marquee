//ListingCard.jsx

import {Box, Image, IconButton, Text} from "@chakra-ui/react";
import productImage from "../../assets/grayhoodie.png";
import {FaHeart} from "react-icons/fa";
import {useState} from "react";
import "@fontsource/inter";

function ListingCard ({name, price, location}) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <Box borderWidth = "1px" w = "300px" h = "400px" padding = "2">
            <Box w = "100%" aspectRatio = {1.15} bg = "lightGray" objectFit = "cover" position = "relative"> 
                <Image w = "100%" h = "100%" src = {productImage} />
                <IconButton icon = {<FaHeart />} onClick = {() => setIsFavorite(!isFavorite)} color = {isFavorite ? "#2E55C4" : "black"} position = "absolute" top = "2" right = "2" bg = "transparent" fontSize = "25px"> </IconButton>
                <Text fontSize = "lg" fontWeight = "bold"> {name} </Text>
                <Text fontSize = "md" > {price} </Text>
                <Text fontSize = "md"> {location} </Text>           
            </Box>
            {/* Text and edit button will go here */}
        </Box>
    )
};

export default ListingCard;
