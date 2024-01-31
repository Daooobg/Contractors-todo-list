import { useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Group,
    Image,
    Modal,
    NumberFormatter,
    Paper,
    Stack,
    Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useGetJobByIdQuery } from '../../../store/features/api/jobsApi';
import { useSelector } from 'react-redux';
import ProvidePrice from './contractorComponents/ProvidePrice';

const DetailsPage = () => {
    const { id } = useParams();
    const role = useSelector((state) => state.auth.user.role);
    const { data: currentJob } = useGetJobByIdQuery(id);
    const dateObj = new Date(currentJob?.createdAt);
    const [opened, { open, close }] = useDisclosure(false);
    const [modalContent, setModalContent] = useState('');

    const [imageUrl, setImageUrl] = useState('');
    return (
        <>
            <Modal opened={opened} onClose={close}>
                {modalContent === 'image' && (
                    <Image mah='70vh' maw='70vw' fit='scale-down' src={imageUrl} />
                )}
                {modalContent === 'providePrice' && <ProvidePrice close={close} job={currentJob} />}
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
                        <Group>
                            {role === 'Agent' && (
                                <Text>
                                    Contractor: {currentJob.contractorId.fullName.toUpperCase()}
                                </Text>
                            )}
                            {role === 'Contractor' && (
                                <Text>Agent: {currentJob.ownerId.fullName.toUpperCase()}</Text>
                            )}
                            {(role === 'Admin' || role === 'Owner') && (
                                <>
                                    <Text>Agent: {currentJob.ownerId.fullName.toUpperCase()}</Text>
                                    <Text>
                                        Contractor: {currentJob.contractorId.fullName.toUpperCase()}
                                    </Text>
                                </>
                            )}
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
                                                setModalContent('image');
                                                open();
                                            }}
                                        />
                                    ))}
                                </Group>
                            </Box>
                        ))}
                        <Group>
                            {currentJob.totalPrice ? (
                                <Text>
                                    Total price:{' '}
                                    <NumberFormatter prefix='£ ' value={currentJob.totalPrice} />
                                </Text>
                            ) : (
                                <Group>
                                    <Text>Waiting for quote</Text>
                                </Group>
                            )}
                            {currentJob.status === 'created' && role === 'Contractor' && (
                                <Button
                                    onClick={() => {
                                        setModalContent('providePrice');
                                        open();
                                    }}
                                >
                                    Give a price
                                </Button>
                            )}
                        </Group>

                        <Group>
                            {currentJob.allImages.map((img) => (
                                <Image
                                    style={{ cursor: 'pointer' }}
                                    h={150}
                                    key={img._id}
                                    src={img.imageUrl}
                                    onClick={() => {
                                        setImageUrl(img.imageUrl);
                                        setModalContent('image');
                                        open();
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
