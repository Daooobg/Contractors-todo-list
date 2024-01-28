import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const imageApi = createApi({
    reducerPath: 'imageApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: async (headers, { getState }) => {
            const token = await getState().auth.user;

            if (token && token.AccessToken) {
                headers.set('Authorization', token.AccessToken);
            }
            return headers;
        },
    }),
    endpoints(builder) {
        return {
            addNewImages: builder.mutation({
                query: (args) => {
                    return {
                        url: `/images/addAllImages/${args.id}`,
                        method: 'POST',
                        body: args.image,
                    };
                },
            }),
        };
    },
});

export const { useAddNewImagesMutation } = imageApi;
export { imageApi };
