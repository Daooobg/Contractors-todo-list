import { Center, Paper, Stack, Text } from '@mantine/core';
import { useState } from 'react';

import AddAddress from './AddAddress';
import AddJobProgress from './AddJobProgress';
import AddIssues from './AddIssues';
import { useCreateNewJobMutation } from '../../../store/features/api/jobsApi';
import AddImages from './AddImages';

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

    const [secondStep, setSecondStep] = useState({
        issues: [{ issue: '' }],
        notes: '',
        contractorId: null,
        addressId: null,
    });

    const [createNewJob, { data: createdJob }] = useCreateNewJobMutation();

    const onSubmitJob = () => {
        createNewJob(secondStep);
    };

    return (
        <Center mt={80}>
            <Stack>
                <AddJobProgress step={currentStep} />
                <Paper p='lg' w={400} shadow='sm' padding='lg' radius='md' withBorder>
                    <Stack>
                        <Text tt={'capitalize'} fz='xl' fw={900} mx='auto'>
                            Create new job
                        </Text>
                        {currentStep === 1 && (
                            <AddAddress
                                firstStep={firstStep}
                                setFirstStep={setFirstStep}
                                setCurrentStep={setCurrentStep}
                                setSecondStep={setSecondStep}
                            />
                        )}
                        {currentStep === 2 && (
                            <AddIssues
                                secondStep={secondStep}
                                setSecondStep={setSecondStep}
                                setCurrentStep={setCurrentStep}
                                onSubmit={onSubmitJob}
                            />
                        )}
                        {currentStep === 3 && <AddImages createdJob={createdJob} />}
                    </Stack>
                </Paper>
            </Stack>
        </Center>
    );
};

export default AddJobPage;
