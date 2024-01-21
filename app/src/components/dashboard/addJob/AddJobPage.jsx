import { Button, Card, Center, Divider, Group, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import AddAddress from './AddAddress';
import AddJobProgress from './AddJobProgress';

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
                    </Stack>
                    <Divider mt='xl' />
                    <Group mt='xl' justify='space-between'>
                        <Button onClick={() => setCurrentStep((prevStep) => prevStep - 1)}>
                            Back
                        </Button>
                        <Button
                            onClick={() => {
                                if (currentStep === 1) {
                                    setCurrentStep(2);
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
