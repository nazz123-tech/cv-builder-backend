import express from 'express';
import cors from 'cors';

import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDb.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(logger);


app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
});
