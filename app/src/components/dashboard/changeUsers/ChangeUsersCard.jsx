import { Button, Card, Flex, Group, Modal, Select, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useUpdateUserMutation } from '../../../store/features/api/authApi';

const ChangeUsersCard = ({ user }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [values, setValues] = useState({
        role: user.role,
        disabled: user.disabled ? 'Yes' : 'No',
    });
    const [updateUser] = useUpdateUserMutation();

    const submitHandler = () => {
        const data = {
            id: user._id,
            disabled: values.disabled === 'Yes' ? true : false,
            role: values.role,
        };
        updateUser(data);
        close();
    };
    return (
        <Card m={30} shadow='sm' padding='lg' radius='md' withBorder>
            <Modal opened={opened} onClose={close} title='Change user data'>
                <Text>Do you want to change user data for {user.fullName}?</Text>
                <Text>Role: {values.role}</Text>
                <Text>Disabled: {values.disabled}</Text>
                <Flex mt={10} justify='space-around'>
                    <Button variant='danger' onClick={submitHandler}>
                        Yes
                    </Button>
                    <Button onClick={close}>No</Button>
                </Flex>
            </Modal>
            <Stack>
                <Text size='lg' fw={500} tt='capitalize'>
                    Full Name: {user.fullName}
                </Text>
                <Text size='lg'>Email: {user.email}</Text>
                <Select
                    size='lg'
                    label='Role:'
                    data={['Owner', 'Contractor', 'Agent']}
                    value={values.role}
                    onChange={(_value, option) =>
                        setValues((prevValues) => ({ ...prevValues, role: option.value }))
                    }
                />
                <Select
                    size='lg'
                    label='Disabled:'
                    data={['Yes', 'No']}
                    value={values.disabled}
                    onChange={(_value, option) =>
                        setValues((prevValues) => ({ ...prevValues, disabled: option.value }))
                    }
                />
                <Group justify='space-between'>
                    <Button onClick={open}>Submit</Button>
                </Group>
            </Stack>
        </Card>
    );
};

export default ChangeUsersCard;
