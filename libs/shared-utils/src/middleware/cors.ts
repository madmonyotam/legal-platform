import cors from 'cors';

const devOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5174'
];

const prodOrigins = [
    'https://client-423226444985.europe-west1.run.app/',
    'https://client-prod-423226444985.europe-west1.run.app/'
];

const { CORS_ORIGINS, NODE_ENV } = process.env;

const allowedOrigins =
    CORS_ORIGINS?.split(',') ??
    (NODE_ENV === 'production' ? prodOrigins : devOrigins);
console.log({ NODE_ENV });

export const corsMiddleware = cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Not allowed by CORS: ${origin}`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
});
