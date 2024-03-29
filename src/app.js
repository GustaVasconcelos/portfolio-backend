import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/database.js';
import bodyParser from 'body-parser';
import UserRouter from './api/routes/UserRoutes.js';
import TechnologyRouter from './api/routes/TechnologyRoutes.js';
import ProjectRouter from './api/routes/ProjectRoutes.js';
import ProjectImageRouter from './api/routes/ProjectImageRoutes.js';
import ProjectTechnologyRouter from './api/routes/ProjectTechnologyRoutes.js';
import CertificateRouter from './api/routes/CertificateRoutes.js';
const app = express();

connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use('/users', UserRouter); 
app.use('/technologies', TechnologyRouter); 
app.use('/projects', ProjectRouter); 
app.use('/projects-images', ProjectImageRouter); 
app.use('/projects-technologies', ProjectTechnologyRouter);
app.use('certificates', CertificateRouter);



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
