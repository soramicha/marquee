import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

const FileUpload = ({ label, accept, onChange }) => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFiles = Array.from(event.target.files);
            setFiles(selectedFiles);
            onChange(selectedFiles);
        }
    };

    return (
        <Box>
            <Text fontSize="sm">{label}</Text>
            <Box
                p={4}
                border="2px dashed"
                borderColor="gray.300"
                borderRadius="md"
                textAlign="center"
            >
                <Input
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    display="none"
                    id={`${label}-input`}
                    multiple
                />
                <label htmlFor={`${label}-input`}>
                    <Button
                        as="span"
                        bgColor="#2E55C4"
                        color="white"
                        cursor="pointer"
                    >
                        Upload {label}
                    </Button>
                </label>
                {files.length > 0 && (
                    <Box mt={2}>
                        {files.map((file, index) => (
                            <Text key={index}>{file.name}</Text>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default FileUpload;
