import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@mantine/core';
import Navigation from './Navigation';

const MainLayout = () => {
    return (
        <Flex h='100vh' direction={'column'}>
            <Navigation />
            <Box style={{ flex: '1' }}>
                <Outlet />
            </Box>
        </Flex>
    );
};

export default MainLayout;
