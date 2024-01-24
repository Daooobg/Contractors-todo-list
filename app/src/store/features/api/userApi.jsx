import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: 'userApi',
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
            getAllContractors: builder.query({
                query: () => ({ url: '/users/getAllContractors' }),
                transformResponse: (response) => {
                    return response.map((data) => ({
                        value: data._id,
                        label: data.fullName.toUpperCase(),
                    }));
                },
            }),
        };
    },
});

export const { useGetAllContractorsQuery } = userApi;
export { userApi };
