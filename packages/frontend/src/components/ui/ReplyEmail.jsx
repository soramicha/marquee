import { Box, Text } from "@chakra-ui/react";

function ReplyEmail(props) {
    return (
        <>
            <Box
                borderRadius={"10px"}
                borderColor={"#D9D9D9"}
                mt="10px"
                padding={5}
                width="100%"
                minW="80%"
                borderWidth={"2px"}
            >
                <Text>
                    {props.username}: {props.message}
                </Text>
            </Box>
        </>
    );
}

export default ReplyEmail;
