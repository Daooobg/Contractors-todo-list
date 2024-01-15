import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { notifications } from '@mantine/notifications';
import { FaCheckCircle } from 'react-icons/fa';
import { VscError } from 'react-icons/vsc';

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: async (headers) => {
            headers.set('Content-Type', 'application/json');
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
        };
    },
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
export { authApi };
