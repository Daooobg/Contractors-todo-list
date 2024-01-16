import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { notifications } from '@mantine/notifications';
import { FaCheckCircle } from 'react-icons/fa';
import { VscError } from 'react-icons/vsc';

const authApi = createApi({
    reducerPath: 'authApi',
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
            registerUser: builder.mutation({
                query: (args) => {
                    return {
                        url: '/users/register',
                        method: 'POST',
                        body: args,
                    };
                },
                async onQueryStarted(data, { queryFulfilled }) {
                    const id = notifications.show({
                        loading: true,
                        title: 'Register',
                        message: 'Registration in progress',
                        autoClose: false,
                        withCloseButton: false,
                    });
                    try {
                        await queryFulfilled;
                        notifications.update({
                            id,
                            color: 'teal',
                            title: 'Register',
                            message: 'Registration is successful please wait for approval',
                            icon: <FaCheckCircle style={{ width: '30px', height: '30px' }} />,
                            loading: false,
                            autoClose: false,
                            withCloseButton: true,
                        });
                    } catch (error) {
                        notifications.update({
                            id,
                            color: 'red',
                            title: 'Register',
                            message: error.error.data,
                            icon: <VscError style={{ width: '30px', height: '30px' }} />,
                            loading: false,
                            autoClose: 3000,
                        });
                    }
                },
            }),
            loginUser: builder.mutation({
                query: (args) => {
                    return {
                        url: '/users/login',
                        method: 'POST',
                        body: args,
                    };
                },
                async onQueryStarted(data, { queryFulfilled }) {
                    const id = notifications.show({
                        loading: true,
                        title: 'Login',
                        message: 'Login in progress',
                        autoClose: false,
                        withCloseButton: false,
                    });
                    try {
                        await queryFulfilled;
                        notifications.update({
                            id,
                            color: 'teal',
                            title: 'Login',
                            message: 'Login successfully',
                            icon: <FaCheckCircle style={{ width: '30px', height: '30px' }} />,
                            loading: false,
                            autoClose: 3000,
                            withCloseButton: true,
                        });
                    } catch (error) {
                        notifications.update({
                            id,
                            color: 'red',
                            title: 'Login',
                            message: error.error.data,
                            icon: <VscError style={{ width: '30px', height: '30px' }} />,
                            loading: false,
                            autoClose: 3000,
                        });
                    }
                },
            }),
            getAllUsersForVerification: builder.query({
                query: () => ({ url: '/users/usersVerifications' }),
            }),
            approveUser: builder.mutation({
                query: (id) => ({ url: '/users/approveUser', method: 'POST', body: { id } }),
                async onQueryStarted(data, { queryFulfilled, dispatch }) {
                    try {
                        await queryFulfilled;
                        dispatch(
                            authApi.util.updateQueryData(
                                'getAllUsersForVerification',
                                undefined,
                                (draftData) => {
                                    return draftData?.filter((user) => user._id !== data);
                                }
                            )
                        );
                        notifications.show({
                            color: 'teal',
                            title: 'Approve user',
                            message: 'Successfully approve the user',
                            icon: <FaCheckCircle style={{ width: '30px', height: '30px' }} />,
                            loading: false,
                            autoClose: 3000,
                            withCloseButton: true,
                        });
                    } catch (error) {
                        notifications.show({
                            color: 'red',
                            title: 'Approve user',
                            message: error.error.data,
                            icon: <VscError style={{ width: '30px', height: '30px' }} />,
                            loading: false,
                            autoClose: 3000,
                        });
                    }
                },
            }),
            deleteUser: builder.mutation({
                query: (id) => ({ url: '/users/deleteUserData', method: 'POST', body: { id } }),
                async onQueryStarted(data, { queryFulfilled, dispatch }) {
                    try {
                        await queryFulfilled;
                        dispatch(
                            authApi.util.updateQueryData(
                                'getAllUsersForVerification',
                                undefined,
                                (draftData) => {
                                    return draftData?.filter((user) => user._id !== data);
                                }
                            )
                        );
                        notifications.show({
                            color: 'teal',
                            title: 'Delete user',
                            message: 'Successfully delete the user',
                            icon: <FaCheckCircle style={{ width: '30px', height: '30px' }} />,
                            loading: false,
                            autoClose: 3000,
                            withCloseButton: true,
                        });
                    } catch (error) {
                        notifications.show({
                            color: 'red',
                            title: 'Delete user',
                            message: error.error.data,
                            icon: <VscError style={{ width: '30px', height: '30px' }} />,
                            loading: false,
                            autoClose: 3000,
                        });
                    }
                },
            }),
            getAllApprovedUsers: builder.query({
                query: () => ({ url: '/users/allApprovedUsers' }),
            }),
            updateUser: builder.mutation({
                query: (data) => ({ url: '/users/allApprovedUsers', method: 'POST', body: data }),
                async onQueryStarted(data, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled;

                        notifications.show({
                            color: 'teal',
                            title: 'Update user',
                            message: 'Successfully update the user',
                            icon: <FaCheckCircle style={{ width: '30px', height: '30px' }} />,
                            loading: false,
                            autoClose: 3000,
                            withCloseButton: true,
                        });
                        dispatch(
                            authApi.util.updateQueryData(
                                'getAllApprovedUsers',
                                undefined,
                                (draftData) => {
                                    return draftData?.map((user) => {
                                        if (user._id === data.id) {
                                            user.disabled = data.disabled;
                                            user.role = data.role;
                                        }
                                        return user;
                                    });
                                }
                            )
                        );
                    } catch (error) {
                        notifications.show({
                            color: 'red',
                            title: 'Update user',
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
    useRegisterUserMutation,
    useLoginUserMutation,
    useGetAllUsersForVerificationQuery,
    useApproveUserMutation,
    useDeleteUserMutation,
    useGetAllApprovedUsersQuery,
    useUpdateUserMutation,
} = authApi;
export { authApi };
