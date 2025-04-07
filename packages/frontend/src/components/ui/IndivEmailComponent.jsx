import { Box, Flex, Center, Text } from "@chakra-ui/react";
import { useState } from "react";
import { axiosPrivate } from "@/api/axios";

// get username from props.sender_id
const getUsersById = async (id, token) => {
    try {
        const response = await axiosPrivate.get("/findUser", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                id: id,
            },
        });
        //console.log("Username retreived from MongoDB successfully:",response.data);
        return response.data;
    } catch (error) {
        console.error("Error retreiving username:", error);
    }
};

function IndivEmailComponent(props) {
    const subject_header = props.subject;
    const date = new Date(props.timestamp);
    const timestamp = date.toLocaleDateString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
    const bgColor = props.readStatus ? "#E0E0E0" : "white";
    const token = localStorage.getItem("authToken");
    const [sender_email, setSenderEmail] = useState("");

    getUsersById(props.sender_id, token).then((email) => {
        setSenderEmail(email.username);
    });

    return (
        <>
            <Center>
                <Box
                    bg={bgColor}
                    mt={5}
                    width="90%"
                    height="50px"
                    borderWidth={2}
                    borderRadius={10}
                >
                    <Flex
                        mt={2.5}
                        direction="row"
                        justify="space-between"
                        gap={30}
                        paddingRight={5}
                        paddingLeft={5}
                    >
                        <Text maxW={"40%"} isTruncated>
                            {subject_header}
                        </Text>
                        <Text>{sender_email}</Text>
                        <Text>{timestamp}</Text>
                    </Flex>
                </Box>
            </Center>
        </>
    );
}

export default IndivEmailComponent;
