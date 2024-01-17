import { NavLink } from '@mantine/core';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = ({ role }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const locationPath = location.pathname.split('/');

    const [activeLink, setActiveLInk] = useState(
        locationPath[locationPath.length - 1].toLowerCase()
    );
    return (
        <>
            {(role === 'Admin' || role === 'Owner') && (
                <>
                    <NavLink
                        variant='filled'
                        active={activeLink === 'usersverifications'}
                        label='Users Verification'
                        onClick={() => {
                            setActiveLInk('usersverifications'),
                                navigate('/dashboard/usersVerifications');
                        }}
                    />
                    <NavLink
                        variant='filled'
                        active={activeLink === 'changeusersdata'}
                        label='Change Users'
                        onClick={() => {
                            setActiveLInk('changeusersdata'),
                                navigate('/dashboard/changeUsersData');
                        }}
                    ></NavLink>
                </>
            )}
            {(role === 'Owner' || role === 'Agent') && (
                <>
                    <NavLink
                        variant='filled'
                        active={activeLink === 'addnewjob'}
                        label='Add New job'
                        onClick={() => {
                            setActiveLInk('addnewjob'), navigate('/dashboard/addNewJob');
                        }}
                    />
                </>
            )}
        </>
    );
};
export default Navigation;
