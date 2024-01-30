import { useParams } from 'react-router-dom';
import { Box, Group, Image, Modal, NumberFormatter, Paper, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useGetJobByIdQuery } from '../../../store/features/api/jobsApi';

const DetailsPage = () => {
    const { id } = useParams();
    const { data: currentJob } = useGetJobByIdQuery(id);
    const dateObj = new Date(currentJob?.createdAt);
    const [imageOpened, { open: openImage, close: closeImage }] = useDisclosure(false);

    const [imageUrl, setImageUrl] = useState('');
    return (
        <>
            <Modal opened={imageOpened} onClose={closeImage}>
                <Image mah='70vh' maw='70vw'  fit='scale-down' src={imageUrl} />
            </Modal>
            {currentJob ? (
                <Paper withBorder p='lg'>
                    <Stack>
                        <Group justify='space-between'>
                            <Text>
                                Address: {currentJob.addressId.fullAddress},{' '}
                                {currentJob.addressId.postcode}
                            </Text>
                            <Text>
                                Create at: {dateObj.getDate()} / {dateObj.getMonth() + 1} /{' '}
                                {dateObj.getFullYear()}
                            </Text>
                        </Group>
                        <Text>
                            There is {currentJob.issues.length}{' '}
                            {currentJob.issues.length === 1 ? 'issue' : 'issues'}:
                        </Text>
                        {currentJob.issues.map((issue, inx) => (
                            <Box key={issue._id}>
                                <Group>
                                    <Text>
                                        {inx + 1}) {issue.issue}
                                    </Text>
                                    {issue?.price && (
                                        <Text>
                                            Price:{' '}
                                            <NumberFormatter prefix='£ ' value={issue.price} />
                                        </Text>
                                    )}
                                </Group>
                                <Group>
                                    {issue.issueImageUrl.map((img) => (
                                        <Image
                                            h={150}
                                            key={img._id}
                                            src={img.imageUrl}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setImageUrl(img.imageUrl);
                                                openImage();
                                            }}
                                        />
                                    ))}
                                </Group>
                            </Box>
                        ))}
                        {currentJob.totalPrice ? (
                            <Text>
                                Total price:{' '}
                                <NumberFormatter prefix='£ ' value={currentJob.totalPrice} />
                            </Text>
                        ) : (
                            <Text>Waiting for quote</Text>
                        )}

                        <Group>
                            {currentJob.allImages.map((img) => (
                                <Image
                                    style={{ cursor: 'pointer' }}
                                    h={150}
                                    key={img._id}
                                    src={img.imageUrl}
                                    onClick={() => {
                                        setImageUrl(img.imageUrl);
                                        openImage();
                                    }}
                                />
                            ))}
                        </Group>
                    </Stack>
                </Paper>
            ) : (
                <>
                    <Text>No data</Text>
                </>
            )}
        </>
    );
};

export default DetailsPage;
