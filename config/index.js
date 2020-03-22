const convict = require('convict');
const path = require('path');


const index = convict({
    env: {
        doc: 'The application environment',
        format: ['development', 'production'],
        default: 'development',
        env: 'NODE_ENV',
        port:  process.env.PORT || 4000,
        engineApiKey: process.env.ENGINE_API_KEY
    },
    debug: {
        doc: 'Global debug toggle',
        format: Boolean,
        default: false,
        env: 'DEBUG',
    },
    firebase:  {
        authDomain: process.env._FIREBASE_AUTH_DOMAIN,
        apiKey: process.env._FIREBASE_API_KEY,
        databaseURL: process.env._FIREBASE_DATABASE_URL,
        projectId: process.env._FIREBASE_PROJECT_ID,
        storageBucket: process.env._FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env._FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env._FIREBASE_APP_ID
    },
    rateLimit: {
        windowMs: {
            doc: 'rate limit withing this window in milliseconds',
            format: Number,
            default: 15 * 60 * 1000, // 15 minutes
        },
        max: {
            doc: 'Max number of request each API have access within windowMs time',
            format: Number,
            default: 200, // each API will have max access to 200 request within windowMs time
        },
        delayMs: {
            doc: 'A delay before rateLimit in milliseconds',
            format: Number,
            default: 0,
        },
    },
});

const env = index.get('env');
index.loadFile(path.join(__dirname, `./${env}.json`));
index.validate();

module.exports = index;
