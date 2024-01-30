import { Button, Card, Divider, Flex, Group, Stack, Text } from '@mantine/core';
import { useGetOwnerJobsQuery } from '../../../store/features/api/jobsApi';
import { NavLink, useLocation } from 'react-router-dom';

const Jobs = () => {
    const location = useLocation();

    const { data: ownerJobs } = useGetOwnerJobsQuery(location.search.toLowerCase());

    return (
        <Flex direction='column' align='self-start' gap='xl' m='xl'>
            {ownerJobs && ownerJobs.length > 0 ? (
                ownerJobs.map((job) => {
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
