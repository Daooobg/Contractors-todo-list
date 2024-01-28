import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import authSlice from './features/slices/authSlice';
import { authApi } from './features/api/authApi';
import { jobsApi } from './features/api/jobsApi';
import { userApi } from './features/api/userApi';
import { imageApi } from './features/api/imageApi';

const store = configureStore({
    reducer: {
        auth: authSlice,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [jobsApi.reducerPath]: jobsApi.reducer,
        [imageApi.reducerPath]: imageApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false })
            .concat(authApi.middleware)
            .concat(imageApi.middleware)
            .concat(userApi.middleware)
            .concat(jobsApi.middleware);
    },
});

setupListeners(store.dispatch);

export default store;
