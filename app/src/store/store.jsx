import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { authApi } from './features/api/authApi';
import authSlice from './features/slices/authSlice';
import { jobsApi } from './features/api/jobsApi';

const store = configureStore({
    reducer: {
        auth: authSlice,
        [authApi.reducerPath]: authApi.reducer,
        [jobsApi.reducerPath]: jobsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false })
            .concat(authApi.middleware)
            .concat(jobsApi.middleware);
    },
});

setupListeners(store.dispatch);

export default store;
