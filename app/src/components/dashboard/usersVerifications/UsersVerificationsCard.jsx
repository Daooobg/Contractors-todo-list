import { Button, Card, Group, Stack, Text } from '@mantine/core';

const UsersVerificationsCard = ({ user }) => {
    return (
        <Card m={30} shadow='sm' padding='lg' radius='md' withBorder>
            <Stack>
                <Text size='lg' fw={500} tt='capitalize'>Full Name: {user.fullName}</Text>
                <Text>Email: {user.email}</Text>
                <Text>Role: {user.role}</Text>
                <Text>Approved: {user.approved === false ? 'No' : 'Yes'}</Text>
                <Group justify='space-between'>
                    <Button>Approve</Button>
                    <Button variant='danger'>Delete User</Button>
                </Group>
            </Stack>
        </Card>
    );
};

export default UsersVerificationsCard;
