import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const jobsApi = createApi({
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
            addAddress: builder.mutation({
                query: (args) => {
                    return {
                        url: '/jobs/addNewAddress',
                        method: 'POST',
                        body: args,
                    };
                },
            }),
        };
    },
});

export const { useAddAddressMutation } = jobsApi;
export { jobsApi };
