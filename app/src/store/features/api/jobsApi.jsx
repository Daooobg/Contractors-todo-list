import { notifications } from '@mantine/notifications';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FaCheckCircle } from 'react-icons/fa';
import { VscError } from 'react-icons/vsc';

const jobsApi = createApi({
    reducerPath: 'jobsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: async (headers, { getState }) => {
            headers.set('Content-Type', 'application/json');

            const token = await getState().auth.user;

            if (token && token.AccessToken) {
                headers.set('Authorization', token.AccessToken);
            }
            return headers;
        },
    }),
    endpoints(builder) {
        return {
            addAddress: builder.mutation({
                query: (args) => {
                    return {
                        url: '/jobs/addNewAddress',
                        method: 'POST',
                        body: args,
                    };
                },
                async onQueryStarted(data, { queryFulfilled, dispatch }) {
                    try {
                        const newAddress = await queryFulfilled;
                        dispatch(
                            jobsApi.util.updateQueryData('getAddress', data.postcode, (draft) => {
                                draft.push(newAddress.data);
                            })
                        );
                        notifications.show({
                            color: 'teal',
                            title: 'New address',
                            message: 'Successfully add new address',
                            icon: <FaCheckCircle style={{ width: '30px', height: '30px' }} />,
                            loading: false,
                            autoClose: 3000,
                            withCloseButton: true,
                        });
                    } catch (error) {
                        notifications.show({
                            color: 'red',
                            title: 'New address',
                            message: error.error.data,
                            icon: <VscError style={{ width: '30px', height: '30px' }} />,
                            loading: false,
                            autoClose: 3000,
                        });
                    }
                },
            }),
            getAddress: builder.query({
                query: (postcode) => ({ url: `/jobs/getAddressByPostcode/${postcode}` }),
            }),
            addNewContact: builder.mutation({
                query: (args) => {
                    return {
                        url: `/jobs/addNewContact/${args.addressId}`,
                        method: 'POST',
                        body: args.contact,
                    };
                },
                async onQueryStarted(data, { queryFulfilled, dispatch }) {
                    try {
                        const id = await queryFulfilled;
                        data.contact._id = id.data;
                        dispatch(
                            jobsApi.util.updateQueryData('getAddress', data.postcode, (draft) => {
                                draft.map((address) => {
                                    if (address._id === data.addressId) {
                                        address.contactDetails.push(data.contact);
                                    }
                                    return address;
                                });
                                return draft;
                            })
                        );
                        notifications.show({
                            color: 'teal',
                            title: 'Contact details',
                            message: 'Successfully add new contact',
                            icon: <FaCheckCircle style={{ width: '30px', height: '30px' }} />,
                            loading: false,
                            autoClose: 3000,
                            withCloseButton: true,
                        });
                    } catch (error) {
                        notifications.show({
                            color: 'red',
                            title: 'Contact details',
                            message: error.error.data,
                            icon: <VscError style={{ width: '30px', height: '30px' }} />,
                            loading: false,
                            autoClose: 3000,
                        });
                    }
                },
            }),
            deleteContact: builder.mutation({
                query: (args) => {
                    return {
                        url: `/jobs/contacts/${args.addressId}`,
                        method: 'DELETE',
                        body: args.contactId,
                    };
                },
                async onQueryStarted(data, { queryFulfilled, dispatch }) {
                    const deleteContact = dispatch(
                        jobsApi.util.updateQueryData('getAddress', data.postcode, (draft) => {
                            draft.filter((address) => {
                                if (address._id == data.addressId) {
                                    address.contactDetails = address.contactDetails.filter(
                                        (contact) => contact._id != data.contactId.contactId
                                    );
                                }
                                return address;
                            });
                        })
                    );
                    try {
                        await queryFulfilled;
                        notifications.show({
                            color: 'teal',
                            title: 'Contact details',
                            message: 'Successfully delete the contact',
                            icon: <FaCheckCircle style={{ width: '30px', height: '30px' }} />,
                            loading: false,
                            autoClose: 3000,
                            withCloseButton: true,
                        });
                    } catch (error) {
                        deleteContact.undo();
                        notifications.show({
                            color: 'red',
                            title: 'Contact details',
                            message: error.error.data,
                            icon: <VscError style={{ width: '30px', height: '30px' }} />,
                            loading: false,
                            autoClose: 3000,
                        });
                    }
                },
            }),
        };
    },
});

export const {
    useAddAddressMutation,
    useGetAddressQuery,
    useAddNewContactMutation,
    useDeleteContactMutation,
} = jobsApi;
export { jobsApi };
