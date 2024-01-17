import { Autocomplete, Button, Group, Modal, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useAddAddressMutation } from '../../../store/features/api/jobsApi';

const AddAddress = () => {
    const [searchValue, setSearchValue] = useState();
    const [opened, { open, close }] = useDisclosure(false);
    const [contactDetails, setContactDetails] = useState([]);
    const [addAddress] = useAddAddressMutation();

    const postcodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/;

    const form = useForm({
        initialValues: {
            postcode: '',
            fullAddress: '',
            contactDetails: [
                { phoneNumber: '', name: '' },
                { phoneNumber: '', name: '' },
                { phoneNumber: '', name: '' },
                { phoneNumber: '', name: '' },
                { phoneNumber: '', name: '' },
            ],
        },
        validate: {
            postcode: (value) => {
                if (!value.trim()) {
                    return 'Postcode is required';
                }
                return postcodeRegex.test(value.trim().toUpperCase())
                    ? undefined
                    : 'Invalid postcode';
            },
            fullAddress: (value) => {
                if (!value) {
                    return 'Address is required';
                }
                return value.trim().length > 5 ? undefined : 'Invalid Address';
            },
        },
    });

    const submitHandler = (data) => {
        const trimmedData = Object.keys(data).reduce((acc, key) => {
            acc[key] = typeof data[key] === 'string' ? data[key].trim() : data[key];
            return acc;
        }, {});

        const filteredContactDetails = trimmedData.contactDetails.filter(
            (contact) => contact.phoneNumber.trim() !== ''
        );

        const newData = { ...trimmedData, contactDetails: filteredContactDetails };

        addAddress(newData);
        close();
        form.reset();
    };

    const addContactField = () => {
        setContactDetails([...contactDetails, { phoneNumber: '', name: '' }]);
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title='Add new address'>
                <form onSubmit={form.onSubmit(submitHandler)}>
                    <Stack>
                        <TextInput label='Postcode:' {...form.getInputProps('postcode')} />
                        <TextInput label='Address:' {...form.getInputProps('fullAddress')} />
                        <Group>
                            <Text>Contact details:</Text>
                            {contactDetails.length < 5 && (
                                <Button onClick={addContactField}>Add</Button>
                            )}
                        </Group>
                        {contactDetails.map((contact, index) => (
                            <Group key={index}>
                                <TextInput
                                    label={`Name ${index + 1}:`}
                                    {...form.getInputProps(`contactDetails.${index}.name`)}
                                />
                                <TextInput
                                    label={`Phone number ${index + 1}:`}
                                    {...form.getInputProps(`contactDetails.${index}.phoneNumber`)}
                                />
                            </Group>
                        ))}
                        <Button type='submit'>Submit</Button>
                    </Stack>
                </form>
            </Modal>
            <Autocomplete
                label='Postcode:'
                placeholder='RM8 2FW'
                value={searchValue}
                onChange={(v) => setSearchValue(v.toUpperCase())}
            />
            <Button onClick={open}>Add new address</Button>
        </>
    );
};

export default AddAddress;
