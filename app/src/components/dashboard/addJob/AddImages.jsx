import { Button, Checkbox, Divider, FileInput, Group, Pill, Radio, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { useAddNewImagesMutation } from '../../../store/features/api/imageApi';
import { useNavigate } from 'react-router-dom';

const AddImages = ({ createdJob }) => {
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState('multiple');
    const [addImages, { isSuccess: isUploadSuccess, isLoading }] = useAddNewImagesMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isUploadSuccess) {
            navigate('/dashboard');
        }
    });

    const form = useForm({
        initialValues: {
            allImages: [],
            issues: Object.fromEntries(
                (createdJob?.issues || []).map((issue) => [`${issue._id}`, []])
            ),
        },
    });

    const onSubmit = (e) => {
        console.log(e);
        if (value === 'multiple') {
            e.allImages.map((image) => {
                const formData = new FormData();
                formData.append('image', image);
                const data = { id: createdJob._id, image: formData };
                addImages(data);
            });
        } else {
            Object.entries(e.issues).forEach(([issueId, images]) => {
                console.log(issueId, images);
                images.map((image) => {
                    const formData = new FormData();
                    formData.append('issueId', issueId);
                    formData.append('image', image);
                    const data = {
                        id: createdJob._id,
                        image: formData,
                    };
                    addImages(data);
                });
            });
        }
    };

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <Checkbox
                    labelPosition='left'
                    label='Do you want to add images?'
                    checked={checked}
                    variant='outline'
                    onChange={(event) => setChecked(event.currentTarget.checked)}
                />

                {checked && (
                    <>
                        <Radio.Group
                            value={value}
                            onChange={setValue}
                            name='imageType'
                            label='Please choose how you want to add the images?'
                            withAsterisk
                        >
                            <Radio mb={4} value='multiple' label='Add all images together' />
                            <Radio value='single' label='Add images by issue' />
                        </Radio.Group>

                        {value === 'multiple' ? (
                            <FileInput
                                {...form.getInputProps('allImages')}
                                accept='image/png,image/jpeg'
                                label='All Images'
                                multiple
                                valueComponent={({ value }) => {
                                    if (value === null) {
                                        return null;
                                    }

                                    if (Array.isArray(value)) {
                                        return (
                                            <Pill.Group>
                                                {value.map((file, index) => (
                                                    <Pill key={index}>{file.name}</Pill>
                                                ))}
                                            </Pill.Group>
                                        );
                                    }

                                    return <Pill>{value.name}</Pill>;
                                }}
                                leftSection={<FaImage />}
                                clearable
                            />
                        ) : (
                            createdJob.issues.map((issue, inx) => (
                                <FileInput
                                    {...form.getInputProps(`issues.${issue._id}`)}
                                    accept='image/png,image/jpeg'
                                    label={`Image for issue ${inx + 1}: ${issue.issue}`}
                                    key={issue._id}
                                    multiple
                                    valueComponent={({ value }) => {
                                        if (value === null) {
                                            return null;
                                        }

                                        if (Array.isArray(value)) {
                                            return (
                                                <Pill.Group>
                                                    {value.map((file, index) => (
                                                        <Pill key={index}>{file.name}</Pill>
                                                    ))}
                                                </Pill.Group>
                                            );
                                        }

                                        return <Pill>{value.name}</Pill>;
                                    }}
                                    leftSection={<FaImage />}
                                    clearable
                                />
                            ))
                        )}
                    </>
                )}
                <Divider mt='xl' />
                <Group mt='xl' justify='flex-end'>
                    <Button type='submit' disabled={isLoading}>
                        Submit
                    </Button>
                </Group>
            </Stack>
        </form>
    );
};

export default AddImages;
