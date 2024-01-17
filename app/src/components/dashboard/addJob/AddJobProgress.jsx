import { Progress } from '@mantine/core';

const AddJobProgress = ({ step }) => {
    return (
        <Progress.Root size={20}>
            <Progress.Section value={35} color='cyan'>
                <Progress.Label>Address</Progress.Label>
            </Progress.Section>
            {step > 1 && (
                <Progress.Section value={30} color='pink'>
                    <Progress.Label>Job title</Progress.Label>
                </Progress.Section>
            )}
            {step > 2 && (
                <Progress.Section value={35} color='orange'>
                    <Progress.Label>Images</Progress.Label>
                </Progress.Section>
            )}
        </Progress.Root>
    );
};

export default AddJobProgress;
