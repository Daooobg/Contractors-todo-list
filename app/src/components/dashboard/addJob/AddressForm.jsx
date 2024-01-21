import { Button, Group, Select, Stack, Text, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';

import { MdOutlineEdit, MdOutlineEditOff } from 'react-icons/md';

import {
    useAddNewContactMutation,
    useDeleteContactMutation,
    useEditContactMutation,
} from '../../../store/features/api/jobsApi';

const AddressForm = ({
    addresses,
    open,
    addNewAddressForm,
    firstStep,
    setFirstStep,
}) => {
    const [selectedValue, setSelectedValue] = useState(firstStep.selectedAddress?._id || undefined);
    const [disabledContacts, setDisabledContacts] = useState([]);

    const [addNewContact] = useAddNewContactMutation();
    const [deleteContact] = useDeleteContactMutation();
    const [editContact] = useEditContactMutation();

    useEffect(() => {
        if (firstStep.allAddresses) {
            if (!firstStep.allAddresses.some((address) => address._id === selectedValue)) {
                setSelectedValue(undefined);
            }
        }

        if (firstStep.allAddresses && selectedValue) {
            const contactData = firstStep.allAddresses.filter(
                (address) => address._id === selectedValue
            );
            if (contactData.length > 0) {
                setFirstStep((prevStep) => ({ ...prevStep, selectedAddress: contactData[0] }));
            } else {
                setFirstStep((prevStep) => ({ ...prevStep, selectedAddress: null }));
            }
        }
    }, [firstStep.allAddresses, selectedValue, setFirstStep]);

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

        setFirstStep((prevStep) => ({
            ...prevStep,
            selectedAddress: {
                ...prevStep.selectedAddress,
                contactDetails: [...(prevStep.selectedAddress.contactDetails || []), emptyContact],
            },
        }));
    };

    return (
        <>
            {firstStep.allAddresses && (
                <>
                    <Select
                        label='Address:'
                        clearable
                        checkIconPosition='right'
                        onChange={(value) => setSelectedValue(value)}
                        defaultValue={firstStep.selectedAddress?._id || null}
                        data={addresses}
                        maxDropdownHeight={100}
                        nothingFoundMessage={
                            <Stack>
                                <Text size='lg'>Address not found!</Text>
                                <Button
                                    onClick={() => {
                                        addNewAddressForm.setValues({
                                            postcode: firstStep.currentData.postcode,
                                        });
                                        open();
                                    }}
                                >
                                    Add new address
                                </Button>
                            </Stack>
                        }
                        searchable
                    />
                    <Group mt={20} justify='space-between'>
                        <Text>Contact Details:</Text>
                        <Button onClick={addContactHandler}>Add new contact</Button>
                    </Group>
                    {firstStep.selectedAddress &&
                        selectedValue &&
                        firstStep.selectedAddress.contactDetails.length > 0 &&
                        firstStep.selectedAddress.contactDetails.map((contact, inx) => (
                            <Stack mt={20} key={firstStep.selectedAddress._id + inx}>
                                <Group wrap='nowrap'>
                                    <TextInput
                                        disabled={!disabledContacts[inx]}
                                        value={contact.name}
                                        onChange={(value) => {
                                            setFirstStep((prevStep) => ({
                                                ...prevStep,
                                                selectedAddress: {
                                                    ...prevStep.selectedAddress,
                                                    contactDetails: [
                                                        ...prevStep.selectedAddress.contactDetails.map(
                                                            (prevContact, index) =>
                                                                index === inx
                                                                    ? {
                                                                          ...prevContact,
                                                                          name: value.target.value,
                                                                      }
                                                                    : prevContact
                                                        ),
                                                    ],
                                                },
                                            }));
                                        }}
                                    />
                                    :
                                    <TextInput
                                        disabled={!disabledContacts[inx]}
                                        value={contact.phoneNumber}
                                        onChange={(value) => {
                                            setFirstStep((prevStep) => ({
                                                ...prevStep,
                                                selectedAddress: {
                                                    ...prevStep.selectedAddress,
                                                    contactDetails: [
                                                        ...prevStep.selectedAddress.contactDetails.map(
                                                            (prevContact, index) =>
                                                                index === inx
                                                                    ? {
                                                                          ...prevContact,
                                                                          phoneNumber:
                                                                              value.target.value,
                                                                      }
                                                                    : prevContact
                                                        ),
                                                    ],
                                                },
                                            }));
                                        }}
                                    />
                                    <Button onClick={() => handleEditClick(inx)}>
                                        {!disabledContacts[inx] ? (
                                            <MdOutlineEdit
                                                style={{ width: '30px', height: '30px' }}
                                            />
                                        ) : (
                                            <MdOutlineEditOff
                                                style={{ width: '30px', height: '30px' }}
                                            />
                                        )}
                                    </Button>
                                </Group>
                                {disabledContacts[inx] && (
                                    <Group>
                                        {contact._id ? (
                                            <>
                                                <Button
                                                    onClick={() => {
                                                        handleEditClick(inx);
                                                        editContact({
                                                            addressId:
                                                                firstStep.selectedAddress._id,
                                                            contact:
                                                                firstStep.selectedAddress
                                                                    .contactDetails[inx],
                                                            postcode:
                                                                firstStep.selectedAddress.postcode,
                                                        });
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant='danger'
                                                    onClick={() => {
                                                        handleEditClick(inx);
                                                        deleteContact({
                                                            addressId:
                                                                firstStep.selectedAddress._id,
                                                            contactId: {
                                                                contactId:
                                                                    firstStep.selectedAddress
                                                                        .contactDetails[inx]._id,
                                                            },
                                                            postcode:
                                                                firstStep.selectedAddress.postcode,
                                                        });
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                onClick={() => {
                                                    handleEditClick(inx);
                                                    addNewContact({
                                                        addressId: firstStep.selectedAddress._id,
                                                        contact:
                                                            firstStep.selectedAddress
                                                                .contactDetails[inx],
                                                        postcode:
                                                            firstStep.selectedAddress.postcode,
                                                    });
                                                }}
                                            >
                                                Add
                                            </Button>
                                        )}
                                    </Group>
                                )}
                            </Stack>
                        ))}
                </>
            )}
        </>
    );
};

export default AddressForm;
