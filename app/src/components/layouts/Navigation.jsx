import {
    Button,
    Code,
    Flex,
    Group,
    useComputedColorScheme,
    useMantineColorScheme,
} from '@mantine/core';
import { FaMoon, FaSun } from 'react-icons/fa';

const Navigation = () => {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light');

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
    };

    return (
        <Group pos='absolute' style={{ zIndex: 10, width: '100%' }}>
            <Flex
                style={{ width: '100%' }}
                justify='space-between'
                gap='md'
                my='md'
                mx='xl'
                align='center'
            >
                <Code fz='xl'>Contractors Jobs</Code>
                <Group>
                    <Button>Login</Button>
                    <Button>Register</Button>
                </Group>
                <Button variant='link' onClick={toggleColorScheme}>
                    {computedColorScheme === 'light' ? <FaMoon /> : <FaSun />}
                </Button>
            </Flex>
        </Group>
    );
};

export default Navigation;