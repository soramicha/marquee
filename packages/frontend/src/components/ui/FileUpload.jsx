import { Box, Button, Input, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';

const FileUpload = ({ label, accept, onChange }) => {
    const [files, setFiles] = useState([]);
    const toast = useToast();

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const allFiles = Array.from(event.target.files);
            const invalidFiles = allFiles.filter(file => {
                const isImage = file.type.startsWith('image/');
                const isVideo = file.type.startsWith('video/');
                // 10 MB max for photos and 40 MB max for videos
                const sizeLimit = (isImage || isVideo ) ? 10 * 1024 * 1024 : 40 * 1024 * 1024;
                
                return file.size > sizeLimit;
            });
    
            if (invalidFiles.length > 0) {
                toast({
                    title: 'File size too large',
                    description: 'File size limit is 10 MB for photos and 50 MB for videos.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }
    
            const selectedFiles = allFiles.filter(file => {
                const isImage = file.type.startsWith('image/');
                const isVideo = file.type.startsWith('video/');
                return isImage || isVideo;
            });

            if (selectedFiles.length == 0) {
                toast({
                    title: 'Incompatible file type',
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                });
            }
    
            setFiles([...selectedFiles]);
            onChange(selectedFiles);
        }
    };

    return (
        <Box mb={5} >
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
