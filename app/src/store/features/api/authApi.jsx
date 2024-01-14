import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
                    console.log(args)
                    return {
                        url: '/users/register',
                        method: 'POST',
                        body: args,
                    };
                },
            }),
        };
    },
});

export const { useRegisterUserMutation } = authApi;
export { authApi };
