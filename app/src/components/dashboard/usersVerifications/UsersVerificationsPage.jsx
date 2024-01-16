import { Center, Flex, Text } from '@mantine/core';
import { useGetAllUsersForVerificationQuery } from '../../../store/features/api/authApi';
import UsersVerificationsCard from './UsersVerificationsCard';

const UsersVerificationsPage = () => {
    const { data: usersForVerification, isSuccess } = useGetAllUsersForVerificationQuery();

    return (
        <>
            <Flex gap='sm' wrap='wrap'>
                {usersForVerification &&
                    usersForVerification.length > 0 &&
                    usersForVerification.map((user) => (
                        <UsersVerificationsCard user={user} key={user._id} />
                    ))}
            </Flex>
            {isSuccess && usersForVerification.length === 0 && (
                <Center mt={100}>
                    <Text size='xl'>There is not users for approval</Text>
                </Center>
            )}
        </>
    );
};

export default UsersVerificationsPage;
