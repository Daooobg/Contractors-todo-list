import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import App from './App.jsx';
import theme from './theme.js';
import store from './store/store.jsx';
import { Provider } from 'react-redux';
import { Notifications } from '@mantine/notifications';

ReactDOM.createRoot(document.getElementById('root')).render(
    <MantineProvider theme={theme} defaultColorScheme='light'>
        <React.StrictMode>
            <Provider store={store}>
                <Notifications  pos='absolute' top='100px' left='50%' zIndex={1000} />
                    <App />
            </Provider>
        </React.StrictMode>
    </MantineProvider>
);
