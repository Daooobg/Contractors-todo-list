import { Button, Card, Center, Divider, Group, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { VscError } from 'react-icons/vsc';
import { useState } from 'react';

import AddAddress from './AddAddress';
import AddJobProgress from './AddJobProgress';
import IssuesForm from './IssuesForm';

const AddJobPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [firstStep, setFirstStep] = useState({
        currentData: {
            postcode: '',
            selectedId: '',
        },
        skip: true,
        selectedAddress: null,
        allAddresses: null,
    });

    return (
        <Center mt={80}>
            <Stack>
                <AddJobProgress step={currentStep} />
                <Card w={400} shadow='sm' padding='lg' radius='md' withBorder>
                    <Stack>
                        <Text tt={'capitalize'} fz='xl' fw={900} mx='auto'>
                            Create new job
                        </Text>
                        {currentStep === 1 && (
                            <AddAddress firstStep={firstStep} setFirstStep={setFirstStep} />
                        )}
                        {currentStep === 2 && <IssuesForm />}
                    </Stack>
                    <Divider mt='xl' />
                    <Group mt='xl' justify='space-between'>
                        <Button onClick={() => setCurrentStep((prevStep) => prevStep - 1)}>
                            Back
                        </Button>
                        <Button
                            onClick={() => {
                                if (currentStep === 1) {
                                    if (firstStep.selectedAddress) {
                                        setCurrentStep(2);
                                    } else {
                                        notifications.show({
                                            color: 'red',
                                            title: 'Create new job',
                                            message: 'Please select address',
                                            icon: (
                                                <VscError
                                                    style={{ width: '30px', height: '30px' }}
                                                />
                                            ),
                                        });
                                    }
                                }
                            }}
                        >
                            Next
                        </Button>
                    </Group>
                </Card>
            </Stack>
        </Center>
    );
};

export default AddJobPage;
