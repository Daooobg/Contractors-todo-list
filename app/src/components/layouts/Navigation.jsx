import { NavLink } from '@mantine/core';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = ({ role }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const locationPath = location.pathname.split('/');
    const [isOpen, setIsOpen] = useState(false);

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
            <NavLink
                childrenOffset={0}
                label='Jobs'
                variant='filled'
                active={
                    activeLink === 'allownjobs' ||
                    activeLink === 'allapprovedownjobs' ||
                    activeLink === 'allnotapprovedownjobs' ||
                    activeLink === 'allfinishownjobs'
                }
                opened={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <NavLink
                    variant='filled'
                    active={activeLink === 'allownjobs'}
                    label='All Jobs'
                    onClick={() => {
                        setActiveLInk('allownjobs');
                        navigate('/dashboard/jobs');
                        setIsOpen(false);
                    }}
                />
                <NavLink
                    variant='filled'
                    active={activeLink === 'allapprovedownjobs'}
                    label='All Approved Jobs'
                    onClick={() => {
                        setActiveLInk('allapprovedownjobs');
                        navigate('/dashboard/jobs?status=approved');
                        setIsOpen(false);
                    }}
                />
                <NavLink
                    variant='filled'
                    active={activeLink === 'allnotapprovedownjobs'}
                    label='Waiting for Approval Jobs'
                    onClick={() => {
                        setActiveLInk('allnotapprovedownjobs');
                        navigate('/dashboard/jobs?status=created');
                        setIsOpen(false);
                    }}
                />
                <NavLink
                    variant='filled'
                    active={activeLink === 'allfinishownjobs'}
                    label='All Finished Jobs'
                    onClick={() => {
                        setActiveLInk('allfinishownjobs');
                        navigate('/dashboard/jobs?status=finish');
                        setIsOpen(false);
                    }}
                />
            </NavLink>
        </>
    );
};
export default Navigation;
