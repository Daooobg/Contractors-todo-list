import { AppShell, Button } from '@mantine/core';
import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';

const AppShellLayout = () => {
    const userData = useSelector((state) => state.auth.user);
    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: userData ? 200 : 0, breakpoint: 'xl', collapsed: { mobile: !opened } }}
        >
            <AppShell.Header>
                <Navigation toggle={toggle} userData={userData} opened={opened} />
            </AppShell.Header>
            {userData && (
                <AppShell.Navbar>
                    <Button>hi</Button>
                </AppShell.Navbar>
            )}
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};

export default AppShellLayout;
