import { Button, createTheme } from '@mantine/core';

import classes from './theme.module.css';

const theme = createTheme({
    fontFamily: 'Roboto, sans-serif',
    fontFamilyMonospace: 'Monaco, Courier, monospace',
    components: {
        Button: Button.extend({
            classNames: classes,
        }),
    },
});

export default theme;
