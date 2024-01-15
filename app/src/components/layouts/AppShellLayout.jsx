import { AppShell } from '@mantine/core';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import Navigation from './Navigation';

const AppShellLayout = () => {
    const userData = useSelector((state) => state.auth.user);
    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: userData ? 200 : 0, breakpoint: 'xl', collapsed: { mobile: !opened } }}
        >
            <AppShell.Header>
                <Header toggle={toggle} userData={userData} opened={opened} />
            </AppShell.Header>
            {userData && (
                <AppShell.Navbar>
                    <Navigation role={userData.role} />
                </AppShell.Navbar>
            )}
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};

export default AppShellLayout;
