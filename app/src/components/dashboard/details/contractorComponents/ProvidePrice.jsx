import { Button, NumberInput, SegmentedControl, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useContractorOfferMutation } from '../../../../store/features/api/jobsApi';

const ProvidePrice = ({ close, job }) => {
    const [value, setValue] = useState('single');
    const [contractorOffer] = useContractorOfferMutation();

    const form = useForm({
        initialValues: {
            issues: Object.fromEntries(
                (job?.issues || []).map((issue) => [`${issue._id}`, issue.price || 0])
            ),
            totalPrice: job?.totalPrice ? job.totalPrice : 0,
        },
    });

    const submitHandler = (e) => {
        if (value === 'multiple') {
            e.totalPrice = 0;
            for (let key in e.issues) {
                e.totalPrice += e.issues[key];
            }
        } else if (value === 'single') {
            for (let key in e.issues) {
                e.issues[key] = 0;
            }
        }

        contractorOffer({ jobId: job._id, price: e });
        close();
    };

    return (
        <form onSubmit={form.onSubmit(submitHandler)}>
            <Text fz='xl' ta='center'>
                Prices
            </Text>
            <Stack>
                <SegmentedControl
                    value={value}
                    onChange={setValue}
                    color='blue'
                    data={[
                        { label: 'Total Price', value: 'single' },
                        { label: 'Price per issue', value: 'multiple' },
                    ]}
                />

                {value === 'multiple' ? (
                    job &&
                    job.issues.map((issue) => (
                        <NumberInput
                            label={issue.issue}
                            key={issue._id}
                            {...form.getInputProps(`issues.${issue._id}`)}
                        />
                    ))
                ) : (
                    <NumberInput label='Total price' {...form.getInputProps('totalPrice')} />
                )}
                <Button type='submit'>Submit</Button>
            </Stack>
        </form>
    );
};

export default ProvidePrice;
