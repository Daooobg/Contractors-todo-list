import { NavLink } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ role }) => {
    const navigate = useNavigate();
    const [activeLink, setActiveLInk] = useState();
    return (
        <>
            {role === 'Admin' && (
                <NavLink
                    variant='filled'
                    active={activeLink === 'verification'}
                    label='Users Verification'
                    onClick={() => {
                        setActiveLInk('verification'), navigate('/dashboard/usersVerifications');
                    }}
                />
            )}
        </>
    );
};
export default Navigation;
