import { Outlet } from 'react-router-dom';
import { Box, Stack } from '@mantine/core';
import Navigation from './Navigation';

const MainLayout = () => {
    return (
        <Stack>
            <Navigation style={{ width: '100%' }} />
            <Box>
                <Outlet />
            </Box>
        </Stack>
    );
};

export default MainLayout;
