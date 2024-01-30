import { Button, Card, Divider, Flex, Group, Stack, Text } from '@mantine/core';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
    useGetContractorJobsQuery,
    useGetOwnerJobsQuery,
} from '../../../store/features/api/jobsApi';
import { useEffect, useState } from 'react';

const Jobs = () => {
    const location = useLocation();
    const role = useSelector((state) => state.auth.user.role);

    const { data: ownerJobs } = useGetOwnerJobsQuery(location.search.toLowerCase(), {
        skip: role === 'Agent' ? false : true,
    });

    const { data: contractorJobs } = useGetContractorJobsQuery(
        location.search.toLocaleLowerCase(),
        { skip: role === 'Contractor' ? false : true }
    );

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        if (role === 'Contractor') {
            setJobs(contractorJobs);
        } else if (role === 'Agent') {
            setJobs(ownerJobs);
        }
    }, [contractorJobs, ownerJobs, role]);

    return (
        <Flex direction='column' align='self-start' gap='xl' m='xl'>
            {jobs && jobs.length > 0 ? (
                jobs.map((job) => {
                    const dateObj = new Date(job.createdAt);
                    return (
                        <Card key={job._id} w='100%' shadow='md' withBorder>
                            <Stack>
                                <Group justify='space-between'>
                                    <Text>
                                        Address: {job.addressId.fullAddress},{' '}
                                        {job.addressId.postcode}
                                    </Text>
                                    <Text>
                                        Create at: {dateObj.getDate()} / {dateObj.getMonth() + 1} /{' '}
                                        {dateObj.getFullYear()}
                                    </Text>
                                </Group>
                                <Divider />
                                <Text>
                                    There is {job.issues.length}{' '}
                                    {job.issues.length === 1 ? 'issue' : 'issues'}:
                                </Text>
                                {job.issues.map((issue, inx) => (
                                    <Text key={issue._id}>
                                        {inx + 1} ) {issue.issue}
                                    </Text>
                                ))}
                                <Divider />
                            </Stack>
                            <Button component={NavLink} to={`/dashboard/jobs/${job._id}`}>
                                Full details
                            </Button>
                        </Card>
                    );
                })
            ) : (
                <Text fz='xl'>There is not jobs.</Text>
            )}
        </Flex>
    );
};

export default Jobs;
