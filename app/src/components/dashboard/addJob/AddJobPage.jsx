import { Card, Center, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import AddAddress from './AddAddress';
import AddJobProgress from './AddJobProgress';

const AddJobPage = () => {
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <Center mt={80}>
            <Stack>
                <AddJobProgress step={currentStep} />
                <Card w={400} shadow='sm' padding='lg' radius='md' withBorder>
                    <Stack>
                        <Text tt={'capitalize'} fz='xl' fw={900} mx='auto'>
                            Create new job
                        </Text>
                        {currentStep === 1 && <AddAddress changeStep={setCurrentStep} />}
                    </Stack>
                </Card>
            </Stack>
        </Center>
    );
};

export default AddJobPage;
