import { Platform } from 'react-native';

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        primary: '#0366d6',
        textWhite: '#ffffff',
    },
    fontSizes: {
        body: 14,
        subheading: 16,
    },
    fonts: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'Sans-serif',
        }),
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
    appBarBackground: {
        backgroundColor: '#24292e',
    },
};

export default theme;
