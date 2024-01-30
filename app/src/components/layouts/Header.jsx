import {
    Burger,
    Button,
    Code,
    Flex,
    Group,
    Text,
    useComputedColorScheme,
    useMantineColorScheme,
} from '@mantine/core';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../../store/features/slices/authSlice';

const Header = ({ userData, opened, toggle }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light');

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
    };

    const logoutHandler = () => {
        dispatch(removeUser());
        navigate('/')
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
                <Burger hiddenFrom='xl' opened={opened} onClick={toggle} />
                <Code fz='xl'>Contractors Jobs</Code>
                <Group>
                    {userData ? (
                        <>
                            <Text size='lg' tt='capitalize'>
                                {userData.fullName}
                            </Text>
                            <Button onClick={logoutHandler}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button component={Link} to='/auth/login'>
                                Login
                            </Button>
                            <Button component={Link} to='/auth/register'>
                                Register
                            </Button>
                        </>
                    )}
                </Group>
                <Button variant='link' onClick={toggleColorScheme}>
                    {computedColorScheme === 'light' ? <FaMoon /> : <FaSun />}
                </Button>
            </Flex>
        </Group>
    );
};

export default Header;
