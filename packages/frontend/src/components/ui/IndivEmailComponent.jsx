import {Box, Flex, Center, Text} from "@chakra-ui/react";

function IndivEmailComponent(props) {
    const subject_header = props.subject;
    const sender_email = props.sender_email;
    const timestamp = props.timestamp;
    const bgColor = "white" ? props.readStatus : "#E0E0E0"

    return <>
        <Center>
            <Box bg={bgColor} mt={5} width="90%" height="50px" borderWidth={2} borderRadius={10}>
                <Flex mt={2.5} direction="row" justify="space-between" gap={30} paddingRight={5} paddingLeft={5}>
                    <Text maxW={"40%"} isTruncated>{subject_header}</Text>
                    <Text>{sender_email}</Text>
                    <Text>{timestamp}</Text>
                </Flex>
            </Box>
        </Center>
    </>
}

export default IndivEmailComponent;