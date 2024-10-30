'use client'
import {
    Button,
    Flex,
    Heading,
    Stack,
    Text,
    Image,
    Select,
    Input,
    useBreakpointValue,
    useToast
} from '@chakra-ui/react';
import { useState, ChangeEvent, FormEvent } from 'react';

export default function Home() {
    const [confidence] = useState('0.75');
    const [sourceType, setSourceType] = useState('camera');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const toast = useToast();

    const handleInference = (e: FormEvent) => {
        e.preventDefault();
        // Simulate success message
        setMessage("Inference run successfully with camera.");
        setError('');
        toast({
            title: "Success",
            description: "Inference run successfully with camera.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    const handleInferenceSource = (e: FormEvent) => {
        e.preventDefault();
        // Simulate success message
        setMessage("Inference run successfully with " + sourceType + ".");
        setError('');
        toast({
            title: "Success",
            description: "Inference run successfully with " + sourceType + ".",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFile(e.target.files[0]);
        }
    };

    return (
        <Stack
            minH={'100vh'}
            direction={{ base: 'column', md: 'row' }}
            bgImage={{
                base: 'none',
                md: 'url(Images/pattern-bg.jpg)',
            }}
            bgSize="cover"
            bgPosition="center"
            p={8}
        >
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={6} w={'full'} maxW={'lg'} position="relative">
                    <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            color={'green.700'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: useBreakpointValue({ base: '20%', md: '30%' }),
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: 'blue.600',
                                zIndex: -1,
                            }}
                        >
                            Real Time Pose Detection
                        </Text>
                    </Heading>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                        Upload a valid image of a yoga pose in JPEG, PNG, JPG format or use your camera to run inference!
                    </Text>
                    {error && <Text color="red.500">{error}</Text>}
                    {message && <Text color="green.500">{message}</Text>}

                    <form onSubmit={handleInference}>
                        <Stack spacing={4}>
                            <Input
                                type="text"
                                id="confidence"
                                value={confidence}
                                readOnly
                                placeholder="Confidence Threshold (0-1)"
                            />
                            <Button type="submit" rounded={'full'} bg={'green.400'} color={'white'} _hover={{ bg: 'orange.500' }}>
                                Run Inference with Camera
                            </Button>
                        </Stack>
                    </form>

                    <hr />

                    <form onSubmit={handleInferenceSource} encType="multipart/form-data">
                        <Stack spacing={4}>
                            <Select id="source_type" value={sourceType} onChange={(e) => setSourceType(e.target.value)}>
                                <option value="image">Image</option>
                                <option value="camera">Camera</option>
                            </Select>
                            {sourceType === 'image' && (
                                <>
                                    <Input
                                        type="file"
                                        id="image_file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        required
                                    />
                                </>
                            )}
                            <Input
                                type="text"
                                id="confidence_source"
                                value={confidence}
                                readOnly
                                placeholder="Confidence Threshold (0-1)"
                            />
                            <Button type="submit" rounded={'full'} bg={'green.400'} color={'white'} _hover={{ bg: 'orange.500' }}>
                                Run Inference with {sourceType.charAt(0).toUpperCase() + sourceType.slice(1)}
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Flex>
            <Flex flex={1} position="relative">
                <Image
                    alt={'Yoga Pose'}
                    objectFit={'cover'}
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    w={'100%'}
                    h={'100%'}
                    src={'Images/banner-item1.png'}
                />
            </Flex>
        </Stack>
    );
}
