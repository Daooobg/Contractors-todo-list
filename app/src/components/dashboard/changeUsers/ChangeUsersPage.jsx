import { Center, Flex, Text } from '@mantine/core';
import { useGetAllApprovedUsersQuery } from '../../../store/features/api/authApi';
import ChangeUsersCard from './ChangeUsersCard';

const ChangeUsersPage = () => {
    const { data: allApprovedUsers, isSuccess } = useGetAllApprovedUsersQuery();

    return (
        <>
            <Flex gap='sm' wrap='wrap'>
                {allApprovedUsers &&
                    allApprovedUsers.length > 0 &&
                    allApprovedUsers.map((user) => <ChangeUsersCard user={user} key={user._id} />)}
            </Flex>
            {isSuccess && allApprovedUsers.length === 0 && (
                <Center mt={100}>
                    <Text size='xl'>There is not users</Text>
                </Center>
            )}
        </>
    );
};

export default ChangeUsersPage;
