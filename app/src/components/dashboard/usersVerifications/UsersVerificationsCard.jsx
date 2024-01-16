import { Button, Card, Flex, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useApproveUserMutation, useDeleteUserMutation } from '../../../store/features/api/authApi';

const UsersVerificationsCard = ({ user }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [approveUser] = useApproveUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const approveHandler = () => {
        approveUser(user._id);
    };

    const deleteUserHandler = () => {
        deleteUser(user._id);
    };

    return (
        <Card m={30} shadow='sm' padding='lg' radius='md' withBorder>
            <Modal opened={opened} onClose={close} title='Delete user'>
                <Text>Do you want to delete all user data for {user.fullName}?</Text>
                <Flex mt={10} justify='space-around'>
                    <Button variant='danger' onClick={deleteUserHandler}>
                        Yes
                    </Button>
                    <Button onClick={close}>No</Button>
                </Flex>
            </Modal>
            <Stack>
                <Text size='lg' fw={500} tt='capitalize'>
                    Full Name: {user.fullName}
                </Text>
                <Text>Email: {user.email}</Text>
                <Text>Role: {user.role}</Text>
                <Text>Approved: {user.approved === false ? 'No' : 'Yes'}</Text>
                <Group justify='space-between'>
                    <Button onClick={approveHandler}>Approve</Button>
                    <Button variant='danger' onClick={open}>
                        Delete User
                    </Button>
                </Group>
            </Stack>
        </Card>
    );
};

export default UsersVerificationsCard;
