import { Button, Group, Select, Stack, Text, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';

import { MdOutlineEdit } from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';

const AddressForm = ({ addresses, open, allAddresses }) => {
    const [selectedValue, setSelectedValue] = useState(undefined);
    const [disabledContacts, setDisabledContacts] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState([]);
    const [contactDetails, setContactDetails] = useState([]);

    console.log(contactDetails)
    useEffect(() => {
        if (!allAddresses.some((address) => address._id === selectedValue)) {
            setSelectedValue(undefined);
        }

        if (allAddresses.length > 0 && selectedValue) {
            const contactData = allAddresses.filter((address) => address._id === selectedValue);
            if (contactData.length > 0) {
                setSelectedAddress(contactData[0]);
                setContactDetails(contactData[0].contactDetails || []);
            }
        } else {
            setSelectedAddress([]);
            setContactDetails([]);
        }
    }, [allAddresses, selectedValue]);

    const handleEditClick = (index) => {
        setDisabledContacts((prev) => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const addContactHandler = () => {
        const emptyContact = {
            name: '',
            phoneNumber: '',
        };

        setSelectedAddress((prevAddress) => ({
            ...prevAddress,
            contactDetails: [...(prevAddress.contactDetails || []), emptyContact],
        }));
        setContactDetails((prevContacts) => [...prevContacts, emptyContact]);
    };

    return (
        <form>
            {allAddresses.length > 0 && (
                <>
                    <Select
                        label='Address:'
                        clearable
                        checkIconPosition='right'
                        onChange={(value) => setSelectedValue(value)}
                        data={addresses}
                        maxDropdownHeight={100}
                        nothingFoundMessage={
                            <Stack>
                                <Text size='lg'>Address not found!</Text>
                                <Button onClick={open}>Add new address</Button>
                            </Stack>
                        }
                        searchable
                    />
                    <Group mt={20} justify='space-between'>
                        <Text>Contact Details:</Text>
                        <Button onClick={addContactHandler}>Add new contact</Button>
                    </Group>
                    {selectedAddress &&
                        contactDetails &&
                        contactDetails.map((contact, inx) => (
                            <Stack mt={20} key={contact.name + selectedAddress._id + inx}>
                                <Group wrap='nowrap'>
                                    <TextInput
                                        disabled={!disabledContacts[inx]}
                                        value={contactDetails[inx].name}
                                        onChange={(value) => {
                                            setContactDetails((prevContacts) =>
                                                prevContacts.map((prevContact, index) =>
                                                    index === inx
                                                        ? {
                                                              ...prevContact,
                                                              name: value.target.value,
                                                          }
                                                        : prevContact
                                                )
                                            );
                                        }}
                                    />
                                    :
                                    <TextInput
                                        disabled={!disabledContacts[inx]}
                                        value={contactDetails[inx].phoneNumber}
                                        onChange={(value) => {
                                            setContactDetails((prevContacts) =>
                                                prevContacts.map((prevContact, index) =>
                                                    index === inx
                                                        ? {
                                                              ...prevContact,
                                                              phoneNumber: value.target.value,
                                                          }
                                                        : prevContact
                                                )
                                            );
                                        }}
                                    />
                                    <Button onClick={() => handleEditClick(inx)}>
                                        {!disabledContacts[inx] ? (
                                            <MdOutlineEdit
                                                style={{ width: '30px', height: '30px' }}
                                            />
                                        ) : (
                                            <GiConfirmed
                                                style={{ width: '30px', height: '30px' }}
                                            />
                                        )}
                                    </Button>
                                </Group>
                            </Stack>
                        ))}
                </>
            )}
        </form>
    );
};

export default AddressForm;
