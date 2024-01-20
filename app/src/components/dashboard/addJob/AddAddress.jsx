import { Button, Group, Modal, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useMemo, useState } from 'react';
import { useAddAddressMutation, useGetAddressQuery } from '../../../store/features/api/jobsApi';
import AddressForm from './AddressForm';

const AddAddress = () => {
    const [searchValue, setSearchValue] = useState('');
    const [labelAddresses, setLabelAddresses] = useState([]);
    const [skip, setSkip] = useState(true);
    const [opened, { open, close }] = useDisclosure(false);
    const [contactDetails, setContactDetails] = useState([]);
    const [addAddress] = useAddAddressMutation();
    const { data: allAddresses } = useGetAddressQuery(searchValue, { skip });
    const [addresses, setAddresses] = useState([]);

    const postcodeRegex = useMemo(() => /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/, []);

    useEffect(() => {
        if (postcodeRegex.test(searchValue) && allAddresses) {
            const allFullLabelAddresses = allAddresses.map((a) => {
                return { label: a.fullAddress, value: a._id };
            });
            setAddresses(allAddresses);
            setLabelAddresses(allFullLabelAddresses);
        } else {
            setLabelAddresses([]);
            setAddresses([]);
        }
    }, [allAddresses, postcodeRegex, searchValue]);

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

    const searchHandler = (e) => {
        setSearchValue(e.currentTarget.value.toUpperCase());
        const isValidPostcode = postcodeRegex.test(e.currentTarget.value.toUpperCase());
        if (isValidPostcode) {
            setSkip(false);
        } else {
            setSkip(true);
        }
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
            <TextInput
                label='Postcode:'
                placeholder='RM8 2FW'
                value={searchValue}
                onChange={searchHandler}
            />
            <AddressForm
                open={open}
                addresses={labelAddresses}
                allAddresses={addresses}
                postcode={searchValue}
                addNewAddressForm={form}
            />

            {allAddresses && allAddresses.length === 0 && (
                <Button
                    onClick={() => {
                        form.setValues({ postcode: searchValue });
                        open();
                    }}
                >
                    Add new address
                </Button>
            )}
        </>
    );
};

export default AddAddress;
