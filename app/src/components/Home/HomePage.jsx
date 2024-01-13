import { Image, Text } from '@mantine/core';

const HomePage = () => {
    return (
        <>
            <Image
                fit='cover'
                h='100vh'
                style={{ width: '100%' }}
                src='src/assets/images/pexels-malte-luk-1669754.jpg'
            ></Image>
            <Text
                fw={900}
                pos='absolute'
                style={{
                    top: '50%',
                    left: '50%',
                    fontSize: '80px',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                Welcome to contractors jobs
            </Text>
        </>
    );
};

export default HomePage;
