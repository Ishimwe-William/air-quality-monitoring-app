import * as dotenv from 'dotenv';

dotenv.config();

export default ({ config }) => ({
    ...config,
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#ffffff"
        },
        config: {
            googleMaps: {
                apiKey: process.env.EXPO_PUBLIC_MAP_API_KEY,
            },
        },
        package: "com.bunsenplus.airqualitymonitoringapp"
    },
});