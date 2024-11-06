import * as dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

export default ({ config }) => {
    const expoConfig = {
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
    };

    // Write the configuration to app.json
    fs.writeFileSync('app.json', JSON.stringify(expoConfig, null, 2));

    return expoConfig;
};
