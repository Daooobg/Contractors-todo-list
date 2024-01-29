import { Button, Divider, Group, Select, Stack, Textarea } from '@mantine/core';
import { useGetAllContractorsQuery } from '../../../store/features/api/userApi';

const AddIssues = ({ secondStep, setSecondStep, setCurrentStep, onSubmit }) => {
    const { data: contractorsList } = useGetAllContractorsQuery();

    return (
        <>
            {contractorsList && (
                <Select
                    data={contractorsList}
                    onChange={(value) =>
                        setSecondStep((prevStep) => ({ ...prevStep, contractorId: value }))
                    }
                    defaultValue={secondStep.contractorId}
                    clearable
                    checkIconPosition='right'
                    label='Select contractor:'
                ></Select>
            )}
            {secondStep.issues && (
                <Stack>
                    {secondStep.issues.map((_, inx) => (
                        <Textarea
                            autosize
                            label={`Issue ${inx + 1}:`}
                            key={inx}
                            value={secondStep.issues[inx].issue}
                            onChange={(value) =>
                                setSecondStep((prevStep) => ({
                                    ...prevStep,
                                    issues: [
                                        ...prevStep.issues.map((prevIssue, index) =>
                                            index === inx
                                                ? {
                                                      ...prevIssue,
                                                      issue: value.target.value,
                                                  }
                                                : prevIssue
                                        ),
                                    ],
                                }))
                            }
                        ></Textarea>
                    ))}
                    <Button
                        type='button'
                        onClick={() =>
                            setSecondStep((prevStep) => ({
                                ...prevStep,
                                issues: [...prevStep.issues, { issue: '' }],
                            }))
                        }
                    >
                        Add more issues
                    </Button>
                </Stack>
            )}
            <Textarea
                autosize
                label='Notes:'
                value={secondStep.notes}
                onChange={(value) =>
                    setSecondStep((prevStep) => ({
                        ...prevStep,
                        notes: value.target.value,
                    }))
                }
            ></Textarea>
            <Divider mt='xl' />
            <Group mt='xl' justify='space-between'>
                <Button onClick={() => setCurrentStep((prevStep) => prevStep - 1)}>Back</Button>

                <Button
                    right
                    onClick={() => {
                        onSubmit();
                        setCurrentStep(3);
                    }}
                >
                    Next
                </Button>
            </Group>
        </>
    );
};

export default AddIssues;
