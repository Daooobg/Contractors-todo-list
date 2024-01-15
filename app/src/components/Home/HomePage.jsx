import { BackgroundImage, Box, Center, Text } from '@mantine/core';

const HomePage = () => {
    return (
        <Box mx='auto'>
            <BackgroundImage
                fit='cover'
                h='calc(100vh - 60px)'
                src='src/assets/images/pexels-malte-luk-1669754.jpg'
            >
                <Center h='100%'>
                    <Text
                        fw={900}
                        c='gray.9'
                        style={{
                            fontSize: '80px',
                        }}
                    >
                        Welcome to contractors jobs
                    </Text>
                </Center>
            </BackgroundImage>
        </Box>
    );
};

export default HomePage;
