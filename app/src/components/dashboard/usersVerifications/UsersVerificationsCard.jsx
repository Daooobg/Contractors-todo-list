import { Button, Card, Group, Stack, Text } from '@mantine/core';
import { useApproveUserMutation } from '../../../store/features/api/authApi';

const UsersVerificationsCard = ({ user }) => {
    const [approveUser] = useApproveUserMutation();

    const approveHandler = () => {
        approveUser(user._id);
    };

    return (
        <Card m={30} shadow='sm' padding='lg' radius='md' withBorder>
            <Stack>
                <Text size='lg' fw={500} tt='capitalize'>
                    Full Name: {user.fullName}
                </Text>
                <Text>Email: {user.email}</Text>
                <Text>Role: {user.role}</Text>
                <Text>Approved: {user.approved === false ? 'No' : 'Yes'}</Text>
                <Group justify='space-between'>
                    <Button onClick={approveHandler}>Approve</Button>
                    <Button variant='danger'>Delete User</Button>
                </Group>
            </Stack>
        </Card>
    );
};

export default UsersVerificationsCard;
