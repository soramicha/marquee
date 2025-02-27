//ListingCard.jsx

import {Box, Image, Center, IconButton, Text} from "@chakra-ui/react";
import productImage from "../../assets/grayhoodie.png";
import {FaHeart} from "react-icons/fa";
import {useState} from "react";
//import "@fontsource/inter";
//import "@fontsource/inter/500.css";

function ListingCard ({name, price, location}) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <Box borderWidth={2} borderColor="black" borderRadius={4} w = "300px" h = "350px" backgroundColor="white" padding = "4" fontFamily = "Inter" >
            <Box w = "100%" aspectRatio = {1.1} bg = "lightGray" objectFit = "cover" position = "relative" fontFamily = "Inter"> 
                <Image w = "100%" h = "100%" src = {productImage} />
                <IconButton 
                    icon = {<FaHeart />} 
                    onClick = {() => setIsFavorite(!isFavorite)} 
                    color = {isFavorite ? "#2E55C4" : "black"} 
                    position = "absolute" 
                    top = "2" 
                    right = "2" 
                    bg = "transparent" 
                    fontSize = "25px"> 
                </IconButton>    
            </Box>

            <Text fontSize = "lg" fontWeight = "bold"> {name} </Text>
            <Text fontSize = "sm"> {price} </Text>
            <Text fontSize = "sm"> {location} </Text>               
        </Box>
    )
};

export default ListingCard;
